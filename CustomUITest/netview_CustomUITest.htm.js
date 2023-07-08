var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../scripts/prettify.js\"></script><script src=\"../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>CustomUITest</title>\n\
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
</style><link rel=\"StyleSheet\" href=\"examples/Addons/CustomUITest/doc/shared/examples.css\" type=\"text/css\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/CustomUITest/doc/shared/utils.js\"); });</script><script type=\"text/javascript\">\n\
\n\
function runExample( s )\n\
{\n\
	var oActiveLayout = g_app.Desktop.ActiveLayout;\n\
	var oCDH = oActiveLayout.CreateView( \"Custom Display Host\", \"MyCustomDisplayHost\" );\n\
	oCDH.SetAttributeValue( \"targetcontent\", \"NotificationTest\" );\n\
	oCDH.Resize( 500, 500 );\n\
}\n\
</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>CustomUITest</h1>\n\
         </div>\n\
\n\
<div class=\"body\"><a name=\"top\"></a>\n\
\n\
\n\
\n\
<img class=\"netview\" src=\"netview_CustomUITest.jpg\" style=\"float:left;padding-right:6px;\" />\n\
<h1>CustomUI Test</h1>\n\
\n\
<p>This example is a custom display that handles Softimage notifications and Win32 messages. The example shows how to define the interface and callbacks to Softimage, and how to access the notifications that Softimage pushes to the custom display host.\n\
</p>\n\
\n\
<p>\n\
<strong>Note:</strong> This example uses the Windows API and is not available on Linux.\n\
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
	<div class=\"examplefile\">CustomUITest.cpp</div>\n\
	<div class=\"examplefile\">CustomUITest.h</div>\n\
	<div class=\"examplefile\">CustomUI.cpp</div>\n\
	<div class=\"examplefile\">CustomUI.h</div>\n\
	<div class=\"examplefile\">CustomUITest.vcproj</div></td>\n\
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
<p class=\"proc-head\">To run the example</p>\n\
\n\
\n\
<ul>\n\
<li>In a viewport, click the view name (for example, Top or Camera) and then choose <strong>Custom Display &gt; NotificationTest</strong>.\n\
</li>\n\
\n\
<p style=\"margin-left:-18px;margin-top:6px;\">- Or -</p>\n\
\n\
<li>\n\
<p><span class=\"runExample\" title=\"Click to run the code shown below\">Run</span> this code in the script editor:</p>\n\
<pre>\n\
var oActiveLayout = Application.Desktop.ActiveLayout;\n\
var oCDH = oActiveLayout.CreateView( \"Custom Display Host\", \"MyCustomDisplayHost\" );\n\
oCDH.SetAttributeValue( \"targetcontent\", \"NotificationTest\" );\n\
oCDH.Resize( 500, 500 );\n\
</pre>\n\
</li>\n\
\n\
</ul>\n\
\n\
</div>\n\
\n\
\n\
<a name=\"build\"></a><h2>Building the C++ Example</h2>\n\
\n\
<p>\n\
Softimage SDK includes a compiled version of the plug-in. If you want to modify the code, you can rebuild the example by following these instructions.</p>\n\
<div id=\"windows-build\">\n\
<p class=\"proc-head\">To build the example on Windows</p>\n\
<ol>\n\
<li><p><span class=\"sishell\">Open</span> an Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio .NET.</p>\n\
<p>Starting Visual Studio .NET from an Softimage command prompt ensures that environment variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link errors).</p>\n\
<p><strong>Tip</strong> To load the <span class=\"devenv\" vcproj=\"CustomUITest.vcproj\">CustomUITest</span> project from the command line, type:</p>\n\
<pre>devenv <span class=\"installPath\">CustomUITest.vcproj</span></pre>\n\
</li>\n\
<li>In Visual Studio .NET, open the project file .vcproj.</li>\n\
<li>Select a configuration (Win32 Release or Win32 Debug) and build the DLL.</li>\n\
</ol>\n\
</div>\n\
\n\
\n\
<div id=\"linux-build\">\n\
<p class=\"proc-head\">To build the example on Linux</p>\n\
<p>\n\
This example uses the Windows API and is not available on Linux.\n\
</p>\n\
</div>\n\
\n\
<div id=\"keywords\">\n\
<h2>Keywords</h2>\n\
<p>This example uses the following keywords:</p>\n\
<p>\n\
C++ example,\n\
IsA, ViewContext, IsValid, PutUserData, GetUserData,\n\
Init, Term, Notify,\n\
RegisterCustomDisplay,\n\
siEventID,\n\
GetNotificationData,\n\
siOnSelectionChange, siOnTimeChange, siOnValueChange,\n\
CSelectionChangeNotification,\n\
GetSelectionList,\n\
CTimeChangeNotification,\n\
CValueChangeNotification,\n\
GetOwner,\n\
GetClassIDName, GetClassID, siPrimitiveID, siParameterID, siClusterID,\n\
Geometry, Parameter, CClusterElementArray,\n\
GetComponentName\n\
</p>\n\
</div>\n\
\n\
\n\
</div>\n\
      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";