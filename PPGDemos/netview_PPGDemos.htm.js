var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../scripts/prettify.js\"></script><script src=\"../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>PPGDemos</title>\n\
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
</style><link rel=\"StyleSheet\" href=\"examples/Addons/PPGDemos/doc/shared/examples.css\" type=\"text/css\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/PPGDemos/doc/shared/utils.js\"); });</script><script type=\"text/javascript\">\n\
//--------------------------------------------------\n\
//\n\
// Add the custom property named \"SimpleProperty\"\n\
// to the selected objects. If nothing is selected,\n\
// add the custom property to the scene root.\n\
//\n\
//--------------------------------------------------\n\
function runExample( s )\n\
{\n\
		if (g_app.Selection.Count == 0 )\n\
		{\n\
			// Nothing selected. Add the property to the scene root.\n\
			var prop = g_app.ActiveSceneRoot.AddProperty( \"SimpleProperty\");\n\
			g_app.InspectObj( prop );\n\
		}\n\
		else\n\
		{\n\
			// Add the custom property to each selected object, if possible.\n\
			var e = new Enumerator( g_app.Selection );\n\
			for ( ; !e.atEnd(); e.moveNext() )\n\
			{\n\
				var o = e.item();\n\
\n\
				// Object must be a scene item\n\
				// siSceneItemID = 66\n\
				if ( o.IsClassOf( 66 ) )\n\
				{\n\
					var prop = o.AddProperty( \"SimpleProperty\" );\n\
					g_app.InspectObj( prop );\n\
				}\n\
				else\n\
				{\n\
					var sMsg = \"Cannot add property to \" + o.Name + \". \";\n\
					sMsg = sMsg + o.Name + \" is not a SceneItem.\";\n\
\n\
					g_app.LogMessage( sMsg );\n\
				}\n\
			}\n\
		}\n\
}\n\
</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>PPGDemos</h1>\n\
         </div>\n\
\n\
<div class=\"body\"><a name=\"top\"></a>\n\
\n\
\n\
\n\
<img class=\"netview\" src=\"netview_PPGDemos.jpg\" style=\"float:left;padding-right:6px;\" />\n\
<h1>PPG Demos</h1>\n\
\n\
<p>This example includes three different plug-ins that show how to build property pages (PPGs).\n\
</p>\n\
\n\
<ul style=\"margin-left:78px\">\n\
<li>PPGDemos<br />\n\
This plug-in demonstrates many of the controls you can use on a property page.\n\
</li>\n\
\n\
<li>Embedded Synoptics<br />\n\
This plug-in shows how to embed a synoptic view in a property page.\n\
</li>\n\
\n\
<li>Simple Property<br />\n\
This plug-in shows how to add a property to the selected objects.\n\
</li>\n\
</ul>\n\
\n\
<h2>Example Files</h2>\n\
<table><tr>\n\
<td><strong>Location</strong></td><td><span class=\"installPath\"></span>\n\
</td>\n\
</tr>\n\
\n\
<tr>\n\
<td><strong>Files</strong></td>\n\
<td>\n\
	<div class=\"examplefile\">ppgdemoplugin.js</div>\n\
	<div class=\"examplefile\">ppgdemoplugin.vbs</div>\n\
	<div class=\"examplefile\">simpleproperty.vbs</div>\n\
	<div class=\"examplefile\">EmbeddedSynoptic.vbs</div>\n\
</td>\n\
</tr>\n\
\n\
\n\
</table>\n\
\n\
\n\
<a name=\"build\"></a><h2>Running the Examples</h2>\n\
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
\n\
<div>\n\
<p class=\"proc-head\">To run the EmbeddedSynoptic example</p>\n\
\n\
<ol>\n\
<li>Run the command <span class=\"runCmd\">DemoEmbeddedSynoptic</span>.\n\
<p />This command creates a cone and adds a custom property to the cone. The property page includes an embedded synoptic view.\n\
</li>\n\
<li>\n\
In the synoptic view, click a sphere to translate the cone. The <strong>Increment</strong> slider controls how far the object is translated each time you click a sphere.  You can reset the translation by clicking the large cone in the synoptic view.\n\
</li>\n\
\n\
</ol>\n\
\n\
</div>\n\
\n\
<div>\n\
<p class=\"proc-head\">To run the PPGDemos example</p>\n\
\n\
<ul>\n\
<li>In the <strong>View > Toolbars</strong> menu, click <strong>PPGDemos</strong>. In the toolbar, click the PPG demo you want to see.</li>\n\
<p style=\"margin-top:6px;margin-left:-1.5em;\">-or-</p>\n\
<li>Click the PPG demo you want to see:\n\
<ul>\n\
<li><span class=\"runCommand\" id=\"PPGTextEditor\">Text Editor Widget</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGBuildChain\">Build Chain</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGConfigSlider\">Config Slider</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGFilePicker\">File Picker</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGFileView\">File View</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGGridTester\">Grid Tester</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGProxyParam\">Proxy Param</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGInView\">PPG In View</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGLists\">Object Lists</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGFCurveBasic\">FCurve Basic</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGFCurveUserData\">FCurve UserData</span></li>\n\
<li><span class=\"runCommand\" id=\"PPGMultiFCurve\">Multi FCurve</span><br />\n\
<!--\n\
Customize the FCurve control with SetUIAttribute\n\
-->\n\
</li>\n\
</ul></li>\n\
\n\
\n\
\n\
\n\
</ul></div>\n\
\n\
\n\
<div>\n\
<p class=\"proc-head\">To run the SimpleProperty example</p>\n\
\n\
<ol>\n\
<li>Select the scene root or some other 3D object.</li>\n\
<li>On the Model toolbar, click <strong>Get &gt; Property &gt; Simple Property Menu</strong> menu.\n\
<p>The plug-in adds the SimpleProperty property to all selected objects (or, if nothing is selected, to the scene root).</p>\n\
</li>\n\
</ol>\n\
\n\
<p>-or-</p>\n\
<ul>\n\
<li>Click here to <span class=\"runExample\" id=\"addSimpleProperty\" title=\"Call a script embedded in this page to add the property\">add the property</span> to either the scene root or to the selected objects.</li>\n\
\n\
</ul>\n\
\n\
</div>\n\
\n\
<div id=\"keywords\">\n\
<h2>Keywords</h2>\n\
<p>This example uses the following keywords:</p>\n\
<p>\n\
JScript example, VBScript example,\n\
RegisterCommand,\n\
ActiveSceneRoot, AddProperty, CustomProperty,\n\
AddParameter2, AddParameter3,\n\
PPGLayout, AddItem, AddButton, Logic, SetAttribute, LogicPrefix,\n\
AddGroup, EndGroup, AddRow, EndRow,\n\
InspectObj,\n\
PSet.Inspected,\n\
NoLabel, ValueOnly, NoSlider, Decimals,\n\
Refresh,\n\
EditParameterDefinition,\n\
siUIFileFilter,\n\
siControlFilePath, siUIOpenFile, siUIInitialDir, siUISubFolder, siUIFileMustExist, siUIInitialDir,\n\
AddString,\n\
InstallationPath,\n\
PSet.Scripts.Value,\n\
PSet.File.Value,\n\
ActiveXObject,\n\
Scripting.FileSystemObject,\n\
Execute, OnInit, OnChanged, OnClicked, CreateLayout,\n\
Curve, Value, Keys, GetKeyValue,\n\
AddGeometry, AddCluster, Geometry, Clusters, ActivePrimitive, FindIndex,\n\
FcurveData,\n\
BinaryData,\n\
AddGridParameter, siControlGrid,\n\
AddItem, AddEnumControl,\n\
SetAttribute, siUINoSlider, SetRowValues, RowValue, ColumnCount,\n\
SetColumnLabel, SetRowLabel, SetColumnValues, EndEdit, BeginEdit,\n\
AddProxyParam,\n\
AddColor,\n\
VBArray,\n\
Desktop, ActiveLayout, Views, Property Panel, targetcontent,\n\
AddFCurveParameter,\n\
synoptic, embedded synoptic, property page, PPG, controls,\n\
TextEditor, Text, Editor, Scintilla, Folding, Margin, LineNumbering, Numbering, LineWrap, Language, syntax, highlighting, keywords\n\
</p>\n\
</div>\n\
\n\
\n\
\n\
</div>\n\
      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";