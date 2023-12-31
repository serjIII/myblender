/*
 * ***** BEGIN GPL LICENSE BLOCK *****
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * ***** END GPL LICENSE BLOCK *****
 */

/** \file blender/blenkernel/intern/CCGSubSurf.c
 *  \ingroup bke
 */

#include <stdlib.h>
#include <string.h>
#include <math.h>

#include "MEM_guardedalloc.h"
#include "BLI_sys_types.h" // for intptr_t support

#include "BLI_utildefines.h" /* for BLI_assert */

#include "BKE_ccg.h"
#include "CCGSubSurf.h"
#include "BKE_subsurf.h"

/* used for normalize_v3 in BLI_math_vector
 * float.h's FLT_EPSILON causes trouble with subsurf normals - campbell */
#define EPSILON (1.0e-35f)

/* With this limit a single triangle becomes over 3 million faces */
#define CCGSUBSURF_LEVEL_MAX 11

/***/

typedef unsigned char byte;

/***/

static int kHashSizes[] = {
	1, 3, 5, 11, 17, 37, 67, 131, 257, 521, 1031, 2053, 4099, 8209, 
	16411, 32771, 65537, 131101, 262147, 524309, 1048583, 2097169, 
	4194319, 8388617, 16777259, 33554467, 67108879, 134217757, 268435459
};

typedef struct _EHEntry EHEntry;
struct _EHEntry {
	EHEntry *next;
	void *key;
};
typedef struct _EHash {
	EHEntry **buckets;
	int numEntries, curSize, curSizeIdx;

	CCGAllocatorIFC allocatorIFC;
	CCGAllocatorHDL allocator;
} EHash;

#define EHASH_alloc(eh, nb)     ((eh)->allocatorIFC.alloc((eh)->allocator, nb))
#define EHASH_free(eh, ptr)     ((eh)->allocatorIFC.free((eh)->allocator, ptr))

#define EHASH_hash(eh, item)    (((uintptr_t) (item)) % ((unsigned int) (eh)->curSize))

static void ccgSubSurf__sync(CCGSubSurf *ss);
static int _edge_isBoundary(const CCGEdge *e);

static EHash *_ehash_new(int estimatedNumEntries, CCGAllocatorIFC *allocatorIFC, CCGAllocatorHDL allocator)
{
	EHash *eh = allocatorIFC->alloc(allocator, sizeof(*eh));
	eh->allocatorIFC = *allocatorIFC;
	eh->allocator = allocator;
	eh->numEntries = 0;
	eh->curSizeIdx = 0;
	while (kHashSizes[eh->curSizeIdx] < estimatedNumEntries)
		eh->curSizeIdx++;
	eh->curSize = kHashSizes[eh->curSizeIdx];
	eh->buckets = EHASH_alloc(eh, eh->curSize * sizeof(*eh->buckets));
	memset(eh->buckets, 0, eh->curSize * sizeof(*eh->buckets));

	return eh;
}
typedef void (*EHEntryFreeFP)(EHEntry *, void *);
static void _ehash_free(EHash *eh, EHEntryFreeFP freeEntry, void *userData)
{
	int numBuckets = eh->curSize;

	while (numBuckets--) {
		EHEntry *entry = eh->buckets[numBuckets];

		while (entry) {
			EHEntry *next = entry->next;

			freeEntry(entry, userData);

			entry = next;
		}
	}

	EHASH_free(eh, eh->buckets);
	EHASH_free(eh, eh);
}

static void _ehash_insert(EHash *eh, EHEntry *entry)
{
	int numBuckets = eh->curSize;
	int hash = EHASH_hash(eh, entry->key);
	entry->next = eh->buckets[hash];
	eh->buckets[hash] = entry;
	eh->numEntries++;

	if (eh->numEntries > (numBuckets * 3)) {
		EHEntry **oldBuckets = eh->buckets;
		eh->curSize = kHashSizes[++eh->curSizeIdx];
		
		eh->buckets = EHASH_alloc(eh, eh->curSize * sizeof(*eh->buckets));
		memset(eh->buckets, 0, eh->curSize * sizeof(*eh->buckets));

		while (numBuckets--) {
			for (entry = oldBuckets[numBuckets]; entry; ) {
				EHEntry *next = entry->next;
				
				hash = EHASH_hash(eh, entry->key);
				entry->next = eh->buckets[hash];
				eh->buckets[hash] = entry;
				
				entry = next;
			}
		}

		EHASH_free(eh, oldBuckets);
	}
}

static void *_ehash_lookupWithPrev(EHash *eh, void *key, void ***prevp_r)
{
	int hash = EHASH_hash(eh, key);
	void **prevp = (void **) &eh->buckets[hash];
	EHEntry *entry;
	
	for (; (entry = *prevp); prevp = (void **) &entry->next) {
		if (entry->key == key) {
			*prevp_r = (void **) prevp;
			return entry;
		}
	}
	
	return NULL;
}

static void *_ehash_lookup(EHash *eh, void *key)
{
	int hash = EHASH_hash(eh, key);
	EHEntry *entry;
	
	for (entry = eh->buckets[hash]; entry; entry = entry->next)
		if (entry->key == key)
			break;
	
	return entry;
}

/**/

typedef struct _EHashIterator {
	EHash *eh;
	int curBucket;
	EHEntry *curEntry;
} EHashIterator;

static EHashIterator *_ehashIterator_new(EHash *eh)
{
	EHashIterator *ehi = EHASH_alloc(eh, sizeof(*ehi));
	ehi->eh = eh;
	ehi->curEntry = NULL;
	ehi->curBucket = -1;
	while (!ehi->curEntry) {
		ehi->curBucket++;
		if (ehi->curBucket == ehi->eh->curSize)
			break;
		ehi->curEntry = ehi->eh->buckets[ehi->curBucket];
	}
	return ehi;
}
static void _ehashIterator_free(EHashIterator *ehi)
{
	EHASH_free(ehi->eh, ehi);
}

static void *_ehashIterator_getCurrent(EHashIterator *ehi)
{
	return ehi->curEntry;
}

static void _ehashIterator_next(EHashIterator *ehi)
{
	if (ehi->curEntry) {
		ehi->curEntry = ehi->curEntry->next;
		while (!ehi->curEntry) {
			ehi->curBucket++;
			if (ehi->curBucket == ehi->eh->curSize)
				break;
			ehi->curEntry = ehi->eh->buckets[ehi->curBucket];
		}
	}
}
static int _ehashIterator_isStopped(EHashIterator *ehi)
{
	return !ehi->curEntry;
}

/***/

static void *_stdAllocator_alloc(CCGAllocatorHDL UNUSED(a), int numBytes)
{
	return malloc(numBytes);
}
static void *_stdAllocator_realloc(CCGAllocatorHDL UNUSED(a), void *ptr, int newSize, int UNUSED(oldSize))
{
	return realloc(ptr, newSize);
}
static void _stdAllocator_free(CCGAllocatorHDL UNUSED(a), void *ptr)
{
	free(ptr);
}

static CCGAllocatorIFC *_getStandardAllocatorIFC(void)
{
	static CCGAllocatorIFC ifc;

	ifc.alloc = _stdAllocator_alloc;
	ifc.realloc = _stdAllocator_realloc;
	ifc.free = _stdAllocator_free;
	ifc.release = NULL;

	return &ifc;
}

/***/

BLI_INLINE int ccg_gridsize(int level)
{
	BLI_assert(level > 0);
	BLI_assert(level <= CCGSUBSURF_LEVEL_MAX + 1);

	return (1 << (level - 1)) + 1;
}

int BKE_ccg_gridsize(int level)
{
	return ccg_gridsize(level);
}

int BKE_ccg_factor(int low_level, int high_level)
{
	BLI_assert(low_level > 0 && high_level > 0);
	BLI_assert(low_level <= high_level);

	return 1 << (high_level - low_level);
}

BLI_INLINE int ccg_edgesize(int level)
{
	BLI_assert(level > 0);
	BLI_assert(level <= CCGSUBSURF_LEVEL_MAX + 1);
	
	return 1 + (1 << level);
}

BLI_INLINE int ccg_spacing(int high_level, int low_level)
{
	BLI_assert(high_level > 0 && low_level > 0);
	BLI_assert(high_level >= low_level);
	BLI_assert((high_level - low_level) <= CCGSUBSURF_LEVEL_MAX);

	return 1 << (high_level - low_level);
}

BLI_INLINE int ccg_edgebase(int level)
{
	BLI_assert(level > 0);
	BLI_assert(level <= CCGSUBSURF_LEVEL_MAX + 1);

	return level + (1 << level) - 1;
}

/***/

#define NormZero(av)     { float *_a = (float *) av; _a[0] = _a[1] = _a[2] = 0.0f; } (void)0
#define NormCopy(av, bv) { float *_a = (float *) av, *_b = (float *) bv; _a[0]  = _b[0]; _a[1]  = _b[1]; _a[2]  = _b[2]; } (void)0
#define NormAdd(av, bv)  { float *_a = (float *) av, *_b = (float *) bv; _a[0] += _b[0]; _a[1] += _b[1]; _a[2] += _b[2]; } (void)0

//my def
#define to_vector(co, coArray) do {        \
    float* coFloatPtr = (float*)(co);             \
    (coArray)[0] = coFloatPtr[0];                 \
    (coArray)[1] = coFloatPtr[1];                 \
    (coArray)[2] = coFloatPtr[2];                 \
} while (0)

#define sub(c, a, b) \
    do { \
        (c)[0] = (a)[0] - (b)[0]; \
        (c)[1] = (a)[1] - (b)[1]; \
        (c)[2] = (a)[2] - (b)[2]; \
    } while(0)

#define add(c, a, b) \
    do { \
        (c)[0] = (a)[0] + (b)[0]; \
        (c)[1] = (a)[1] + (b)[1]; \
        (c)[2] = (a)[2] + (b)[2]; \
    } while(0)

#define avg(c, a, b) \
    do { \
        (c)[0] = ((a)[0] + (b)[0]) * 0.5f; \
        (c)[1] = ((a)[1] + (b)[1]) * 0.5f; \
        (c)[2] = ((a)[2] + (b)[2]) * 0.5f; \
    } while(0)

#define scale(a, s) \
    do { \
        (a)[0] *= (s); \
        (a)[1] *= (s); \
        (a)[2] *= (s); \
    } while(0)

#define equal(v1, v2) ((v1[0] == v2[0]) && (v1[1] == v2[1]) && (v1[2] == v2[2]))

#define dot(a, b) ((a)[0]*(b)[0] + (a)[1]*(b)[1] + (a)[2]*(b)[2])

#define sqr_len(a) ((a)[0]*(a)[0] + (a)[1]*(a)[1] + (a)[2]*(a)[2])





BLI_INLINE void Normalize(float no[3])
{
	const float length = sqrtf(no[0] * no[0] + no[1] * no[1] + no[2] * no[2]);

	if (length > EPSILON) {
		const float length_inv = 1.0f / length;

		no[0] *= length_inv;
		no[1] *= length_inv;
		no[2] *= length_inv;
	}
	else {
		NormZero(no);
	}
}

/***/

enum {
	Vert_eEffected =    (1 << 0),
	Vert_eChanged =     (1 << 1),
	Vert_eSeam =        (1 << 2),
	Vert_mytrigger = (1 << 3)
} /*VertFlags*/;
enum {
	Edge_eEffected =    (1 << 0),
	Edge_mytrigger =    (1 << 1),
	Edge_excluded =     (1 << 2)
} /*CCGEdgeFlags*/;
enum {
	Face_eEffected =    (1 << 0),
	Face_mytrigger =    (1 << 1)
} /*FaceFlags*/;

struct CCGVert {
	CCGVert     *next;  /* EHData.next */
	CCGVertHDL vHDL;    /* EHData.key */

	short numEdges, numFaces, flags, pad;

	CCGEdge **edges;
	CCGFace **faces;
//	byte *levelData;
//	byte *userData;
};

BLI_INLINE byte *VERT_getLevelData(CCGVert *v)
{
	return (byte *)(&(v)[1]);
}

struct CCGEdge {
	CCGEdge     *next;  /* EHData.next */
	CCGEdgeHDL eHDL;    /* EHData.key */

	short numFaces, flags;
	float crease;

	CCGVert *v0, *v1;
	CCGFace **faces;

//	byte *levelData;
//	byte *userData;
};

BLI_INLINE byte *EDGE_getLevelData(CCGEdge *e)
{
	return (byte *)(&(e)[1]);
}

struct CCGFace {
	CCGFace     *next;  /* EHData.next */
	CCGFaceHDL fHDL;    /* EHData.key */

	short numVerts, flags, pad1, pad2;

//	CCGVert **verts;
//	CCGEdge **edges;
//	byte *centerData;
//	byte **gridData;
//	byte *userData;
};

BLI_INLINE CCGVert **FACE_getVerts(CCGFace *f)
{
	return (CCGVert **)(&f[1]);
}

BLI_INLINE CCGEdge **FACE_getEdges(CCGFace *f)
{
	return (CCGEdge **)(&(FACE_getVerts(f)[f->numVerts]));
}

BLI_INLINE byte *FACE_getCenterData(CCGFace *f)
{
	return (byte *)(&(FACE_getEdges(f)[(f)->numVerts]));
}

typedef enum {
	eSyncState_None = 0,
	eSyncState_Vert,
	eSyncState_Edge,
	eSyncState_Face,
	eSyncState_Partial
} SyncState;

struct CCGSubSurf {
	EHash *vMap;    /* map of CCGVertHDL -> Vert */
	EHash *eMap;    /* map of CCGEdgeHDL -> Edge */
	EHash *fMap;    /* map of CCGFaceHDL -> Face */

	CCGMeshIFC meshIFC;
	
	CCGAllocatorIFC allocatorIFC;
	CCGAllocatorHDL allocator;

	int subdivLevels;
	int numGrids;
	int allowEdgeCreation;
	float defaultCreaseValue;
	void *defaultEdgeUserData;

	void *q, *r;
		
	/* data for calc vert normals */
	int calcVertNormals;
	int normalDataOffset;

	/* data for paint masks */
	int allocMask;
	int maskDataOffset;

	/* data for age'ing (to debug sync) */
	int currentAge;
	int useAgeCounts;
	int vertUserAgeOffset;
	int edgeUserAgeOffset;
	int faceUserAgeOffset;

	/* data used during syncing */
	SyncState syncState;

	EHash *oldVMap, *oldEMap, *oldFMap;
	int lenTempArrays;
	CCGVert **tempVerts;
	CCGEdge **tempEdges;
};

#define CCGSUBSURF_alloc(ss, nb)            ((ss)->allocatorIFC.alloc((ss)->allocator, nb))
#define CCGSUBSURF_realloc(ss, ptr, nb, ob) ((ss)->allocatorIFC.realloc((ss)->allocator, ptr, nb, ob))
#define CCGSUBSURF_free(ss, ptr)            ((ss)->allocatorIFC.free((ss)->allocator, ptr))

/***/

static int VertDataEqual(const float a[], const float b[], const CCGSubSurf *ss)
{
	int i;
	for (i = 0; i < ss->meshIFC.numLayers; i++) {
		if (a[i] != b[i])
			return 0;
	}
	return 1;
}

static void VertDataZero(float v[], const CCGSubSurf *ss)
{
	memset(v, 0, sizeof(float) * ss->meshIFC.numLayers);
}

static void VertDataCopy(float dst[], const float src[], const CCGSubSurf *ss)
{
	int i;
	for (i = 0; i < ss->meshIFC.numLayers; i++)
		dst[i] = src[i];
}

static void VertDataCopy2(float dst[], const float src[], const CCGSubSurf *ss)
{
		dst[0] = src[0];

}

static void VertDataAdd(float a[], const float b[], const CCGSubSurf *ss)
{
	int i;
	for (i = 0; i < ss->meshIFC.numLayers; i++)
		a[i] += b[i];
}

static void VertDataSub(float a[], const float b[], const CCGSubSurf *ss)
{
	int i;
	for (i = 0; i < ss->meshIFC.numLayers; i++)
		a[i] -= b[i];
}

static void VertDataMulN(float v[], float f, const CCGSubSurf *ss)
{
	int i;
	for (i = 0; i < ss->meshIFC.numLayers; i++)
		v[i] *= f;
}

static void VertDataAvg4(float v[],
                         const float a[], const float b[],
                         const float c[], const float d[],
                         const CCGSubSurf *ss)
{
	int i;
	for (i = 0; i < ss->meshIFC.numLayers; i++)
		v[i] = (a[i] + b[i] + c[i] + d[i]) * 0.25f;
}

/***/

static CCGVert *_vert_new(CCGVertHDL vHDL, CCGSubSurf *ss)
{
	int num_vert_data = ss->subdivLevels + 1;
	CCGVert *v = CCGSUBSURF_alloc(ss,
	                              sizeof(CCGVert) +
	                              ss->meshIFC.vertDataSize * num_vert_data +
	                              ss->meshIFC.vertUserSize);
	byte *userData;

	v->vHDL = vHDL;
	v->edges = NULL;
	v->faces = NULL;
	v->numEdges = v->numFaces = 0;
	v->flags = 0;

	userData = ccgSubSurf_getVertUserData(ss, v);
	memset(userData, 0, ss->meshIFC.vertUserSize);
	if (ss->useAgeCounts) *((int *) &userData[ss->vertUserAgeOffset]) = ss->currentAge;

	return v;
}
static void _vert_remEdge(CCGVert *v, CCGEdge *e)
{
	int i;
	for (i = 0; i < v->numEdges; i++) {
		if (v->edges[i] == e) {
			v->edges[i] = v->edges[--v->numEdges];
			break;
		}
	}
}
static void _vert_remFace(CCGVert *v, CCGFace *f)
{
	int i;
	for (i = 0; i < v->numFaces; i++) {
		if (v->faces[i] == f) {
			v->faces[i] = v->faces[--v->numFaces];
			break;
		}
	}
}
static void _vert_addEdge(CCGVert *v, CCGEdge *e, CCGSubSurf *ss)
{
	v->edges = CCGSUBSURF_realloc(ss, v->edges, (v->numEdges + 1) * sizeof(*v->edges), v->numEdges * sizeof(*v->edges));
	v->edges[v->numEdges++] = e;
}
static void _vert_addFace(CCGVert *v, CCGFace *f, CCGSubSurf *ss)
{
	v->faces = CCGSUBSURF_realloc(ss, v->faces, (v->numFaces + 1) * sizeof(*v->faces), v->numFaces * sizeof(*v->faces));
	v->faces[v->numFaces++] = f;
}
static CCGEdge *_vert_findEdgeTo(const CCGVert *v, const CCGVert *vQ)
{
	int i;
	for (i = 0; i < v->numEdges; i++) {
		CCGEdge *e = v->edges[v->numEdges - 1 - i]; // XXX, note reverse
		if ((e->v0 == v && e->v1 == vQ) ||
		    (e->v1 == v && e->v0 == vQ))
		{
			return e;
		}
	}
	return NULL;
}
static int _vert_isBoundary(const CCGVert *v)
{
	int i;
	for (i = 0; i < v->numEdges; i++)
		if (_edge_isBoundary(v->edges[i]))
			return 1;
	return 0;
}

