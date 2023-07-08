var topic = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n\
<!-- saved from url=(0024)http://docs.autodesk.com -->\n\
<html>\n\
   <head>\n\
<link href=\"../../../../../style/prettify.css\" type=\"text/css\" rel=\"stylesheet\" />\n\
<script type=\"text/javascript\" src=\"../../../../../scripts/prettify.js\"></script><script src=\"../../../../../../../../../../../../../../../../../../../../../../../../../../../../../../../scripts/lib/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /><script type=\"text/javascript\" src=\"../../../../../scripts/utils/adsk.redirect.js\"></script>\n\
      <title>embeddedsynoptic.htm</title>\n\
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
</style><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/PPGDemos/Application/scripts/ac_common.js\"); });</script><script type=\"text/javascript\">var reflinkid = \"si_cpp\"; var reflinkdata = new Array(); function closeRefLinkDiv() { }; $(document).on(\'click\', function() { closeRefLinkDiv(); } );</script><script>$(document).ready(function() { yepnope.injectJs(\"./examples/Addons/PPGDemos/Application/scripts/multireflink.js\"); });</script><script>$(document).ready(function () { prettyPrint(); } );</script><script>$(\"div#WidgetFloaterPanels,link[href*=\'microsofttranslator.com\'],script[src*=\'microsofttranslator.com\'],script[src*=\'bing.com\']\").remove();</script><script type=\'text/javascript\'>$(\"div#navigation,div#breadcrumbs,div#banner\").attr(\"translate\",\"no\"); var mtLocation = ((location && location.href && location.href.indexOf(\'https\') == 0)?\'https://ssl.microsofttranslator.com\':\'http://www.microsofttranslator.com\')+\'/ajax/v3/WidgetV3.ashx?siteData=y5CYlxTRD0znCzRLDwX0Wy7-g1EdC1XA4dSC-Y1LtaeScyli8_Ps5jPKqTr4xKxMI0OOUfkDplvX3uxN0JnPclebSYW8_J1HBzf4VLQEzQ8M4PsYXF_cMyp1Oumaetky&category=5297189e-446b-459e-ae1d-9d0360400781_tech&ctf=True&ui=true&settings=Manual&from=en&hidelanguages=\'; yepnope.injectJs(mtLocation, function() {}, { charset:\'utf-8\', type:\'text/javascript\' } );</script><script type=\"text/javascript\">\n\
 </script><script language=\"VBScript\">\n\
\' This synoptic is used by the \"Embedded Synoptic Plugin\" example.\n\
\'\n\
\' The example embeds the synoptic in the property page of a custom property,\n\
\' which is attached to a 3D object. Clicking the synoptic image translates\n\
\' the 3D object.\n\
\'\n\
\' The custom property has an Increment parameter that controls\n\
\' how far the object is translated by each click.\n\
\n\
\n\
sub xm(in_obj)\n\
	\' in_obj is the path (a string) to the custom property\n\
	set l_obj = GetValue(in_obj)\n\
	translate l_obj.parent,-1*l_obj.increment.value,0,0\n\
end sub\n\
sub xp(in_obj)\n\
	set l_obj = GetValue(in_obj)\n\
	translate l_obj.parent,1*l_obj.increment.value,0,0\n\
end sub\n\
sub ym(in_obj)\n\
	set l_obj = GetValue(in_obj)\n\
	translate l_obj.parent,0,-1*l_obj.increment.value,0\n\
end sub\n\
sub yp(in_obj)\n\
	set l_obj = GetValue(in_obj)\n\
	translate l_obj.parent,0,1*l_obj.increment.value,0\n\
end sub\n\
sub zm(in_obj)\n\
	set l_obj = GetValue(in_obj)\n\
	translate l_obj.parent,0,0,-1*l_obj.increment.value\n\
end sub\n\
sub zp(in_obj)\n\
	set l_obj = GetValue(in_obj)\n\
	translate l_obj.parent,0,0,1*l_obj.increment.value\n\
end sub\n\
sub reset(in_obj)\n\
	set l_obj = GetValue(in_obj)\n\
	ResetTransform l_obj.parent, siObj, siSRT, siXYZ\n\
end sub\n\
</script><!-- begin MT -->\n\
            \n\
            <div id=\'MicrosoftTranslatorWidget\' class=\'Dark\' style=\'position:absolute;right:20px;top:5px;z-index:100;color:white;background-color:#555555;height:58px;overflow:hidden\'></div><div id=\"reflinkdiv\" style=\"display:none; font-family: \'RobotoRegular\', Arial, Tahoma, sans-serif; visibility:hidden; position:absolute; z-index:40001; padding:5px; border-style:solid; border-width:1px; border-color:#666666; background-color:#dfdfdf; overflow:visible\"></div>\n\
      <div>\n\
         <div class=\"head\">\n\
            <h1>embeddedsynoptic.htm</h1>\n\
         </div>\n\
\n\
\n\
\n\
<map name=\"SynopticMap\">\n\
<area shape=\"circle\" coords=\"58,109,10\" title=\"Translate in the minus X direction\" nohref=\"\" onclick=\"xm\" />\n\
<area shape=\"circle\" coords=\"139,111,10\" title=\"Translate in the positive X direction\" nohref=\"\" onclick=\"xp\" />\n\
<area shape=\"circle\" coords=\"244,112,11\" title=\"Translate in the minus Y direction\" nohref=\"\" onclick=\"ym\" />\n\
<area shape=\"circle\" coords=\"246,24,13\" title=\"Translate in the positive Y direction\" nohref=\"\" onclick=\"yp\" />\n\
<area shape=\"circle\" coords=\"368,117,9\" title=\"Translate in the minus Z direction\" nohref=\"\" onclick=\"zm\" />\n\
<area shape=\"circle\" coords=\"409,117,9\" title=\"Translate in the positive Z direction\" nohref=\"\" onclick=\"zp\" />\n\
<area shape=\"poly\" coords=\"220,269,237,173,261,265,242,273\" title=\"Reset transform\" nohref=\"\" onclick=\"reset\" />\n\
</map>\n\
\n\
<img src=\"embeddedsynoptic.jpg\" usemap=\"#SynopticMap\" />\n\
\n\
      <div class=\"footer-block\"><a href=\"../html/ac.cmtdialog.htm\" class=\"comments-anchor\" target=\"_blank\"><span class=\"comments-link\">Please send us your comment about this page</span></a></div><br /></div>\n\
   </div></body>\n\
</html>\n\
";