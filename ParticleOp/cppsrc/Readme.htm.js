var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../../scripts/prettify.js\"></script><script src=\"../../../../../../../../../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=windows-1252\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>CREATING AN OPERATOR TO MANIPULATE PARTICLE CLOUDS</title>\n\
   \n\
</head>\n\
   <body height=\"100%\"><div class=\"body_content\" id=\"body-content\"><style>\n\
v\\:* {behavior:url(#default#VML);}\n\
o\\:* {behavior:url(#default#VML);}\n\
w\\:* {behavior:url(#default#VML);}\n\
.shape {behavior:url(#default#VML);}\n\
</style><style>\n\
<!--\n\
 /* Font Definitions */\n\
@font-face\n\
	{font-family:Wingdings;\n\
	panose-1:5 0 0 0 0 0 0 0 0 0;\n\
	mso-font-charset:2;\n\
	mso-generic-font-family:auto;\n\
	mso-font-pitch:variable;\n\
	mso-font-signature:0 268435456 0 0 -2147483648 0;}\n\
@font-face\n\
	{font-family:Tahoma;\n\
	panose-1:2 11 6 4 3 5 4 4 2 4;\n\
	mso-font-charset:0;\n\
	mso-generic-font-family:swiss;\n\
	mso-font-pitch:variable;\n\
	mso-font-signature:553679495 -2147483648 8 0 66047 0;}\n\
@font-face\n\
	{font-family:Verdana;\n\
	panose-1:2 11 6 4 3 5 4 4 2 4;\n\
	mso-font-charset:0;\n\
	mso-generic-font-family:swiss;\n\
	mso-font-pitch:variable;\n\
	mso-font-signature:536871559 0 0 0 415 0;}\n\
 /* Style Definitions */\n\
p.MsoNormal, li.MsoNormal, div.MsoNormal\n\
	{mso-style-parent:\"\";\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:12.0pt;\n\
	font-family:\"Times New Roman\";\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:windowtext;}\n\
h1\n\
	{margin-top:0in;\n\
	margin-right:0in;\n\
	margin-bottom:3.15pt;\n\
	margin-left:0in;\n\
	mso-pagination:widow-orphan;\n\
	mso-outline-level:1;\n\
	font-size:8.0pt;\n\
	font-family:Arial;\n\
	color:black;\n\
	text-transform:uppercase;\n\
	mso-font-kerning:18.0pt;\n\
	font-weight:bold;}\n\
h2\n\
	{margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	mso-outline-level:2;\n\
	font-size:6.5pt;\n\
	font-family:Arial;\n\
	color:#006699;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