static void *_vert_getCo(CCGVert *v, int lvl, int dataSize)
{
	return &VERT_getLevelData(v)[lvl * dataSize];
}
static float *_vert_getNo(CCGVert *v, int lvl, int dataSize, int normalDataOffset)
{
	return (float *) &VERT_getLevelData(v)[lvl * dataSize + normalDataOffset];
}

static void _vert_free(CCGVert *v, CCGSubSurf *ss)
{
	CCGSUBSURF_free(ss, v->edges);
	CCGSUBSURF_free(ss, v->faces);
	CCGSUBSURF_free(ss, v);
}

static int VERT_seam(const CCGVert *v)
{
	return ((v->flags & Vert_eSeam) != 0);
}

/***/

static CCGEdge *_edge_new(CCGEdgeHDL eHDL, CCGVert *v0, CCGVert *v1, float crease, CCGSubSurf *ss)
{
	int num_edge_data = ccg_edgebase(ss->subdivLevels + 1);
	CCGEdge *e = CCGSUBSURF_alloc(ss,
	                              sizeof(CCGEdge) +
	                              ss->meshIFC.vertDataSize * num_edge_data +
	                              ss->meshIFC.edgeUserSize);
	byte *userData;

	e->eHDL = eHDL;
	e->v0 = v0;
	e->v1 = v1;
	e->crease = crease;
	e->faces = NULL;
	e->numFaces = 0;
	e->flags = 0;
	_vert_addEdge(v0, e, ss);
	_vert_addEdge(v1, e, ss);

	userData = ccgSubSurf_getEdgeUserData(ss, e);
	memset(userData, 0, ss->meshIFC.edgeUserSize);
	if (ss->useAgeCounts) *((int *) &userData[ss->edgeUserAgeOffset]) = ss->currentAge;

	return e;
}
static void _edge_remFace(CCGEdge *e, CCGFace *f)
{
	int i;
	for (i = 0; i < e->numFaces; i++) {
		if (e->faces[i] == f) {
			e->faces[i] = e->faces[--e->numFaces];
			break;
		}
	}
}
static void _edge_addFace(CCGEdge *e, CCGFace *f, CCGSubSurf *ss)
{
	e->faces = CCGSUBSURF_realloc(ss, e->faces, (e->numFaces + 1) * sizeof(*e->faces), e->numFaces * sizeof(*e->faces));
	e->faces[e->numFaces++] = f;
}
static int _edge_isBoundary(const CCGEdge *e)
{
	return e->numFaces < 2;
}

static CCGVert *_edge_getOtherVert(CCGEdge *e, CCGVert *vQ)
{
	if (vQ == e->v0) {
		return e->v1;
	}
	else {
		return e->v0;
	}
}

static void *_edge_getCo(CCGEdge *e, int lvl, int x, int dataSize)
{
	int levelBase = ccg_edgebase(lvl);
	return &EDGE_getLevelData(e)[dataSize * (levelBase + x)];
}
static float *_edge_getNo(CCGEdge *e, int lvl, int x, int dataSize, int normalDataOffset)
{
	int levelBase = ccg_edgebase(lvl);
	return (float *) &EDGE_getLevelData(e)[dataSize * (levelBase + x) + normalDataOffset];
}
static void *_edge_getCoVert(CCGEdge *e, CCGVert *v, int lvl, int x, int dataSize)
{
	int levelBase = ccg_edgebase(lvl);
	if (v == e->v0) {
		return &EDGE_getLevelData(e)[dataSize * (levelBase + x)];
	}
	else {
		return &EDGE_getLevelData(e)[dataSize * (levelBase + (1 << lvl) - x)];
	}
}

static void _edge_free(CCGEdge *e, CCGSubSurf *ss)
{
	CCGSUBSURF_free(ss, e->faces);
	CCGSUBSURF_free(ss, e);
}
static void _edge_unlinkMarkAndFree(CCGEdge *e, CCGSubSurf *ss)
{
	_vert_remEdge(e->v0, e);
	_vert_remEdge(e->v1, e);
	e->v0->flags |= Vert_eEffected;
	e->v1->flags |= Vert_eEffected;
	_edge_free(e, ss);
}

static float EDGE_getSharpness(CCGEdge *e, int lvl)
{
	if (!lvl)
		return e->crease;
	else if (!e->crease)
		return 0.0f;
	else if (e->crease - lvl < 0.0f)
		return 0.0f;
	else
		return e->crease - lvl;
}

static CCGFace *_face_new(CCGFaceHDL fHDL, CCGVert **verts, CCGEdge **edges, int numVerts, CCGSubSurf *ss)
{
	int maxGridSize = ccg_gridsize(ss->subdivLevels);
	int num_face_data = (numVerts * maxGridSize +
	                     numVerts * maxGridSize * maxGridSize + 1);
	CCGFace *f = CCGSUBSURF_alloc(ss,
	                              sizeof(CCGFace) +
	                              sizeof(CCGVert *) * numVerts +
	                              sizeof(CCGEdge *) * numVerts +
	                              ss->meshIFC.vertDataSize * num_face_data +
	                              ss->meshIFC.faceUserSize);
	byte *userData;
	int i;

	f->numVerts = numVerts;
	f->fHDL = fHDL;
	f->flags = 0;

	for (i = 0; i < numVerts; i++) {
		FACE_getVerts(f)[i] = verts[i];
		FACE_getEdges(f)[i] = edges[i];
		_vert_addFace(verts[i], f, ss);
		_edge_addFace(edges[i], f, ss);
	}

	userData = ccgSubSurf_getFaceUserData(ss, f);
	memset(userData, 0, ss->meshIFC.faceUserSize);
	if (ss->useAgeCounts) *((int *) &userData[ss->faceUserAgeOffset]) = ss->currentAge;

	return f;
}

BLI_INLINE void *_face_getIECo(CCGFace *f, int lvl, int S, int x, int levels, int dataSize)
{
	int maxGridSize = ccg_gridsize(levels);
	int spacing = ccg_spacing(levels, lvl);
	byte *gridBase = FACE_getCenterData(f) + dataSize * (1 + S * (maxGridSize + maxGridSize * maxGridSize));
	return &gridBase[dataSize * x * spacing];
}
BLI_INLINE void *_face_getIENo(CCGFace *f, int lvl, int S, int x, int levels, int dataSize, int normalDataOffset)
{
	int maxGridSize = ccg_gridsize(levels);
	int spacing = ccg_spacing(levels, lvl);
	byte *gridBase = FACE_getCenterData(f) + dataSize * (1 + S * (maxGridSize + maxGridSize * maxGridSize));
	return &gridBase[dataSize * x * spacing + normalDataOffset];
}
BLI_INLINE void *_face_getIFCo(CCGFace *f, int lvl, int S, int x, int y, int levels, int dataSize)
{
	int maxGridSize = ccg_gridsize(levels);
	int spacing = ccg_spacing(levels, lvl);
	byte *gridBase = FACE_getCenterData(f) + dataSize * (1 + S * (maxGridSize + maxGridSize * maxGridSize));
	return &gridBase[dataSize * (maxGridSize + (y * maxGridSize + x) * spacing)];
}
BLI_INLINE float *_face_getIFNo(CCGFace *f, int lvl, int S, int x, int y, int levels, int dataSize, int normalDataOffset)
{
	int maxGridSize = ccg_gridsize(levels);
	int spacing = ccg_spacing(levels, lvl);
	byte *gridBase = FACE_getCenterData(f) + dataSize * (1 + S * (maxGridSize + maxGridSize * maxGridSize));
	return (float *) &gridBase[dataSize * (maxGridSize + (y * maxGridSize + x) * spacing) + normalDataOffset];
}
BLI_INLINE int _face_getVertIndex(CCGFace *f, CCGVert *v)
{
	int i;
	for (i = 0; i < f->numVerts; i++)
		if (FACE_getVerts(f)[i] == v)
			return i;
	return -1;
}
BLI_INLINE int _face_getEdgeIndex(CCGFace *f, CCGEdge *e)
{
	int i;
	for (i = 0; i < f->numVerts; i++)
		if (FACE_getEdges(f)[i] == e)
			return i;
	return -1;
}
BLI_INLINE void *_face_getIFCoEdge(CCGFace *f, CCGEdge *e, int f_ed_idx, int lvl, int eX, int eY, int levels, int dataSize)
{
	int maxGridSize = ccg_gridsize(levels);
	int spacing = ccg_spacing(levels, lvl);
	int x, y, cx, cy;

	BLI_assert(f_ed_idx == _face_getEdgeIndex(f, e));

	eX = eX * spacing;
	eY = eY * spacing;
	if (e->v0 != FACE_getVerts(f)[f_ed_idx]) {
		eX = (maxGridSize * 2 - 1) - 1 - eX;
	}
	y = maxGridSize - 1 - eX;
	x = maxGridSize - 1 - eY;
	if (x < 0) {
		f_ed_idx = (f_ed_idx + f->numVerts - 1) % f->numVerts;
		cx = y;
		cy = -x;
	}
	else if (y < 0) {
		f_ed_idx = (f_ed_idx + 1) % f->numVerts;
		cx = -y;
		cy = x;
	}
	else {
		cx = x;
		cy = y;
	}
	return _face_getIFCo(f, levels, f_ed_idx, cx, cy, levels, dataSize);
}
static float *_face_getIFNoEdge(CCGFace *f, CCGEdge *e, int f_ed_idx, int lvl, int eX, int eY, int levels, int dataSize, int normalDataOffset)
{
	return (float *) ((byte *) _face_getIFCoEdge(f, e, f_ed_idx, lvl, eX, eY, levels, dataSize) + normalDataOffset);
}
static void _face_calcIFNo(CCGFace *f, int lvl, int S, int x, int y, float no[3], int levels, int dataSize)
{
	float *a = _face_getIFCo(f, lvl, S, x + 0, y + 0, levels, dataSize);
	float *b = _face_getIFCo(f, lvl, S, x + 1, y + 0, levels, dataSize);
	float *c = _face_getIFCo(f, lvl, S, x + 1, y + 1, levels, dataSize);
	float *d = _face_getIFCo(f, lvl, S, x + 0, y + 1, levels, dataSize);
	float a_cX = c[0] - a[0], a_cY = c[1] - a[1], a_cZ = c[2] - a[2];
	float b_dX = d[0] - b[0], b_dY = d[1] - b[1], b_dZ = d[2] - b[2];

	no[0] = b_dY * a_cZ - b_dZ * a_cY;
	no[1] = b_dZ * a_cX - b_dX * a_cZ;
	no[2] = b_dX * a_cY - b_dY * a_cX;

	Normalize(no);
}

static void _face_free(CCGFace *f, CCGSubSurf *ss)
{
	CCGSUBSURF_free(ss, f);
}
static void _face_unlinkMarkAndFree(CCGFace *f, CCGSubSurf *ss)
{
	int j;
	for (j = 0; j < f->numVerts; j++) {
		_vert_remFace(FACE_getVerts(f)[j], f);
		_edge_remFace(FACE_getEdges(f)[j], f);
		FACE_getVerts(f)[j]->flags |= Vert_eEffected;
	}
	_face_free(f, ss);
}

/***/

CCGSubSurf *ccgSubSurf_new(CCGMeshIFC *ifc, int subdivLevels, CCGAllocatorIFC *allocatorIFC, CCGAllocatorHDL allocator)
{
	if (!allocatorIFC) {
		allocatorIFC = _getStandardAllocatorIFC();
		allocator = NULL;
	}

	if (subdivLevels < 1) {
		return NULL;
	}
	else {
		CCGSubSurf *ss = allocatorIFC->alloc(allocator, sizeof(*ss));

		ss->allocatorIFC = *allocatorIFC;
		ss->allocator = allocator;

		ss->vMap = _ehash_new(0, &ss->allocatorIFC, ss->allocator);
		ss->eMap = _ehash_new(0, &ss->allocatorIFC, ss->allocator);
		ss->fMap = _ehash_new(0, &ss->allocatorIFC, ss->allocator);

		ss->meshIFC = *ifc;
		
		ss->subdivLevels = subdivLevels;
		ss->numGrids = 0;
		ss->allowEdgeCreation = 0;
		ss->defaultCreaseValue = 0;
		ss->defaultEdgeUserData = NULL;

		ss->useAgeCounts = 0;
		ss->vertUserAgeOffset = ss->edgeUserAgeOffset = ss->faceUserAgeOffset = 0;

		ss->calcVertNormals = 0;
		ss->normalDataOffset = 0;

		ss->allocMask = 0;

		ss->q = CCGSUBSURF_alloc(ss, ss->meshIFC.vertDataSize);
		ss->r = CCGSUBSURF_alloc(ss, ss->meshIFC.vertDataSize);

		ss->currentAge = 0;

		ss->syncState = eSyncState_None;

		ss->oldVMap = ss->oldEMap = ss->oldFMap = NULL;
		ss->lenTempArrays = 0;
		ss->tempVerts = NULL;
		ss->tempEdges = NULL;

		return ss;
	}
}

void ccgSubSurf_free(CCGSubSurf *ss)
{
	CCGAllocatorIFC allocatorIFC = ss->allocatorIFC;
	CCGAllocatorHDL allocator = ss->allocator;

	if (ss->syncState) {
		_ehash_free(ss->oldFMap, (EHEntryFreeFP) _face_free, ss);
		_ehash_free(ss->oldEMap, (EHEntryFreeFP) _edge_free, ss);
		_ehash_free(ss->oldVMap, (EHEntryFreeFP) _vert_free, ss);

		MEM_freeN(ss->tempVerts);
		MEM_freeN(ss->tempEdges);
	}

	CCGSUBSURF_free(ss, ss->r);
	CCGSUBSURF_free(ss, ss->q);
	if (ss->defaultEdgeUserData) CCGSUBSURF_free(ss, ss->defaultEdgeUserData);

	_ehash_free(ss->fMap, (EHEntryFreeFP) _face_free, ss);
	_ehash_free(ss->eMap, (EHEntryFreeFP) _edge_free, ss);
	_ehash_free(ss->vMap, (EHEntryFreeFP) _vert_free, ss);

	CCGSUBSURF_free(ss, ss);

	if (allocatorIFC.release) {
		allocatorIFC.release(allocator);
	}
}

CCGError ccgSubSurf_setAllowEdgeCreation(CCGSubSurf *ss, int allowEdgeCreation, float defaultCreaseValue, void *defaultUserData)
{
	if (ss->defaultEdgeUserData) {
		CCGSUBSURF_free(ss, ss->defaultEdgeUserData);
	}

	ss->allowEdgeCreation = !!allowEdgeCreation;
	ss->defaultCreaseValue = defaultCreaseValue;
	ss->defaultEdgeUserData = CCGSUBSURF_alloc(ss, ss->meshIFC.edgeUserSize);

	if (defaultUserData) {
		memcpy(ss->defaultEdgeUserData, defaultUserData, ss->meshIFC.edgeUserSize);
	}
	else {
		memset(ss->defaultEdgeUserData, 0, ss->meshIFC.edgeUserSize);
	}

	return eCCGError_None;
}
void ccgSubSurf_getAllowEdgeCreation(CCGSubSurf *ss, int *allowEdgeCreation_r, float *defaultCreaseValue_r, void *defaultUserData_r)
{
	if (allowEdgeCreation_r) *allowEdgeCreation_r = ss->allowEdgeCreation;
	if (ss->allowEdgeCreation) {
		if (defaultCreaseValue_r) *defaultCreaseValue_r = ss->defaultCreaseValue;
		if (defaultUserData_r) memcpy(defaultUserData_r, ss->defaultEdgeUserData, ss->meshIFC.edgeUserSize);
	}
}

CCGError ccgSubSurf_setSubdivisionLevels(CCGSubSurf *ss, int subdivisionLevels)
{
	if (subdivisionLevels <= 0) {
		return eCCGError_InvalidValue;
	}
	else if (subdivisionLevels != ss->subdivLevels) {
		ss->numGrids = 0;
		ss->subdivLevels = subdivisionLevels;
		_ehash_free(ss->vMap, (EHEntryFreeFP) _vert_free, ss);
		_ehash_free(ss->eMap, (EHEntryFreeFP) _edge_free, ss);
		_ehash_free(ss->fMap, (EHEntryFreeFP) _face_free, ss);
		ss->vMap = _ehash_new(0, &ss->allocatorIFC, ss->allocator);
		ss->eMap = _ehash_new(0, &ss->allocatorIFC, ss->allocator);
		ss->fMap = _ehash_new(0, &ss->allocatorIFC, ss->allocator);
	}

	return eCCGError_None;
}

void ccgSubSurf_getUseAgeCounts(CCGSubSurf *ss, int *useAgeCounts_r, int *vertUserOffset_r, int *edgeUserOffset_r, int *faceUserOffset_r)
{
	*useAgeCounts_r = ss->useAgeCounts;

	if (vertUserOffset_r) *vertUserOffset_r = ss->vertUserAgeOffset;
	if (edgeUserOffset_r) *edgeUserOffset_r = ss->edgeUserAgeOffset;
	if (faceUserOffset_r) *faceUserOffset_r = ss->faceUserAgeOffset;
}

CCGError ccgSubSurf_setUseAgeCounts(CCGSubSurf *ss, int useAgeCounts, int vertUserOffset, int edgeUserOffset, int faceUserOffset)
{
	if (useAgeCounts) {
		if ((vertUserOffset + 4 > ss->meshIFC.vertUserSize) ||
		    (edgeUserOffset + 4 > ss->meshIFC.edgeUserSize) ||
		    (faceUserOffset + 4 > ss->meshIFC.faceUserSize))
		{
			return eCCGError_InvalidValue;
		}
		else {
			ss->useAgeCounts = 1;
			ss->vertUserAgeOffset = vertUserOffset;
			ss->edgeUserAgeOffset = edgeUserOffset;
			ss->faceUserAgeOffset = faceUserOffset;
		}
	}
	else {
		ss->useAgeCounts = 0;
		ss->vertUserAgeOffset = ss->edgeUserAgeOffset = ss->faceUserAgeOffset = 0;
	}

	return eCCGError_None;
}

CCGError ccgSubSurf_setCalcVertexNormals(CCGSubSurf *ss, int useVertNormals, int normalDataOffset)
{
	if (useVertNormals) {
		if (normalDataOffset < 0 || normalDataOffset + 12 > ss->meshIFC.vertDataSize) {
			return eCCGError_InvalidValue;
		}
		else {
			ss->calcVertNormals = 1;
			ss->normalDataOffset = normalDataOffset;
		}
	}
	else {
		ss->calcVertNormals = 0;
		ss->normalDataOffset = 0;
	}

	return eCCGError_None;
}

void ccgSubSurf_setAllocMask(CCGSubSurf *ss, int allocMask, int maskOffset)
{
	ss->allocMask = allocMask;
	ss->maskDataOffset = maskOffset;
}

void ccgSubSurf_setNumLayers(CCGSubSurf *ss, int numLayers)
{
	ss->meshIFC.numLayers = numLayers;
}

