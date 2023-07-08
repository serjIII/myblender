var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../scripts/prettify.js\"></script><script src=\"../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>GridData</title>\n\
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
</style><link rel=\"StyleSheet\" href=\"examples/Addons/GridData/doc/shared/examples.css\" type=\"text/css\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/GridData/doc/shared/utils.js\"); });</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>GridData</h1>\n\
         </div>\n\
\n\
<div class=\"body\"><a name=\"top\"></a>\n\
\n\
<img class=\"netview\" src=\"netview_GridData.jpg\" style=\"float:left;padding-right:6px;\" />\n\
<h1>GridData</h1>\n\
\n\
<p>This example contains a Python and a C++ implementation of the grid data.</p>\n\
\n\
<a name=\"build\"></a><h2>Running the Example</h2>\n\
\n\
<div id=\"toinstall\" style=\"display:none\">\n\
<p class=\"proc-head\">To install the example</p>\n\
<ul>\n\
<li><p>Connect to the Softimage SDK workgroup at <span class=\"workgroupPath\">%XSISDK_ROOT%\\examples\\workgroup</span>.</p>\n\
	<ol>\n\
	<li>In the <strong>Plug-in Manager</strong>, click the <strong>Workgroups</strong> tab.</li>\n\
	<li>Click <strong>File</strong> and then click <strong>Connect</strong>.</li>\n\
	<li>In the <strong>Connect to Workgroup</strong> dialog box, click <img src=\"..\\..\\doc\\shared\\bBrowse.gif\" />, locate the workgroup folder and then click <strong>Select</strong>.</li>\n\
	</ol>\n\
</li>\n\
</ul>\n\
\n\
<p class=\"proc-head\">To view the help page for an example</p>\n\
\n\
<ul>\n\
<li>Do one of the following:</li>\n\
<ul>\n\
<li>In the Plug-in Tree, expand the SDK examples workgroup, right-click the example add-on and then click <strong>Help</strong>.\n\
</li>\n\
<li>\n\
Open a Net View and click <img style=\"position:relative;bottom:-6px;\" src=\"..\\..\\doc\\shared\\xsiweb.png\" /> to go to Softimage Net local. In the top navigation bar, click <strong>add-ons</strong>, and then click the SDK example add-on.\n\
</li>\n\
</ul>\n\
</ul>\n\
</div>\n\
\n\
<div>\n\
<p class=\"proc-head\">To run the example</p>\n\
<ul>\n\
<li>\n\
<p>Load an existing scene containing 3D objects and materials. Then, execute either the \"GDE_Create3DOGrid\" command (Python example) or the \"GDE_CreateCPPGrid\" command (CPP example). The grid data will be displayed</p>\n\
<br />\n\
<br />\n\
<strong>Python Example (\"GridDataExample.py\")</strong> \n\
<br />\n\
<br />\n\
\n\
<p>\n\
Once the plug-in is loaded, executing the \"GDE_Create3DOGrid\" command will \n\
create a new Custom Property called \"GDE_3DOGrid\", in which a grid data \n\
parameter called \"Data\" will be created.\n\
</p>\n\
\n\
<p>\n\
The grid data will contain one row per 3DObject in the scene, and the \n\
following is implemented in the Python plug-in:\n\
</p>\n\
<ul>\n\
    <li>3DObject rows are using a green background color</li>\n\
    <li>Model rows are using a blue background color</li>\n\
    <li>Selecting a cell in the \"Object\" color will select the object in the scene</li>\n\
    <li>A refresh button can be pushed to synchronize changes from the scene to the grid data</li>\n\
    <li>A dump button to log the contents of the grid data in the script log</li>\n\
    <li>A contextual menu allows setting the read-only flags on selected cells</li>\n\
</ul>\n\
\n\
<p>Details about the different columns in the example:</p>\n\
<ul>\n\
	<li>\n\
	    Object\n\
	    <ul>\n\
	    	<li>Uses the siColumnStandard column type</li>\n\
	    	<li>Lists the object names</li>\n\
	    	<li>Selecting the cell changes the scene selection</li>\n\
	    	<li>The plug-in blocks value changes for this column, using the return value in \"OnBeginValueChange\"</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    ID\n\
	    <ul>\n\
	    	<li>Uses the siColumnInt column type</li>\n\
	    	<li>Lists the object IDs</li>\n\
	    	<li>The plug-in blocks selection for this column, using the return value in \"OnBeginSelectionChange\"</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    Vis\n\
	    <ul>\n\
	    	<li>Uses the siColumnBool column type</li>\n\
	    	<li>Clicking on the checkmark will hide/show the object</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    Color\n\
	    <ul>\n\
	    	<li>Uses the siColumnColor column type</li>\n\
	    	<li>Clicking on the cell will let the user choose a wireframe display color for the object</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    Image\n\
	    <ul>\n\
	    	<li>Uses the siColumnImageClip column type</li>\n\
	    	<li>Double-clicking will inspect the associated imageclip in a PPG</li>\n\
	    	<li>A contextual menu lets the user select an image file</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    ShaderBall\n\
	    <ul>\n\
	    	<li>Uses the siColumnShaderBall column type</li>\n\
	    	<li>Double-clicking will inspect the associated material in the render tree</li>\n\
	    	<li>A contextual menu lets the user pick a material in the scene</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    Set Uni. Scl.\n\
	    <ul>\n\
	    	<li>Uses the siColumnFloat column type</li>\n\
	    	<li>Editing the value will force uniform local scaling values for the object</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    Translation\n\
	    <ul>\n\
	    	<li>Uses the siColumnVector column type</li>\n\
	    	<li>Editing the value will set the local translation values for the object </li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    Static Selection\n\
	    <ul>\n\
	    	<li>Uses the siColumnCombo column type</li>\n\
	    	<li>Will affect the Selected/Static parameter under the Display property for the object</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    Delete\n\
	    <ul>\n\
	    	<li>Uses the siColumnButton column type</li>\n\
	    	<li>Will delete the object from the scene once pushed</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    File\n\
	    <ul>\n\
	    	<li>Uses the siColumnFile column type</li>\n\
	    	<li>Double-clicking will launch a file browser that allows setting the file</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
	    Comment\n\
	    <ul>\n\
	    	<li>Uses the siColumnMultiLine column type</li>\n\
	    </ul>\n\
	</li>\n\