h3\n\
	{margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	mso-outline-level:3;\n\
	font-size:6.5pt;\n\
	font-family:Arial;\n\
	color:#FF6600;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
h4\n\
	{margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	mso-outline-level:4;\n\
	font-size:6.5pt;\n\
	font-family:Arial;\n\
	font-variant:small-caps;\n\
	color:#006699;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
h5\n\
	{margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	mso-outline-level:5;\n\
	font-size:6.5pt;\n\
	font-family:Arial;\n\
	font-variant:small-caps;\n\
	color:#006699;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
h6\n\
	{margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	mso-outline-level:6;\n\
	font-size:6.5pt;\n\
	font-family:Arial;\n\
	font-variant:small-caps;\n\
	color:#006699;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
a:link, span.MsoHyperlink\n\
	{mso-ascii-font-family:Arial;\n\
	mso-hansi-font-family:Arial;\n\
	mso-bidi-font-family:Arial;\n\
	color:#CC0000;\n\
	mso-text-animation:none;\n\
	text-decoration:none;\n\
	text-underline:none;\n\
	text-decoration:none;\n\
	text-line-through:none;}\n\
a:visited, span.MsoHyperlinkFollowed\n\
	{mso-ascii-font-family:Arial;\n\
	mso-hansi-font-family:Arial;\n\
	mso-bidi-font-family:Arial;\n\
	color:#CC0000;\n\
	mso-text-animation:none;\n\
	text-decoration:none;\n\
	text-underline:none;\n\
	text-decoration:none;\n\
	text-line-through:none;}\n\
p\n\
	{margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:8.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#666666;}\n\
pre\n\
	{margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	tab-stops:45.8pt 91.6pt 137.4pt 183.2pt 229.0pt 274.8pt 320.6pt 366.4pt 412.2pt 458.0pt 503.8pt 549.6pt 595.4pt 641.2pt 687.0pt 732.8pt;\n\
	font-size:10.0pt;\n\
	font-family:\"Courier New\";\n\
	mso-fareast-font-family:\"Courier New\";\n\
	color:windowtext;}\n\
p.author, li.author, div.author\n\
	{mso-style-name:author;\n\
	margin-top:0in;\n\
	margin-right:1.55pt;\n\
	margin-bottom:0in;\n\
	margin-left:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:4.5pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#FF6600;}\n\
p.onsitedate, li.onsitedate, div.onsitedate\n\
	{mso-style-name:onsitedate;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:6.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#FF6600;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
p.onsitetitle, li.onsitetitle, div.onsitetitle\n\
	{mso-style-name:onsitetitle;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:6.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#006699;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
p.onsitelink, li.onsitelink, div.onsitelink\n\
	{mso-style-name:onsitelink;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:9.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#3399CC;\n\
	text-transform:uppercase;}\n\
p.cathead, li.cathead, div.cathead\n\
	{mso-style-name:cathead;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:6.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#336699;\n\
	font-weight:bold;}\n\
p.subcathead, li.subcathead, div.subcathead\n\
	{mso-style-name:subcathead;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:6.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#990000;\n\
	letter-spacing:.15pt;}\n\
p.galbody, li.galbody, div.galbody\n\
	{mso-style-name:galbody;\n\
	margin-top:0in;\n\
	margin-right:20.0pt;\n\
	margin-bottom:0in;\n\
	margin-left:0in;\n\
	margin-bottom:.0001pt;\n\
	line-height:7.3pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:6.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#666666;}\n\
p.h3bak, li.h3bak, div.h3bak\n\
	{mso-style-name:h3bak;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:5.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	font-variant:small-caps;\n\
	color:#FF6600;\n\
	text-transform:uppercase;}\n\
p.galname, li.galname, div.galname\n\
	{mso-style-name:galname;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	text-indent:-2.0pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:4.5pt;\n\
	font-family:Verdana;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	mso-bidi-font-family:Arial;\n\
	font-variant:small-caps;\n\
	color:#CC0000;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
p.galtitle, li.galtitle, div.galtitle\n\
	{mso-style-name:galtitle;\n\
	margin-top:0in;\n\
	margin-right:5.0pt;\n\
	margin-bottom:0in;\n\
	margin-left:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:5.0pt;\n\
	font-family:Verdana;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	mso-bidi-font-family:Arial;\n\
	font-variant:small-caps;\n\
	color:#FF6600;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
p.leadin, li.leadin, div.leadin\n\
	{mso-style-name:leadin;\n\
	margin-top:0in;\n\
	margin-right:1.55pt;\n\
	margin-bottom:0in;\n\
	margin-left:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:6.5pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#666666;}\n\
p.cs, li.cs, div.cs\n\
	{mso-style-name:cs;\n\
	margin-top:0in;\n\
	margin-right:1.55pt;\n\
	margin-bottom:0in;\n\
	margin-left:0in;\n\
	margin-bottom:.0001pt;\n\
	line-height:6.25pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:5.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#666666;}\n\
p.cs1, li.cs1, div.cs1\n\
	{mso-style-name:cs1;\n\
	margin-top:0in;\n\
	margin-right:1.55pt;\n\
	margin-bottom:0in;\n\
	margin-left:0in;\n\
	margin-bottom:.0001pt;\n\
	text-align:justify;\n\
	line-height:6.25pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:4.5pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:black;}\n\
p.mag, li.mag, div.mag\n\
	{mso-style-name:mag;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	text-align:justify;\n\
	line-height:125%;\n\
	mso-pagination:widow-orphan;\n\
	font-size:6.5pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#333333;}\n\
p.menuitems, li.menuitems, div.menuitems\n\
	{mso-style-name:menuitems;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:7.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#DD0000;\n\
	text-transform:uppercase;}\n\
p.menulev1, li.menulev1, div.menulev1\n\
	{mso-style-name:menulev1;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:5.0pt;\n\
	font-family:Verdana;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	mso-bidi-font-family:Arial;\n\
	color:black;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
p.menulev2, li.menulev2, div.menulev2\n\
	{mso-style-name:menulev2;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:4.5pt;\n\
	font-family:Verdana;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	mso-bidi-font-family:Arial;\n\
	color:#666666;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
p.menulev3, li.menulev3, div.menulev3\n\
	{mso-style-name:menulev3;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:4.5pt;\n\
	font-family:Verdana;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	mso-bidi-font-family:Arial;\n\
	color:#999999;\n\
	text-transform:uppercase;\n\
	font-weight:bold;}\n\
p.menulev4, li.menulev4, div.menulev4\n\
	{mso-style-name:menulev4;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:4.5pt;\n\
	font-family:Verdana;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	mso-bidi-font-family:Arial;\n\
	color:#999999;}\n\
p.menulev3old, li.menulev3old, div.menulev3old\n\
	{mso-style-name:menulev3old;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:4.5pt;\n\
	font-family:Verdana;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	mso-bidi-font-family:Arial;\n\
	font-variant:small-caps;\n\
	color:#CC0000;\n\
	text-transform:uppercase;}\n\
p.form, li.form, div.form\n\
	{mso-style-name:form;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	text-align:right;\n\
	mso-pagination:widow-orphan;\n\
	background:white;\n\
	font-size:8.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#666666;}\n\
p.formleft, li.formleft, div.formleft\n\
	{mso-style-name:formleft;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:8.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#666666;}\n\
p.formrequire, li.formrequire, div.formrequire\n\
	{mso-style-name:formrequire;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	text-align:right;\n\
	mso-pagination:widow-orphan;\n\
	font-size:8.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#993333;\n\
	font-weight:bold;}\n\
p.formrequireleft, li.formrequireleft, div.formrequireleft\n\
	{mso-style-name:formrequireleft;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:8.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#993333;}\n\
p.forminput, li.forminput, div.forminput\n\
	{mso-style-name:forminput;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	background:white;\n\
	font-size:8.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#666666;}\n\
p.check, li.check, div.check\n\
	{mso-style-name:check;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:8.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#666666;}\n\
p.radio, li.radio, div.radio\n\
	{mso-style-name:radio;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:8.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#666666;}\n\
p.oshead, li.oshead, div.oshead\n\
	{mso-style-name:oshead;\n\
	margin-top:0in;\n\
	margin-right:0in;\n\
	margin-bottom:0in;\n\
	margin-left:2.6pt;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:4.5pt;\n\
	font-family:Verdana;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	mso-bidi-font-family:Arial;\n\
	color:#3F3F3F;}\n\
p.osblurb, li.osblurb, div.osblurb\n\
	{mso-style-name:osblurb;\n\
	margin-top:0in;\n\
	margin-right:0in;\n\
	margin-bottom:0in;\n\
	margin-left:13.05pt;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:9.0pt;\n\
	font-family:Verdana;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	mso-bidi-font-family:Arial;\n\
	color:#191919;}\n\
p.osdate, li.osdate, div.osdate\n\
	{mso-style-name:osdate;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:4.5pt;\n\
	font-family:Verdana;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	mso-bidi-font-family:Arial;\n\
	color:#FF3300;}\n\
p.old, li.old, div.old\n\
	{mso-style-name:old;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:8.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#FF3300;}\n\
p.quoteinfo, li.quoteinfo, div.quoteinfo\n\
	{mso-style-name:quoteinfo;\n\
	margin:0in;\n\
	margin-bottom:.0001pt;\n\
	text-align:right;\n\
	line-height:6.8pt;\n\
	mso-pagination:widow-orphan;\n\
	font-size:6.0pt;\n\
	font-family:Arial;\n\
	mso-fareast-font-family:\"Times New Roman\";\n\
	color:#666666;}\n\
@page Section1\n\
	{size:8.5in 11.0in;\n\
	margin:1.0in 1.25in 1.0in 1.25in;\n\
	mso-header-margin:.5in;\n\
	mso-footer-margin:.5in;\n\
	mso-paper-source:0;}\n\
div.Section1\n\
	{page:Section1;}\n\
 /* List Definitions */\n\
@list l0\n\
	{mso-list-id:1224098950;\n\
	mso-list-type:hybrid;\n\
	mso-list-template-ids:-18547570 1449439722 -113886900 -1732449728 1450206988 -1200459378 -193066552 2045957752 1396235712 -1502713232;}\n\
@list l0:level1\n\
	{mso-level-number-format:bullet;\n\
	mso-level-text:\\F0A7;\n\
	mso-level-tab-stop:.5in;\n\
	mso-level-number-position:left;\n\
	text-indent:-.25in;\n\
	mso-ansi-font-size:10.0pt;\n\
	font-family:Wingdings;}\n\
@list l1\n\
	{mso-list-id:1787692724;\n\
	mso-list-type:hybrid;\n\
	mso-list-template-ids:-1750709650 -177173446 135308838 -2082962032 1501323640 -1651892706 -799743552 59778108 1420849478 429411696;}\n\
@list l1:level1\n\
	{mso-level-number-format:bullet;\n\
	mso-level-text:\\F0A7;\n\
	mso-level-tab-stop:.5in;\n\
	mso-level-number-position:left;\n\
	text-indent:-.25in;\n\
	mso-ansi-font-size:10.0pt;\n\
	font-family:Wingdings;}\n\
@list l2\n\
	{mso-list-id:1989892747;\n\
	mso-list-type:hybrid;\n\
	mso-list-template-ids:-1738230268 650257828 1674760936 -1542033128 195052508 -733300576 1853536312 -1073723622 4483548 -1849922446;}\n\
@list l2:level1\n\
	{mso-level-number-format:bullet;\n\
	mso-level-text:\\F0A7;\n\
	mso-level-tab-stop:.5in;\n\
	mso-level-number-position:left;\n\
	text-indent:-.25in;\n\
	mso-ansi-font-size:10.0pt;\n\
	font-family:Wingdings;}\n\
ol\n\
	{margin-bottom:0in;}\n\
ul\n\
	{margin-bottom:0in;}\n\
-->\n\
</style><style>\n\
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
</style><link rel=\"File-List\" href=\"examples/Addons/ParticleOp/cppsrc/Creating%20an%20Operator%20to%20Manipulate%20Particle%20Clouds_files/filelist.xml\" /><link rel=\"Edit-Time-Data\" href=\"examples/Addons/ParticleOp/cppsrc/Creating%20an%20Operator%20to%20Manipulate%20Particle%20Clouds_files/editdata.mso\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/ParticleOp/cppsrc/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/ParticleOp/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>CREATING AN OPERATOR TO MANIPULATE PARTICLE CLOUDS</h1>\n\
         </div>\n\
\n\
\n\
<div class=\"Section1\">\n\
\n\
<h2>Creating an Operator to Manipulate Particle Clouds<o:p></o:p></h2>\n\
\n\
<p>This example demonstrates how to write a compiled Softimage operator that manipulates\n\
a particle cloud. In this example, the particles in the cloud are made to flock\n\
together, and a custom property page allows the user to tweak the variables\n\
that control the flocking behavior. This example uses Softimage\'s C++ API.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>This case study is divided into two parts:<o:p></o:p></p>\n\
\n\
<ul style=\'margin-top:0in\' type=\"square\">\n\
 <li class=\"MsoNormal\" style=\'color:#666666;line-height:7.3pt;mso-list:l0 level1 lfo1;\n\
     tab-stops:list .5in\'><span style=\'font-size:6.0pt;font-family:Arial\'><a href=\"http://bamboo/support/Xsi/SDK/CaseStudies/ParticleOp/#Part 1\">Part 1</a>:\n\
     Describes how to download, install, and compile the operator. <o:p></o:p></span></li>\n\
 <li class=\"MsoNormal\" style=\'color:#666666;line-height:7.3pt;mso-list:l0 level1 lfo1;\n\
     tab-stops:list .5in\'><span style=\'font-size:6.0pt;font-family:Arial\'><a href=\"http://bamboo/support/Xsi/SDK/CaseStudies/ParticleOp/#Part 2\">Part 2</a>:\n\
     Describes the how the operator was developed, including the user\n\
     interface. <o:p></o:p></span></li>\n\
</ul>\n\
\n\
<h2><span style=\'font-size:12.0pt;color:#3399CC\'>Part 1</span><o:p></o:p></h2>\n\
\n\
<h2>Getting Started<o:p></o:p></h2>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<h3>Installation<o:p></o:p></h3>\n\
\n\
<p>Drag and drop the ExampleParticleOp.xsiaddon file into Softimage or choose the\n\
File &gt; Add-ons &gt; Install command. Creating your own add-on is discussed\n\
further in <a href=\"http://bamboo/support/Xsi/SDK/CaseStudies/ParticleOp/#Installing the SPDL and dll\">Installing\n\
the Plug-in</a>.&nbsp;An .xsiaddon file demonstrates how easily a plug-in can\n\
be distributed, even when it contains a compiled .dll.&nbsp;<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<h3>using the example<o:p></o:p></h3>\n\
\n\
<p>The add-on file creates the ExampleParticleOp toolbar. Click the Demo button\n\
to launch a sample script (ExampleParticleOpDemo.vbs), which creates a scene to\n\
demonstrate the capabilities of the operator. Move the sliders on the property\n\
page to change the space in which the simulation occurs and the flocking\n\
behavior of the particles.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p><!--[if gte vml 1]><v:shapetype id=\"_x0000_t75\" coordsize=\"21600,21600\"\n\
 o:spt=\"75\" o:preferrelative=\"t\" path=\"m@4@5l@4@11@9@11@9@5xe\" filled=\"f\"\n\
 stroked=\"f\">\n\
 <v:stroke joinstyle=\"miter\"/>\n\
 <v:formulas>\n\
  <v:f eqn=\"if lineDrawn pixelLineWidth 0\"/>\n\
  <v:f eqn=\"sum @0 1 0\"/>\n\
  <v:f eqn=\"sum 0 0 @1\"/>\n\
  <v:f eqn=\"prod @2 1 2\"/>\n\
  <v:f eqn=\"prod @3 21600 pixelWidth\"/>\n\
  <v:f eqn=\"prod @3 21600 pixelHeight\"/>\n\
  <v:f eqn=\"sum @0 0 1\"/>\n\
  <v:f eqn=\"prod @6 1 2\"/>\n\
  <v:f eqn=\"prod @7 21600 pixelWidth\"/>\n\
  <v:f eqn=\"sum @8 21600 0\"/>\n\
  <v:f eqn=\"prod @7 21600 pixelHeight\"/>\n\
  <v:f eqn=\"sum @10 21600 0\"/>\n\
 </v:formulas>\n\
 <v:path o:extrusionok=\"f\" gradientshapeok=\"t\" o:connecttype=\"rect\"/>\n\
 <o:lock v:ext=\"edit\" aspectratio=\"t\"/>\n\
</v:shapetype><v:shape id=\"_x0000_i1025\" type=\"#_x0000_t75\" alt=\"\" style=\'width:637.5pt;\n\
 height:337.5pt\'>\n\
 <v:imagedata src=\"ExampleUse.jpg\"\n\
  o:href=\"http://bamboo/support/Xsi/SDK/CaseStudies/ParticleOp/images/ExampleUse.jpg\"/>\n\
</v:shape><![endif]--><![if !vml]><img border=\"0\" width=\"850\" height=\"450\" src=\"ExampleUse.jpg\" v:shapes=\"_x0000_i1025\" /><![endif]><o:p></o:p></p>\n\
\n\
<p>You can use the operator on basically any particle cloud. You can freeze the\n\
particle cloud and apply the operator with the &quot;ApplyOp&quot; command. For\n\
more details see ExampleParticleOpDemo.vbs.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<h3>Compilation<o:p></o:p></h3>\n\
\n\
<p>From Microsoft Visual Studio, load the ExampleParticleOp.dsp file as the\n\
workspace and compile. Visual Studio needs to be configured with the Softimage SDK\n\
include path in the list of include paths. See the <i>Plug-in Integration</i>\n\
guide for more information about setting up your environment to compile an Softimage\n\
plug-in.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<h2><span style=\'font-size:12.0pt;color:#3399CC\'>Part 2</span><o:p></o:p></h2>\n\
\n\
<h2>Case Study - building the Plug-in<o:p></o:p></h2>\n\
\n\
<p>This section gives some additional details on the workflow used to develop\n\
this plug-in, with the aim of giving you an idea how to build your own Softimage\n\
plug-in operators. The following steps are covered:<o:p></o:p></p>\n\
\n\
<p class=\"MsoNormal\" style=\'margin-top:0in;margin-right:.5in;margin-bottom:0in;\n\
margin-left:1.0in;margin-bottom:.0001pt;text-indent:-.25in;line-height:7.3pt;\n\
mso-list:l2 level1 lfo2;tab-stops:list .5in\'><![if !supportLists]><span style=\'font-size:10.0pt;mso-bidi-font-size:6.0pt;font-family:Wingdings;\n\
mso-bidi-font-family:Arial;color:#666666\'>�<span style=\'font:7.0pt \"Times New Roman\"\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
</span></span><![endif]><span style=\'font-size:6.0pt;font-family:Arial;\n\
color:#666666\'>Choosing the type of plug-in and doing some design. <o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'margin-top:0in;margin-right:.5in;margin-bottom:0in;\n\
margin-left:1.0in;margin-bottom:.0001pt;text-indent:-.25in;line-height:7.3pt;\n\
mso-list:l2 level1 lfo2;tab-stops:list .5in\'><![if !supportLists]><span style=\'font-size:10.0pt;mso-bidi-font-size:6.0pt;font-family:Wingdings;\n\
mso-bidi-font-family:Arial;color:#666666\'>�<span style=\'font:7.0pt \"Times New Roman\"\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
</span></span><![endif]><span style=\'font-size:6.0pt;font-family:Arial;\n\
color:#666666\'>Prototyping as a scripted operator. <o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'margin-top:0in;margin-right:.5in;margin-bottom:0in;\n\
margin-left:1.0in;margin-bottom:.0001pt;text-indent:-.25in;line-height:7.3pt;\n\
mso-list:l2 level1 lfo2;tab-stops:list .5in\'><![if !supportLists]><span style=\'font-size:10.0pt;mso-bidi-font-size:6.0pt;font-family:Wingdings;\n\
mso-bidi-font-family:Arial;color:#666666\'>�<span style=\'font:7.0pt \"Times New Roman\"\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
</span></span><![endif]><span style=\'font-size:6.0pt;font-family:Arial;\n\
color:#666666\'>Converting from a scripted operator to a C++ plug-in, getting it\n\
compiled, installed and ready for debugging. <o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'margin-top:0in;margin-right:.5in;margin-bottom:0in;\n\
margin-left:1.0in;margin-bottom:.0001pt;text-indent:-.25in;line-height:7.3pt;\n\
mso-list:l2 level1 lfo2;tab-stops:list .5in\'><![if !supportLists]><span style=\'font-size:10.0pt;mso-bidi-font-size:6.0pt;font-family:Wingdings;\n\
mso-bidi-font-family:Arial;color:#666666\'>�<span style=\'font:7.0pt \"Times New Roman\"\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
</span></span><![endif]><span style=\'font-size:6.0pt;font-family:Arial;\n\
color:#666666\'>Implementing the algorithm. <o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'margin-top:0in;margin-right:.5in;margin-bottom:0in;\n\
margin-left:1.0in;margin-bottom:.0001pt;text-indent:-.25in;line-height:7.3pt;\n\
mso-list:l2 level1 lfo2;tab-stops:list .5in\'><![if !supportLists]><span style=\'font-size:10.0pt;mso-bidi-font-size:6.0pt;font-family:Wingdings;\n\
mso-bidi-font-family:Arial;color:#666666\'>�<span style=\'font:7.0pt \"Times New Roman\"\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
</span></span><![endif]><span style=\'font-size:6.0pt;font-family:Arial;\n\
color:#666666\'>Exposing pParameters to control the algorithm\'s behavior. <o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'margin-top:0in;margin-right:.5in;margin-bottom:0in;\n\
margin-left:1.0in;margin-bottom:.0001pt;text-indent:-.25in;line-height:7.3pt;\n\
mso-list:l2 level1 lfo2;tab-stops:list .5in\'><![if !supportLists]><span style=\'font-size:10.0pt;mso-bidi-font-size:6.0pt;font-family:Wingdings;\n\
mso-bidi-font-family:Arial;color:#666666\'>�<span style=\'font:7.0pt \"Times New Roman\"\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
</span></span><![endif]><span style=\'font-size:6.0pt;font-family:Arial;\n\
color:#666666\'>Providing a custom UI for the operator\'s property page. <o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'margin-top:0in;margin-right:.5in;margin-bottom:0in;\n\
margin-left:1.0in;margin-bottom:.0001pt;text-indent:-.25in;line-height:7.3pt;\n\
mso-list:l2 level1 lfo2;tab-stops:list .5in\'><![if !supportLists]><span style=\'font-size:10.0pt;mso-bidi-font-size:6.0pt;font-family:Wingdings;\n\
mso-bidi-font-family:Arial;color:#666666\'>�<span style=\'font:7.0pt \"Times New Roman\"\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
</span></span><![endif]><span style=\'font-size:6.0pt;font-family:Arial;\n\
color:#666666\'>Packing the finished plug-in as an add-on. <o:p></o:p></span></p>\n\
\n\
<h3>Planning/Design<o:p></o:p></h3>\n\
\n\
<p>The first step in writing a plug-in is careful consideration of the purpose\n\
of the plug-in. This is important for any software project, but specifically in\n\
the context of Softimage this includes the consideration of:<o:p></o:p></p>\n\
\n\
<ul style=\'margin-top:0in\' type=\"square\">\n\
 <li class=\"MsoNormal\" style=\'color:#666666;line-height:7.3pt;mso-list:l1 level1 lfo3;\n\
     tab-stops:list .5in\'><span style=\'font-size:6.0pt;font-family:Arial\'>Whether\n\
     the plug-in should be immediate or persistent. <o:p></o:p></span></li>\n\
 <li class=\"MsoNormal\" style=\'color:#666666;line-height:7.3pt;mso-list:l1 level1 lfo3;\n\
     tab-stops:list .5in\'><span style=\'font-size:6.0pt;font-family:Arial\'>Which\n\
     scripting language or compiled technology to use. <o:p></o:p></span></li>\n\
 <li class=\"MsoNormal\" style=\'color:#666666;line-height:7.3pt;mso-list:l1 level1 lfo3;\n\
     tab-stops:list .5in\'><span style=\'font-size:6.0pt;font-family:Arial\'>How\n\
     the plug-in will interact with the user, including the user interface. <o:p></o:p></span></li>\n\
 <li class=\"MsoNormal\" style=\'color:#666666;line-height:7.3pt;mso-list:l1 level1 lfo3;\n\
     tab-stops:list .5in\'><span style=\'font-size:6.0pt;font-family:Arial\'>In\n\
     the case of an Softimage Operator, what inputs and outputs will define the\n\
     operator\'s interaction with the rest of Softimage. <o:p></o:p></span></li>\n\
</ul>\n\
\n\
<p>In this case, with the goal of creating a custom particle simulation, a\n\
persistent effect, in particular an Softimage operator, is the most suitable type of\n\
plug-in because it provides behavior similar to that of Softimage\'s built-in cloud\n\
simulation--when the user presses <b>Play</b>, they automatically see the\n\
simulation occur. An immediate effect, like a custom command, could also change\n\
the positions of particles in the cloud, but it would only do this when the\n\
command is executed.&nbsp;<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<h3>Prototyping from Scripted Operator<o:p></o:p></h3>\n\
\n\
<p>The initial proof-of-concept work was all done in Softimage using a Scripted\n\
Operator.&nbsp;<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>When developing a plug-in it is often very useful to establish a demo script\n\
immediately.<span style=\"mso-spacerun: yes\">� </span>This can be better than\n\
reusing a scene file, because it makes the steps to use the plug-in very clear,\n\
and avoids unexpected dependencies on the contents of a scene file.<span style=\"mso-spacerun: yes\">� </span>So, in this case, the first step was to\n\
create a simple script to create a frozen cloud:<o:p></o:p></p>\n\
\n\
<pre><span style=\'font-size:7.5pt;color:black\'>\'ExampleParticleOpDemo.vbs<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>\'<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>\'Initial script to set up the particle cloud<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>\'with a specified number of particles<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'>option explicit<o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'>dim g_NumberOfParticles<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>g_NumberOfParticles = 27<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>SetupScene()<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>sub SetupScene()<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>dim oCloud, oEmitter, oCluster, oUDM, oOps, oOp<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>NewScene ,false<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>set oCloud = CreateParticleCloud().Item( 0 )<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>\'Use an emitter to create our particles<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>set oEmitter= CreatePrim( &quot;Sphere&quot;, &quot;MeshSurface&quot;, &quot;ParticleEmitter&quot; )<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>AddParticleEmitter oCloud, oEmitter <o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>\'At 1 second the number of particles specified by the<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>\'emission rate will have been reached<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>SetValue oEmitter &amp; &quot;.ParticleEmitter_emission.Rate&quot;, g_NumberOfParticles<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>SetValue &quot;PlayControl.Current&quot;, 30<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>\'Now get rid of the emitter and freeze the cloud - we will<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>\'simulate the particles ourselves<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>FreezeObj oCloud<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>DeleteObj oEmitter<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>oEmitter = Empty<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>SetValue &quot;PlayControl.Current&quot;, 1<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>end sub</span><span style=\'color:#666666\'><o:p></o:p></span></pre>\n\
\n\
<p>The cloud is frozen to remove the built-in Softimage particle simulator operator.&nbsp;\n\
When the scene is played back after running this scrip,&nbsp; the particles do\n\
not move at all.&nbsp; Next a simple scripted operator was attached to the\n\
particle cloud primitive, which will take care of driving the particle\n\
simulation:<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p><!--[if gte vml 1]><v:shape id=\"_x0000_i1026\" type=\"#_x0000_t75\" alt=\"\"\n\
 style=\'width:562.5pt;height:465pt\'>\n\
 <v:imagedata src=\"ScriptOpExperiments.jpg\"\n\
  o:href=\"http://bamboo/support/Xsi/SDK/CaseStudies/ParticleOp/images/ScriptOpExperiments.jpg\"/>\n\
</v:shape><![endif]--><![if !vml]><img border=\"0\" width=\"750\" height=\"620\" src=\"ScriptOpExperiments.jpg\" v:shapes=\"_x0000_i1026\" /><![endif]><o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>At this point there is no flocking algorithm, just some simple code to\n\
access the input and output object and to move the particles.&nbsp; By default\n\
a scripted operator will only be reevaluated if one of its input objects has\n\
changed.&nbsp; To force this operator to reevaluate at each frame, an animated\n\
parameter called �TimeVar� is added.&nbsp;<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>Notice how Application.Logmessage is used to print values into the script\n\
window as a means of debugging.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<h3>Moving to C++<o:p></o:p></h3>\n\
\n\
<p>Once the basic concept of controlling the cloud shape is working, you can\n\
start moving the implementation to C++. The first step is saving the Scripted\n\
Operator\'s SPDL file as ExampleParticleOp.spdl. The SPDL file is shown\n\
below:&nbsp;<o:p></o:p></p>\n\
\n\
<pre><span style=\'font-size:7.5pt;color:black\'>SPDL<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>Version = &quot;2.0.0.1&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>Reference = &quot;{CCEEAC35-D311-4F71-9D71-96E0C337D021}&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>Name = &quot;ParticleOpExample&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>PropertySet &quot;ExampleParticleOp_Params&quot;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>Parameter &quot;ExampleParticleOp&quot; input<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:3\'>������������������������������ </span>GUID<span style=\"mso-spacerun: yes\">� </span>= {CCEEAC35-D311-4F71-9D71-96E0C337D021};<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Type<span style=\"mso-spacerun: yes\">� </span>= VT_EMPTY;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Caps<span style=\"mso-spacerun: yes\">� </span>= Persistable; /* 0x00000004 */<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>}<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>Parameter &quot;TimeVar&quot; input<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>GUID<span style=\"mso-spacerun: yes\">� </span>= {A5572AA8-FD13-41B2-857B-4F26729DE222};<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Name<span style=\"mso-spacerun: yes\">� </span>= &quot;TimeVar&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Description = &quot;TimeVar&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Type<span style=\"mso-spacerun: yes\">� </span>= VT_I4;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Caps<span style=\"mso-spacerun: yes\">� </span>= Persistable, Animatable; /* 0x00000005 */<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Class = Visualization, 0x00004060; /* 0x00004061 */<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Value = 0;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Range = 0 To 400;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>}<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>}<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>PortSet &quot;ScriptedOpPrototype_Ports&quot;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>Group &quot;Group_0&quot;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Origin = Select;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>Output &quot;Out_Cloud&quot;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:3\'>������������������������������ </span>Major = {E80A1590-CA13-11CF-91B9-00AA00624C2D};<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:3\'>������������������������������ </span>Minor = {3A9ECA60-4F91-11D0-AA46-00A0243E34C4};<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:3\'>������������������������������ </span>Interface = {CDEA6775-415B-11D0-AA40-00A0243E34C4};<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:3\'>������������������������������ </span>Attributes = 0x00000001;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>}<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>}<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>}<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>Plugin = Scripted<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>Language = &quot;VBScript&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>Update =<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>BeginScript<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>dim oCloud <o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>\'Output port is connected to the ParticleCloudPrimitve obj<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>set oCloud = Out.Value<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>logmessage &quot;Evaluation Ouput:&quot; &amp; oCloud &amp; &quot;, Input: &quot; &amp; oUDM<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>set oPos = xsimath.CreateVector3<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>set oParticleColl = oCloud.Particles<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>\'For the purposes of our protype just demonstrate<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>\'that we can move all the particles each frame<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>for cnt = 0 to oParticleColl.Count - 1<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>set oParticle = oParticleColl.Item( cnt )<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>oPos.x = 0.1 * oParticle.ID<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>oPos.y = -2 + 0.05 * In_UpdateContext.CurrentFrame<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span></span><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'>oPos.z = 0<o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'><span style=\'mso-tab-count:1\'>��������� </span>oParticle.Position = oPos<o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>next<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>EndScript<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>Helpers =<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>BeginScript<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>EndScript<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>}</span><span style=\'color:#666666\'><o:p></o:p></span></pre>\n\
\n\
<p>There are three major sections to this file: <b>PropertySet</b>, <b>PortSet</b>,\n\
and <b>Plugin</b>. In order to port to C++, the Plugin section is changed to\n\
the following (the # symbol denotes a comment line):<o:p></o:p></p>\n\
\n\
<pre><span style=\'font-size:7.5pt;color:#666666\'>Plugin = Library<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'><span style=\'mso-tab-count:1\'>��������� </span>#defines the dll name<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'><span style=\'mso-tab-count:1\'>��������� </span>Filename = &quot;ExampleParticleOp&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'><span style=\'mso-tab-count:1\'>��������� </span>EntryPoints<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'><span style=\'mso-tab-count:1\'>��������� </span>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'><span style=\'mso-tab-count:2\'>������������������� </span>#Name of the exported API function<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'><span style=\'mso-tab-count:2\'>������������������� </span>Update = &quot;ExampleParticleOp_Update&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'><span style=\'mso-tab-count:2\'>������������������� </span></span><span style=\'font-size:7.5pt;mso-bidi-font-size:12.0pt;mso-fareast-font-family:\"Times New Roman\";\n\
color:black\'>Term = &quot;ExampleParticleOp_Term&quot;;</span><span style=\'font-size:7.5pt;color:#666666\'><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'><span style=\'mso-tab-count:1\'>��������� </span>}<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:#666666\'>}</span><span style=\'color:#666666\'><o:p></o:p></span></pre>\n\
\n\
<p>The next step is creating a .dll (ExampleParticleOp) with<span style=\"mso-spacerun: yes\">� </span>two entry\n\
points:&nbsp;ExampleParticleOp_Update and ExampleParticleOp_Term.<span style=\"mso-spacerun: yes\">� </span>The .dll is created in the same directory as\n\
ExampleParticleOp.spdl. Initially, empty implementations are created as\n\
follows:<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>CStatus\n\
ExampleParticleOp_Init</span><o:p></o:p></p>\n\
\n\
<p><span style=\'font-family:\"Courier New\";color:black\'>(</span><o:p></o:p></p>\n\
\n\
<p><span style=\'mso-tab-count:1\'>��������������� </span><span style=\'font-family:\n\
\"Courier New\";color:black\'>UpdateContext&amp;<span style=\'mso-tab-count:1\'>������ </span>in_ctx,</span><o:p></o:p></p>\n\
\n\
<p><span style=\'mso-tab-count:1\'>��������������� </span><span style=\'font-family:\n\
\"Courier New\";color:black\'>OutputPort&amp;<span style=\'mso-tab-count:2\'>��������� </span>&nbsp;&nbsp;&nbsp;<span style=\'mso-tab-count:2\'>���������� </span>in_outPort</span><o:p></o:p></p>\n\
\n\
<p><span style=\'font-family:\"Courier New\";color:black\'>)</span><o:p></o:p></p>\n\
\n\
<p><span style=\'font-family:\"Courier New\";color:black\'>{</span><o:p></o:p></p>\n\
\n\
<p><span style=\'mso-tab-count:1\'>��������������� </span><span style=\'font-family:\n\
\"Courier New\";color:black\'>return CStatus::OK ;&nbsp;</span><o:p></o:p></p>\n\
\n\
<p><span style=\'font-family:\"Courier New\";color:black\'>}</span><o:p></o:p></p>\n\
\n\
<p><span style=\'font-family:\"Courier New\";color:black\'>CStatus ExampleParticleOp_Term(</span><o:p></o:p></p>\n\
\n\
<p><span style=\'mso-tab-count:4\'>��������������������������������������������������������������� </span><span style=\'font-family:\"Courier New\";color:black\'>XSI::UpdateContext&amp; in_rCtx,</span><o:p></o:p></p>\n\
\n\
<p><span style=\'mso-tab-count:4\'>��������������������������������������������������������������� </span><span style=\'font-family:\"Courier New\";color:black\'>long )</span><o:p></o:p></p>\n\
\n\
<p><span style=\'font-family:\"Courier New\";color:black\'>{</span><o:p></o:p></p>\n\
\n\
<p><span style=\'mso-tab-count:1\'>��������������� </span><span style=\'font-family:\n\
\"Courier New\";color:black\'>return CStatus::OK ;&nbsp;</span><o:p></o:p></p>\n\
\n\
<p><span style=\'font-family:\"Courier New\";color:black\'>}</span><o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>An empty implementation of ExampleParticleOp_Update is implemented\n\
(returning S_OK) and the project compiles properly, and is ready for testing in\n\
Softimage.&nbsp;<o:p></o:p></p>\n\
\n\
<h3>&nbsp;<o:p></o:p></h3>\n\
\n\
<h3><span style=\'color:#3399CC\'>Installing the SPDL and dll</span><o:p></o:p></h3>\n\
\n\
<p>For the end user of a plug-in, the Softimage add-on format makes installing and\n\
uninstalling the plug-in easy. However as a plug-in developer you need to do\n\
some more manual work to get the plug-in installed.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>Once the debug configuration is compiled, the ExampleParticleOp.dll file is\n\
created in the Debug subdirectories. (Make sure that only one of either Debug\n\
or Release is present, otherwise Softimage will install both). Next this command is\n\
used from the Softimage command prompt to copy the SPDL file and .dll into the\n\
Softimage user directory.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p><i>xsi -i ExampleParticleOpDemo.SPDL</i> <o:p></o:p></p>\n\
\n\
<p>This operation also registers the plug-in and creates the\n\
ExampleParticleOp.preset file. Preset files contain the initial values for the\n\
parameters.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>Once installed it is time to extend the demo script,\n\
ExampleParticleOpDemo.vbs, so that it applies the new operator.<span style=\"mso-spacerun: yes\">� </span>This is done by adding the following code.<o:p></o:p></p>\n\
\n\
<pre><span style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:#666666\'><span style=\'mso-tab-count:1\'>��������� </span></span><span style=\'font-size:7.5pt;\n\
color:black\'><span style=\"mso-spacerun: yes\">�</span>on error resume next<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; set oOps = ApplyOp(&quot;ExampleParticleOpCpp&quot;)<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if err &lt;&gt; 0 then<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; logmessage &quot;The ExampleParticleOp is not properly installed.&nbsp; Please try re-installing the addon file&quot;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; exit sub<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; end if <o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; on error goto 0<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; set oOp = oOps.Item(0)<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SetKey oOp &amp; &quot;.TimeVar&quot;, 1, 0<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SetKey oOp &amp; &quot;.TimeVar&quot;, 100, 400<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>&nbsp;</span><span style=\'color:#666666\'><o:p></o:p></span></pre>\n\
\n\
<p>Although the .dll was still just an empty stub, this demonstrates that\n\
everything is working well enough to start doing some actual development. Because\n\
you know the original VBScript code works, the next step is to implement\n\
ExampleParticleOp_Update by porting the VBScript code into C++, for\n\
example:&nbsp;<o:p></o:p></p>\n\
\n\
<pre><span style=\'color:gray\'><span style=\'mso-tab-count:1\'>������� </span></span><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:black\'>set oCloud = Out.Value</span><span style=\'color:#666666\'><o:p></o:p></span></pre>\n\
\n\
<p>becomes<o:p></o:p></p>\n\
\n\
<pre><span style=\'color:gray\'><span style=\'mso-tab-count:2\'>�������������� </span></span><span style=\'font-size:7.5pt;color:black\'>&nbsp;&nbsp;&nbsp;</span><span style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:black\'>ParticleCloudPrimitive outCloudPrim(in_outPort.GetValue());<o:p><o:p></o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre>\n\
\n\
<p>Now that you have a new .dll, Softimage needs to be updated by uninstalling and\n\
then reinstalling the .dll using:<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p><i>xsi -u ExampleParticleOpDemo.SPDL -silent<br />\n\
xsi -i ExampleParticleOpDemo.SPDL</i> <o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>After various iterations, you\'ll have a working operator that moves the\n\
particles in the cloud, at which point you\'re ready to start working on the\n\
details.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<h3>Debugging<o:p></o:p></h3>\n\
\n\
<p>Problems in the SPDL file or missing .dlls will result in error messages\n\
inside Softimage or when &quot;xsi -i&quot; is run. However once this is working, you\n\
may want to debug your actual C++ code. Rather than resorting to <i style=\'mso-bidi-font-style:normal\'>printf</i> statements, you can use the\n\
Visual Studio debugger effectively to step through the code and even use the\n\
Apply Code Changes feature to make code changes in memory without restarting\n\
the debugger.<o:p></o:p></p>\n\
\n\
<p>When you install your operator, your DLL is copied into the user directory,\n\
for example: <a href=\"file:///C:/users/%3cyourname%3e/Softimage/XSI_3.5/Application/bin/nt-x86/ParticleOpDemo.dll\">C:\\users\\&lt;yourname&gt;\\Softimage\\XSI_3.5\\Application\\bin\\nt-x86\\ParticleOpDemo.dll</a>.\n\
Normally it is this copy that will get loaded when you use your operator.\n\
However if you wish to debug you can force Softimage to load the DLL from its\n\
original location by launching Softimage from the directory containing that DLL.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>You can do this in Visual Studio by specifying two settings under\n\
&quot;Project\\Settings\\Debug&quot;.<o:p></o:p></p>\n\
\n\
<p>1) Set the &quot;Executable for Debug Session&quot; to the full path of\n\
XSI.exe<o:p></o:p></p>\n\
\n\
<p>2) Set the &quot;Working Directory&quot; to the path of your operator\'s\n\
source code (where the .dll was compiled)<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>You cannot initially set a breakpoint.<span style=\"mso-spacerun: yes\">�\n\
</span>However if you launch Softimage from the debugger and then apply your operator\n\
it will load the DLL and you will be able to set break points. (When you launch\n\
the debugger it will give a warning that XSI.exe does not contain debugger\n\
symbols.<span style=\"mso-spacerun: yes\">� </span>You can safely ignore this).<o:p></o:p></p>\n\
\n\
<p>Once you are done developing and debugging be sure to re-run:<o:p></o:p></p>\n\
\n\
<p><i style=\'mso-bidi-font-style:normal\'>xsi -u ExampleParticleOpDemo.SPDL\n\
-silent<br />\n\
xsi -i ExampleParticleOpDemo.SPDL</i>&nbsp;<o:p></o:p></p>\n\
\n\
<p>so that the copy of the .dll in the user directory is also updated.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<h3>The Algorithm<o:p></o:p></h3>\n\
\n\
<p>Each evaluation of the operator is straightforward. It reads the previous\n\
positions, calculates the interactions between the particles, and moves each\n\
particle a small amount to represent their next positions. Based on research into\n\
flocking algorithms and experimentation, it was decided that the previous\n\
velocity vector of each particle was required. This avoids the boredom of each\n\
particle having a constant speed but more importantly defines the direction\n\
that the particle is moving.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>The flocking aspect of the algorithm uses the concept that a particle will\n\
tend to go in the same direction but that it will also be attracted to other\n\
particles that are reasonably close. It also uses random jitter and repulsion\n\
to make sure that the particles don\'t just all rush to the exact same point in\n\
space. A bounding sphere is used to keep the particles on the screen. There are\n\
some &quot;constants&quot; that give the user control over the behavior. For\n\
example the FlockInfluence is how much to weight the influence of other\n\
particles against the particle\'s natural momentum. For more details, see the\n\
actual implementation. <o:p></o:p></p>\n\
\n\
<p>&nbsp; <o:p></o:p></p>\n\
\n\
<h3>Simulation State<o:p></o:p></h3>\n\
\n\
<p>As described in the section on the Algorithm, it is necessary to know each\n\
particle\'s Velocity and Position at the previous frame. You may be tempted to\n\
use the Particle\'s Velocity and Position attributes to store this information.\n\
However, this is not a reliable method because of the possible interaction with\n\
other operators. Instead, the state of the simulation is tracked inside the\n\
operator using the GetUserData and SetUserData methods of the UpdateContext\n\
object. The plug-in creates an array containing the following structure for\n\
each particle.<o:p></o:p></p>\n\
\n\
<pre><span lang=\"FR\" style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:black;\n\
mso-ansi-language:FR\'>struct PerParticleData<o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:black;\n\
mso-ansi-language:FR\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:black;\n\
mso-ansi-language:FR\'>{<o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:black;mso-ansi-language:\n\
FR\'><span style=\'mso-tab-count:1\'>��������� </span></span><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'>double pos[ 3 ] ;<o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:black;\n\
mso-ansi-language:FR\'><span style=\'mso-tab-count:1\'>��������� </span></span><span style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:black\'>double vel[ 3 ] ;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;mso-bidi-font-size:10.0pt;color:black\'>} ;</span><span style=\'color:#666666\'><o:p></o:p></span></pre>\n\
\n\
<p class=\"MsoNormal\"><span style=\'font-size:7.5pt;font-family:Tahoma;color:black\'>In\n\
theory, it is possible to imagine using a global variable to store this\n\
information.&nbsp; However by saving the buffer using\n\
UpdateContext::SetUserData there will be no risk of conflict with other\n\
instances of the operator in the same scene</span><span style=\'font-size:7.5pt;\n\
font-family:Tahoma;color:gray\'>.</span><span style=\'font-size:8.0pt;font-family:\n\
Arial;color:#666666\'> <o:p></o:p></span></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<h3>Adding Parameters<o:p></o:p></h3>\n\
\n\
<p>With a clear design from the onset you can potentially specify all the\n\
parameters directly at the time of prototyping the scripted operator. However\n\
commonly there is more an iterative process of adding parameters at a later time\n\
to offer more functionality to the user.&nbsp;<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p><span style=\'mso-bidi-font-size:12.0pt;color:gray\'>The most direct way to\n\
add or change parameters to a compiled operator is to edit the SPDL file\n\
directly.<span style=\"mso-spacerun: yes\">� </span>The format for the parameter\n\
section is fairly straightforward.<span style=\"mso-spacerun: yes\">� </span>For example,\n\
the Bounding Sphere Radius is a double value with a default value of 6, a\n\
slider from 0.01 to 100 and a valid range from 0.01 to 1000.</span> <o:p></o:p></p>\n\
\n\
<p>&nbsp; <o:p></o:p></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'color:#666666\'>Bounding Spere Radius appears like this in the SPDL file:<o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'color:#666666\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:#666666\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
</span><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>Parameter\n\
&quot;BoundaryLength&quot; input</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
{</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
Name&nbsp;&nbsp;&nbsp;&nbsp;\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
= &quot;Bounding Sphere Radius&quot;;</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
Description&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; =\n\
&quot;Bounding Sphere Radius&quot;;</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
</span><span lang=\"FR\" style=\'font-size:7.5pt;font-family:\"Courier New\";\n\
color:black;mso-ansi-language:FR\'>Guid&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
&nbsp;&nbsp;&nbsp; = &quot;{5CE83718-8581-4F08-A15D-FB6E2242E0D2}&quot;;</span><span lang=\"FR\" style=\'color:#666666;mso-ansi-language:FR\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span lang=\"FR\" style=\'font-size:7.5pt;font-family:\"Courier New\";color:black;\n\
mso-ansi-language:FR\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
</span><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
= VT_R8;</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
Range&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
= 0.01 to 1000;</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
Caps&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
= Persistable, Animatable;</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
Class&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
= Unknown;</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
Value = 6.0;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
UIType&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
= &quot;Number&quot;;</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
UIRange&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
= 0.01 to 100;</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p class=\"MsoNormal\" style=\'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto\'><span style=\'font-size:7.5pt;font-family:\"Courier New\";color:black\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
}</span><span style=\'color:#666666\'><o:p></o:p></span></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>The most important thing to remember when tweaking parameters is to make\n\
sure that each parameter has a unique GUID. If you ever cut and paste from\n\
another SPDL file you must change the GUID. Microsoft Visual Studio comes with\n\
a utility called guidgen which allows you to generate GUIDs. You will also need\n\
to reinstall the SPDL file each time you make a change to the parameter\n\
section.&nbsp;When editing the SPDL file it is important to edit the original\n\
copy of the SPDL file in the plug-in directory, not the copy of the SPDL file\n\
that is saved in the user directory.&nbsp; Any changes in the user directory\n\
version of the SPDL will be lost when the plug-in is reinstalled.<o:p></o:p></p>\n\
\n\
<p>&nbsp;<o:p></o:p></p>\n\
\n\
<p>Having these parameters on the Operators has no influence over the flocking\n\
behavior until you add more C++ code to read the values of the parameters. You\n\
can separate the code that performs the core algorithm from the code that\n\
communicates with Softimage. A simple structure called SimulationParams and a helper\n\
function called GetParameters() reads the state of the parameters and fills in\n\
the structure. The core algorithm just uses the SimulationParams structure.<o:p></o:p></p>\n\
\n\
<p>&nbsp; <o:p></o:p></p>\n\
\n\
<p>This is a screen shot showing how the operator appears in the Softimage explorer\n\
once all the parameters are added: <o:p></o:p></p>\n\
\n\
<p>&nbsp; <o:p></o:p></p>\n\
\n\
<p><!--[if gte vml 1]><v:shape id=\"_x0000_i1027\" type=\"#_x0000_t75\" alt=\"\"\n\
 style=\'width:273.75pt;height:327.75pt\'>\n\
 <v:imagedata src=\"OperatorInExplorer.jpg\"\n\
  o:href=\"http://bamboo/support/Xsi/SDK/CaseStudies/ParticleOp/images/OperatorInExplorer.jpg\"/>\n\
</v:shape><![endif]--><![if !vml]><img border=\"0\" width=\"365\" height=\"437\" src=\"OperatorInExplorer.jpg\" v:shapes=\"_x0000_i1027\" /><![endif]><o:p></o:p></p>\n\
\n\
<p>&nbsp; <o:p></o:p></p>\n\
\n\
<h3>Customizing the Layout<o:p></o:p></h3>\n\
\n\
<p>You can also design your own custom layout for the property page. In this\n\
case related properties are grouped inside boxes. The TimeVar parameter is not\n\
included because this is a hidden parameter, used just to force evaluation at\n\
each frame.<o:p></o:p></p>\n\
\n\
<pre><span style=\'font-size:7.5pt;color:black\'>Layout &quot;Default&quot;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>group &quot;Behavior&quot;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>&quot;FlockInfluence&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>&quot;FlockDistance&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>&quot;RepulsiveDistance&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>&quot;Velocity&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>&quot;DirectionVariance&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>}<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>group &quot;Particle Boundary&quot;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>{<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:2\'>������������������� </span>&quot;BoundaryLength&quot;;<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>}<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span>group &quot;Centre of Simulation&quot; <o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;color:black\'><span style=\'mso-tab-count:1\'>��������� </span></span><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'>{<o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'><span style=\'mso-tab-count:2\'>������������������� </span>&quot;x&quot;;<o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'><span style=\'mso-tab-count:2\'>������������������� </span>&quot;y&quot;;<o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'><span style=\'mso-tab-count:2\'>������������������� </span>&quot;z&quot;;<o:p></o:p></span></pre><pre><span lang=\"FR\" style=\'font-size:7.5pt;color:black;mso-ansi-language:FR\'><span style=\'mso-tab-count:1\'>��������� </span></span><span style=\'font-size:7.5pt;\n\
color:black\'>}<o:p></o:p></span></pre><pre><span style=\'font-size:7.5pt;\n\
color:black\'>}</span><span style=\'color:#666666\'><o:p></o:p></span></pre>\n\
\n\
<h3>Packaging the Example<o:p></o:p></h3>\n\
\n\
<p>Once satisfied that the plug-in works well enough to make an example, the SPDL\n\
is uninstalled,&nbsp; the debug .dll is deleted from the Debug subdirectory\n\
inside the project, a release version is compiled, and the SPDL is reinstalled.<o:p></o:p></p>\n\
\n\
<p>&nbsp; <o:p></o:p></p>\n\
\n\
<p>Softimage is restarted and some final touches are added to the example script and\n\
a new toolbar called ExampleParticleOp is created. Drag the script to the\n\
toolbar to create a new button called &quot;Demo&quot; that will execute this\n\
script.&nbsp; <o:p></o:p></p>\n\
\n\
<p>&nbsp; <o:p></o:p></p>\n\
\n\
<p>Use the File &gt; Add-on &gt; Package dialog to prepare the add-on. Pick the\n\
ExampleParticleOp toolbar and the ExampleParticleOp preset. Softimage automatically\n\
recognizes that the ExampleParticleOp.SPDL, and ExampleParticleOp.dll and\n\
ExampleParticleOpDemo.vbs files should also be included. The resulting xsiaddon\n\
file is a completely self contained file containing all these different elements.\n\
<o:p></o:p></p>\n\
\n\
<p class=\"MsoNormal\"><![if !supportEmptyParas]>&nbsp;<![endif]><o:p></o:p></p>\n\
\n\
</div>\n\
\n\
      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";