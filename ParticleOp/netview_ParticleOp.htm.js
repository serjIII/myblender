var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../scripts/prettify.js\"></script><script src=\"../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>ParticleOp</title>\n\
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
</style><link rel=\"StyleSheet\" href=\"examples/Addons/ParticleOp/doc/shared/examples.css\" type=\"text/css\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/ParticleOp/doc/shared/utils.js\"); });</script><script type=\"text/javascript\">\n\
function runExample(s)\n\
{\n\
		g_app.DemoParticleOp();\n\
}\n\
			</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>ParticleOp</h1>\n\
         </div>\n\
\n\
		<div class=\"body\"><a name=\"top\"></a> <img class=\"netview\" src=\"netview_ParticleOp.jpg\" style=\"PADDING-RIGHT:6px;FLOAT:left\" />\n\
			<h1>ParticleOp</h1>\n\
			<p>\n\
				This C++ example shows how to write a particle operator that manipulates a\n\
				particle cloud. The particle operator makes the particles in a cloud flock\n\
				together.&nbsp;The property page of the custom operator allows you to tweak the\n\
				variables that control the flocking behavior.\n\
			</p>\n\
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
						<div class=\"examplefile\">ParticleOpCpp.cpp</div>\n\
						<div class=\"examplefile\">ParticleOpCpp.vcproj</div>\n\
						<div class=\"examplefile\">DemoParticleOp.vbs</div>\n\
						<div class=\"examplefile\">GNUmakefile</div>\n\
					</td>\n\
				</tr>\n\
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
								to go to Softimage Net local. In the top navigation bar, click <strong>add-ons</strong>,\n\
								and then click the SDK example add-on.\n\
							</li>\n\
						</li></ul>\n\
					\n\
				</li></ul>\n\
			</div>\n\
			<div>\n\
				<p class=\"proc-head\">To run the example</p>\n\
				<ul>\n\
					<li>\n\
						<p>Run the command\n\
							<span class=\"runExample\" title=\"Run the DemoParticleOp command\">DemoParticleOp</span>.</p>\n\
						<p>DemoParticleOp creates a particle cloud, sets up the particles, applies the\n\
							ParticleOpCpp operator, and opens the operator\'s property page.</p>\n\
					<li>\n\
						Change the ParticleOpCpp parameters to control the flocking behavior of the\n\
						particles.</li>\n\
				</li></ul>\n\
			</div>\n\
			<a name=\"build\"></a>\n\
			<h2>Building the C++ Example</h2>\n\
			<p>\n\
				Softimage SDK includes a compiled version of ParticleOp. If you want to modify the\n\
				code, you can rebuild the example by following these instructions.</p>\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\">Open</span>\n\
							an Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from an Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"ParticleOpCpp.vcproj\">ParticleOpCpp</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">ParticleOpCpp.vcproj</span></pre>\n\
					<li>\n\
					In Visual Studio .NET, open the project file .vcproj.\n\
					<li>\n\
						Select a configuration (Win32 Release or Win32 Debug) and build the DLL.</li>\n\
				</li></li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc</span></pre>\n\
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
			<div id=\"keywords\">\n\
				<h2>Keywords</h2>\n\
				<p>This example uses the following keywords:</p>\n\
				<p>\n\
					C++ example, CustomOperator, Update, OutputPort, OperatorContext, Evaluate,\n\
					Term, ParticleCloudPrimitive, PutUserData, GetUserData,\n\
					PutPositionArray,&nbsp;&nbsp; AddParticleEmitter,\n\
					ParticleEmitter_emission.Rate, FreezeObj, XSIMath.CreateVector3, Particles\n\
				</p>\n\
			</div>\n\
		</div>\n\
	      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";