/***/

CCGError ccgSubSurf_initFullSync(CCGSubSurf *ss)
{
	if (ss->syncState != eSyncState_None) {
		return eCCGError_InvalidSyncState;
	}

	ss->currentAge++;

	ss->oldVMap = ss->vMap; 
	ss->oldEMap = ss->eMap; 
	ss->oldFMap = ss->fMap;

	ss->vMap = _ehash_new(0, &ss->allocatorIFC, ss->allocator);
	ss->eMap = _ehash_new(0, &ss->allocatorIFC, ss->allocator);
	ss->fMap = _ehash_new(0, &ss->allocatorIFC, ss->allocator);

	ss->numGrids = 0;

	ss->lenTempArrays = 12;
	ss->tempVerts = MEM_mallocN(sizeof(*ss->tempVerts) * ss->lenTempArrays, "CCGSubsurf tempVerts");
	ss->tempEdges = MEM_mallocN(sizeof(*ss->tempEdges) * ss->lenTempArrays, "CCGSubsurf tempEdges");

	ss->syncState = eSyncState_Vert;

	return eCCGError_None;
}

CCGError ccgSubSurf_initPartialSync(CCGSubSurf *ss)
{
	if (ss->syncState != eSyncState_None) {
		return eCCGError_InvalidSyncState;
	}

	ss->currentAge++;

	ss->syncState = eSyncState_Partial;

	return eCCGError_None;
}

CCGError ccgSubSurf_syncVertDel(CCGSubSurf *ss, CCGVertHDL vHDL)
{
	if (ss->syncState != eSyncState_Partial) {
		return eCCGError_InvalidSyncState;
	}
	else {
		void **prevp;
		CCGVert *v = _ehash_lookupWithPrev(ss->vMap, vHDL, &prevp);

		if (!v || v->numFaces || v->numEdges) {
			return eCCGError_InvalidValue;
		}
		else {
			*prevp = v->next;
			_vert_free(v, ss);
		}
	}

	return eCCGError_None;
}

CCGError ccgSubSurf_syncEdgeDel(CCGSubSurf *ss, CCGEdgeHDL eHDL)
{
	if (ss->syncState != eSyncState_Partial) {
		return eCCGError_InvalidSyncState;
	}
	else {
		void **prevp;
		CCGEdge *e = _ehash_lookupWithPrev(ss->eMap, eHDL, &prevp);

		if (!e || e->numFaces) {
			return eCCGError_InvalidValue;
		}
		else {
			*prevp = e->next;
			_edge_unlinkMarkAndFree(e, ss);
		}
	}

	return eCCGError_None;
}

CCGError ccgSubSurf_syncFaceDel(CCGSubSurf *ss, CCGFaceHDL fHDL)
{
	if (ss->syncState != eSyncState_Partial) {
		return eCCGError_InvalidSyncState;
	}
	else {
		void **prevp;
		CCGFace *f = _ehash_lookupWithPrev(ss->fMap, fHDL, &prevp);

		if (!f) {
			return eCCGError_InvalidValue;
		}
		else {
			*prevp = f->next;
			_face_unlinkMarkAndFree(f, ss);
		}
	}

	return eCCGError_None;
}

CCGError ccgSubSurf_syncVert(CCGSubSurf *ss, CCGVertHDL vHDL, const void *vertData, int seam, CCGVert **v_r)
{
	void **prevp;
	CCGVert *v = NULL;
	short seamflag = (seam) ? Vert_eSeam : 0;
	
	if (ss->syncState == eSyncState_Partial) {
		v = _ehash_lookupWithPrev(ss->vMap, vHDL, &prevp);
		if (!v) {
			v = _vert_new(vHDL, ss);
			VertDataCopy(_vert_getCo(v, 0, ss->meshIFC.vertDataSize), vertData, ss);
			_ehash_insert(ss->vMap, (EHEntry *) v);
			v->flags = Vert_eEffected | seamflag;
		}
		else if (!VertDataEqual(vertData, _vert_getCo(v, 0, ss->meshIFC.vertDataSize), ss) ||
		         ((v->flags & Vert_eSeam) != seamflag))
		{
			int i, j;

			VertDataCopy(_vert_getCo(v, 0, ss->meshIFC.vertDataSize), vertData, ss);
			v->flags = Vert_eEffected | seamflag;

			for (i = 0; i < v->numEdges; i++) {
				CCGEdge *e = v->edges[i];
				e->v0->flags |= Vert_eEffected;
				e->v1->flags |= Vert_eEffected;
			}
			for (i = 0; i < v->numFaces; i++) {
				CCGFace *f = v->faces[i];
				for (j = 0; j < f->numVerts; j++) {
					FACE_getVerts(f)[j]->flags |= Vert_eEffected;
				}
			}
		}
	}
	else {
		if (ss->syncState != eSyncState_Vert) {
			return eCCGError_InvalidSyncState;
		}

		v = _ehash_lookupWithPrev(ss->oldVMap, vHDL, &prevp);
		if (!v) {
			v = _vert_new(vHDL, ss);
			VertDataCopy(_vert_getCo(v, 0, ss->meshIFC.vertDataSize), vertData, ss);
			_ehash_insert(ss->vMap, (EHEntry *) v);
			v->flags = Vert_eEffected | seamflag;
		}
		else if (!VertDataEqual(vertData, _vert_getCo(v, 0, ss->meshIFC.vertDataSize), ss) ||
		         ((v->flags & Vert_eSeam) != seamflag))
		{
			*prevp = v->next;
			_ehash_insert(ss->vMap, (EHEntry *) v);
			VertDataCopy(_vert_getCo(v, 0, ss->meshIFC.vertDataSize), vertData, ss);
			v->flags = Vert_eEffected | Vert_eChanged | seamflag;
		}
		else {
			*prevp = v->next;
			_ehash_insert(ss->vMap, (EHEntry *) v);
			v->flags = 0;
		}
	}

	if (v_r) *v_r = v;
	return eCCGError_None;
}

CCGError ccgSubSurf_syncEdge(CCGSubSurf *ss, CCGEdgeHDL eHDL, CCGVertHDL e_vHDL0, CCGVertHDL e_vHDL1, float crease, CCGEdge **e_r)
{
	void **prevp;
	CCGEdge *e = NULL, *eNew;

	if (ss->syncState == eSyncState_Partial) {
		e = _ehash_lookupWithPrev(ss->eMap, eHDL, &prevp);
		if (!e || e->v0->vHDL != e_vHDL0 || e->v1->vHDL != e_vHDL1 || crease != e->crease) {
			CCGVert *v0 = _ehash_lookup(ss->vMap, e_vHDL0);
			CCGVert *v1 = _ehash_lookup(ss->vMap, e_vHDL1);

			eNew = _edge_new(eHDL, v0, v1, crease, ss);

			if (e) {
				*prevp = eNew;
				eNew->next = e->next;

				_edge_unlinkMarkAndFree(e, ss);
			}
			else {
				_ehash_insert(ss->eMap, (EHEntry *) eNew);
			}

			eNew->v0->flags |= Vert_eEffected;
			eNew->v1->flags |= Vert_eEffected;
		}
	}
	else {
		if (ss->syncState == eSyncState_Vert) {
			ss->syncState = eSyncState_Edge;
		}
		else if (ss->syncState != eSyncState_Edge) {
			return eCCGError_InvalidSyncState;
		}

		e = _ehash_lookupWithPrev(ss->oldEMap, eHDL, &prevp);
		if (!e || e->v0->vHDL != e_vHDL0 || e->v1->vHDL != e_vHDL1 || e->crease != crease) {
			CCGVert *v0 = _ehash_lookup(ss->vMap, e_vHDL0);
			CCGVert *v1 = _ehash_lookup(ss->vMap, e_vHDL1);
			e = _edge_new(eHDL, v0, v1, crease, ss);
			_ehash_insert(ss->eMap, (EHEntry *) e);
			e->v0->flags |= Vert_eEffected;
			e->v1->flags |= Vert_eEffected;
		}
		else {
			*prevp = e->next;
			_ehash_insert(ss->eMap, (EHEntry *) e);
			e->flags = 0;
			if ((e->v0->flags | e->v1->flags) & Vert_eChanged) {
				e->v0->flags |= Vert_eEffected;
				e->v1->flags |= Vert_eEffected;
			}
		}
	}

	if (e_r) *e_r = e;
	return eCCGError_None;
}

CCGError ccgSubSurf_syncFace(CCGSubSurf *ss, CCGFaceHDL fHDL, int numVerts, CCGVertHDL *vHDLs, CCGFace **f_r)
{
	void **prevp;
	CCGFace *f = NULL, *fNew;
	int j, k, topologyChanged = 0;

	if (numVerts > ss->lenTempArrays) {
		ss->lenTempArrays = (numVerts < ss->lenTempArrays * 2) ? ss->lenTempArrays * 2 : numVerts;
		ss->tempVerts = MEM_reallocN(ss->tempVerts, sizeof(*ss->tempVerts) * ss->lenTempArrays);
		ss->tempEdges = MEM_reallocN(ss->tempEdges, sizeof(*ss->tempEdges) * ss->lenTempArrays);
	}

	if (ss->syncState == eSyncState_Partial) {
		f = _ehash_lookupWithPrev(ss->fMap, fHDL, &prevp);

		for (k = 0; k < numVerts; k++) {
			ss->tempVerts[k] = _ehash_lookup(ss->vMap, vHDLs[k]);
		}
		for (k = 0; k < numVerts; k++) {
			ss->tempEdges[k] = _vert_findEdgeTo(ss->tempVerts[k], ss->tempVerts[(k + 1) % numVerts]);
		}

		if (f) {
			if (f->numVerts != numVerts ||
			    memcmp(FACE_getVerts(f), ss->tempVerts, sizeof(*ss->tempVerts) * numVerts) ||
			    memcmp(FACE_getEdges(f), ss->tempEdges, sizeof(*ss->tempEdges) * numVerts))
			{
				topologyChanged = 1;
			}
		}

		if (!f || topologyChanged) {
			fNew = _face_new(fHDL, ss->tempVerts, ss->tempEdges, numVerts, ss);

			if (f) {
				ss->numGrids += numVerts - f->numVerts;

				*prevp = fNew;
				fNew->next = f->next;

				_face_unlinkMarkAndFree(f, ss);
			}
			else {
				ss->numGrids += numVerts;
				_ehash_insert(ss->fMap, (EHEntry *) fNew);
			}

			for (k = 0; k < numVerts; k++)
				FACE_getVerts(fNew)[k]->flags |= Vert_eEffected;
		}
	}
	else {
		if (ss->syncState == eSyncState_Vert || ss->syncState == eSyncState_Edge) {
			ss->syncState = eSyncState_Face;
		}
		else if (ss->syncState != eSyncState_Face) {
			return eCCGError_InvalidSyncState;
		}

		f = _ehash_lookupWithPrev(ss->oldFMap, fHDL, &prevp);

		for (k = 0; k < numVerts; k++) {
			ss->tempVerts[k] = _ehash_lookup(ss->vMap, vHDLs[k]);

			if (!ss->tempVerts[k])
				return eCCGError_InvalidValue;
		}
		for (k = 0; k < numVerts; k++) {
			ss->tempEdges[k] = _vert_findEdgeTo(ss->tempVerts[k], ss->tempVerts[(k + 1) % numVerts]);

			if (!ss->tempEdges[k]) {
				if (ss->allowEdgeCreation) {
					CCGEdge *e = ss->tempEdges[k] = _edge_new((CCGEdgeHDL) - 1, ss->tempVerts[k], ss->tempVerts[(k + 1) % numVerts], ss->defaultCreaseValue, ss);
					_ehash_insert(ss->eMap, (EHEntry *) e);
					e->v0->flags |= Vert_eEffected;
					e->v1->flags |= Vert_eEffected;
					if (ss->meshIFC.edgeUserSize) {
						memcpy(ccgSubSurf_getEdgeUserData(ss, e), ss->defaultEdgeUserData, ss->meshIFC.edgeUserSize);
					}
				}
				else {
					return eCCGError_InvalidValue;
				}
			}
		}

		if (f) {
			if (f->numVerts != numVerts ||
			    memcmp(FACE_getVerts(f), ss->tempVerts, sizeof(*ss->tempVerts) * numVerts) ||
			    memcmp(FACE_getEdges(f), ss->tempEdges, sizeof(*ss->tempEdges) * numVerts))
			{
				topologyChanged = 1;
			}
		}

		if (!f || topologyChanged) {
			f = _face_new(fHDL, ss->tempVerts, ss->tempEdges, numVerts, ss);
			_ehash_insert(ss->fMap, (EHEntry *) f);
			ss->numGrids += numVerts;

			for (k = 0; k < numVerts; k++)
				FACE_getVerts(f)[k]->flags |= Vert_eEffected;
		}
		else {
			*prevp = f->next;
			_ehash_insert(ss->fMap, (EHEntry *) f);
			f->flags = 0;
			ss->numGrids += f->numVerts;

			for (j = 0; j < f->numVerts; j++) {
				if (FACE_getVerts(f)[j]->flags & Vert_eChanged) {
					for (k = 0; k < f->numVerts; k++)
						FACE_getVerts(f)[k]->flags |= Vert_eEffected;
					break;
				}
			}
		}
	}

	if (f_r) *f_r = f;
	return eCCGError_None;
}

CCGError ccgSubSurf_processSync(CCGSubSurf *ss)
{
	if (ss->syncState == eSyncState_Partial) {
		ss->syncState = eSyncState_None;

		ccgSubSurf__sync(ss);
	}
	else if (ss->syncState) {
		_ehash_free(ss->oldFMap, (EHEntryFreeFP) _face_unlinkMarkAndFree, ss);
		_ehash_free(ss->oldEMap, (EHEntryFreeFP) _edge_unlinkMarkAndFree, ss);
		_ehash_free(ss->oldVMap, (EHEntryFreeFP) _vert_free, ss);
		MEM_freeN(ss->tempEdges);
		MEM_freeN(ss->tempVerts);

		ss->lenTempArrays = 0;

		ss->oldFMap = ss->oldEMap = ss->oldVMap = NULL;
		ss->tempVerts = NULL;
		ss->tempEdges = NULL;

		ss->syncState = eSyncState_None;

		ccgSubSurf__sync(ss);
	}
	else {
		return eCCGError_InvalidSyncState;
	}

	return eCCGError_None;
}

#define VERT_getCo(v, lvl)                  _vert_getCo(v, lvl, vertDataSize)
#define VERT_getNo(e, lvl)                  _vert_getNo(v, lvl, vertDataSize, normalDataOffset)
#define EDGE_getCo(e, lvl, x)               _edge_getCo(e, lvl, x, vertDataSize)
#define EDGE_getNo(e, lvl, x)               _edge_getNo(e, lvl, x, vertDataSize, normalDataOffset)
#define FACE_getIFNo(f, lvl, S, x, y)       _face_getIFNo(f, lvl, S, x, y, subdivLevels, vertDataSize, normalDataOffset)
#define FACE_calcIFNo(f, lvl, S, x, y, no)  _face_calcIFNo(f, lvl, S, x, y, no, subdivLevels, vertDataSize)
#define FACE_getIENo(f, lvl, S, x)          _face_getIENo(f, lvl, S, x, subdivLevels, vertDataSize, normalDataOffset)

