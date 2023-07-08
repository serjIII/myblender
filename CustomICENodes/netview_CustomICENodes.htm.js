var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../scripts/prettify.js\"></script><script src=\"../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>CustomICENodes</title>\n\
   \n\
</head>\n\
   <body height=\"100%\"><div class=\"body_content\" id=\"body-content\"><style>\n\
/*  These settings override ones in the default stylesheets\n\
	used by the merged files that cause problems in combination\n\
	with the standard HTML help styles and page templates. */\n\
\n\
div, div.example, div.tip {\n\
	 margin:0;\n\
}\n\
\n\
td.example {\n\
	background: inherit;\n\
}\n\
\n\
/* This fixes a problem with nested pre blocks on an example page */\n\
pre pre {\n\
	display:block;\n\
	padding:0;\n\
	border-style:none;\n\
}\n\
</style><link rel=\"StyleSheet\" href=\"examples/Addons/CustomICENodes/doc/shared/examples.css\" type=\"text/css\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/CustomICENodes/doc/shared/utils.js\"); });</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>CustomICENodes</h1>\n\
         </div>\n\
\n\
		<div class=\"body\"><a name=\"top\"></a> <img class=\"netview\" src=\"netview_CustomICENodes.jpg\" style=\"PADDING-RIGHT:6px;FLOAT:left\" />\n\
			<h1>Custom ICENode Examples</h1>\n\
			<p>This addon shows various self-installing custom ICENodes.\n\
			</p>\n\
\n\
			<p /><strong>BBoxGenerator</strong><br />\n\
			This sample demonstrates how to use the single-threading model for implementing a custom ICENode. The node reads all the points of a geometry at\n\
			once and write the min and max point value on the output.\n\
\n\
			<p /><strong>CloudGeneratorFromDataFile</strong><br />\n\
			The example demonstrates the use of an element generator custom node (i.e. CloudGeneratorFromDataFile) and the built-in StringFilePathSequence node for generating a particle cloud from a\n\
			sequence of files. The CloudGeneratorFromDataFile custom node generates the particles by reading the \'pointposition\' values from the data files provided by the StringFilePathSequence node.\n\
			Other cloud attributes such as size and color are set by the SetAttributeValueFromDataFile custom node. The data files are generated with the mycache plugin example by exporting the\n\
			pointposition, size and color attribute values from a demo scene.\n\
\n\
			<p /><strong>CustomGoalDeformer</strong><br />\n\
			The CustomGoalDeformer sample demonstrates the use of the multi-phase evaluation approach for implementing a goal particle deformer. The ICENode reads the source particle points in the\n\
			first phase	and performs the final blending operation using the goal points in the last evaluation phase.\n\
\n\
			<p /><strong>CustomPassThrough</strong><br />\n\
			This example demonstrates how to handle port polymorphism programmatically in a custom node.\n\
\n\
			<p /><strong>CustomVector3ToScalar</strong><br />\n\
			This is a simple example of an ICENode. The node reads a vector3 input value, extracts the XYZ components and write each one to individual\n\
			output ports. This sample node is demonstrated with the CustomVector3ToScalar.scn scene which contains an ICENode graph that performs\n\
			a twist operation on a cube.\n\
\n\
			<p /><strong>ElementGenerator</strong><br />\n\
			This sample demonstrates how to implement an element generator ICENode typically used for generating particles. The ElementGenerator.scn contains an\n\
			instance of the ElementGenerator node and creates a 2D particle grid whose size is specified with the node\'s Size input port.\n\
\n\
			<p /><strong>GridWalker</strong><br />\n\
			This sample demonstrates how to use the custom type support for storing binary data values in ICE with custom ICENodes. The GridWalker sample moves particle points\n\
			randomly on a grid and keeps the state of each particle in a data structure stored as binary data in the ICE graph. The structure is updated at each frame with a\n\
			new particle state.\n\
\n\
			<p /><strong>PointGeneratorFromGeometry</strong><br />\n\
			The sample demonstrates how to use the CICEGeometry class for accessing geometry data within a custom ICE node. This is demonstrated by the PointGeneratorFromGeometry\n\
			node which generates particles on a set of geometry surfaces by using different sampling methods.\n\
\n\
			<p /><strong>PortStateObserver</strong><br />\n\
			This sample demonstrates how to determine if the state of the data and the geometry objects connected to a custom node have changed. The CICEPortState class is used\n\
			in this demo to	query for the states of any connected input data, whereas the CICEGeometry class is used to determine if the state of connected geometries have changed.\n\
\n\
            <p /><strong>Quake2Loaders</strong><br />\n\
			This sample demonstrates how to create custom nodes to read geometry from files and create geometry using ICE Modeling.<br />\n\
			The MD2Loader node reads a Quake2 MD2 model file and returns the geometry at a given frame.<br />\n\
			The BSPLoader node reads a Quake2 BSP map file, and returns the geometry based on a given position.<br />\n\
			The 2 loaders returns singleton arrays for the vertices, polygonal description, uvs, normals.<br />\n\
			The BSP loader also returns arrays for materials and materialIDs.<br />\n\
\n\
			<p /><strong>RandomGridGenerator</strong><br />\n\
			This sample demonstrates how to generate a particle cloud geometry with random points using the MATH::CRandom class of the C++ SDK.\n\
\n\
			<p /><strong>Vector3Union</strong><br />\n\
			This sample demonstrates how to create an array of CVector3f objects by combining the similar objects of 2 input CVector3f arrays in multi-threading. The sample\n\
			scene Vector3Union.scn demonstrates how to generates particles from the union of 2 point position vectors output by GetClosestPoints nodes.\n\
\n\
			<p /><strong>YPosFilter</strong><br />\n\
			The YPosFilter sample demonstrates how to remove elements from a node index set to achieve a filtering operation in an ICE graph. The YPosFilter.scn uses\n\
			the ICENode sample to remove all point elements of a cone whose Y components are below 0.0. You can watch the resulting effect by translating the cone in the\n\
			Y direction.\n\
				<h2>Example Files</h2>\n\
				<table>\n\
					<tr>\n\
						<td><strong>Location</strong></td>\n\
						<td><span class=\"installPath\"></span>\n\
						</td>\n\
					</tr>\n\
					<tr>\n\
						<td><strong>Files</strong></td>\n\
						<td>\n\
							<div class=\"examplefile\" folder=\"cppsrc_bboxgenerator\">BBoxGenerator.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_custom_goal_deformer\">CustomMultiPhaseGoal.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_custom_passthrough\">CustomPassThrough.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_customvector3toscalar\">CustomVector3ToScalar.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_elementgenerator\">ElementGenerator.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_gridwalker\">GridWalker.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_pointcloud_generator_from_file\">CloudGeneratorFromDataFile.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_pointcloud_generator_from_file\">SetAttributeValueNode.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_pointcloud_generator_from_file\">SetAttributeValuesNode.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_pointcloud_generator_from_file\">DataFileParser.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_pointcloud_generator_from_file\">DataFileParser.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_pointgenerator\">PointGeneratorFromGeometry.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_port_state_observer\">PortStateObserver.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_randomgridgenerator\">RandomGridGenerator.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_yposfilter\">YPosFilter.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_Vector3Union\">Vector3UnionNode.cpp</div>\n\
							<div class=\"examplefile\"> PortStateObserver_LogChanges.vbs</div>\n\
					</td></tr>\n\
				</table>\n\
				<a name=\"build\"></a>\n\
				<h2>Running the Example</h2>\n\
				<div id=\"toinstall\" style=\"DISPLAY:none\">\n\
					<p class=\"proc-head\">To install the example</p>\n\
					<ul>\n\
						<li>\n\
							<p>Connect to the Softimage SDK workgroup at\n\
								<span class=\"workgroupPath\">%XSISDK_ROOT%\\examples\\workgroup</span>.</p>\n\
							<ol>\n\
						<li>\n\
							In the <strong>Plug-in Manager</strong>, click the <strong>Workgroups</strong>\n\
						tab.\n\
						<li>\n\
							Click <strong>File</strong> and then click <strong>Connect</strong>.\n\
						<li>\n\
							In the <strong>Connect to Workgroup</strong> dialog box, click <img src=\"..\\..\\doc\\shared\\bBrowse.gif\" />,\n\
							locate the workgroup folder and then click <strong>Select</strong>.</li>\n\
						</li></li></ol> \n\
					</li></ul>\n\
					<p class=\"proc-head\">To view the help page for an example</p>\n\
					<ul>\n\
						<li>\n\
							Do one of the following:\n\
							<ul>\n\
								<li>\n\
									In the Plug-in Tree, expand the SDK examples workgroup, right-click the example\n\
									add-on and then click <strong>Help</strong>.\n\
								<li>\n\
									Open a Net View and click <img style=\"BOTTOM:-6px;POSITION:relative\" src=\"..\\..\\doc\\shared\\xsiweb.png\" />\n\
									to go to XSI Net local. In the top navigation bar, click <strong>add-ons</strong>,\n\
									and then click the SDK example add-on.\n\
								</li>\n\
							</li></ul>\n\
						\n\
					</li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the CustomPassThrough example</p>\n\
					<ul>\n\
						<li>\n\
							Load the Data\\Project\\Scenes\\CustomPassThrough.scn file.\n\
						<li>\n\
							Start the animation, the particle points are moving toward a cube.</li>\n\
					</li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the CustomVector3ToScalar example</p>\n\
					<ul>\n\
						<li>\n\
							Load the Data\\Project\\Scenes\\CustomVector3ToScalar.scn file.\n\
						<li>\n\
							Select the cube and open an ICE view.\n\
						<li>\n\
							Select the Multiple node in the ICE view.\n\
						<li>\n\
							Play with the value2 parameter slider and watch the cube being twisted along the Y axis.</li>\n\
					</li></li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the CustomGoalDeformer example</p>\n\
					<ul>\n\
						<li>\n\
							Load the Data\\Project\\Scenes\\CustomGoalDeformer.scn file.\n\
						<li>\n\
							Start the animation and watch the particle points of a sphere being blended with the points of a cube.</li>\n\
					</li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the BBoxGenerator example</p>\n\
					<ul>\n\
						<li>\n\
							Load the Data\\Project\\Scenes\\BBoxGenerator.scn file.\n\
						<li>\n\
							Select the cube and open its property page.\n\
						<li>\n\
							Play with the timeline and watch the sphere\'s Min and Max bounding box values logged in the history window.</li>\n\
					</li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the CloudGeneratorFromDataFile example</p>\n\
					<ul>\n\
						<li>\n\
							From the <strong>CloudGeneratorFromDataFile Demo</strong> menu located in the main menu bar, click <strong>Generate Simulation Data Files</strong> to generate the set of\n\
							dat files used by this demo (you only need to do that once).\n\
						<li>\n\
							From the same menu, click <strong>Load Demo Scene 1</strong> to load the PointCloudGeneratorFromFile1.scn scene. The scene has an ICE tree containing a CloudGeneratorFromDataFile\n\
							node to generate the particle points and two SetAttributeValueFromDataFile nodes for setting the color and size attributes on the generated particles.\n\
							SetAttributeValueFromDataFile is a generic node used for setting one single attribute, it is typically used to build graphs programmatically when an arbitrary number of\n\
							attributes need to be imported.\n\
						<li>\n\
							Start the animation and watch the particles being generated from the values saved in the simulation data files.\n\
						<li>\n\
							The <strong>Load Demo Scene 2</strong> 2 menu item loads the PointCloudGeneratorFromFile2.scn scene. This scene is similar to PointCloudGeneratorFromFile1.scn but uses a different node\n\
							(SetAttributeValuesFromDataFile) for setting the size and color attributes. Contrary to SetAttributeValueFromDataFile, SetAttributeValuesFromDataFile is pretty much hardcoded\n\
							for setting the color and size attributes from a single node but can be expanded easily to support more attributes.\n\
					</li></li></li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the ElementGenerator example</p>\n\
					<ul>\n\
						<li>\n\
							Load the Data\\Project\\Scenes\\ElementGenerator.scn file.\n\
						<li>\n\
							Select the PointCloud primitive and open an ICE view.\n\
						<li>\n\
							Select the ElementGenerator node in the ICE view.\n\
						<li>\n\
							Play with the Size parameter slider and watch the number of elements being changed on the particle grid.</li>\n\
					</li></li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the GridWalker example</p>\n\
					<ul>\n\
						<li>\n\
							Load the Data\\Project\\Scenes\\GridWalker.scn file.\n\
						<li>\n\
							Hit the time line play button and watch the particles moving around on a grid in a random fashion.\n\
					</li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the PointGeneratorFromGeometry example</p>\n\
					<ul>\n\
						<li>\n\
							Load the Data\\Project\\Scenes\\PointGeneratorFromGeometry.scn file.\n\
						<li>\n\
							Select the pointcloud primitive and open an ICE view.\n\
						<li>\n\
							Double-click on the Point Generator compound node in the ICE view.\n\
						<li>\n\
							Select one of the sampling methods from the PPG and watch the particles being generated on the geometries. The <code>Number of random points</code> parameter can\n\
							be used with the <code>Random Points</code> sampling method to specify the number of particles to generate per triangle.</li>\n\
					</li></li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the PortStateObserver example</p>\n\
					<ul>\n\
						<li>\n\
							From the PortStateObserver menu located in the main menu bar, click <strong>Log Changes</strong>. The PortStateObserver.scn scene is loaded and\n\
							information about the states of the data and geometry objects connected to the PortStateObserver custom node is accumulated and logged in the scripting history.\n\
					</li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the RandomGridGenerator example</p>\n\
					<ul>\n\
						<li>\n\
							Load the Data\\Project\\Scenes\\RandomGridGenerator.scn file.\n\
						<li>\n\
							Select the PointCloud primitive and open an ICE view.\n\
						<li>\n\
							Select the RandomGridGenerator node in the ICE view.\n\
						<li>\n\
							Play with the Size and Seed parameter sliders and watch the particle grid elements changing.</li>\n\
					</li></li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the Vector3Union example</p>\n\
					<ul>\n\
						<li>\n\
							Load the Data\\Project\\Scenes\\Vector3Union.scn file.\n\
						<li>\n\
							Play with the time line and watch the red particles being generated from the points output by the \"Vector3 Union\" node.\n\
							</li>\n\
					</li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the YPosFilter example</p>\n\
					<ul>\n\
						<li>\n\
							Load the Data\\Project\\Scenes\\YPosFilter.scn file.\n\
						<li>\n\
							Interactively translates the cone position along the Y axis and watch the vertices being scaled down as you move the cone up or down.</li>\n\
					</li></ul>\n\
				</div>\n\
				<a name=\"build\"></a>\n\
				<h2>Building the Examples</h2>\n\
			<p>\n\
				Use the following instructions to build the ICENode samples.</p>\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the CustomGoalDeformer example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_custom_goal_deformer\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_custom_goal_deformer\\CustomMultiPhaseGoal.vcproj\">CustomMultiPhaseGoal</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_custom_goal_deformer\\CustomMultiPhaseGoal.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the CustomGoalDeformer example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_custom_goal_deformer</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the CustomPassThrough example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_custom_passthrough\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_custom_passthrough\\CustomPassThrough.vcproj\">CustomPassThrough</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_custom_passthrough\\CustomPassThrough.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the CustomPassThrough example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_custom_passthrough</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the CustomVector3ToScalar example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_customvector3toscalar\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_customvector3toscalar\\CustomVector3ToScalar.vcproj\">CustomVector3ToScalar</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_customvector3toscalar\\CustomVector3ToScalar.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the CustomVector3ToScalar example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_customvector3toscalar</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the BBoxGenerator example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_bboxgenerator\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_bboxgenerator\\BBoxGenerator.vcproj\">BBoxGenerator</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_bboxgenerator\\BBoxGenerator.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the BBoxGenerator example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_bboxgenerator</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the CloudGeneratorFromDataFile example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_cloudgeneratorfromdatafile\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_pointcloud_generator_from_file\\CloudGeneratorFromDataFile.vcproj\">CloudGeneratorFromDataFile</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_pointcloud_generator_from_file\\CloudGeneratorFromDataFile.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the CloudGeneratorFromDataFile example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_pointcloud_generator_from_file</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the ElementGenerator example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_elementgenerator\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_elementgenerator\\ElementGenerator.vcproj\">ElementGenerator</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_elementgenerator\\ElementGenerator.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the ElementGenerator example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_elementgenerator</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the GridWalker example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_gridwalker\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_gridwalker\\GridWalker.vcproj\">GridWalker</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_gridwalker\\GridWalker.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the GridWalker example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_gridwalker</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the PointGeneratorFromGeometry example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_pointgenerator\">Open</span>\n\
							an Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from an Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_pointgenerator\\PointGeneratorFromGeometry.vcproj\">PointGeneratorFromGeometry</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_pointgenerator\\PointGeneratorFromGeometry.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the PointGeneratorFromGeometry example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_pointgenerator</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the PortStateObserver example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_port_state_observer\">Open</span>\n\
							an Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from an Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_port_state_observer\\PortStateObserver.vcproj\">PortStateObserver</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_port_state_observer\\PortStateObserver.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the PortStateObserver example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_port_state_observer</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the RandomGridGenerator example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_randomgridgenerator\">Open</span>\n\
							an XSI command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from an XSI command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_randomgridgenerator\\RandomGridGenerator.vcproj\">RandomGridGenerator</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_randomgridgenerator\\RandomGridGenerator.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the RandomGridGenerator example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_randomgridgenerator</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the Vector3Union example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_vector3_union\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_vector3_union\\Vector3Union.vcproj\">Vector3Union</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_vector3_union\\Vector3Union.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the Vector3Union example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_vector3_union</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the YPosFilter example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_yposfilter\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_yposfilter\\YPosFilter.vcproj\">YPosFilter</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_yposfilter\\YPosFilter.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the YPosFilter example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_yposfilter</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
			</div>\n\
\n\
			<div id=\"keywords\">\n\
				<h2>Keywords</h2>\n\
				<p>This example uses the following keywords:</p>\n\
				<p>\n\
					ICENode ICENodeContext C++\n\
				</p>\n\
			</div>\n\
		</div>\n\
	      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";