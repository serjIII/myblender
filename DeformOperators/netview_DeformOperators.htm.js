var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../scripts/prettify.js\"></script><script src=\"../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>DeformOperators</title>\n\
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
</style><link rel=\"StyleSheet\" href=\"examples/Addons/DeformOperators/doc/shared/examples.css\" type=\"text/css\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/DeformOperators/doc/shared/utils.js\"); });</script><script type=\"text/javascript\">\n\
function runExample(s)\n\
{\n\
	// [JScript] Demo script for the Splatter example\n\
	g_app.NewScene( null,false) ;\n\
\n\
	var oSphere = g_app.ActiveSceneRoot.AddGeometry(\"Sphere\", \"MeshSurface\");\n\
\n\
\n\
	if ( s == \'SplatterJs\' )\n\
	{\n\
			g_app.SelectObj( oSphere ) ;\n\
			runCommand( \"ApplySplatterRuntime\" );\n\
	}\n\
	else if ( s == \'SplatterJsP\' )\n\
	{\n\
		g_app.AddCustomOp( \"JScriptSplatter\",\n\
				 oSphere.ActivePrimitive,\n\
				 [oSphere.ActivePrimitive, oSphere.posy]  ) ;\n\
	}\n\
	else\n\
	{\n\
		g_app.AddCustomOp( \"SplatterCpp\",\n\
				oSphere.ActivePrimitive,\n\
				 [oSphere.ActivePrimitive, oSphere.posy] ) ;\n\
	}\n\
}\n\
</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>DeformOperators</h1>\n\
         </div>\n\
\n\
<div class=\"body\"><a name=\"top\"></a>\n\
\n\
\n\
\n\
<img class=\"netview\" src=\"netview_DeformOperators.jpg\" style=\"float:left;padding-right:6px;\" />\n\
<h1>Deform Operators</h1>\n\
\n\
\n\
<p>\n\
This example shows how to create deform operators. These are operators which change an existing polygon or nurbs mesh.\n\
</p>\n\
\n\
<p><strong>Custom Deform</strong><br />\n\
The Custom Deform example is a self-installed plug-in that defines two custom commands:</p>\n\
<ul>\n\
<li><strong>DemoCustomDeformExample</strong> demonstrates the plug-in.</li>\n\
<li><strong>ApplyCustomDeformExample</strong> applies a new runtime operator to the selected objects. To support the same workflow as built-in deformations, this command is available from the <strong>Model &gt; Deform</strong> menu.</li>\n\
</ul>\n\
\n\
<p>\n\
There is no Self-Installed Custom Operator in this example. Instead, the <span class=\"showFile1\" file=\"Application\\Plugins\\CustomDeformExample.js\" id=\"function ApplyCustomDeformExample_Execute\">ApplyCustomDeformExample_Execute callback</span> creates the operator on the fly using\n\
<span class=\"getHelp\" id=\"XSIFactory_CreateScriptedOp\">XSIFactory.CreateScriptedOp</span> and the <span class=\"getHelp\" id=\"CustomOperator\">Object Model</span>. The <span class=\"showFile1\" file=\"Application\\Plugins\\CustomDeformExample.js\" id=\"function CustomDeformOp_Update\">CustomDeformOp_Update</span> function contains the implementation of the operator.\n\
</p>\n\
\n\
<p>\n\
The operator has no parameters. Instead, the user controls it by working with a custom property that is connected to the operator. This allows the user interface for the plugin to use new features like the <span class=\"getHelp\" id=\"CustomProperty_AddFCurveParameter\">FCurve</span> parameter type.  There is no SPDL file for the custom property, instead it is defined entirely in this script file.  An instance of the custom property is created whenever the operator is applied and can be found nested underneath the Polygon Mesh object.\n\
</p>\n\
\n\
\n\
\n\
<p><strong>Splatter (JScript version)</strong><br />\n\
The Splatter example has been a \"classic\" operator example for many versions of Softimage.  For this release, two JScript variations of Splatter are included, to demonstrate the difference between Runtime and Plugin based operators.\n\
</p>\n\
\n\
<p>\n\
You can apply Splatter to any polygon or Nurbs mesh and it will \"squish\" all points with negative values in the y-axis.  You can use this used to simulate a ball being squished as it hits a flat surface.\n\
</p>\n\
\n\
<p>The disadvantage of the runtime operator version is that, unlike the plugin-based operator, every instance of the operator contains its own copy of the source code for the Update method. So, if you later discover a bug in the operator, it may be hard to find and fix all scenes where the operator was applied. On the positive side, after the runtime version is applied, it continues to work, even if the Splatter plug-in is deleted.\n\
</p>\n\
<p>The plugin version provides a custom layout for the Property Page of the operator, by implementing the _DefineLayout callback.  This gives precise control over the parameters which are shown on the Operators property page.  This feature is not available for the runtime version.\n\
</p>\n\
\n\
<p /><strong>Splatter (C++ version)</strong><br />\n\
<p>\n\
The C++ version uses a self-installed custom operator and is identical to the plug-in JScript version\n\
</p>\n\
\n\
<p /><strong>Splatter (C# version)</strong><br />\n\
<p>\n\
The C# version uses a self-installed custom operator and is identical to the plug-in JScript version\n\
</p>\n\
\n\
\n\
<h2>Example Files</h2>\n\
<table>\n\
<tr>\n\
<td><strong>Location</strong></td><td><span class=\"installPath\"></span>\n\
</td>\n\
</tr>\n\
\n\
<tr>\n\
<td><strong>Files</strong></td>\n\
<td>\n\
	<div class=\"examplefile\">ApplySplatterRuntime.js</div>\n\
	<div class=\"examplefile\">ApplySplatterPlugin.js</div>\n\
	<div class=\"examplefile\">CustomDeformExample.js</div>\n\
	<div class=\"examplefile\" folder=\"cppsrc_Splatter\">SplatterCpp.cpp</div>\n\
	<div class=\"examplefile\" folder=\"cppsrc_Splatter\">SplatterCpp.vcproj</div>\n\
	<div class=\"examplefile\" folder=\"cppsrc_Splatter\">GNUmakefile</div>\n\
	<div class=\"examplefile\" folder=\"cssrc_Splatter\">CSSplatterOp.cs</div>\n\
	<div class=\"examplefile\" folder=\"cssrc_Splatter\">CSSplatterOp.csproj</div>\n\
</td>\n\
</tr>\n\
\n\
\n\
</table>\n\
\n\
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
<p class=\"proc-head\">To run the CustomDeform example</p>\n\
<ul>\n\
<li>\n\
In a script editor, run the command <span class=\"runCmd\">DemoCustomDeformExample</span>.\n\
</li>\n\
</ul>\n\
</div>\n\
\n\
\n\
\n\
<div>\n\
<p class=\"proc-head\">To run the Runtime JScript Splatter example</p>\n\
<ul>\n\
<li><p>In a script editor, <span class=\"runExample\" id=\"SplatterJs\">run</span> this <span class=\"loadScript\">demo script</span>:</p>\n\
<pre>\n\
// [JScript] Demo script for the JScript version of Splatter\n\
NewScene( null,false) ;\n\
CreatePrim(\"Sphere\", \"MeshSurface\", null, null);\n\
ApplySplatterRuntime();\n\
</pre>\n\
</li>\n\
</ul>\n\
</div>\n\
\n\
<div>\n\
<p class=\"proc-head\">To run the Plugin JScript Splatter example</p>\n\
<ul>\n\
<li><p>In a script editor, <span class=\"runExample\" id=\"SplatterJsP\">run</span> this <span class=\"loadScript\">demo script</span>:</p>\n\
<pre>\n\
// [JScript] Demo script for the JScript  version of Splatter\n\
NewScene( null,false) ;\n\
var oSphere = ActiveSceneRoot.AddGeometry(\"Sphere\", \"MeshSurface\");\n\
\n\
AddCustomOp( \"JScriptSplatter\",\n\
			oSphere.ActivePrimitive,\n\
			 [oSphere.ActivePrimitive, oSphere.posy] ) ;\n\
</pre>\n\
</li>\n\
</ul>\n\
</div>\n\
\n\
\n\
<div>\n\
<p class=\"proc-head\">To run the C++ Splatter example</p>\n\
<ul>\n\
<li><p>In a script editor, <span class=\"runExample\" id=\"SplatterCpp\">run</span> this <span class=\"loadScript\">demo script</span>:</p>\n\
<pre>\n\
// [JScript] Demo script for the C++ version of Splatter\n\
NewScene( null,false) ;\n\
var oSphere = ActiveSceneRoot.AddGeometry(\"Sphere\", \"MeshSurface\");\n\
\n\
AddCustomOp( \"SplatterCpp\",\n\
			oSphere.ActivePrimitive,\n\
			 [oSphere.ActivePrimitive, oSphere.posy] ) ;\n\
</pre>\n\
</li>\n\
</ul>\n\
</div>\n\
\n\
<div>\n\
<p class=\"proc-head\">To run the C# Splatter example</p>\n\
<ul>\n\
<li>\n\
Select CSSplatterOp_Menu | Demo item on the top menu bar.\n\
<li>\n\
Move the cylinder around.\n\
</li>\n\
<li>\n\
Also open the property page for the CSSplatterOp (found under the geometry of the cylinder) and adjust the parameters to change the CSSplatterOp behavior.\n\
</li>\n\
</li></ul>\n\
</div>\n\
\n\
\n\
<a name=\"build\"></a><h2>Building the C++ Splatter Example</h2>\n\
<p>\n\
Softimage SDK includes a compiled version of SplatterCpp. If you want to modify the code, you can rebuild the example by following these instructions.</p>\n\
\n\
<div id=\"windows-build\">\n\
<p class=\"proc-head\">To build the example on Windows</p>\n\
<ol>\n\
<li><p><span class=\"sishell\" cppsrc=\"cppsrc_Splatter\">Open</span> an Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio .NET.</p>\n\
<p>Starting Visual Studio .NET from an Softimage command prompt ensures that environment variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link errors).</p>\n\
\n\
<p><strong>Tip</strong> To load the <span class=\"devenv\" vcproj=\"cppsrc_Splatter/SplatterCpp.vcproj\">SplatterCpp</span> project from the command line, type:</p>\n\
<pre>devenv <span class=\"installPath\">cppsrc_Splatter/SplatterCpp.vcproj</span></pre>\n\
\n\
\n\
</li>\n\
<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
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
<pre><span class=\"installPath\">cppsrc_Splatter</span></pre>\n\
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
<a name=\"build\"></a>\n\
<h2>Building the CSSplatterOp Example</h2>\n\
<p>\n\
Softimage SDK includes a compiled version of CSSplatterOp. If you want to modify the code, you can rebuild the example by following these instructions.\n\
</p>\n\
<div id=\"windows-build\">\n\
<p class=\"proc-head\">To build the example on Windows</p>\n\
<ol>\n\
<li>\n\
<p><span class=\"sishell\" cssrc=\"cssrc_Splatter\">Open</span>\n\
an Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio .NET.\n\
</p>\n\
<p>Starting Visual Studio .NET from an Softimage command prompt ensures that environment\n\
variables such as XSI_HOME are set (otherwise you\'ll get build and link errors).\n\
</p>\n\
<p>\n\
<strong>Tip</strong> To load the <span class=\"devenv\" csproj=\"cssrc_Splatter\\CSSplatterOp.csproj\">CSSplatterOp</span>\n\
project from the command line, type:\n\
</p>\n\
<pre>devenv <span class=\"installPath\">cssrc_SplatterOp\\CSSplatterOp.csproj</span></pre>\n\
<li>In Visual Studio .NET, open the project file <tt>.csproj</tt>.</li>\n\
<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
</li></ol>\n\
</div>\n\
\n\
\n\
<div id=\"keywords\">\n\
<h2>Keywords</h2>\n\
<p>This example uses the following keywords:</p>\n\
<p>\n\
C++ example, JScript example, dynamic operator,\n\
C++, operator, SPDL, self-installed operator, self-installed plug-in,\n\
deform, deformations,\n\
Custom Operator, AddIOPort, AddInputPort, Connect, AddFCurveParameter,\n\
FCurve, FCurve.BeginEdit, FCurve.AddKeys, FCurve.RemoveKey,\n\
XSIFactory.CreateScriptedOp,RegisterOperator,OperatorContext,\n\
Update,\n\
AddCommandItem, AddParameter2, Geometry.Points.PositionArray,\n\
</p>\n\
</div>\n\
\n\
\n\
</div>\n\
      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";