static void ccgSubSurf__calcVertNormals(CCGSubSurf *ss,
                                        CCGVert **effectedV, CCGEdge **effectedE, CCGFace **effectedF,
                                        int numEffectedV, int numEffectedE, int numEffectedF)
{
	int i, ptrIdx;
	int subdivLevels = ss->subdivLevels;
	int lvl = ss->subdivLevels;
	int edgeSize = ccg_edgesize(lvl);
	int gridSize = ccg_gridsize(lvl);
	int normalDataOffset = ss->normalDataOffset;
	int vertDataSize = ss->meshIFC.vertDataSize;

#pragma omp parallel for private(ptrIdx) if (numEffectedF * edgeSize * edgeSize * 4 >= CCG_OMP_LIMIT)
	for (ptrIdx = 0; ptrIdx < numEffectedF; ptrIdx++) {
		CCGFace *f = (CCGFace *) effectedF[ptrIdx];
		int S, x, y;
		float no[3];

		for (S = 0; S < f->numVerts; S++) {
			for (y = 0; y < gridSize - 1; y++) {
				for (x = 0; x < gridSize - 1; x++) {
					NormZero(FACE_getIFNo(f, lvl, S, x, y));
				}
			}

			if (FACE_getEdges(f)[(S - 1 + f->numVerts) % f->numVerts]->flags & Edge_eEffected) {
				for (x = 0; x < gridSize - 1; x++) {
					NormZero(FACE_getIFNo(f, lvl, S, x, gridSize - 1));
				}
			}
			if (FACE_getEdges(f)[S]->flags & Edge_eEffected) {
				for (y = 0; y < gridSize - 1; y++) {
					NormZero(FACE_getIFNo(f, lvl, S, gridSize - 1, y));
				}
			}
			if (FACE_getVerts(f)[S]->flags & Vert_eEffected) {
				NormZero(FACE_getIFNo(f, lvl, S, gridSize - 1, gridSize - 1));
			}
		}

		for (S = 0; S < f->numVerts; S++) {
			int yLimit = !(FACE_getEdges(f)[(S - 1 + f->numVerts) % f->numVerts]->flags & Edge_eEffected);
			int xLimit = !(FACE_getEdges(f)[S]->flags & Edge_eEffected);
			int yLimitNext = xLimit;
			int xLimitPrev = yLimit;
			
			for (y = 0; y < gridSize - 1; y++) {
				for (x = 0; x < gridSize - 1; x++) {
					int xPlusOk = (!xLimit || x < gridSize - 2);
					int yPlusOk = (!yLimit || y < gridSize - 2);

					FACE_calcIFNo(f, lvl, S, x, y, no);

					NormAdd(FACE_getIFNo(f, lvl, S, x + 0, y + 0), no);
					if (xPlusOk)
						NormAdd(FACE_getIFNo(f, lvl, S, x + 1, y + 0), no);
					if (yPlusOk)
						NormAdd(FACE_getIFNo(f, lvl, S, x + 0, y + 1), no);
					if (xPlusOk && yPlusOk) {
						if (x < gridSize - 2 || y < gridSize - 2 || FACE_getVerts(f)[S]->flags & Vert_eEffected) {
							NormAdd(FACE_getIFNo(f, lvl, S, x + 1, y + 1), no);
						}
					}

					if (x == 0 && y == 0) {
						int K;

						if (!yLimitNext || 1 < gridSize - 1)
							NormAdd(FACE_getIFNo(f, lvl, (S + 1) % f->numVerts, 0, 1), no);
						if (!xLimitPrev || 1 < gridSize - 1)
							NormAdd(FACE_getIFNo(f, lvl, (S - 1 + f->numVerts) % f->numVerts, 1, 0), no);

						for (K = 0; K < f->numVerts; K++) {
							if (K != S) {
								NormAdd(FACE_getIFNo(f, lvl, K, 0, 0), no);
							}
						}
					}
					else if (y == 0) {
						NormAdd(FACE_getIFNo(f, lvl, (S + 1) % f->numVerts, 0, x), no);
						if (!yLimitNext || x < gridSize - 2)
							NormAdd(FACE_getIFNo(f, lvl, (S + 1) % f->numVerts, 0, x + 1), no);
					}
					else if (x == 0) {
						NormAdd(FACE_getIFNo(f, lvl, (S - 1 + f->numVerts) % f->numVerts, y, 0), no);
						if (!xLimitPrev || y < gridSize - 2)
							NormAdd(FACE_getIFNo(f, lvl, (S - 1 + f->numVerts) % f->numVerts, y + 1, 0), no);
					}
				}
			}
		}
	}
	/* XXX can I reduce the number of normalisations here? */
	for (ptrIdx = 0; ptrIdx < numEffectedV; ptrIdx++) {
		CCGVert *v = (CCGVert *) effectedV[ptrIdx];
		float *no = VERT_getNo(v, lvl);

		NormZero(no);

		for (i = 0; i < v->numFaces; i++) {
			CCGFace *f = v->faces[i];
			NormAdd(no, FACE_getIFNo(f, lvl, _face_getVertIndex(f, v), gridSize - 1, gridSize - 1));
		}

		if (UNLIKELY(v->numFaces == 0)) {
			NormCopy(no, VERT_getCo(v, lvl));
		}

		Normalize(no);

		for (i = 0; i < v->numFaces; i++) {
			CCGFace *f = v->faces[i];
			NormCopy(FACE_getIFNo(f, lvl, _face_getVertIndex(f, v), gridSize - 1, gridSize - 1), no);
		}
	}
	for (ptrIdx = 0; ptrIdx < numEffectedE; ptrIdx++) {
		CCGEdge *e = (CCGEdge *) effectedE[ptrIdx];

		if (e->numFaces) {
			CCGFace *fLast = e->faces[e->numFaces - 1];
			int x;

			for (i = 0; i < e->numFaces - 1; i++) {
				CCGFace *f = e->faces[i];
				const int f_ed_idx = _face_getEdgeIndex(f, e);
				const int f_ed_idx_last = _face_getEdgeIndex(fLast, e);

				for (x = 1; x < edgeSize - 1; x++) {
					NormAdd(_face_getIFNoEdge(fLast, e, f_ed_idx_last, lvl, x, 0, subdivLevels, vertDataSize, normalDataOffset),
					        _face_getIFNoEdge(f, e, f_ed_idx, lvl, x, 0, subdivLevels, vertDataSize, normalDataOffset));
				}
			}

			for (i = 0; i < e->numFaces - 1; i++) {
				CCGFace *f = e->faces[i];
				const int f_ed_idx = _face_getEdgeIndex(f, e);
				const int f_ed_idx_last = _face_getEdgeIndex(fLast, e);

				for (x = 1; x < edgeSize - 1; x++) {
					NormCopy(_face_getIFNoEdge(f, e, f_ed_idx, lvl, x, 0, subdivLevels, vertDataSize, normalDataOffset),
					         _face_getIFNoEdge(fLast, e, f_ed_idx_last, lvl, x, 0, subdivLevels, vertDataSize, normalDataOffset));
				}
			}
		}
	}

#pragma omp parallel for private(ptrIdx) if (numEffectedF * edgeSize * edgeSize * 4 >= CCG_OMP_LIMIT)
	for (ptrIdx = 0; ptrIdx < numEffectedF; ptrIdx++) {
		CCGFace *f = (CCGFace *) effectedF[ptrIdx];
		int S, x, y;

		for (S = 0; S < f->numVerts; S++) {
			NormCopy(FACE_getIFNo(f, lvl, (S + 1) % f->numVerts, 0, gridSize - 1),
			         FACE_getIFNo(f, lvl, S, gridSize - 1, 0));
		}

		for (S = 0; S < f->numVerts; S++) {
			for (y = 0; y < gridSize; y++) {
				for (x = 0; x < gridSize; x++) {
					float *no = FACE_getIFNo(f, lvl, S, x, y);
					Normalize(no);
				}
			}

			VertDataCopy((float *)((byte *)FACE_getCenterData(f) + normalDataOffset),
			             FACE_getIFNo(f, lvl, S, 0, 0), ss);

			for (x = 1; x < gridSize - 1; x++)
				NormCopy(FACE_getIENo(f, lvl, S, x),
				         FACE_getIFNo(f, lvl, S, x, 0));
		}
	}

	for (ptrIdx = 0; ptrIdx < numEffectedE; ptrIdx++) {
		CCGEdge *e = (CCGEdge *) effectedE[ptrIdx];

		if (e->numFaces) {
			CCGFace *f = e->faces[0];
			int x;
			const int f_ed_idx = _face_getEdgeIndex(f, e);

			for (x = 0; x < edgeSize; x++)
				NormCopy(EDGE_getNo(e, lvl, x),
				         _face_getIFNoEdge(f, e, f_ed_idx, lvl, x, 0, subdivLevels, vertDataSize, normalDataOffset));
		}
		else {
			/* set to zero here otherwise the normals are uninitialized memory
			 * render: tests/animation/knight.blend with valgrind.
			 * we could be more clever and interpolate vertex normals but these are
			 * most likely not used so just zero out. */
			int x;

			for (x = 0; x < edgeSize; x++) {
				float *no = EDGE_getNo(e, lvl, x);
				NormCopy(no, EDGE_getCo(e, lvl, x));
				Normalize(no);
			}
		}
	}
}
#undef FACE_getIFNo

#define FACE_getIECo(f, lvl, S, x)      _face_getIECo(f, lvl, S, x, subdivLevels, vertDataSize)
#define FACE_getIFCo(f, lvl, S, x, y)   _face_getIFCo(f, lvl, S, x, y, subdivLevels, vertDataSize)

static void ccgSubSurf__calcSubdivLevel(CCGSubSurf *ss,
                                        CCGVert **effectedV, CCGEdge **effectedE, CCGFace **effectedF,
                                        int numEffectedV, int numEffectedE, int numEffectedF, int curLvl)
{
	int subdivLevels = ss->subdivLevels;
	int edgeSize = ccg_edgesize(curLvl);
	int gridSize = ccg_gridsize(curLvl);
	int nextLvl = curLvl + 1;
	int ptrIdx, cornerIdx, i;
	int vertDataSize = ss->meshIFC.vertDataSize;
	float *q = ss->q, *r = ss->r;

#pragma omp parallel for private(ptrIdx) if (numEffectedF * edgeSize * edgeSize * 4 >= CCG_OMP_LIMIT)
	for (ptrIdx = 0; ptrIdx < numEffectedF; ptrIdx++) {
		CCGFace *f = (CCGFace *) effectedF[ptrIdx];
		int S, x, y;

		/* interior face midpoints
		 * - old interior face points
		 */
		for (S = 0; S < f->numVerts; S++) {
			for (y = 0; y < gridSize - 1; y++) {
				for (x = 0; x < gridSize - 1; x++) {
					int fx = 1 + 2 * x;
					int fy = 1 + 2 * y;
					const float *co0 = FACE_getIFCo(f, curLvl, S, x + 0, y + 0);
					const float *co1 = FACE_getIFCo(f, curLvl, S, x + 1, y + 0);
					const float *co2 = FACE_getIFCo(f, curLvl, S, x + 1, y + 1);
					const float *co3 = FACE_getIFCo(f, curLvl, S, x + 0, y + 1);
					float *co = FACE_getIFCo(f, nextLvl, S, fx, fy);

					VertDataAvg4(co, co0, co1, co2, co3, ss);
				}
			}
		}

		/* interior edge midpoints
		 * - old interior edge points
		 * - new interior face midpoints
		 */
		for (S = 0; S < f->numVerts; S++) {
			for (x = 0; x < gridSize - 1; x++) {
				int fx = x * 2 + 1;
				const float *co0 = FACE_getIECo(f, curLvl, S, x + 0);
				const float *co1 = FACE_getIECo(f, curLvl, S, x + 1);
				const float *co2 = FACE_getIFCo(f, nextLvl, (S + 1) % f->numVerts, 1, fx);
				const float *co3 = FACE_getIFCo(f, nextLvl, S, fx, 1);
				float *co  = FACE_getIECo(f, nextLvl, S, fx);
				
				VertDataAvg4(co, co0, co1, co2, co3, ss);
			}

			/* interior face interior edge midpoints
			 * - old interior face points
			 * - new interior face midpoints
			 */

			/* vertical */
			for (x = 1; x < gridSize - 1; x++) {
				for (y = 0; y < gridSize - 1; y++) {
					int fx = x * 2;
					int fy = y * 2 + 1;
					const float *co0 = FACE_getIFCo(f, curLvl, S, x, y + 0);
					const float *co1 = FACE_getIFCo(f, curLvl, S, x, y + 1);
					const float *co2 = FACE_getIFCo(f, nextLvl, S, fx - 1, fy);
					const float *co3 = FACE_getIFCo(f, nextLvl, S, fx + 1, fy);
					float *co  = FACE_getIFCo(f, nextLvl, S, fx, fy);

					VertDataAvg4(co, co0, co1, co2, co3, ss);
				}
			}

			/* horizontal */
			for (y = 1; y < gridSize - 1; y++) {
				for (x = 0; x < gridSize - 1; x++) {
					int fx = x * 2 + 1;
					int fy = y * 2;
					const float *co0 = FACE_getIFCo(f, curLvl, S, x + 0, y);
					const float *co1 = FACE_getIFCo(f, curLvl, S, x + 1, y);
					const float *co2 = FACE_getIFCo(f, nextLvl, S, fx, fy - 1);
					const float *co3 = FACE_getIFCo(f, nextLvl, S, fx, fy + 1);
					float *co  = FACE_getIFCo(f, nextLvl, S, fx, fy);

					VertDataAvg4(co, co0, co1, co2, co3, ss);
				}
			}
		}
	}

	/* exterior edge midpoints
	 * - old exterior edge points
	 * - new interior face midpoints
	 */
	for (ptrIdx = 0; ptrIdx < numEffectedE; ptrIdx++) {
		CCGEdge *e = (CCGEdge *) effectedE[ptrIdx];
		float sharpness = EDGE_getSharpness(e, curLvl);
		int x, j;

		if (_edge_isBoundary(e) || sharpness > 1.0f) {
			for (x = 0; x < edgeSize - 1; x++) {
				int fx = x * 2 + 1;
				const float *co0 = EDGE_getCo(e, curLvl, x + 0);
				const float *co1 = EDGE_getCo(e, curLvl, x + 1);
				float *co  = EDGE_getCo(e, nextLvl, fx);

				VertDataCopy(co, co0, ss);
				VertDataAdd(co, co1, ss);
				VertDataMulN(co, 0.5f, ss);
			}
		}
		else {
			for (x = 0; x < edgeSize - 1; x++) {
				int fx = x * 2 + 1;
				const float *co0 = EDGE_getCo(e, curLvl, x + 0);
				const float *co1 = EDGE_getCo(e, curLvl, x + 1);
				float *co  = EDGE_getCo(e, nextLvl, fx);
				int numFaces = 0;

				VertDataCopy(q, co0, ss);
				VertDataAdd(q, co1, ss);

				for (j = 0; j < e->numFaces; j++) {
					CCGFace *f = e->faces[j];
					const int f_ed_idx = _face_getEdgeIndex(f, e);
					VertDataAdd(q, _face_getIFCoEdge(f, e, f_ed_idx, nextLvl, fx, 1, subdivLevels, vertDataSize), ss);
					numFaces++;
				}

				VertDataMulN(q, 1.0f / (2.0f + numFaces), ss);

				VertDataCopy(r, co0, ss);
				VertDataAdd(r, co1, ss);
				VertDataMulN(r, 0.5f, ss);

				VertDataCopy(co, q, ss);
				VertDataSub(r, q, ss);
				VertDataMulN(r, sharpness, ss);
				VertDataAdd(co, r, ss);
			}
		}
	}

	/* exterior vertex shift
	 * - old vertex points (shifting)
	 * - old exterior edge points
	 * - new interior face midpoints
	 */
	for (ptrIdx = 0; ptrIdx < numEffectedV; ptrIdx++) {
		CCGVert *v = (CCGVert *) effectedV[ptrIdx];
		const float *co = VERT_getCo(v, curLvl);
		float *nCo = VERT_getCo(v, nextLvl);
		int sharpCount = 0, allSharp = 1;
		float avgSharpness = 0.0;
		int j, seam = VERT_seam(v), seamEdges = 0;

		for (j = 0; j < v->numEdges; j++) {
			CCGEdge *e = v->edges[j];
			float sharpness = EDGE_getSharpness(e, curLvl);

			if (seam && _edge_isBoundary(e))
				seamEdges++;

			if (sharpness != 0.0f) {
				sharpCount++;
				avgSharpness += sharpness;
			}
			else {
				allSharp = 0;
			}
		}

		if (sharpCount) {
			avgSharpness /= sharpCount;
			if (avgSharpness > 1.0f) {
				avgSharpness = 1.0f;
			}
		}

		if (seamEdges < 2 || seamEdges != v->numEdges)
			seam = 0;

		if (!v->numEdges || ss->meshIFC.simpleSubdiv) {
			VertDataCopy(nCo, co, ss);
		}
		else if (_vert_isBoundary(v)) {
			int numBoundary = 0;

			VertDataZero(r, ss);
			for (j = 0; j < v->numEdges; j++) {
				CCGEdge *e = v->edges[j];
				if (_edge_isBoundary(e)) {
					VertDataAdd(r, _edge_getCoVert(e, v, curLvl, 1, vertDataSize), ss);
					numBoundary++;
				}
			}

			VertDataCopy(nCo, co, ss);
			VertDataMulN(nCo, 0.75f, ss);
			VertDataMulN(r, 0.25f / numBoundary, ss);
			VertDataAdd(nCo, r, ss);
		}
		else {
			int cornerIdx = (1 + (1 << (curLvl))) - 2;
			int numEdges = 0, numFaces = 0;

			VertDataZero(q, ss);
			for (j = 0; j < v->numFaces; j++) {
				CCGFace *f = v->faces[j];
				VertDataAdd(q, FACE_getIFCo(f, nextLvl, _face_getVertIndex(f, v), cornerIdx, cornerIdx), ss);
				numFaces++;
			}
			VertDataMulN(q, 1.0f / numFaces, ss);
			VertDataZero(r, ss);
			for (j = 0; j < v->numEdges; j++) {
				CCGEdge *e = v->edges[j];
				VertDataAdd(r, _edge_getCoVert(e, v, curLvl, 1, vertDataSize), ss);
				numEdges++;
			}
			VertDataMulN(r, 1.0f / numEdges, ss);

			VertDataCopy(nCo, co, ss);
			VertDataMulN(nCo, numEdges - 2.0f, ss);
			VertDataAdd(nCo, q, ss);
			VertDataAdd(nCo, r, ss);
			VertDataMulN(nCo, 1.0f / numEdges, ss);
		}

		if ((sharpCount > 1 && v->numFaces) || seam) {
			VertDataZero(q, ss);

			if (seam) {
				avgSharpness = 1.0f;
				sharpCount = seamEdges;
				allSharp = 1;
			}

			for (j = 0; j < v->numEdges; j++) {
				CCGEdge *e = v->edges[j];
				float sharpness = EDGE_getSharpness(e, curLvl);

				if (seam) {
					if (_edge_isBoundary(e))
						VertDataAdd(q, _edge_getCoVert(e, v, curLvl, 1, vertDataSize), ss);
				}
				else if (sharpness != 0.0f) {
					VertDataAdd(q, _edge_getCoVert(e, v, curLvl, 1, vertDataSize), ss);
				}
			}

			VertDataMulN(q, (float) 1 / sharpCount, ss);

			if (sharpCount != 2 || allSharp) {
				/* q = q + (co - q) * avgSharpness */
				VertDataCopy(r, co, ss);
				VertDataSub(r, q, ss);
				VertDataMulN(r, avgSharpness, ss);
				VertDataAdd(q, r, ss);
			}

			/* r = co * 0.75 + q * 0.25 */
			VertDataCopy(r, co, ss);
			VertDataMulN(r, 0.75f, ss);
			VertDataMulN(q, 0.25f, ss);
			VertDataAdd(r, q, ss);

			/* nCo = nCo + (r - nCo) * avgSharpness */
			VertDataSub(r, nCo, ss);
			VertDataMulN(r, avgSharpness, ss);
			VertDataAdd(nCo, r, ss);
		}
	}

	/* exterior edge interior shift
	 * - old exterior edge midpoints (shifting)
	 * - old exterior edge midpoints
	 * - new interior face midpoints
	 */
	for (ptrIdx = 0; ptrIdx < numEffectedE; ptrIdx++) {
		CCGEdge *e = (CCGEdge *) effectedE[ptrIdx];
		float sharpness = EDGE_getSharpness(e, curLvl);
		int sharpCount = 0;
		float avgSharpness = 0.0;
		int x, j;

		if (sharpness != 0.0f) {
			sharpCount = 2;
			avgSharpness += sharpness;

			if (avgSharpness > 1.0f) {
				avgSharpness = 1.0f;
			}
		}
		else {
			sharpCount = 0;
			avgSharpness = 0;
		}

		if (_edge_isBoundary(e)) {
			for (x = 1; x < edgeSize - 1; x++) {
				int fx = x * 2;
				const float *co = EDGE_getCo(e, curLvl, x);
				float *nCo = EDGE_getCo(e, nextLvl, fx);

				/* Average previous level's endpoints */
				VertDataCopy(r, EDGE_getCo(e, curLvl, x - 1), ss);
				VertDataAdd(r, EDGE_getCo(e, curLvl, x + 1), ss);
				VertDataMulN(r, 0.5f, ss);

				/* nCo = nCo * 0.75 + r * 0.25 */
				VertDataCopy(nCo, co, ss);
				VertDataMulN(nCo, 0.75f, ss);
				VertDataMulN(r, 0.25f, ss);
				VertDataAdd(nCo, r, ss);
			}
		}
		else {
			for (x = 1; x < edgeSize - 1; x++) {
				int fx = x * 2;
				const float *co = EDGE_getCo(e, curLvl, x);
				float *nCo = EDGE_getCo(e, nextLvl, fx);
				int numFaces = 0;

				VertDataZero(q, ss);
				VertDataZero(r, ss);
				VertDataAdd(r, EDGE_getCo(e, curLvl, x - 1), ss);
				VertDataAdd(r, EDGE_getCo(e, curLvl, x + 1), ss);
				for (j = 0; j < e->numFaces; j++) {
					CCGFace *f = e->faces[j];
					int f_ed_idx = _face_getEdgeIndex(f, e);
					VertDataAdd(q, _face_getIFCoEdge(f, e, f_ed_idx, nextLvl, fx - 1, 1, subdivLevels, vertDataSize), ss);
					VertDataAdd(q, _face_getIFCoEdge(f, e, f_ed_idx, nextLvl, fx + 1, 1, subdivLevels, vertDataSize), ss);

					VertDataAdd(r, _face_getIFCoEdge(f, e, f_ed_idx, curLvl, x, 1, subdivLevels, vertDataSize), ss);
					numFaces++;
				}
				VertDataMulN(q, 1.0f / (numFaces * 2.0f), ss);
				VertDataMulN(r, 1.0f / (2.0f + numFaces), ss);

				VertDataCopy(nCo, co, ss);
				VertDataMulN(nCo, (float) numFaces, ss);
				VertDataAdd(nCo, q, ss);
				VertDataAdd(nCo, r, ss);
				VertDataMulN(nCo, 1.0f / (2 + numFaces), ss);

				if (sharpCount == 2) {
					VertDataCopy(q, co, ss);
					VertDataMulN(q, 6.0f, ss);
					VertDataAdd(q, EDGE_getCo(e, curLvl, x - 1), ss);
					VertDataAdd(q, EDGE_getCo(e, curLvl, x + 1), ss);
					VertDataMulN(q, 1 / 8.0f, ss);

					VertDataSub(q, nCo, ss);
					VertDataMulN(q, avgSharpness, ss);
					VertDataAdd(nCo, q, ss);
				}
			}
		}
	}

#pragma omp parallel private(ptrIdx) if (numEffectedF * edgeSize * edgeSize * 4 >= CCG_OMP_LIMIT)
	{
		float *q, *r;

#pragma omp critical
		{
			q = MEM_mallocN(ss->meshIFC.vertDataSize, "CCGSubsurf q");
			r = MEM_mallocN(ss->meshIFC.vertDataSize, "CCGSubsurf r");
		}

#pragma omp for schedule(static)
		for (ptrIdx = 0; ptrIdx < numEffectedF; ptrIdx++) {
			CCGFace *f = (CCGFace *) effectedF[ptrIdx];
			int S, x, y;

			/* interior center point shift
			 * - old face center point (shifting)
			 * - old interior edge points
			 * - new interior face midpoints
			 */
			VertDataZero(q, ss);
			for (S = 0; S < f->numVerts; S++) {
				VertDataAdd(q, FACE_getIFCo(f, nextLvl, S, 1, 1), ss);
			}
			VertDataMulN(q, 1.0f / f->numVerts, ss);
			VertDataZero(r, ss);
			for (S = 0; S < f->numVerts; S++) {
				VertDataAdd(r, FACE_getIECo(f, curLvl, S, 1), ss);
			}
			VertDataMulN(r, 1.0f / f->numVerts, ss);

			VertDataMulN((float *)FACE_getCenterData(f), f->numVerts - 2.0f, ss);
			VertDataAdd((float *)FACE_getCenterData(f), q, ss);
			VertDataAdd((float *)FACE_getCenterData(f), r, ss);
			VertDataMulN((float *)FACE_getCenterData(f), 1.0f / f->numVerts, ss);

			for (S = 0; S < f->numVerts; S++) {
				/* interior face shift
				 * - old interior face point (shifting)
				 * - new interior edge midpoints
				 * - new interior face midpoints
				 */
				for (x = 1; x < gridSize - 1; x++) {
					for (y = 1; y < gridSize - 1; y++) {
						int fx = x * 2;
						int fy = y * 2;
						const float *co = FACE_getIFCo(f, curLvl, S, x, y);
						float *nCo = FACE_getIFCo(f, nextLvl, S, fx, fy);
						
						VertDataAvg4(q,
						             FACE_getIFCo(f, nextLvl, S, fx - 1, fy - 1),
						             FACE_getIFCo(f, nextLvl, S, fx + 1, fy - 1),
						             FACE_getIFCo(f, nextLvl, S, fx + 1, fy + 1),
						             FACE_getIFCo(f, nextLvl, S, fx - 1, fy + 1),
						             ss);

						VertDataAvg4(r,
						             FACE_getIFCo(f, nextLvl, S, fx - 1, fy + 0),
						             FACE_getIFCo(f, nextLvl, S, fx + 1, fy + 0),
						             FACE_getIFCo(f, nextLvl, S, fx + 0, fy - 1),
						             FACE_getIFCo(f, nextLvl, S, fx + 0, fy + 1),
						             ss);

						VertDataCopy(nCo, co, ss);
						VertDataSub(nCo, q, ss);
						VertDataMulN(nCo, 0.25f, ss);
						VertDataAdd(nCo, r, ss);
					}
				}

				/* interior edge interior shift
				 * - old interior edge point (shifting)
				 * - new interior edge midpoints
				 * - new interior face midpoints
				 */
				for (x = 1; x < gridSize - 1; x++) {
					int fx = x * 2;
					const float *co = FACE_getIECo(f, curLvl, S, x);
					float *nCo = FACE_getIECo(f, nextLvl, S, fx);
					
					VertDataAvg4(q,
					             FACE_getIFCo(f, nextLvl, (S + 1) % f->numVerts, 1, fx - 1),
					             FACE_getIFCo(f, nextLvl, (S + 1) % f->numVerts, 1, fx + 1),
					             FACE_getIFCo(f, nextLvl, S, fx + 1, +1),
					             FACE_getIFCo(f, nextLvl, S, fx - 1, +1), ss);

					VertDataAvg4(r,
					             FACE_getIECo(f, nextLvl, S, fx - 1),
					             FACE_getIECo(f, nextLvl, S, fx + 1),
					             FACE_getIFCo(f, nextLvl, (S + 1) % f->numVerts, 1, fx),
					             FACE_getIFCo(f, nextLvl, S, fx, 1),
					             ss);

					VertDataCopy(nCo, co, ss);
					VertDataSub(nCo, q, ss);
					VertDataMulN(nCo, 0.25f, ss);
					VertDataAdd(nCo, r, ss);
				}
			}
		}

#pragma omp critical
		{
			MEM_freeN(q);
			MEM_freeN(r);
		}
	}

	/* copy down */
	edgeSize = ccg_edgesize(nextLvl);
	gridSize = ccg_gridsize(nextLvl);
	cornerIdx = gridSize - 1;

#pragma omp parallel for private(i) if (numEffectedF * edgeSize * edgeSize * 4 >= CCG_OMP_LIMIT)
	for (i = 0; i < numEffectedE; i++) {
		CCGEdge *e = effectedE[i];
		VertDataCopy(EDGE_getCo(e, nextLvl, 0), VERT_getCo(e->v0, nextLvl), ss);
		VertDataCopy(EDGE_getCo(e, nextLvl, edgeSize - 1), VERT_getCo(e->v1, nextLvl), ss);
	}

#pragma omp parallel for private(i) if (numEffectedF * edgeSize * edgeSize * 4 >= CCG_OMP_LIMIT)
	for (i = 0; i < numEffectedF; i++) {
		CCGFace *f = effectedF[i];
		int S, x;

		for (S = 0; S < f->numVerts; S++) {
			CCGEdge *e = FACE_getEdges(f)[S];
			CCGEdge *prevE = FACE_getEdges(f)[(S + f->numVerts - 1) % f->numVerts];

			VertDataCopy(FACE_getIFCo(f, nextLvl, S, 0, 0), (float *)FACE_getCenterData(f), ss);
			VertDataCopy(FACE_getIECo(f, nextLvl, S, 0), (float *)FACE_getCenterData(f), ss);
			VertDataCopy(FACE_getIFCo(f, nextLvl, S, cornerIdx, cornerIdx), VERT_getCo(FACE_getVerts(f)[S], nextLvl), ss);
			VertDataCopy(FACE_getIECo(f, nextLvl, S, cornerIdx), EDGE_getCo(FACE_getEdges(f)[S], nextLvl, cornerIdx), ss);
			for (x = 1; x < gridSize - 1; x++) {
				float *co = FACE_getIECo(f, nextLvl, S, x);
				VertDataCopy(FACE_getIFCo(f, nextLvl, S, x, 0), co, ss);
				VertDataCopy(FACE_getIFCo(f, nextLvl, (S + 1) % f->numVerts, 0, x), co, ss);
			}
			for (x = 0; x < gridSize - 1; x++) {
				int eI = gridSize - 1 - x;
				VertDataCopy(FACE_getIFCo(f, nextLvl, S, cornerIdx, x), _edge_getCoVert(e, FACE_getVerts(f)[S], nextLvl, eI, vertDataSize), ss);
				VertDataCopy(FACE_getIFCo(f, nextLvl, S, x, cornerIdx), _edge_getCoVert(prevE, FACE_getVerts(f)[S], nextLvl, eI, vertDataSize), ss);
			}
		}
	}
}


