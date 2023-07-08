var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../scripts/prettify.js\"></script><script src=\"../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>CSharpScripting</title>\n\
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
</style><link href=\"examples/Addons/CSharpScripting/doc/shared/examples.css\" type=\"text/css\" rel=\"StyleSheet\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/CSharpScripting/doc/shared/utils.js\"); });</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>CSharpScripting</h1>\n\
         </div>\n\
\n\
		<div class=\"body\"><a name=\"top\"></a><img class=\"netview\" style=\"PADDING-RIGHT: 6px; FLOAT: left\" src=\"netview_csharpscripting.jpg\" />\n\
			<h1>C# Scripting</h1>\n\
			<p>\n\
			This plug-in shows how to use C# as a scripting language from the Scripting Editor. You can use it when you\n\
			need to test some simple C# code in Softimage without having to create a plug-in. To use C# scripting, just add a Script.Main method\n\
			entry-point in the Scripting Editor, type C# code in the Main function and Run the code by right-clicking the <b>C# Scripting | Run</b> menu\n\
			in the Scripting Editor window.\n\
			</p>\n\
\n\
			<b>E.g.:</b>\n\
<pre>\n\
   class Script\n\
   {\n\
      public static void Main()\n\
      {\n\
         // Code goes here\n\
      }\n\
   }\n\
</pre>\n\
\n\
			<p />The C# scripting menu contains the following entries:\n\
			<ul>\n\
			<li><strong>Run</strong>: Compiles and executes the current .cs file. Compile errors are listed in the history.\n\
			<li><strong>New</strong>: Clears the Scripting Editor and adds a blank C# entry-point.\n\
			<li><strong>Open</strong>: Loads a .cs file in the editor.\n\
			<li><strong>Load User Files</strong>: Lists all user .cs files in a sub-menu. Files can be loaded by selecting an entry.\n\
			<li><strong>Save</strong>: Saves the content of the editor in a .cs file.\n\
			<li><strong>Save As</strong>: Saves the content of the editor in a new .cs file.\n\
			<li><strong>References</strong>: Lists the assemblies referenced by the current C# script.\n\
			</li></li></li></li></li></li></li></ul>\n\
\n\
			<br /><b>Note</b>: The assemblies required by your C# code are not referenced automatically by the C# compiler. If a reference is missing,\n\
			the compiler will issue an error. Referenced assemblies can be added/removed through the\n\
			References menu. For instance, if your script needs a reference to System.Web, you must add\n\
			an entry to the reference list containing System.Web.dll.\n\
\n\
			<h2>Example Files</h2>\n\
			<div class=\"body\">\n\
				<table>\n\
					<tr>\n\
						<td><strong>Location</strong></td>\n\
						<td><span class=\"installPath\"></span></td>\n\
					</tr>\n\
					<tr>\n\
						<td><strong>Files</strong></td>\n\
						<td>\n\
						<div class=\"examplefile\" folder=\"src\">CSharpScripting.csproj</div>\n\
						<div class=\"examplefile\" folder=\"src\">CSharpScripting.cs</div>\n\
						</td>\n\
					</tr>\n\
				</table>\n\
				<a name=\"build\"></a>\n\
				<h2>Running the Example</h2>\n\
				<div id=\"toinstall\" style=\"DISPLAY: none\">\n\
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
							locate the workgroup folder and then click <strong>Select</strong>.\n\
						</li>\n\
						</li></li></ol></li></ul>\n\
					<p class=\"proc-head\">To view the help page for an example</p>\n\
					<ul>\n\
						<li>\n\
							Do one of the following:\n\
							<ul>\n\
								<li>\n\
									In the Plug-in Tree, expand the SDK examples workgroup, right-click the example\n\
									add-on and then click <strong>Help</strong>.\n\
								<li>\n\
									Open a Net View and click <img style=\"BOTTOM: -6px; POSITION: relative\" src=\"..\\..\\doc\\shared\\xsiweb.png\" />\n\
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
						<li>From the Scripting Editor, right-click in the editor window and select the <b>C# Scripting | New</b> menu.\n\
						<li>Add some C# code in the Main method such as:\n\
<pre>\n\
public static void Main()\n\
{\n\
   CXSIApplicationClass xsi = new CXSIApplicationClass();\n\
   xsi.LogMessage( \"Called From Main\", siSeverity.siInfo );\n\
}\n\
</pre>\n\
						<li>Right-click in the Scripting Editor window and select the <b>C# Scripting | Run</b> menu.\n\
					</li></li></li></ul>\n\
				</div>\n\
\n\
				<a name=\"build\"></a>\n\
				<h2>Building the C# Scripting Example</h2>\n\
				<p>\n\
				Softimage SDK includes a compiled version of C# Scripting. If you want to modify the code, you can rebuild the example by following these instructions.\n\
				</p>\n\
				<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cssrc=\"src\">Open</span> an Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio .NET.</p>\n\
						<p>Starting Visual Studio .NET from an Softimage command prompt ensures that environment variables such as XSI_USERHOME are set (otherwise you\'ll get build and link errors).</p>\n\
						<p><strong>Tip</strong> To load the <span class=\"devenv\" csproj=\"src\\CSharpScripting.csproj\">CSharpScripting</span> project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">src\\CSharpScripting.csproj</span></pre>\n\
					        <li> In Visual Studio .NET, open the project file <tt>.csproj</tt>.\n\
					        <li> Select a configuration (Release or Debug) and build the DLL.</li>\n\
					</li>\n\
				</li></ol>\n\
			</div>\n\
\n\
				<div id=\"keywords\">\n\
					<h2>Keywords</h2>\n\
					<p>This example uses the following keywords:</p>\n\
					<p>C#, RegisterCommand, RegisterMenu, View.</p>\n\
				</div>\n\
			</div>\n\
		</div>\n\
	      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";