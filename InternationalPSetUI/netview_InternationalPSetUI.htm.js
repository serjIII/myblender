var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../scripts/prettify.js\"></script><script src=\"../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>InternationalPSetUI</title>\n\
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
</style><link rel=\"StyleSheet\" href=\"examples/Addons/InternationalPSetUI/doc/shared/examples.css\" type=\"text/css\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/InternationalPSetUI/doc/shared/utils.js\"); });</script><script type=\"text/javascript\">\n\
function runExample( sProperty )\n\
{\n\
	var oCustomProperty = g_xsiapp.ActiveSceneRoot.AddProperty( sProperty,false ) ;\n\
	g_app.InspectObj( oCustomProperty ) ;\n\
}\n\
</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>InternationalPSetUI</h1>\n\
         </div>\n\
\n\
<div class=\"body\"><a name=\"top\"></a>\n\
\n\
\n\
\n\
<img class=\"netview\" src=\"netview_InternationalPSetUI.jpg\" style=\"float:left;padding-right:6px;\" />\n\
<h1>InternationalPSetUI</h1>\n\
\n\
<p>This example shows how to internationalize a user interface for a plug-in, containing:</p>\n\
\n\
<ul>\n\
<li>Creating a .dictxml resource file as the string table for the translation dictionary.</li>\n\
<li>Installing and uninstalling the translation dictionary.</li>\n\
<li>Internationalize a PPG that\'s built in a self-installing plugin-in(JScript and C++ version).</li>\n\
<li>Internationalize a custom toolbar.</li>\n\
<li>Internationalize other visible strings in the user interface such as menu, message box, log message.</li>\n\
</ul>\n\
\n\
<p><strong>Note</strong> This example implements a same user interface to the PSetUIDemo SDK example, but the purpose is to demonstrate the internationalization. See the PSetUIDemo example for creating the custom property and building user interface.\n\
</p>\n\
\n\
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
	<div class=\"examplefile\">InternationalPSetUIDemo.dictxml</div>\n\
	<div class=\"examplefile\">_InstallInternationPsetUIDict.js</div>\n\
	<div class=\"examplefile\">InternationalPSetUIJScript.js</div>\n\
	<div class=\"examplefile\">InternationalPSetUICPP.cpp</div>\n\
	<div class=\"examplefile\">GNUmakefile</div>\n\
	<div class=\"examplefile\">InternationalPSetUICPP.vcproj</div>\n\
	<div class=\"examplefile\">logo.bmp</div>\n\
	<div class=\"examplefile\">InternationalPSetUI.xsitb</div>\n\
</td>\n\
</tr>\n\
\n\
\n\
</table>\n\
\n\
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
<p class=\"proc-head\">To see the Japanese user interface for the plugin (JScript or C++ version)</p>\n\
\n\
<ol>\n\
<li>Launch Japanese Softimage.</li>\n\
<li>On the Model toolbar &gt; Get &gt; Property, below two menus show with Japanese label.<br />\n\
	<strong>InternationalPSetUI - JScript Version</strong><br />\n\
	- or -<br />\n\
	<strong>InternationalPSetUI - C++ API Version</strong>\n\
</li>\n\
<li>On the view &gt; toolbars &gt; InternationalPSetUI below two buttons show with Japanese label and tooltip.<br />\n\
	<strong>Create InternationalPSetUIJScript Property</strong><br />\n\
	- or -<br />\n\
	<strong>Create InternationalPSetUICPP Property</strong>\n\
</li>\n\
<li>Select a scene object, for example, the scene root.</li>\n\
<li>\n\
	<p>Do one of the following to see internationalized PPG (All labels, combo box items and other visible strings on the PPG are translated to Japanese) :</p>\n\
	<ul>\n\
		<li>Click one of above menus or button.<br /></li>\n\
\n\
		<li>\n\
			<p>Create an instance of the custom property using SceneItem.AddProperty and then open the property page with InspectObj:</p>\n\
		\n\
<pre>\n\
<span class=\"comment\">// JScript</span>\n\
<span class=\"comment\">// Create an instance of the JScript custom property</span>\n\
var oCustomProperty = ActiveSceneRoot.AddProperty( \"InternationalPSetUIJscript\",false ) ;\n\
InspectObj( oCustomProperty ) ;\n\
\n\
<span class=\"comment\">\' VBscript</span>\n\
<span class=\"comment\">\' Create an instance of the C++ custom property</span>\n\
set oPSet = ActiveSceneRoot.AddProperty( \"InternationalPSetUICPP\" )\n\
InspectObj oPSet\n\
</pre>\n\
		</li>\n\
	</ul>\n\
</li>\n\
</ol>\n\
\n\
</div>\n\
\n\
<a name=\"build\"></a><h2>Installing or unstalling the translation dictionary</h2>\n\
<p>\n\
This example implements two custom commands in _InstallInternationPSetUIDict.js to install or uninstall a translation dictionary.\n\
</p>\n\
<p class=\"proc-head\">To install a translation dictionary</p>\n\
<p><strong>Note </strong>In this example, the translation dictionary will be installed automatically while loading _InstallInternationPSetUIDict.js plugin.</p>\n\
<ul>\n\
<li>Run this code in the script editor:</li>\n\
\n\
<pre>\n\
<span class=\"comment\">\' VBscript</span>\n\
dictxmlFile = XSIUtils.BuildPath( Application.InstallationPath( siFactoryPath ), \"XSISDK\\examples\\workgroup\\Addons\\InternationalPSetUI\\Application\\Plugins\", \"InternationalPSetUIDemo.dictxml\" )\n\
InstallXSIUIDict( dictxmlFile ) \n\
</pre>\n\
</ul>\n\
<p class=\"proc-head\">To uninstall a translation dictionary</p>\n\
<ul>\n\
<li>Run this code in the script editor:</li>\n\
\n\
<pre>\n\
<span class=\"comment\">\' VBscript</span>\n\
UninstallXSIUIDict( \"InternationalPSetUIDemo\" ) \n\
</pre>\n\
</ul>\n\
\n\
<a name=\"build\"></a><h2>Building the C++ Example</h2>\n\
<p>\n\
The Softimage SDK includes a compiled version of InternationalPSetUICPP. If you want to modify the code, you can rebuild the example by following these instructions.</p>\n\
\n\
<div id=\"windows-build\">\n\
<p class=\"proc-head\">To build the example on Windows</p>\n\
<ol>\n\
<li><p><span class=\"sishell\">Open</span> an Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio.</p>\n\
<p>Starting Visual Studio from an Softimage command prompt ensures that environment variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link errors).</p>\n\
\n\
<p><strong>Tip</strong> To load the <span class=\"devenv\" vcproj=\"InternationalPSetUICPP.vcxproj\">InternationalPSetUICPP</span> project from the command line, type:</p>\n\
<pre>devenv <span class=\"installPath\">InternationalPSetUICPP.vcxproj</span></pre>\n\
\n\
\n\
</li>\n\
<li>In Visual Studio, open the project file .vcxproj.</li>\n\
<li>Select a configuration (x64 Release or x64 Debug) and build the DLL.</li>\n\
</ol>\n\
</div>\n\
\n\
\n\
<div id=\"linux-build\">\n\
<p class=\"proc-head\">To build the example on Linux</p>\n\
<ol>\n\
<li>\n\
<p>In a shell (tcsh) window, type:</p>\n\
<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
</li>\n\
\n\
<li>\n\
<p>Change directories to</p>\n\
<pre><span class=\"installPath\">cppsrc</span></pre>\n\
</li>\n\
\n\
<li>\n\
<p>To remove all intermediate files before building the example, run this command:</p>\n\
<pre>gmake clean</pre>\n\
</li>\n\
\n\
<li>\n\
<p />To compile the example, run this command:<p />\n\
<pre>gmake</pre>\n\
</li>\n\
</ol>\n\
</div>\n\
\n\
<div id=\"keywords\">\n\
<h2>Keywords</h2>\n\
<p>This example uses the following keywords:</p>\n\
<p>\n\
C++ example, SPDL, RegisterProperty, RegisterMenu, Parameter, CustomProperty, AddParameter,\n\
Define, DefineLayout, PPGEvent, PPGEventContext, GetEventID, siParameterChange, siTabChange, siButtonClicked, siOnInit,\n\
PPGLayout, PPGItem, AddTab, AddGroup, AddRow, EndGroup, EndRow,\n\
AddItem, PutAttribute, siUIThumbWheel, siUIImageFile, siUIOpenFile, siUIFileMustExist, siUIInitialDir, siUISubFolder, siPPGItemAttribute,\n\
AddString, AddButton, PutWidthPercentage, AddEnumControl, AddStaticText,\n\
PutParameterValue, GetPPGLayout,\n\
ExecuteCommand, GetAsText,\n\
siTabChange, siParameterChange, GetAttribute, Button, Tab,\n\
PutParameterValue,\n\
AddCallbackItem, SetAttribute, AddColor, AddEnumControl, siControlCombo, UIItems, AddSpacer, AddProperty\n\
\n\
</p>\n\
</div>\n\
\n\
\n\
</div>\n\
      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";