static void interp0(float a[3], float P[3], float c[3], float res[3]) {
	float ac[3], aP[3], sagitta[3];
	float projection, halfchord_sq, aP_sq,cos_sq, x;

	sub(ac, c, a);
	sub(aP, P, a);
	projection = dot(aP, ac)/dot(ac,ac); 
	scale(ac, projection);
	sub(sagitta, aP, ac);
	halfchord_sq = dot(ac,ac);
	aP_sq = dot(aP, aP); // hypotenuse
	cos_sq = halfchord_sq/aP_sq;
	cos_sq = sqrt(cos_sq);
	x = 0.5 + cos_sq/4;
	scale(sagitta, x);
	x = cos_sq/2;
	scale(ac, x);
	add(a, a, ac);
	add(res, a, sagitta);
}

static void set_midpoint(CCGEdge *e, float res[3], float e_co[3], float *en_Cast){
	if (e->flags & Edge_mytrigger){
		add(res, res, e_co);
		scale(res, 0.5);
	}
	else {
		e->flags |= Edge_mytrigger;
	}
	if (!(e->flags & Edge_excluded)){
		en_Cast[0] = res[0];
		en_Cast[1] = res[1];
		en_Cast[2] = res[2];
	}
}


static void ccgSubSurf__sync(CCGSubSurf *ss)
{
	CCGVert **effectedV;
	CCGEdge **effectedE;
	CCGFace **effectedF;
	int numEffectedV, numEffectedE, numEffectedF;
	int subdivLevels = ss->subdivLevels;
	int vertDataSize = ss->meshIFC.vertDataSize;
	int i, j, ptrIdx, S;
	int curLvl, nextLvl;
	void *q = ss->q, *r = ss->r;

	effectedV = MEM_mallocN(sizeof(*effectedV) * ss->vMap->numEntries, "CCGSubsurf effectedV");
	effectedE = MEM_mallocN(sizeof(*effectedE) * ss->eMap->numEntries, "CCGSubsurf effectedE");
	effectedF = MEM_mallocN(sizeof(*effectedF) * ss->fMap->numEntries, "CCGSubsurf effectedF");
	numEffectedV = numEffectedE = numEffectedF = 0;

/*  
	for (i = 0; i < ss->vMap->curSize; i++) {
		CCGVert *v = (CCGVert *) ss->vMap->buckets[i];
		for (; v; v = v->next) {
			if ((v->flags & Vert_eEffected) && !(v->flags & Vert_mytrigger)) {
				//effectedV[numEffectedV++] = v;
				for (j = 0; j < v->numEdges; j++) {
					CCGEdge *e = v->edges[j];
					CCGVert *v0 = e->v0;
					CCGVert *v1 = e->v1;

					if (!(v0->flags & Vert_eEffected)) {
						v0->flags |= Vert_mytrigger;
						v0->flags |= Vert_eEffected;
					}
					if (!(v1->flags & Vert_eEffected)) {
						v1->flags |= Vert_mytrigger;
						v1->flags |= Vert_eEffected;
					}
				}
			}
		}
	}
*/

	for (i = 0; i < ss->vMap->curSize; i++) {
		CCGVert *v = (CCGVert *) ss->vMap->buckets[i];
		for (; v; v = v->next) {
			if (1){
//			if (v->flags & Vert_eEffected) {
				effectedV[numEffectedV++] = v;

				for (j = 0; j < v->numEdges; j++) {
					CCGEdge *e = v->edges[j];
					if (!(e->flags & Edge_eEffected)) {
						effectedE[numEffectedE++] = e;
						e->flags |= Edge_eEffected;
					}
				}

				for (j = 0; j < v->numFaces; j++) {
					CCGFace *f = v->faces[j];
					if (!(f->flags & Face_eEffected)) {
						effectedF[numEffectedF++] = f;
						f->flags |= Face_eEffected;
					}
				}
			}
		}
	}

	curLvl = 0;
	nextLvl = curLvl + 1;

	// calculating faces midpoints. Original SDS
	for (ptrIdx = 0; ptrIdx < numEffectedF; ptrIdx++) {
		CCGFace *f = effectedF[ptrIdx];
		void *co = FACE_getCenterData(f);
		VertDataZero(co, ss);
		for (i = 0; i < f->numVerts; i++) {
			VertDataAdd(co, VERT_getCo(FACE_getVerts(f)[i], curLvl), ss);
		}
		VertDataMulN(co, 1.0f / f->numVerts, ss);

		f->flags = 0;
	}

	//calculating edges midpoints. Original SDS
	for (ptrIdx = 0; ptrIdx < numEffectedE; ptrIdx++) {

		CCGEdge *e = effectedE[ptrIdx];

		void *co = EDGE_getCo(e, nextLvl, 1);

		//void *co_nexter = EDGE_getCo(e, nextLvl, 0);

		float sharpness = EDGE_getSharpness(e, curLvl);



		if (_edge_isBoundary(e) || sharpness >= 1.0f) {
			VertDataCopy(co, VERT_getCo(e->v0, curLvl), ss);
			VertDataAdd(co, VERT_getCo(e->v1, curLvl), ss);
			VertDataMulN(co, 0.5f, ss);
		}
		else {
			int numFaces = 0;
			VertDataCopy(q, VERT_getCo(e->v0, curLvl), ss);
			VertDataAdd(q, VERT_getCo(e->v1, curLvl), ss);
			for (i = 0; i < e->numFaces; i++) {
				CCGFace *f = e->faces[i];
				VertDataAdd(q, (float *)FACE_getCenterData(f), ss);
				numFaces++;
			}
			VertDataMulN(q, 1.0f / (2.0f + numFaces), ss);

			VertDataCopy(r, VERT_getCo(e->v0, curLvl), ss);
			VertDataAdd(r, VERT_getCo(e->v1, curLvl), ss);
			VertDataMulN(r, 0.5f, ss);

			VertDataCopy(co, q, ss);
			VertDataSub(r, q, ss);
			VertDataMulN(r, sharpness, ss);
			VertDataAdd(co, r, ss);
		}

		//VertDataCopy(co_nexter, co, ss);



		/* edge flags cleared later */
	}

	//calculating new vertices positions. Original SDS
	for (ptrIdx = 0; ptrIdx < numEffectedV; ptrIdx++) {
		CCGVert *v = effectedV[ptrIdx];
		float a[3], b[3], c[3];
		void *co = VERT_getCo(v, curLvl);
		void *nCo = VERT_getCo(v, nextLvl);
		float* nCoCast = (float*)nCo;
		// lets try to save nCo, then if nCOpreserved == nCo at the end -> reassign
		int sharpCount = 0, allSharp = 1;
		float avgSharpness = 0.0;
		int seam = VERT_seam(v), seamEdges = 0;
		to_vector(nCo, a);

		for (i = 0; i < v->numEdges; i++) {
			CCGEdge *e = v->edges[i];
			float sharpness = EDGE_getSharpness(e, curLvl);

			if (seam && _edge_isBoundary(e))
				seamEdges++;

			if (sharpness != 0.0f) {
				sharpCount++;
				avgSharpness += sharpness;
			}
			else {
				allSharp = 0;
			}
		}

		if (sharpCount) {
			avgSharpness /= sharpCount;
			if (avgSharpness > 1.0f) {
				avgSharpness = 1.0f;
			}
		}

		if (seamEdges < 2 || seamEdges != v->numEdges)
			seam = 0;

		if (!v->numEdges || ss->meshIFC.simpleSubdiv) {
			VertDataCopy(nCo, co, ss);
		}
		else if (_vert_isBoundary(v)) {
			int numBoundary = 0;

			VertDataZero(r, ss);
			for (i = 0; i < v->numEdges; i++) {
				CCGEdge *e = v->edges[i];
				if (_edge_isBoundary(e)) {
					VertDataAdd(r, VERT_getCo(_edge_getOtherVert(e, v), curLvl), ss);
					numBoundary++;
				}
			}
			VertDataCopy(nCo, co, ss);
			VertDataMulN(nCo, 0.75f, ss);
			VertDataMulN(r, 0.25f / numBoundary, ss);
			VertDataAdd(nCo, r, ss);
		}
		else {
			int numEdges = 0, numFaces = 0;

			VertDataZero(q, ss);
			for (i = 0; i < v->numFaces; i++) {
				CCGFace *f = v->faces[i];
				VertDataAdd(q, (float *)FACE_getCenterData(f), ss);
				numFaces++;
			}
			VertDataMulN(q, 1.0f / numFaces, ss);
			VertDataZero(r, ss);
			for (i = 0; i < v->numEdges; i++) {
				CCGEdge *e = v->edges[i];
				VertDataAdd(r, VERT_getCo(_edge_getOtherVert(e, v), curLvl), ss);
				numEdges++;
			}
			VertDataMulN(r, 1.0f / numEdges, ss);

			VertDataCopy(nCo, co, ss);
			VertDataMulN(nCo, numEdges - 2.0f, ss);
			VertDataAdd(nCo, q, ss);
			VertDataAdd(nCo, r, ss);
			VertDataMulN(nCo, 1.0f / numEdges, ss);
		}

		if (sharpCount > 1 || seam) {
			VertDataZero(q, ss);

			if (seam) {
				avgSharpness = 1.0f;
				sharpCount = seamEdges;
				allSharp = 1;
			}

			for (i = 0; i < v->numEdges; i++) {
				CCGEdge *e = v->edges[i];
				float sharpness = EDGE_getSharpness(e, curLvl);

				if (seam) {
					if (_edge_isBoundary(e)) {
						CCGVert *oV = _edge_getOtherVert(e, v);
						VertDataAdd(q, VERT_getCo(oV, curLvl), ss);
					}
				}
				else if (sharpness != 0.0f) {
					CCGVert *oV = _edge_getOtherVert(e, v);
					VertDataAdd(q, VERT_getCo(oV, curLvl), ss);
				}
			}

			VertDataMulN(q, (float) 1 / sharpCount, ss);

			if (sharpCount != 2 || allSharp) {
				/* q = q + (co - q) * avgSharpness */
				VertDataCopy(r, co, ss);
				VertDataSub(r, q, ss);
				VertDataMulN(r, avgSharpness, ss);
				VertDataAdd(q, r, ss);
			}

			/* r = co * 0.75 + q * 0.25 */
			VertDataCopy(r, co, ss);
			VertDataMulN(r, 0.75f, ss);
			VertDataMulN(q, 0.25f, ss);
			VertDataAdd(r, q, ss);

			/* nCo = nCo + (r - nCo) * avgSharpness */
			VertDataSub(r, nCo, ss);
			VertDataMulN(r, avgSharpness, ss);
			VertDataAdd(nCo, r, ss);
		}

		/* vert flags cleared later */
	}


	// after we calculated new edges midpoints and new vertices positions we can loop over edges again
	// getting new midpoints with:              void *co = EDGE_getCo(e, nextLvl, 1);
	// getting original edge vertices with:     float* myvar =  (float*) VERT_getCo(e->v1, curLvl);
	// and we need new vertices positions with: void *nCo = VERT_getCo(e->v1, nextLvl);


	// my edges. 1st pass
	for (ptrIdx = 0; ptrIdx < numEffectedE; ptrIdx++) {
		CCGEdge *e = effectedE[ptrIdx];
		float* EnCast = (float*)EDGE_getCo(e, nextLvl, 1);
		// h = En - E0
		float a[3], b[3], c[3], m[3], h[3], aa[3], bb[3], cc[3], mm[3], aabb[3], ab[3]; 
		float k, l, ll;

		to_vector(VERT_getCo(e->v0, curLvl), aa);
		to_vector(VERT_getCo(e->v1, curLvl), bb);

		to_vector(EDGE_getCo(e, nextLvl, 1), c);
		to_vector(VERT_getCo(e->v0, nextLvl), a); // we need to preserve a or b in the nCO modification in the original loop over vertices
		to_vector(VERT_getCo(e->v1, nextLvl), b); 

		avg(m, a, b);
		sub(h, c, m); 

		sub(aabb, aa, bb);
		sub(ab, a, b);

		ll = sqr_len(aabb);
		l = sqr_len(ab);
		k = sqrt(ll/l);
		avg(mm, aa, bb);
		scale(h,k); // coeff
		add(cc,h,mm); 

		EnCast[0] = cc[0];
		EnCast[1] = cc[1];
		EnCast[2] = cc[2];

	}
	// put vertices back
	for (ptrIdx = 0; ptrIdx < numEffectedV; ptrIdx++) {
		CCGVert *v = effectedV[ptrIdx];
		float a[3], b[3], n[3];
		float* voCast = (float*)VERT_getCo(v, curLvl);
		float* vnCast = (float*)VERT_getCo(v, nextLvl);
		to_vector(VERT_getCo(v, curLvl), a);
		to_vector(VERT_getCo(v, nextLvl), b);
		sub(n, a, b);
		scale(n, 1);  // coeff
		add(a, b, n);
		vnCast[0] = a[0];
		vnCast[1] = a[1];
		vnCast[2] = a[2];
		voCast[0] = a[0];
		voCast[1] = a[1];
		voCast[2] = a[2];
	}


	// mark edges as excluded from second pass processing
	for (ptrIdx = 0; ptrIdx < numEffectedV; ptrIdx++) {
		CCGVert *v = effectedV[ptrIdx];
		int edges_count = v->numEdges;
		if (v->numEdges==5){
			// lets flag those edges to prevent altering them later
			for (i=0; i < v->numEdges; i++){
				v->edges[i]->flags |= Edge_excluded;
			}
		}
	}
	// my edges. 2nd pass
	for (ptrIdx = 0; ptrIdx < numEffectedV; ptrIdx++) {
		CCGVert *v = effectedV[ptrIdx];
		// check if vertex has 4 neighbors 
		if (v->numEdges==4){
			float v0co[3],v1co[3],v2co[3],v3co[3], P[3];
			float e0co[3], e1co[3], e2co[3], e3co[3]; 
			float  res0[3], res1[3];


			CCGEdge *e0 = v->edges[0]; 
			CCGEdge *e1 = v->edges[1];
			CCGEdge *e2 = v->edges[2];
			CCGEdge *e3 = v->edges[3];

			CCGVert *v0,*v1,*v2,*v3; 
			float *en0Cast, *en1Cast, *en2Cast, *en3Cast; 

			// lets sort edges
			CCGEdge *edges[4] = {e0,e1,e2,e3};
			CCGEdge *e_temp;

			for (i = 0; i < 4; i++){
				for (j =0; j < edges[i]->numFaces; j++){
					CCGFace *f = edges[i]->faces[j];
					int k;
					for (k = 0; k < f->numVerts; k++){
						if ((i+2 < 4) && (FACE_getEdges(f)[k] == edges[i+2])){
							e_temp = edges[i+1];
							edges[i+1] = edges[i+2];
							edges[i+2] = e_temp;
						}
						else if ((i+3 < 4) && (FACE_getEdges(f)[k] == edges[i+3])){
							e_temp = edges[i+1];
							edges[i+1] = edges[i+3];
							edges[i+3] = e_temp;
						}
					}
				}
			}
			// edges sorted 

			v0 = _edge_getOtherVert(edges[0], v);
			v1 = _edge_getOtherVert(edges[1], v);
			v2 = _edge_getOtherVert(edges[2], v);
			v3 = _edge_getOtherVert(edges[3], v);


			en0Cast = (float*)EDGE_getCo(edges[0], nextLvl, 1);
			en1Cast = (float*)EDGE_getCo(edges[1], nextLvl, 1);
			en2Cast = (float*)EDGE_getCo(edges[2], nextLvl, 1);
			en3Cast = (float*)EDGE_getCo(edges[3], nextLvl, 1);

			to_vector(VERT_getCo(v, curLvl), P);

			to_vector(VERT_getCo(v0, curLvl), v0co);
			to_vector(VERT_getCo(v1, curLvl), v1co);
			to_vector(VERT_getCo(v2, curLvl), v2co);
			to_vector(VERT_getCo(v3, curLvl), v3co);

			to_vector(EDGE_getCo(edges[0], nextLvl, 1), e0co);
			to_vector(EDGE_getCo(edges[1], nextLvl, 1), e1co);
			to_vector(EDGE_getCo(edges[2], nextLvl, 1), e2co);
			to_vector(EDGE_getCo(edges[3], nextLvl, 1), e3co);

			if ((edges[0]->crease > 0.1 && edges[2]->crease > 0.1) || (edges[1]->crease > 0.1 && edges[3]->crease > 0.1)){
				if (edges[0]->crease > 0.1 && edges[2]->crease > 0.1) {
					interp0(v0co,P,v2co,res0);
					interp0(v2co,P,v0co,res1);
					set_midpoint(edges[0], res0, e0co, en0Cast);
					set_midpoint(edges[2], res1, e2co, en2Cast);	
				}
				if (edges[1]->crease > 0.1 && edges[3]->crease > 0.1) {
					interp0(v1co,P,v3co,res0);
					interp0(v3co,P,v1co,res1);
					set_midpoint(edges[1], res0, e1co, en1Cast);
					set_midpoint(edges[3], res1, e3co, en3Cast);
				}
			}
			else {
				interp0(v0co,P,v2co,res0);
				interp0(v2co,P,v0co,res1);
				set_midpoint(edges[0], res0, e0co, en0Cast);
				set_midpoint(edges[2], res1, e2co, en2Cast);

				interp0(v1co,P,v3co,res0);
				interp0(v3co,P,v1co,res1);
				set_midpoint(edges[1], res0, e1co, en1Cast);
				set_midpoint(edges[3], res1, e3co, en3Cast);
			}
			
		}

		if (v->numEdges==50){
			float v0co[3],v1co[3],v2co[3],v3co[3], v4co[3], P[3];
			float ac[3], aP[3], closest[3], ca[3], cP[3];
			float bd[3], bP[3], db[3], dP[3];
			float s[3], ha[3], hc[3];
			float projection, ha_sq, hc_sq, s_sq, ra, rc;
			float e0co[3], e1co[3], e2co[3], e3co[3], e4co[3], en0[3], en1[3], en2[3], en3[3]; 
			float dir0[3], dir1[3], dir2[3], dir3[3];
			float res[3], sagitta[3], res0[3], res1[3];
			float halfchord_sq, cos_sq, aP_sq, cP_sq, x;


			CCGEdge *e0 = v->edges[0]; 
			CCGEdge *e1 = v->edges[1];
			CCGEdge *e2 = v->edges[2];
			CCGEdge *e3 = v->edges[3];
			CCGEdge *e4 = v->edges[4];

			CCGVert *v0,*v1,*v2,*v3,*v4; 
			float *en0Cast, *en1Cast, *en2Cast, *en3Cast, *en4Cast; 

			// lets sort edges
			CCGEdge *edges[5] = {e0,e1,e2,e3,e4};
			CCGEdge *e_temp;

			for (i = 0; i < 5; i++){
				for (j =0; j < edges[i]->numFaces; j++){
					CCGFace *f = edges[i]->faces[j];
					int k;
					for (k = 0; k < f->numVerts; k++){
						if ((i+2 < 5) && (FACE_getEdges(f)[k] == edges[i+2])){
							e_temp = edges[i+1];
							edges[i+1] = edges[i+2];
							edges[i+2] = e_temp;
						}
						else if ((i+3 < 5) && (FACE_getEdges(f)[k] == edges[i+3])){
							e_temp = edges[i+1];
							edges[i+1] = edges[i+3];
							edges[i+3] = e_temp;
						}
						else if ((i+4 < 5) && (FACE_getEdges(f)[k] == edges[i+4])){
							e_temp = edges[i+1];
							edges[i+1] = edges[i+4];
							edges[i+4] = e_temp;
						}
					}
				}
			}
			// edges sorted 

			v0 = _edge_getOtherVert(edges[0], v);
			v1 = _edge_getOtherVert(edges[1], v);
			v2 = _edge_getOtherVert(edges[2], v);
			v3 = _edge_getOtherVert(edges[3], v);
			v4 = _edge_getOtherVert(edges[4], v);


			en0Cast = (float*)EDGE_getCo(edges[0], nextLvl, 1);
			en1Cast = (float*)EDGE_getCo(edges[1], nextLvl, 1);
			en2Cast = (float*)EDGE_getCo(edges[2], nextLvl, 1);
			en3Cast = (float*)EDGE_getCo(edges[3], nextLvl, 1);
			en4Cast = (float*)EDGE_getCo(edges[4], nextLvl, 1);

			to_vector(VERT_getCo(v, curLvl), P);

			to_vector(VERT_getCo(v0, curLvl), v0co);
			to_vector(VERT_getCo(v1, curLvl), v1co);
			to_vector(VERT_getCo(v2, curLvl), v2co);
			to_vector(VERT_getCo(v3, curLvl), v3co);
			to_vector(VERT_getCo(v4, curLvl), v4co);

			to_vector(EDGE_getCo(edges[0], nextLvl, 1), e0co);
			to_vector(EDGE_getCo(edges[1], nextLvl, 1), e1co);
			to_vector(EDGE_getCo(edges[2], nextLvl, 1), e2co);
			to_vector(EDGE_getCo(edges[3], nextLvl, 1), e3co);
			to_vector(EDGE_getCo(edges[4], nextLvl, 1), e4co);

			//[v0, V, v2], [v0, V, v3], [v1, V, v3], [v1, V, v4], [v2, V, v4]
			//[v0, V, v2], [v1, V, v3], [v2, V, v4]

			interp0(v0co,P,v2co,res0);
			interp0(v2co,P,v0co,res1);
			set_midpoint(edges[0], res0, e0co, en0Cast);
			set_midpoint(edges[2], res1, e2co, en2Cast);

			interp0(v1co,P,v3co,res0);
			interp0(v3co,P,v1co,res1);
			set_midpoint(edges[1], res0, e1co, en1Cast);
			set_midpoint(edges[3], res1, e3co, en3Cast);


			interp0(v2co,P,v4co,res0);
			interp0(v4co,P,v2co,res1);
			set_midpoint(edges[4], res1, e4co, en4Cast);

		}

		if (v->numEdges==3){
			float v0co[3],v1co[3],v2co[3],v3co[3], P[3];
			float vop1co[3], vop2co[3];
			float e0co[3], e1co[3], e2co[3], e3co[3]; 
			float  res0[3], res1[3];
			int is_e0=0;
			int is_e1=0;
			int is_e2=0;

			CCGEdge *e0 = v->edges[0]; 
			CCGEdge *e1 = v->edges[1];
			CCGEdge *e2 = v->edges[2];

			CCGVert *v0,*v1,*v2; 
			CCGVert *v_opposite1, *v_opposite2; 
			float *en0Cast, *en1Cast, *en2Cast; 
			CCGEdge *edges[3];
			CCGFace *f5;

			if (e0->numFaces == 2){
				for (i =0; i < e0->numFaces; i++){
					if (e0->faces[i]->numVerts == 5) {is_e0 = 1; f5 = e0->faces[i];}
				}
			}
			if (e1->numFaces == 2){
				for (i =0; i < e1->numFaces; i++){
					if (e1->faces[i]->numVerts == 5) {is_e1 = 1; f5 = e1->faces[i];}
				}
			}
			if (e2->numFaces == 2){
				for (i =0; i < e2->numFaces; i++){
					if (e2->faces[i]->numVerts == 5) {is_e2 = 1; f5 = e2->faces[i];}
				}
			}
			// we check if only two edges are in 5-sided face
			if (is_e0 + is_e1 + is_e2 == 2) {
				if (is_e0 && is_e1) {
					edges[0] = e0; 
					edges[1] = e1;
					edges[2] = e2;
				}
				if (is_e0 && is_e2) {
					edges[0] = e0; 
					edges[1] = e2;
					edges[2] = e1;
				}
				if (is_e1 && is_e2) {
					edges[0] = e1; 
					edges[1] = e2;
					edges[2] = e0;
				}

				// find two opposite vertices to align tangent of the dead-end spline 
				for (i = 0; i < 5; i++){
					if (FACE_getVerts(f5)[i] == v){
						if (i+2 > 4) {v_opposite1 = FACE_getVerts(f5)[i-3];}
						else {v_opposite1 = FACE_getVerts(f5)[i+2];}
						if (i-2 < 0) {v_opposite2 = FACE_getVerts(f5)[i+3];}
						else {v_opposite2 = FACE_getVerts(f5)[i-2];}
						break;
					}
				}

				v0 = _edge_getOtherVert(edges[0], v);
				v1 = _edge_getOtherVert(edges[1], v);
				v2 = _edge_getOtherVert(edges[2], v);

				en0Cast = (float*)EDGE_getCo(edges[0], nextLvl, 1);
				en1Cast = (float*)EDGE_getCo(edges[1], nextLvl, 1);
				en2Cast = (float*)EDGE_getCo(edges[2], nextLvl, 1);

				to_vector(VERT_getCo(v, curLvl), P);

				to_vector(VERT_getCo(v_opposite1, curLvl), vop1co);
				to_vector(VERT_getCo(v_opposite1, curLvl), vop2co);
				add(vop1co, vop1co, vop2co);
				scale(vop1co,0.5);

				to_vector(VERT_getCo(v0, curLvl), v0co);
				to_vector(VERT_getCo(v1, curLvl), v1co);
				to_vector(VERT_getCo(v2, curLvl), v2co);

				to_vector(EDGE_getCo(edges[0], nextLvl, 1), e0co);
				to_vector(EDGE_getCo(edges[1], nextLvl, 1), e1co);
				to_vector(EDGE_getCo(edges[2], nextLvl, 1), e2co);


				interp0(v0co,P,v1co,res0);
				interp0(v1co,P,v0co,res1);
				set_midpoint(edges[0], res0, e0co, en0Cast);
				set_midpoint(edges[1], res1, e1co, en1Cast);

				interp0(v2co,P,vop1co,res0);
				set_midpoint(edges[2], res0, e2co, en2Cast);


			}
			// otherwisethe result from the 1st pass remains

		}
	}


	// Faces midpoints. My alteration
	for (ptrIdx = 0; ptrIdx < numEffectedF; ptrIdx++) {
		CCGFace *f = effectedF[ptrIdx];
		if (f->numVerts == 4){
			float* coCast = (float*)FACE_getCenterData(f);
			float v0[3], v1[3], v2[3], v3[3], x[3], e0[3], e1[3], e2[3], e3[3], h[3], h1[3], h2[3], h3[3], m0[3], m1[3];
			float v0v1[3], e1e3[3], v2v3[3], v0v3[3], e0e2[3], v1v2[3];
			float p0[3],p1[3],P[3],P0[3],P1[3];
			float l, ll, k, l2, ll2, k2, kh, h_len, h1_len, h2_len, h3_len;


			to_vector(VERT_getCo(FACE_getVerts(f)[0], nextLvl), v0);
			to_vector(VERT_getCo(FACE_getVerts(f)[1], nextLvl), v1);
			to_vector(VERT_getCo(FACE_getVerts(f)[2], nextLvl), v2);
			to_vector(VERT_getCo(FACE_getVerts(f)[3], nextLvl), v3);


			to_vector(EDGE_getCo(FACE_getEdges(f)[0], nextLvl, 1), e0);
			to_vector(EDGE_getCo(FACE_getEdges(f)[1], nextLvl, 1), e1);
			to_vector(EDGE_getCo(FACE_getEdges(f)[2], nextLvl, 1), e2);
			to_vector(EDGE_getCo(FACE_getEdges(f)[3], nextLvl, 1), e3);
			//to_vector(co, x); // midface 

			avg(m0, v0,v1);
			sub(h, e0, m0);
			avg(m1, e3,e1);

			avg(m0, v2,v3);
			sub(h1, e2, m0);
			avg(h2, h,h1);
			h2_len = sqr_len(h2);
			h3_len = (sqr_len(h1) + sqr_len(h))/2;
			kh = sqrt(h3_len/h2_len);
			scale(h2, kh*1.1);
			add(P0,m1,h2);


			// next pair
			avg(m0, v0,v3);
			sub(h, e3, m0);
			avg(m1, e0,e2);

			avg(m0, v1,v2);
			sub(h1, e1, m0);
			avg(h2, h,h1);
			h2_len = sqr_len(h2);
			h3_len = (sqr_len(h1) + sqr_len(h))/2;
			kh = sqrt(h3_len/h2_len);
			scale(h2, kh*1.1);
			add(P1,m1,h2);


			avg(P, P0, P1);

			coCast[0] = P[0];
			coCast[1] = P[1];
			coCast[2] = P[2];
		}
		if (f->numVerts == 5){
			float* coCast = (float*)FACE_getCenterData(f);
			float v0[3], v1[3], v2[3], v3[3], v4[3], x[3], e0[3], e1[3], e2[3], e3[3], e4[3], h[3], h0[3], h1[3], h2[3], h3[3], m0[3], m1[3];
			float v0v1[3], e1e3[3], v2v4[3], v3v4[3], e0e2[3], v0v2[3], v0v4[3], v1v3[3];
			float p0[3],p1[3],P[3],P0[3],P1[3];
			float k, kh;


			to_vector(VERT_getCo(FACE_getVerts(f)[0], nextLvl), v0);
			to_vector(VERT_getCo(FACE_getVerts(f)[1], nextLvl), v1);
			to_vector(VERT_getCo(FACE_getVerts(f)[2], nextLvl), v2);
			to_vector(VERT_getCo(FACE_getVerts(f)[3], nextLvl), v3);
			to_vector(VERT_getCo(FACE_getVerts(f)[4], nextLvl), v4);


			to_vector(EDGE_getCo(FACE_getEdges(f)[0], nextLvl, 1), e0);
			to_vector(EDGE_getCo(FACE_getEdges(f)[1], nextLvl, 1), e1);
			to_vector(EDGE_getCo(FACE_getEdges(f)[2], nextLvl, 1), e2);
			to_vector(EDGE_getCo(FACE_getEdges(f)[3], nextLvl, 1), e3);
			to_vector(EDGE_getCo(FACE_getEdges(f)[4], nextLvl, 1), e4);
			
			// move 0-1 (I) edge to 2-4 position
			avg(m0, v0,v1);
			sub(h0, e0, m0);
			avg(m1, e1,e4);
			sub(v0v1, v0,v1);
			sub(v2v4, e1,e4);
			k = sqrt(sqr_len(v2v4)/sqr_len(v0v1));
			scale(h0,k);
			add(P, m1,h0);

			// move 3-4 (IV) edge to 0-2 position
			avg(m0, v3,v4);
			sub(h1, e3, m0);
			avg(m1, e2,e4);
			sub(v3v4, v3,v4);
			sub(v0v2, e2,e4);
			k = sqrt(sqr_len(v0v2)/sqr_len(v3v4));
			scale(h1,k);
			add(p1, m1,h1);
			add(P,P,p1);

			// move v1-v2 (e1) edge to e0-e2 position
			avg(m0, v1,v2);
			sub(h1, e1, m0);
			avg(m1, e0,e2);
			sub(v3v4, v1,v2);
			sub(v0v2, e0,e2);
			k = sqrt(sqr_len(v0v2)/sqr_len(v3v4));
			scale(h1,k);
			add(p1, m1,h1);
			add(P,P,p1);

			// move v2-v3 (e2) edge to e1-e3 position
			avg(m0, v2,v3);
			sub(h1, e2, m0);
			avg(m1, e1,e3);
			sub(v3v4, v2,v3);
			sub(v0v2, e1,e3);
			k = sqrt(sqr_len(v0v2)/sqr_len(v3v4));
			scale(h1,k);
			add(p1, m1,h1);
			add(P,P,p1);

			// move v0-v4 (e4) edge to e0-e3 position
			avg(m0, v0,v4);
			sub(h1, e4, m0);
			avg(m1, e0,e3);
			sub(v3v4, v0,v4);
			sub(v0v2, e0,e3);
			k = sqrt(sqr_len(v0v2)/sqr_len(v3v4));
			scale(h1,k);
			add(p1, m1,h1);
			add(P,P,p1);


			scale(P,0.2);
			//avg(P,p0,p1);


			coCast[0] = P[0];
			coCast[1] = P[1];
			coCast[2] = P[2];
		}
		if (f->numVerts == 3){
			float* coCast = (float*)FACE_getCenterData(f);
			float v0[3], v1[3], v2[3], v3[3], v4[3], x[3], e0[3], e1[3], e2[3], e3[3], e4[3], h[3], h0[3], h1[3], h2[3], h3[3], m0[3], m1[3];
			float v0v1[3], v1e2[3], v1v2[3], e0e1[3], v0v2[3], v0v4[3], v1v3[3];
			float p0[3],p1[3],P[3],P0[3],P1[3];
			float k, kh;


			to_vector(VERT_getCo(FACE_getVerts(f)[0], nextLvl), v0);
			to_vector(VERT_getCo(FACE_getVerts(f)[1], nextLvl), v1);
			to_vector(VERT_getCo(FACE_getVerts(f)[2], nextLvl), v2);

			to_vector(EDGE_getCo(FACE_getEdges(f)[0], nextLvl, 1), e0);
			to_vector(EDGE_getCo(FACE_getEdges(f)[1], nextLvl, 1), e1);
			to_vector(EDGE_getCo(FACE_getEdges(f)[2], nextLvl, 1), e2);

			// move 0-1 (I) edge to 2-4 position
			avg(m0, v0,v1);
			sub(h0, e0, m0);
			avg(m1, v1,e2);
			sub(v0v1, v0,v1);
			sub(v1e2, v1,e2);
			k = sqrt(sqr_len(v1e2)/sqr_len(v0v1));
			scale(h0,k);
			add(P, m1,h0);

			// move 3-4 (IV) edge to 0-2 position
			avg(m0, v1,v2);
			sub(h1, e1, m0);
			avg(m1, v1,e2);
			sub(v1v2, v1,v2);
			sub(v1e2, v1,e2);
			k = sqrt(sqr_len(v1e2)/sqr_len(v1v2));
			scale(h1,k);
			add(p1, m1,h1);
			add(P,P,p1);

			// move v1-v2 (e1) edge to e0-e2 position
			avg(m0, v0,v2);
			sub(h1, e2, m0);

			add(e0, e0,v0);
			scale(e0,0.5);
			add(e1, e1,v2);
			scale(e1,0.5);

			avg(m1, e0,e1);
			sub(v0v2, v0,v2);
			sub(e0e1, e0,e1);
			k = sqrt(sqr_len(e0e1)/sqr_len(v0v2));
			scale(h1,k);
			add(p1, m1,h1);
			add(P,P,p1);

			scale(P,0.333333);
			//avg(P,p0,p1);


			coCast[0] = P[0];
			coCast[1] = P[1];
			coCast[2] = P[2];
		}
	}



	if (ss->useAgeCounts) {
		for (i = 0; i < numEffectedV; i++) {
			CCGVert *v = effectedV[i];
			byte *userData = ccgSubSurf_getVertUserData(ss, v);
			*((int *) &userData[ss->vertUserAgeOffset]) = ss->currentAge;
		}

		for (i = 0; i < numEffectedE; i++) {
			CCGEdge *e = effectedE[i];
			byte *userData = ccgSubSurf_getEdgeUserData(ss, e);
			*((int *) &userData[ss->edgeUserAgeOffset]) = ss->currentAge;
		}

		for (i = 0; i < numEffectedF; i++) {
			CCGFace *f = effectedF[i];
			byte *userData = ccgSubSurf_getFaceUserData(ss, f);
			*((int *) &userData[ss->faceUserAgeOffset]) = ss->currentAge;
		}
	}

	for (i = 0; i < numEffectedE; i++) {
		CCGEdge *e = effectedE[i];
		VertDataCopy(EDGE_getCo(e, nextLvl, 0), VERT_getCo(e->v0, nextLvl), ss);
		VertDataCopy(EDGE_getCo(e, nextLvl, 2), VERT_getCo(e->v1, nextLvl), ss);
	}
	for (i = 0; i < numEffectedF; i++) {
		CCGFace *f = effectedF[i];
		for (S = 0; S < f->numVerts; S++) {
			CCGEdge *e = FACE_getEdges(f)[S];
			CCGEdge *prevE = FACE_getEdges(f)[(S + f->numVerts - 1) % f->numVerts];

			VertDataCopy(FACE_getIFCo(f, nextLvl, S, 0, 0), (float *)FACE_getCenterData(f), ss);
			VertDataCopy(FACE_getIECo(f, nextLvl, S, 0), (float *)FACE_getCenterData(f), ss);
			VertDataCopy(FACE_getIFCo(f, nextLvl, S, 1, 1), VERT_getCo(FACE_getVerts(f)[S], nextLvl), ss);
			VertDataCopy(FACE_getIECo(f, nextLvl, S, 1), EDGE_getCo(FACE_getEdges(f)[S], nextLvl, 1), ss);

			VertDataCopy(FACE_getIFCo(f, nextLvl, S, 1, 0), _edge_getCoVert(e, FACE_getVerts(f)[S], nextLvl, 1, vertDataSize), ss);
			VertDataCopy(FACE_getIFCo(f, nextLvl, S, 0, 1), _edge_getCoVert(prevE, FACE_getVerts(f)[S], nextLvl, 1, vertDataSize), ss);
		}
	}

	for (curLvl = 1; curLvl < subdivLevels; curLvl++) {
		ccgSubSurf__calcSubdivLevel(ss,
		                            effectedV, effectedE, effectedF,
		                            numEffectedV, numEffectedE, numEffectedF, curLvl);
	}

	if (ss->calcVertNormals)
		ccgSubSurf__calcVertNormals(ss,
		                            effectedV, effectedE, effectedF,
		                            numEffectedV, numEffectedE, numEffectedF);

	for (ptrIdx = 0; ptrIdx < numEffectedV; ptrIdx++) {
		CCGVert *v = effectedV[ptrIdx];
		v->flags = 0;
	}
	for (ptrIdx = 0; ptrIdx < numEffectedE; ptrIdx++) {
		CCGEdge *e = effectedE[ptrIdx];
		e->flags = 0;
	}

	MEM_freeN(effectedF);
	MEM_freeN(effectedE);
	MEM_freeN(effectedV);
}

