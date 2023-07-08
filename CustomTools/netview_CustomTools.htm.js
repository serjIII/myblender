var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../scripts/prettify.js\"></script><script src=\"../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\" /><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>CustomTools</title>\n\
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
</style><link rel=\"StyleSheet\" href=\"examples/Addons/CustomTools/doc/shared/examples.css\" type=\"text/css\" /><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/CustomTools/doc/shared/utils.js\"); });</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>CustomTools</h1>\n\
         </div>\n\
\n\
		<div class=\"body\"><a name=\"top\"></a> <img class=\"netview\" src=\"netview_CustomTools.jpg\" style=\"PADDING-RIGHT:6px;FLOAT:left\" />\n\
			<h1>Custom Tool Examples</h1>\n\
			<p>This addon shows various self-installing custom tools.<br /><br />\n\
			</p>\n\
\n\
			<p /><strong>AddSmoothEdgeLoopTool</strong><br />\n\
			This sample is the <strong>Model &gt; Modify &gt; Poly. Mesh &gt; Add Smooth Edge Loop Tool</strong> that is shipped with Softimage.\n\
\n\
			<p /><strong>SpotLightCreateTool</strong><br />\n\
			This sample demonstrates how to create a custom spotlight creation tool.\n\
\n\
			<p /><strong>PickTestTool</strong><br />\n\
			This sample demonstrates how to use picking to identify objects under the cursor.\n\
\n\
			<p /><strong>SnapTestTool</strong><br />\n\
			This sample demonstrates how to use snapping to identify objects under the cursor.\n\
\n\
			<p /><strong>AnnotationTool</strong><br />\n\
			This sample demonstrates how to use a custom tool to pick and launch URL strings from an annotation object.\n\
\n\
			<p /><strong>BoxTransformTool</strong><br />\n\
			This sample demonstrates how to create a complex manipulator-style tool that uses\n\
			highlighting, shortcut keys, context menus and on-screen controls.\n\
\n\
			<p /><strong>BoneCreateTool</strong><br />\n\
			This sample is the <strong>Model &gt; Create &gt; Skeleton &gt; Draw Bones</strong> tool that is shipped with Softimage.\n\
\n\
			<h2>Example Files</h2>\n\
				<table>\n\
					<tr>\n\
						<td><strong>Location</strong></td>\n\
						<td><span class=\"installPath\"></span>\n\
						</td>\n\
					</tr>\n\
					<tr>\n\
						<td><strong>AddSmoothEdgeLoopTool Files</strong></td>\n\
						<td>\n\
							<div class=\"examplefile\" folder=\"cppsrc_addsmoothedgelooptool\">AddSmoothEdgeLoopTool.cpp</div>\n\
					</td></tr>\n\
					<tr>\n\
						<td><strong>SpotLightCreateTool Files</strong></td>\n\
						<td>\n\
							<div class=\"examplefile\" folder=\"cppsrc_spotlightcreatetool\">SpotLightCreateTool.cpp</div>\n\
					</td></tr>\n\
					<tr>\n\
						<td><strong>PickTestTool Files</strong></td>\n\
						<td>\n\
							<div class=\"examplefile\" folder=\"cppsrc_picktesttool\">PickTestTool.cpp</div>\n\
					</td></tr>\n\
					<tr>\n\
						<td><strong>SnapTestTool Files</strong></td>\n\
						<td>\n\
							<div class=\"examplefile\" folder=\"cppsrc_snaptesttool\">SnapTestTool.cpp</div>\n\
					</td></tr>\n\
					<tr>\n\
						<td><strong>AnnotationTool Files</strong></td>\n\
						<td>\n\
							<div class=\"examplefile\" folder=\"cppsrc_annotationtool\">AnnotationTool.cpp</div>\n\
					</td></tr>					\n\
					<tr>\n\
						<td><strong>BoxTransformTool Files</strong></td>\n\
						<td>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">BoxTransformTool.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">Constants.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">BBox.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">BBox.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">BoxTransformToolDelegate.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">ToolHandle.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">ToolHandle.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">TranslateToolHandle.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">TranslateToolHandle.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">ScaleToolHandle.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">ScaleToolHandle.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">RotateToolHandle.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">RotateToolHandle.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">RotateStickToolHandle.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">RotateStickToolHandle.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">RotateWheelToolHandle.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">RotateWheelToolHandle.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">DimensionToolHandle.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">DimensionToolHandle.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">ButtonToolHandle.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">ButtonToolHandle.cpp</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">ToolButton.h</div>\n\
							<div class=\"examplefile\" folder=\"cppsrc_boxtransformtool\">ToolButton.cpp</div>\n\
						</td>\n\
					</tr>\n\
					<tr>\n\
						<td><strong>BoneCreateTool Files</strong></td>\n\
						<td>\n\
							<div class=\"examplefile\" folder=\"cppsrc_bonecreatetool\">BoneCreateTool.cpp</div>\n\
						</td>\n\
					</tr>\n\
				</table>\n\
\n\
				<a name=\"build\"></a>\n\
				<h2>Running the Examples</h2>\n\
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
					<p class=\"proc-head\">To run the AddSmoothEdgeLoopTool example</p>\n\
					<ul>\n\
						<li>\n\
						    Activate the tool using <strong>Model &gt; Modify &gt; Poly. Mesh &gt; Add Smooth Edge Loop Tool</strong>\n\
							or by running the <strong>AddSmoothEdgeLoopTool</strong> command from the command prompt. Tools can also\n\
							be assigned shortcut keys from the Keyboard Mapping dialog. (they appear under the\n\
							<strong>Custom Script Commands</strong> group)\n\
						<li>\n\
						  	Select a mesh and activate the tool. Click and drag on an edge to add a parallel loop \n\
							to the selected edge. Edge loops added using this tool automatically follow the surface curvature of the mesh.\n\
							Middle click on an edge to split the selected edge in half. The last split operator can be inspected\n\
							from the tool\'s right click context menu where curvature continuity and other parameters can be modified.\n\
					</li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the SpotLightCreateTool example</p>\n\
					<ul>\n\
						<li>\n\
						    Activate the tool using <strong>Get &gt; Primitive &gt; Light &gt; SpotLight Tool</strong>\n\
							or by running the <strong>SpotLightCreateTool</strong> command from the command prompt. Tools can also\n\
							be assigned shortcut keys from the Keyboard Mapping dialog. (they appear under the\n\
							<strong>Custom Script Commands</strong> group)\n\
						<li>\n\
						    Click and drag in the 3D view on the grid to set the interest and set the spotlight\'s position.\n\
							At any point during dragging hold the shift key and drag upwards to set the spotlight\'s elevation.\n\
						<li>\n\
						    When finished release the mouse button and the spotlight creation will be finalized. The tool will\n\
							then exit since this is a one-shot creation tool.\n\
					</li></li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the PickTestTool example</p>\n\
					<ul>\n\
						<li>\n\
						    Activate the tool by running the <strong>PickTestTool</strong> command from the command prompt. Tools can also\n\
							be assigned shortcut keys from the Keyboard Mapping dialog. (they appear under the\n\
							<strong>Custom Script Commands</strong> group)\n\
						<li>\n\
						    Create a mesh object. Activate the tool and move the mouse over the mesh and the tool will display the object or point under the cursor. Use the right-mouse button context menu to change the picking options.\n\
					</li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the SnapTestTool example</p>\n\
					<ul>\n\
						<li>\n\
						    Activate the tool by running the <strong>SnapTestTool</strong> command from the command prompt. Tools can also\n\
							be assigned shortcut keys from the Keyboard Mapping dialog. (they appear under the\n\
							<strong>Custom Script Commands</strong> group)\n\
						<li>\n\
						    Create a mesh object. Activate the tool and move the mouse over the mesh and the tool will display the closest snap target to the cursor.\n\
					</li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the AnnotationTool example</p>\n\
					<ul>\n\
						<li>\n\
						    Activate the tool by running the <strong>AnnotationTool</strong> command from the command prompt. Tools can also\n\
							be assigned shortcut keys from the Keyboard Mapping dialog. (they appear under the <strong>Custom Script Commands</strong> group)\n\
						<li>\n\
						    Create an annotation object by clicking on the Model toolbar menu Get|Primitives|Annotation. Enter this string in the text edit control: http://softimage.wiki.softimage.com. Activate the tool and move the mouse over the object, click on the URL.\n\
					</li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the BoxTransformTool example</p>\n\
					<ul>\n\
						<li>\n\
						    Activate the tool using <strong>Get &gt; Transform &gt; Box Transform Tool</strong>\n\
							or by running the <strong>BoxTransformTool</strong> command from the command prompt. Tools can also\n\
							be assigned shortcut keys from the Keyboard Mapping dialog. (they appear under the\n\
							<strong>Custom Script Commands</strong> group)\n\
						<li>\n\
						    Select or create a 3D object and activate the tool. A box is displayed with various manipulators\n\
							that highlight as the mouse moves over them.\n\
						<li>\n\
						    To translate grab one of the small handles on the box and it will translate the object parallel\n\
							to the visible grid. Holding down <strong>&lt;Shift&gt;</strong> and clicking will constrain\n\
							the translation along the bounding box axis that best matches the mouse drag direction.\n\
						<li>\n\
						  	To rotate use either the wheel or the stick handles. The stick handle automatically snaps to\n\
							the closest rotation axis based on the mouse drag direction.\n\
						<li>\n\
						  	To switch from translate to scaling mode use the on-screen buttons, context\n\
							menu or the <strong>&lt;Tab&gt;</strong> shortcut key. The scaling handles will scale along\n\
							the closest bounding box axis based on the mouse drag direction. Holding down\n\
							<strong>&lt;Shift&gt;</strong> will enable uniform scaling along all three axes.\n\
							<strong>Note:</strong>When multiple objects with different orientations are selected\n\
							then the only scaling option is uniform.\n\
						<li>\n\
							Clicking on the dimension labels allows the object to be scaled numerically.\n\
						<li>\n\
							The box transform tool works in local space unless multiple objects are selected with differing\n\
							orientations. In this situation it will use global space.\n\
					</li></li></li></li></li></li></li></ul>\n\
				</div>\n\
				<div>\n\
					<p class=\"proc-head\">To run the BoneCreateTool example</p>\n\
					<ul>\n\
						<li>\n\
						    Activate the tool using <strong>Model &gt; Create &gt; Skeleton &gt; Draw Bones</strong> \n\
							or by running the <strong>BoneCreateTool</strong> command from the command prompt. Tools can also\n\
							be assigned shortcut keys from the Keyboard Mapping dialog. (they appear under the\n\
							<strong>Custom Script Commands</strong>. \n\
						</li>\n\
						<li>\n\
						  	Click and drag in the scene to position the root of the bone. \n\
							Click and drag again to define the tip of the bone. \n\
							Subsequent clicks will append a new bone from the tip of the previous bone. \n\
							Middle click to end the current chain creation. Right click to exit the tool.\n\
						</li>\n\
						<li>\n\
							Hold down control to turn on snapping.\n\
						</li>\n\
					</ul>\n\
				</div>\n\
				<a name=\"build\"></a>\n\
				<h2>Building the Examples</h2>\n\
			<p>\n\
				Use the following instructions to build the CustomTool samples.</p>\n\
\n\
			<div id=\"windows-build\">\n\
				<p class=\"proc-head\">To build the AddSmoothEdgeLoopTool example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_addsmoothedgelooptool\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_addsmoothedgelooptool\\AddSmoothEdgeLoopTool.vcproj\">AddEdgeLoopTool</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_addsmoothedgelooptool\\AddSmoothEdgeLoopTool.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
				<p class=\"proc-head\">To build the SpotLightCreateTool example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_spotlightcreatetool\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_spotlightcreatetool\\SpotLightCreateTool.vcproj\">SpotLightCreateTool</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_spotlightcreatetool\\SpotLightCreateTool.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
				<p class=\"proc-head\">To build the PickTestTool example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_picktesttool\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_picktesttool\\PickTestTool.vcproj\">PickTestTool</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_picktesttool\\PickTestTool.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
				<p class=\"proc-head\">To build the SnapTestTool example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_snaptesttool\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_snaptesttool\\SnapTestTool.vcproj\">SnapTestTool</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_snaptesttool\\SnapTestTool.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
				<p class=\"proc-head\">To build the AnnotationTool example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_annotationtool\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_annotationtool\\AnnotationTool.vcproj\">AnnotationTool</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_annotationtool\\AnnotationTool.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
				<p class=\"proc-head\">To build the BoxTransformTool example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_boxtransformtool\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_boxtransformtool\\BoxTransformTool.vcproj\">BoxTransformTool</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_boxtransformtool\\BoxTransformTool.vcproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
				<p class=\"proc-head\">To build the BoneCreateTool example on Windows</p>\n\
				<ol>\n\
					<li>\n\
						<p><span class=\"sishell\" cppsrc=\"cppsrc_bonecreatetool\">Open</span>\n\
							a Softimage command prompt, and type <strong>devenv</strong> to start Visual Studio\n\
							.NET.</p>\n\
						<p>Starting Visual Studio .NET from a Softimage command prompt ensures that environment\n\
							variables such as XSISDK_ROOT are set (otherwise you\'ll get build and link\n\
							errors).</p>\n\
						<p><strong>Tip</strong> To load the\n\
							<span class=\"devenv\" vcproj=\"cppsrc_bonecreatetool\\BoneCreateTool.vcxproj\">BoneCreateTool</span>\n\
							project from the command line, type:</p>\n\
						<pre>devenv <span class=\"installPath\">cppsrc_bonecreatetool\\BoneCreateTool.vcxproj</span></pre>\n\
					<li>In Visual Studio .NET, open the project file <tt>.vcxproj</tt>.</li>\n\
					<li>Select a configuration (Release or Debug) and build the DLL.</li>\n\
				</li></ol>\n\
			</div>\n\
			<div id=\"linux-build\">\n\
				<p class=\"proc-head\">To build the AddSmoothEdgeLoopTool example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_addsmoothedgelooptool</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
				<p class=\"proc-head\">To build the SpotLightCreateTool example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_spotlightcreatetool</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
				<p class=\"proc-head\">To build the PickTestTool example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_picktesttool</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
				<p class=\"proc-head\">To build the SnapTestTool example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_snaptesttool</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
				<p class=\"proc-head\">To build the AnnotationTool example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_annotationtool</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
				<p class=\"proc-head\">To build the BoxTransformTool example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_boxtransformtool</span></pre>\n\
					<li>\n\
						<p>To remove all intermediate files before building the example, run this command:</p>\n\
						<pre>gmake clean</pre>\n\
					<li>\n\
						<p />\n\
						To compile the example, run this command:<p />\n\
							<pre>gmake</pre>\n\
					</li>\n\
				</li></li></li></ol>\n\
				<p class=\"proc-head\">To build the BoneCreateTool example on Linux</p>\n\
				<ol>\n\
					<li>\n\
						<p>In a shell (tcsh) window, type:</p>\n\
						<pre>source $XSI_HOME/<span class=\"linuxExt\">.xsi_&lt;xsi_version&gt;</span></pre>\n\
					<li>\n\
						<p>Change directories to</p>\n\
						<pre><span class=\"installPath\">cppsrc_bonecreatetool</span></pre>\n\
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
					ToolContext C++\n\
				</p>\n\
			</div>\n\
		</div>\n\
	      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";