</ul>\n\
\n\
<br />\n\
<br />\n\
<strong>CPP Example (\"GridDataExampleCPP.cpp\")</strong> \n\
<br />\n\
<br />\n\
<p>\n\
Once the plug-in is loaded, executing the \"GDE_CreateCPPGrid\" command will \n\
create a new Custom Property called \"GDE_CPPGrid\", in which a grid data \n\
parameter called \"Data\" will be created.\n\
</p>\n\
\n\
<p>\n\
The grid data contains 5 rows. The last row (\"Sum\") will sum all the data, \n\
per column, when possible. \n\
</p>\n\
\n\
<p>\n\
The last row (\"Sum\") is not editable.\n\
</p>\n\
\n\
<p>\n\
The custom property also displays a dump button to log the contents of the grid \n\
data in the script log\n\
</p>\n\
\n\
<p>\n\
The column headers show what column types are used for the column. Here is \n\
additional details about some of the columns:\n\
</p>\n\
\n\
<ul>\n\
	<li>\n\
    	siColumnImageClip\n\
	    <ul>\n\
	    	<li>The assigned images are taken from the scene that is loaded at the time the \"GDE_CreateCPPGrid\" command was executed</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
    	siColumnButton\n\
	    <ul>\n\
	    	<li>Pressing the button will assign the color in the \"siColumnColor\" colum as the background color for the whole row</li>\n\
	    </ul>\n\
	</li>\n\
	<li>\n\
    	siColumnShaderBall\n\
	    <ul>\n\
	    	<li>The assigned materials are taken from the scene that is loaded at the time the \"GDE_CreateCPPGrid\" command was executed.</li>\n\
	    </ul>\n\
	</li>\n\
</ul>\n\
\n\
</li></ul></div>\n\
\n\
<div id=\"keywords\">\n\
<h2>Keywords</h2>\n\
<p>This example uses the following keywords:</p>\n\
<p>\n\
Python example, CPP example, GridData, self-installed plug-in\n\
</p>\n\
</div>\n\
</div>\n\
      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";