static void ccgSubSurf__allFaces(CCGSubSurf *ss, CCGFace ***faces, int *numFaces, int *freeFaces)
{
	CCGFace **array;
	int i, num;

	if (*faces == NULL) {
		array = MEM_mallocN(sizeof(*array) * ss->fMap->numEntries, "CCGSubsurf allFaces");
		num = 0;
		for (i = 0; i < ss->fMap->curSize; i++) {
			CCGFace *f = (CCGFace *) ss->fMap->buckets[i];

			for (; f; f = f->next)
				array[num++] = f;
		}

		*faces = array;
		*numFaces = num;
		*freeFaces = 1;
	}
	else {
		*freeFaces = 0;
	}
}

static void ccgSubSurf__effectedFaceNeighbours(CCGSubSurf *ss, CCGFace **faces, int numFaces, CCGVert ***verts, int *numVerts, CCGEdge ***edges, int *numEdges)
{
	CCGVert **arrayV;
	CCGEdge **arrayE;
	int numV, numE, i, j;

	arrayV = MEM_mallocN(sizeof(*arrayV) * ss->vMap->numEntries, "CCGSubsurf arrayV");
	arrayE = MEM_mallocN(sizeof(*arrayE) * ss->eMap->numEntries, "CCGSubsurf arrayV");
	numV = numE = 0;

	for (i = 0; i < numFaces; i++) {
		CCGFace *f = faces[i];
		f->flags |= Face_eEffected;
	}

	for (i = 0; i < ss->vMap->curSize; i++) {
		CCGVert *v = (CCGVert *) ss->vMap->buckets[i];

		for (; v; v = v->next) {
			for (j = 0; j < v->numFaces; j++)
				if (!(v->faces[j]->flags & Face_eEffected))
					break;
			
			if (j == v->numFaces) {
				arrayV[numV++] = v;
				v->flags |= Vert_eEffected;
			}
		}
	}

	for (i = 0; i < ss->eMap->curSize; i++) {
		CCGEdge *e = (CCGEdge *) ss->eMap->buckets[i];

		for (; e; e = e->next) {
			for (j = 0; j < e->numFaces; j++)
				if (!(e->faces[j]->flags & Face_eEffected))
					break;
			
			if (j == e->numFaces) {
				e->flags |= Edge_eEffected;
				arrayE[numE++] = e;
			}
		}
	}

	*verts = arrayV;
	*numVerts = numV;
	*edges = arrayE;
	*numEdges = numE;
}

