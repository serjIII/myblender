var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../scripts/prettify.js\"></script><script src=\"../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>ConstraintOps</title>\n\
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
</style><link rel=\"StyleSheet\" href=\"examples/Addons/ConstraintOps/doc/shared/examples.css\" type=\"text/css\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/ConstraintOps/doc/shared/utils.js\"); });</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>ConstraintOps</h1>\n\
         </div>\n\
\n\
		<div class=\"body\"><a name=\"top\"></a> <img class=\"netview\" src=\"netview_ConstraintOps.jpg\" style=\"PADDING-RIGHT:6px;FLOAT:left\" />\n\
			<h1>Constraint Operator Examples</h1>\n\
			<p>This addon shows various self-installed custom operators that \"constrain\"\n\
				objects together. For example one object may influence the rotation or position\n\
				of another object in the scene. This sort of operator is common when building\n\
				rigs and are an alternative to the Constraint, Expression and Proxy Parameter\n\
				features of Softimage. A Custom Operator is best suitable for cases where the logic\n\
				of the relationship between the objects is complex such that it can\'t be\n\
				described by a simple fcurve or expression statement.\n\
			</p>\n\
			<p /><strong>CenterOp_Basic</strong><br />\n\
			This is a straightforward example, that sets the position of a Null to the\n\
			average of the position of 3 other objects. In many cases an operator deals\n\
			with a fixed number of inputs and a single output as shown in this example.\n\
			<p /><strong>CenterOp_Simple</strong><br />\n\
			The simple CenterOp Plugin builds on the basic example, but it is more flexible\n\
			and powerful. Rather than a hard-coded number of inputs it supports any number\n\
			of inputs. It also offers a special custom command \"ApplyCenterOp_Simple\" that\n\
			makes it easier to create the operator and its output Null with a single API\n\
			call.\n\
			<p /><strong>CenterOp_Dynamic</strong><br />\n\
			This is the most advanced CenterOp variation, which lets you connect addition\n\
			input objects even after the operator has been created. Rather than building a\n\
			separate input port for each input object as is done in the Simple example, it\n\
			uses a single input port but allows an unlimited number of instances of the\n\
			port to be created (via the PortGroup concept). There are two commands,\n\
			ApplyCenterOp_Dynamic to create the operator and make the initial connections\n\
			and AddInputsToCenterOp to attach additional inputs to an existing instance of\n\
			the operator. Because it requires more code to create this type of operator it\n\
			is only recommended for operators that really need to be fully dynamic.\n\
			<p /><strong>SurfConstrainOp</strong><br />\n\
			This is a Python example which creates an operator that constrains the\n\
			kinematic global position of a 3D object (the constrained) to a surface.\n\
			The constrained object position is based on the closest position of an\n\
			other 3D object (the controller) to the surface object.\n\
			<p /><strong>SpringOp_Cpp</strong><br />\n\
				This is a classic scripted operator example, ported into a C++ self-installed\n\
				operator.\n\
			<p /><strong>CSCenterOp</strong><br />\n\
			The JScript simple CenterOp plug-in ported to C#.\n\
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
							<div class=\"examplefile\">CenterOp_Basic.js</div>\n\
							<div class=\"examplefile\">CenterOp_Dynamic.js</div>\n\
							<div class=\"examplefile\">CenterOp_Simple.js</div>\n\
							<div class=\"examplefile\">SurfaceConstrainOp.py</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_SpringOp\">SpringOp_cpp.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cssrc_CenterOp\">CSCenterOp.cs</div>\n\
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
					<p class=\"proc-head\">To run the DemoCenterOp_Basic example</p>\n\
					<ul>\n\
						<li>\n\
							Execute the\n\
							<span class=\"runCmd\" title=\"DemoCenterOp_Basic\">DemoCenterOp_Basic</span>\n\
						command.\n\
						<li>\n\
							Move the spheres or cylinder and watch the null adjust its position.</li>\n\
					</li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the DemoCenterOp_Simple example</p>\n\
					<li>\n\
						Execute the\n\
						<span class=\"runCmd\" title=\"DemoCenterOp_Simple\">DemoCenterOp_Simple</span>\n\
					command.\n\
					<li>\n\
						The resulting scene is similar to the DemoCenterOp_Basic scene.\n\
						<ul>\n\
						</ul>\n\
					</li>\n\
				</li></div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the DemoCenterOp_Dynamic example</p>\n\
					<li>\n\
						Execute the\n\
						<span class=\"runCmd\" title=\"DemoCenterOp_Dynamic\">DemoCenterOp_Dynamic</span>\n\
					command.\n\
					<li>\n\
						The resulting scene is similar to the DemoCenterOp_Basic scene. However if you\n\
						inspect the details of the operator in the SDK explorer you will see the\n\
						different Port configuration.\n\
						<ul>\n\
						</ul>\n\
					</li>\n\
				</li></div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the SurfaceConstrainOp example</p>\n\
					<ul>\n\
						<li>\n\
							Execute the\n\
							<span class=\"runCmd\" title=\"CreateSurfConstrainOp\">CreateSurfConstrainOp</span>\n\
						command.\n\
						<li>\n\
							Translates the \'constrainer\' Null object around and see how the \'constrained\' Null\n\
							object is moving onto the sphere.</li>\n\
					</li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the SpringOp example</p>\n\
					<ul>\n\
						<li>\n\
							Execute the\n\
							<span class=\"runCmd\" title=\"DemoSpringOp\">DemoSpringOp</span>\n\
						command.\n\
						<li>\n\
						Select the cube and move it, and watch the sphere bounce beneath it.\n\
						<li>\n\
							Also open the property page for the SpringOp (found under the Global Kinematics\n\
							of the sphere) and adjust the parameters to change the spring behavior.\n\
						</li>\n\
					</li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the CSCenterOp example</p>\n\
					<ul>\n\
						<li>\n\
							Select CSCenterOp_Menu|Demo item on the top menu bar.\n\
						<li>\n\
						Move the spheres or cylinder and watch the null adjust its position.</li>\n\
						<li>\n\
							Also open the property page for the CSCenterOp (found under the Global Kinematics\n\
							of the null) and adjust the parameters to change the CSCenterOp behavior.\n\
						</li>\n\
					</li></ul>\n\
				</div>\n\
\n\
				<a name=\"build\"></a>\n\
				<h2>Building the SpringOp Example</h2>\n\
			<p>\n\
				Softimage SDK includes a compiled version of SpringOp_Cpp. If you want to modify the\n\
				code, you can rebuild the example by following these instructions.</p>\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_SpringOp\">Open</span>\n\
							an Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from an Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_SpringOp\\SpringOp_Cpp.vcproj\">SpringOp_Cpp</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_SpringOp\\SpringOp_Cpp.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_SpringOp</span></pre>\n\
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
				<a name=\"build\"></a>\n\
				<h2>Building the C# Center Op Example</h2>\n\
			<p>\n\
				Softimage SDK includes a compiled version of CSCenterOp. If you want to modify the\n\
				code, you can rebuild the example by following these instructions.</p>\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cssrc_CenterOp\">Open</span>\n\
							an Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from an Softimage command prompt ensures that environment\n\
							variables such as XSI_HOME are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cssrc_CenterOp/CSCenterOp.csproj\">CSCenterOp</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cssrc_CenterOp/CSCenterOp.csproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.csproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"keywords\">\n\
				<h2>Keywords</h2>\n\
				<p>This example uses the following keywords:</p>\n\
				<p>\n\
					Operator CustomOperator OperatorContext JScript Python\n\
				</p>\n\
			</div>\n\
		</div>\n\
	      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";