/* copy face grid coordinates to other places */
CCGError ccgSubSurf_updateFromFaces(CCGSubSurf *ss, int lvl, CCGFace **effectedF, int numEffectedF)
{
	int i, S, x, gridSize, cornerIdx, subdivLevels;
	int vertDataSize = ss->meshIFC.vertDataSize, freeF;

	subdivLevels = ss->subdivLevels;
	lvl = (lvl) ? lvl : subdivLevels;
	gridSize = ccg_gridsize(lvl);
	cornerIdx = gridSize - 1;

	ccgSubSurf__allFaces(ss, &effectedF, &numEffectedF, &freeF);

	for (i = 0; i < numEffectedF; i++) {
		CCGFace *f = effectedF[i];

		for (S = 0; S < f->numVerts; S++) {
			CCGEdge *e = FACE_getEdges(f)[S];
			CCGEdge *prevE = FACE_getEdges(f)[(S + f->numVerts - 1) % f->numVerts];

			VertDataCopy((float *)FACE_getCenterData(f), FACE_getIFCo(f, lvl, S, 0, 0), ss);
			VertDataCopy(VERT_getCo(FACE_getVerts(f)[S], lvl), FACE_getIFCo(f, lvl, S, cornerIdx, cornerIdx), ss);

			for (x = 0; x < gridSize; x++)
				VertDataCopy(FACE_getIECo(f, lvl, S, x), FACE_getIFCo(f, lvl, S, x, 0), ss);

			for (x = 0; x < gridSize; x++) {
				int eI = gridSize - 1 - x;
				VertDataCopy(_edge_getCoVert(e, FACE_getVerts(f)[S], lvl, eI, vertDataSize), FACE_getIFCo(f, lvl, S, cornerIdx, x), ss);
				VertDataCopy(_edge_getCoVert(prevE, FACE_getVerts(f)[S], lvl, eI, vertDataSize), FACE_getIFCo(f, lvl, S, x, cornerIdx), ss);
			}
		}
	}

	if (freeF) MEM_freeN(effectedF);

	return eCCGError_None;
}

/* copy other places to face grid coordinates */
CCGError ccgSubSurf_updateToFaces(CCGSubSurf *ss, int lvl, CCGFace **effectedF, int numEffectedF)
{
	int i, S, x, gridSize, cornerIdx, subdivLevels;
	int vertDataSize = ss->meshIFC.vertDataSize, freeF;

	subdivLevels = ss->subdivLevels;
	lvl = (lvl) ? lvl : subdivLevels;
	gridSize = ccg_gridsize(lvl);
	cornerIdx = gridSize - 1;

	ccgSubSurf__allFaces(ss, &effectedF, &numEffectedF, &freeF);

	for (i = 0; i < numEffectedF; i++) {
		CCGFace *f = effectedF[i];

		for (S = 0; S < f->numVerts; S++) {
			int prevS = (S + f->numVerts - 1) % f->numVerts;
			CCGEdge *e = FACE_getEdges(f)[S];
			CCGEdge *prevE = FACE_getEdges(f)[prevS];

			for (x = 0; x < gridSize; x++) {
				int eI = gridSize - 1 - x;
				VertDataCopy(FACE_getIFCo(f, lvl, S, cornerIdx, x), _edge_getCoVert(e, FACE_getVerts(f)[S], lvl, eI, vertDataSize), ss);
				VertDataCopy(FACE_getIFCo(f, lvl, S, x, cornerIdx), _edge_getCoVert(prevE, FACE_getVerts(f)[S], lvl, eI, vertDataSize), ss);
			}

			for (x = 1; x < gridSize - 1; x++) {
				VertDataCopy(FACE_getIFCo(f, lvl, S, 0, x), FACE_getIECo(f, lvl, prevS, x), ss);
				VertDataCopy(FACE_getIFCo(f, lvl, S, x, 0), FACE_getIECo(f, lvl, S, x), ss);
			}

			VertDataCopy(FACE_getIFCo(f, lvl, S, 0, 0), (float *)FACE_getCenterData(f), ss);
			VertDataCopy(FACE_getIFCo(f, lvl, S, cornerIdx, cornerIdx), VERT_getCo(FACE_getVerts(f)[S], lvl), ss);
		}
	}

	if (freeF) MEM_freeN(effectedF);

	return eCCGError_None;
}

/* stitch together face grids, averaging coordinates at edges
 * and vertices, for multires displacements */
CCGError ccgSubSurf_stitchFaces(CCGSubSurf *ss, int lvl, CCGFace **effectedF, int numEffectedF)
{
	CCGVert **effectedV;
	CCGEdge **effectedE;
	int numEffectedV, numEffectedE, freeF;
	int i, S, x, gridSize, cornerIdx, subdivLevels, edgeSize;
	int vertDataSize = ss->meshIFC.vertDataSize;

	subdivLevels = ss->subdivLevels;
	lvl = (lvl) ? lvl : subdivLevels;
	gridSize = ccg_gridsize(lvl);
	edgeSize = ccg_edgesize(lvl);
	cornerIdx = gridSize - 1;

	ccgSubSurf__allFaces(ss, &effectedF, &numEffectedF, &freeF);
	ccgSubSurf__effectedFaceNeighbours(ss, effectedF, numEffectedF,
	                                   &effectedV, &numEffectedV, &effectedE, &numEffectedE);

	/* zero */
	for (i = 0; i < numEffectedV; i++) {
		CCGVert *v = effectedV[i];
		if (v->numFaces)
			VertDataZero(VERT_getCo(v, lvl), ss);
	}

	for (i = 0; i < numEffectedE; i++) {
		CCGEdge *e = effectedE[i];

		if (e->numFaces)
			for (x = 0; x < edgeSize; x++)
				VertDataZero(EDGE_getCo(e, lvl, x), ss);
	}

	/* add */
	for (i = 0; i < numEffectedF; i++) {
		CCGFace *f = effectedF[i];

		VertDataZero((float *)FACE_getCenterData(f), ss);

		for (S = 0; S < f->numVerts; S++)
			for (x = 0; x < gridSize; x++)
				VertDataZero(FACE_getIECo(f, lvl, S, x), ss);

		for (S = 0; S < f->numVerts; S++) {
			int prevS = (S + f->numVerts - 1) % f->numVerts;
			CCGEdge *e = FACE_getEdges(f)[S];
			CCGEdge *prevE = FACE_getEdges(f)[prevS];

			VertDataAdd((float *)FACE_getCenterData(f), FACE_getIFCo(f, lvl, S, 0, 0), ss);
			if (FACE_getVerts(f)[S]->flags & Vert_eEffected)
				VertDataAdd(VERT_getCo(FACE_getVerts(f)[S], lvl), FACE_getIFCo(f, lvl, S, cornerIdx, cornerIdx), ss);

			for (x = 1; x < gridSize - 1; x++) {
				VertDataAdd(FACE_getIECo(f, lvl, S, x), FACE_getIFCo(f, lvl, S, x, 0), ss);
				VertDataAdd(FACE_getIECo(f, lvl, prevS, x), FACE_getIFCo(f, lvl, S, 0, x), ss);
			}

			for (x = 0; x < gridSize - 1; x++) {
				int eI = gridSize - 1 - x;
				if (FACE_getEdges(f)[S]->flags & Edge_eEffected)
					VertDataAdd(_edge_getCoVert(e, FACE_getVerts(f)[S], lvl, eI, vertDataSize), FACE_getIFCo(f, lvl, S, cornerIdx, x), ss);
				if (FACE_getEdges(f)[prevS]->flags & Edge_eEffected)
					if (x != 0)
						VertDataAdd(_edge_getCoVert(prevE, FACE_getVerts(f)[S], lvl, eI, vertDataSize), FACE_getIFCo(f, lvl, S, x, cornerIdx), ss);
			}
		}
	}

	/* average */
	for (i = 0; i < numEffectedV; i++) {
		CCGVert *v = effectedV[i];
		if (v->numFaces)
			VertDataMulN(VERT_getCo(v, lvl), 1.0f / v->numFaces, ss);
	}

	for (i = 0; i < numEffectedE; i++) {
		CCGEdge *e = effectedE[i];

		VertDataCopy(EDGE_getCo(e, lvl, 0), VERT_getCo(e->v0, lvl), ss);
		VertDataCopy(EDGE_getCo(e, lvl, edgeSize - 1), VERT_getCo(e->v1, lvl), ss);

		if (e->numFaces)
			for (x = 1; x < edgeSize - 1; x++)
				VertDataMulN(EDGE_getCo(e, lvl, x), 1.0f / e->numFaces, ss);
	}

	/* copy */
	for (i = 0; i < numEffectedF; i++) {
		CCGFace *f = effectedF[i];

		VertDataMulN((float *)FACE_getCenterData(f), 1.0f / f->numVerts, ss);

		for (S = 0; S < f->numVerts; S++)
			for (x = 1; x < gridSize - 1; x++)
				VertDataMulN(FACE_getIECo(f, lvl, S, x), 0.5f, ss);

		for (S = 0; S < f->numVerts; S++) {
			int prevS = (S + f->numVerts - 1) % f->numVerts;
			CCGEdge *e = FACE_getEdges(f)[S];
			CCGEdge *prevE = FACE_getEdges(f)[prevS];

			VertDataCopy(FACE_getIFCo(f, lvl, S, 0, 0), (float *)FACE_getCenterData(f), ss);
			VertDataCopy(FACE_getIFCo(f, lvl, S, cornerIdx, cornerIdx), VERT_getCo(FACE_getVerts(f)[S], lvl), ss);

			for (x = 1; x < gridSize - 1; x++) {
				VertDataCopy(FACE_getIFCo(f, lvl, S, x, 0), FACE_getIECo(f, lvl, S, x), ss);
				VertDataCopy(FACE_getIFCo(f, lvl, S, 0, x), FACE_getIECo(f, lvl, prevS, x), ss);
			}

			for (x = 0; x < gridSize - 1; x++) {
				int eI = gridSize - 1 - x;

				VertDataCopy(FACE_getIFCo(f, lvl, S, cornerIdx, x), _edge_getCoVert(e, FACE_getVerts(f)[S], lvl, eI, vertDataSize), ss);
				VertDataCopy(FACE_getIFCo(f, lvl, S, x, cornerIdx), _edge_getCoVert(prevE, FACE_getVerts(f)[S], lvl, eI, vertDataSize), ss);
			}

			VertDataCopy(FACE_getIECo(f, lvl, S, 0), (float *)FACE_getCenterData(f), ss);
			VertDataCopy(FACE_getIECo(f, lvl, S, gridSize - 1), FACE_getIFCo(f, lvl, S, gridSize - 1, 0), ss);
		}
	}

	for (i = 0; i < numEffectedV; i++)
		effectedV[i]->flags = 0;
	for (i = 0; i < numEffectedE; i++)
		effectedE[i]->flags = 0;
	for (i = 0; i < numEffectedF; i++)
		effectedF[i]->flags = 0;

	MEM_freeN(effectedE);
	MEM_freeN(effectedV);
	if (freeF) MEM_freeN(effectedF);

	return eCCGError_None;
}

/* update normals for specified faces */
CCGError ccgSubSurf_updateNormals(CCGSubSurf *ss, CCGFace **effectedF, int numEffectedF)
{
	CCGVert **effectedV;
	CCGEdge **effectedE;
	int i, numEffectedV, numEffectedE, freeF;

	ccgSubSurf__allFaces(ss, &effectedF, &numEffectedF, &freeF);
	ccgSubSurf__effectedFaceNeighbours(ss, effectedF, numEffectedF,
	                                   &effectedV, &numEffectedV, &effectedE, &numEffectedE);

	if (ss->calcVertNormals)
		ccgSubSurf__calcVertNormals(ss,
		                            effectedV, effectedE, effectedF,
		                            numEffectedV, numEffectedE, numEffectedF);

	for (i = 0; i < numEffectedV; i++)
		effectedV[i]->flags = 0;
	for (i = 0; i < numEffectedE; i++)
		effectedE[i]->flags = 0;
	for (i = 0; i < numEffectedF; i++)
		effectedF[i]->flags = 0;

	MEM_freeN(effectedE);
	MEM_freeN(effectedV);
	if (freeF) MEM_freeN(effectedF);

	return eCCGError_None;
}

/* compute subdivision levels from a given starting point, used by
 * multires subdivide/propagate, by filling in coordinates at a
 * certain level, and then subdividing that up to the highest level */
CCGError ccgSubSurf_updateLevels(CCGSubSurf *ss, int lvl, CCGFace **effectedF, int numEffectedF)
{
	CCGVert **effectedV;
	CCGEdge **effectedE;
	int numEffectedV, numEffectedE, freeF, i;
	int curLvl, subdivLevels = ss->subdivLevels;

	ccgSubSurf__allFaces(ss, &effectedF, &numEffectedF, &freeF);
	ccgSubSurf__effectedFaceNeighbours(ss, effectedF, numEffectedF,
	                                   &effectedV, &numEffectedV, &effectedE, &numEffectedE);

	for (curLvl = lvl; curLvl < subdivLevels; curLvl++) {
		ccgSubSurf__calcSubdivLevel(ss,
		                            effectedV, effectedE, effectedF,
		                            numEffectedV, numEffectedE, numEffectedF, curLvl);
	}

	for (i = 0; i < numEffectedV; i++)
		effectedV[i]->flags = 0;
	for (i = 0; i < numEffectedE; i++)
		effectedE[i]->flags = 0;
	for (i = 0; i < numEffectedF; i++)
		effectedF[i]->flags = 0;

	MEM_freeN(effectedE);
	MEM_freeN(effectedV);
	if (freeF) MEM_freeN(effectedF);

	return eCCGError_None;
}

#undef VERT_getCo
#undef EDGE_getCo
#undef FACE_getIECo
#undef FACE_getIFCo

/*** External API accessor functions ***/

int ccgSubSurf_getNumVerts(const CCGSubSurf *ss)
{
	return ss->vMap->numEntries;
}
int ccgSubSurf_getNumEdges(const CCGSubSurf *ss)
{
	return ss->eMap->numEntries;
}
int ccgSubSurf_getNumFaces(const CCGSubSurf *ss)
{
	return ss->fMap->numEntries;
}

CCGVert *ccgSubSurf_getVert(CCGSubSurf *ss, CCGVertHDL v)
{
	return (CCGVert *) _ehash_lookup(ss->vMap, v);
}
CCGEdge *ccgSubSurf_getEdge(CCGSubSurf *ss, CCGEdgeHDL e)
{
	return (CCGEdge *) _ehash_lookup(ss->eMap, e);
}
CCGFace *ccgSubSurf_getFace(CCGSubSurf *ss, CCGFaceHDL f)
{
	return (CCGFace *) _ehash_lookup(ss->fMap, f);
}

int ccgSubSurf_getSubdivisionLevels(const CCGSubSurf *ss)
{
	return ss->subdivLevels;
}
int ccgSubSurf_getEdgeSize(const CCGSubSurf *ss)
{
	return ccgSubSurf_getEdgeLevelSize(ss, ss->subdivLevels);
}
int ccgSubSurf_getEdgeLevelSize(const CCGSubSurf *ss, int level)
{
	if (level < 1 || level > ss->subdivLevels) {
		return -1;
	}
	else {
		return ccg_edgesize(level);
	}
}
int ccgSubSurf_getGridSize(const CCGSubSurf *ss)
{
	return ccgSubSurf_getGridLevelSize(ss, ss->subdivLevels);
}
int ccgSubSurf_getGridLevelSize(const CCGSubSurf *ss, int level)
{
	if (level < 1 || level > ss->subdivLevels) {
		return -1;
	}
	else {
		return ccg_gridsize(level);
	}
}

int ccgSubSurf_getSimpleSubdiv(const CCGSubSurf *ss)
{
	return ss->meshIFC.simpleSubdiv;
}

/* Vert accessors */

CCGVertHDL ccgSubSurf_getVertVertHandle(CCGVert *v)
{
	return v->vHDL;
}
int ccgSubSurf_getVertAge(CCGSubSurf *ss, CCGVert *v)
{
	if (ss->useAgeCounts) {
		byte *userData = ccgSubSurf_getVertUserData(ss, v);
		return ss->currentAge - *((int *) &userData[ss->vertUserAgeOffset]);
	}
	else {
		return 0;
	}
}
void *ccgSubSurf_getVertUserData(CCGSubSurf *ss, CCGVert *v)
{
	return VERT_getLevelData(v) + ss->meshIFC.vertDataSize * (ss->subdivLevels + 1);
}
int ccgSubSurf_getVertNumFaces(CCGVert *v)
{
	return v->numFaces;
}
CCGFace *ccgSubSurf_getVertFace(CCGVert *v, int index)
{
	if (index < 0 || index >= v->numFaces) {
		return NULL;
	}
	else {
		return v->faces[index];
	}
}
int ccgSubSurf_getVertNumEdges(CCGVert *v)
{
	return v->numEdges;
}
CCGEdge *ccgSubSurf_getVertEdge(CCGVert *v, int index)
{
	if (index < 0 || index >= v->numEdges) {
		return NULL;
	}
	else {
		return v->edges[index];
	}
}
void *ccgSubSurf_getVertData(CCGSubSurf *ss, CCGVert *v)
{
	return ccgSubSurf_getVertLevelData(ss, v, ss->subdivLevels);
}
void *ccgSubSurf_getVertLevelData(CCGSubSurf *ss, CCGVert *v, int level)
{
	if (level < 0 || level > ss->subdivLevels) {
		return NULL;
	}
	else {
		return _vert_getCo(v, level, ss->meshIFC.vertDataSize);
	}
}

/* Edge accessors */

CCGEdgeHDL ccgSubSurf_getEdgeEdgeHandle(CCGEdge *e)
{
	return e->eHDL;
}
int ccgSubSurf_getEdgeAge(CCGSubSurf *ss, CCGEdge *e)
{
	if (ss->useAgeCounts) {
		byte *userData = ccgSubSurf_getEdgeUserData(ss, e);
		return ss->currentAge - *((int *) &userData[ss->edgeUserAgeOffset]);
	}
	else {
		return 0;
	}
}
void *ccgSubSurf_getEdgeUserData(CCGSubSurf *ss, CCGEdge *e)
{
	return (EDGE_getLevelData(e) +
	        ss->meshIFC.vertDataSize * ccg_edgebase(ss->subdivLevels + 1));
}
int ccgSubSurf_getEdgeNumFaces(CCGEdge *e)
{
	return e->numFaces;
}
CCGFace *ccgSubSurf_getEdgeFace(CCGEdge *e, int index)
{
	if (index < 0 || index >= e->numFaces) {
		return NULL;
	}
	else {
		return e->faces[index];
	}
}
CCGVert *ccgSubSurf_getEdgeVert0(CCGEdge *e)
{
	return e->v0;
}
CCGVert *ccgSubSurf_getEdgeVert1(CCGEdge *e)
{
	return e->v1;
}
void *ccgSubSurf_getEdgeDataArray(CCGSubSurf *ss, CCGEdge *e)
{
	return ccgSubSurf_getEdgeData(ss, e, 0);
}
void *ccgSubSurf_getEdgeData(CCGSubSurf *ss, CCGEdge *e, int x)
{
	return ccgSubSurf_getEdgeLevelData(ss, e, x, ss->subdivLevels);
}
void *ccgSubSurf_getEdgeLevelData(CCGSubSurf *ss, CCGEdge *e, int x, int level)
{
	if (level < 0 || level > ss->subdivLevels) {
		return NULL;
	}
	else {
		return _edge_getCo(e, level, x, ss->meshIFC.vertDataSize);
	}
}
float ccgSubSurf_getEdgeCrease(CCGEdge *e)
{
	return e->crease;
}

/* Face accessors */

CCGFaceHDL ccgSubSurf_getFaceFaceHandle(CCGFace *f)
{
	return f->fHDL;
}
int ccgSubSurf_getFaceAge(CCGSubSurf *ss, CCGFace *f)
{
	if (ss->useAgeCounts) {
		byte *userData = ccgSubSurf_getFaceUserData(ss, f);
		return ss->currentAge - *((int *) &userData[ss->faceUserAgeOffset]);
	}
	else {
		return 0;
	}
}
void *ccgSubSurf_getFaceUserData(CCGSubSurf *ss, CCGFace *f)
{
	int maxGridSize = ccg_gridsize(ss->subdivLevels);
	return FACE_getCenterData(f) + ss->meshIFC.vertDataSize * (1 + f->numVerts * maxGridSize + f->numVerts * maxGridSize * maxGridSize);
}
int ccgSubSurf_getFaceNumVerts(CCGFace *f)
{
	return f->numVerts;
}
CCGVert *ccgSubSurf_getFaceVert(CCGFace *f, int index)
{
	if (index < 0 || index >= f->numVerts) {
		return NULL;
	}
	else {
		return FACE_getVerts(f)[index];
	}
}
CCGEdge *ccgSubSurf_getFaceEdge(CCGFace *f, int index)
{
	if (index < 0 || index >= f->numVerts) {
		return NULL;
	}
	else {
		return FACE_getEdges(f)[index];
	}
}
int ccgSubSurf_getFaceEdgeIndex(CCGFace *f, CCGEdge *e)
{
	int i;

	for (i = 0; i < f->numVerts; i++) {
		if (FACE_getEdges(f)[i] == e) {
			return i;
		}
	}
	return -1;
}
void *ccgSubSurf_getFaceCenterData(CCGFace *f)
{
	return FACE_getCenterData(f);
}
void *ccgSubSurf_getFaceGridEdgeDataArray(CCGSubSurf *ss, CCGFace *f, int gridIndex)
{
	return ccgSubSurf_getFaceGridEdgeData(ss, f, gridIndex, 0);
}
void *ccgSubSurf_getFaceGridEdgeData(CCGSubSurf *ss, CCGFace *f, int gridIndex, int x)
{
	return _face_getIECo(f, ss->subdivLevels, gridIndex, x, ss->subdivLevels, ss->meshIFC.vertDataSize);
}
void *ccgSubSurf_getFaceGridDataArray(CCGSubSurf *ss, CCGFace *f, int gridIndex)
{
	return ccgSubSurf_getFaceGridData(ss, f, gridIndex, 0, 0);
}
void *ccgSubSurf_getFaceGridData(CCGSubSurf *ss, CCGFace *f, int gridIndex, int x, int y)
{
	return _face_getIFCo(f, ss->subdivLevels, gridIndex, x, y, ss->subdivLevels, ss->meshIFC.vertDataSize);
}

/*** External API iterator functions ***/

CCGVertIterator *ccgSubSurf_getVertIterator(CCGSubSurf *ss)
{
	return (CCGVertIterator *) _ehashIterator_new(ss->vMap);
}
CCGEdgeIterator *ccgSubSurf_getEdgeIterator(CCGSubSurf *ss)
{
	return (CCGEdgeIterator *) _ehashIterator_new(ss->eMap);
}
CCGFaceIterator *ccgSubSurf_getFaceIterator(CCGSubSurf *ss)
{
	return (CCGFaceIterator *) _ehashIterator_new(ss->fMap);
}

CCGVert *ccgVertIterator_getCurrent(CCGVertIterator *vi)
{
	return (CCGVert *) _ehashIterator_getCurrent((EHashIterator *) vi);
}
int ccgVertIterator_isStopped(CCGVertIterator *vi)
{
	return _ehashIterator_isStopped((EHashIterator *) vi);
}
void ccgVertIterator_next(CCGVertIterator *vi)
{
	_ehashIterator_next((EHashIterator *) vi);
}
void ccgVertIterator_free(CCGVertIterator *vi)
{
	_ehashIterator_free((EHashIterator *) vi);
}

CCGEdge *ccgEdgeIterator_getCurrent(CCGEdgeIterator *vi)
{
	return (CCGEdge *) _ehashIterator_getCurrent((EHashIterator *) vi);
}
int ccgEdgeIterator_isStopped(CCGEdgeIterator *vi)
{
	return _ehashIterator_isStopped((EHashIterator *) vi);
}
void ccgEdgeIterator_next(CCGEdgeIterator *vi)
{
	_ehashIterator_next((EHashIterator *) vi);
}
void ccgEdgeIterator_free(CCGEdgeIterator *vi)
{
	_ehashIterator_free((EHashIterator *) vi);
}

CCGFace *ccgFaceIterator_getCurrent(CCGFaceIterator *vi)
{
	return (CCGFace *) _ehashIterator_getCurrent((EHashIterator *) vi);
}
int ccgFaceIterator_isStopped(CCGFaceIterator *vi)
{
	return _ehashIterator_isStopped((EHashIterator *) vi);
}
void ccgFaceIterator_next(CCGFaceIterator *vi)
{
	_ehashIterator_next((EHashIterator *) vi);
}
void ccgFaceIterator_free(CCGFaceIterator *vi)
{
	_ehashIterator_free((EHashIterator *) vi);
}

/*** Extern API final vert/edge/face interface ***/

int ccgSubSurf_getNumFinalVerts(const CCGSubSurf *ss)
{
	int edgeSize = ccg_edgesize(ss->subdivLevels);
	int gridSize = ccg_gridsize(ss->subdivLevels);
	int numFinalVerts = (ss->vMap->numEntries +
	                     ss->eMap->numEntries * (edgeSize - 2) +
	                     ss->fMap->numEntries +
	                     ss->numGrids * ((gridSize - 2) + ((gridSize - 2) * (gridSize - 2))));

	return numFinalVerts;
}
int ccgSubSurf_getNumFinalEdges(const CCGSubSurf *ss)
{
	int edgeSize = ccg_edgesize(ss->subdivLevels);
	int gridSize = ccg_gridsize(ss->subdivLevels);
	int numFinalEdges = (ss->eMap->numEntries * (edgeSize - 1) +
	                     ss->numGrids * ((gridSize - 1) + 2 * ((gridSize - 2) * (gridSize - 1))));

	return numFinalEdges;
}
int ccgSubSurf_getNumFinalFaces(const CCGSubSurf *ss)
{
	int gridSize = ccg_gridsize(ss->subdivLevels);
	int numFinalFaces = ss->numGrids * ((gridSize - 1) * (gridSize - 1));
	return numFinalFaces;
}

/***/

void CCG_key(CCGKey *key, const CCGSubSurf *ss, int level)
{
	key->level = level;
	
	key->elem_size = ss->meshIFC.vertDataSize;
	key->has_normals = ss->calcVertNormals;
	key->num_layers = ss->meshIFC.numLayers;
	
	/* if normals are present, always the last three floats of an
	 * element */
	if (key->has_normals)
		key->normal_offset = key->elem_size - sizeof(float) * 3;
	else
		key->normal_offset = -1;

	key->grid_size = ccgSubSurf_getGridLevelSize(ss, level);
	key->grid_area = key->grid_size * key->grid_size;
	key->grid_bytes = key->elem_size * key->grid_area;

	key->has_mask = ss->allocMask;
	if (key->has_mask)
		key->mask_offset = ss->maskDataOffset;
	else
		key->mask_offset = -1;
}

void CCG_key_top_level(CCGKey *key, const CCGSubSurf *ss)
{
	CCG_key(key, ss, ccgSubSurf_getSubdivisionLevels(ss));
}
