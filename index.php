<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php // xmlget.php

if (isset($_POST['tags'])) $tags = $_POST['tags'] ;
else $tags = "(not ok)" ;

//echo $tags ;


/*if (isset($_GET['url'])) {
	//echo $_GET['url'];

	echo file_get_contents($_GET['url']);
}*/


?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Baba's Flickr Gallery</title>

<script type="text/javascript" src="javascript/AjaxUpdater.js"></script>
<script type="text/javascript" src="javascript/Ajax.js"></script>
<script type="text/javascript">

function initialize()
{
	
	//$tags=document.getElementById('tags').value ;
	//alert(tags);	
	//var url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags='+ $tags + '&format=json'
	//alert(url)
	
	/*nocache = "&nocache" + Math.random() * 1000000
	url = encodeURIComponent(url)
	
	AjaxUpdater.Update("GET", "xmlget.php?url=" + url + nocache, AjaxUpdater.onResponse);*/
	
}
</script>
</head>


<body>
<FORM id="form" METHOD="POST" ACTION="index.php">
<b> Enter argument: </b>
<input size="40" name='tags' id='tags'  >
<INPUT TYPE="submit" VALUE="Submit">
<INPUT TYPE="reset" VALUE="Reset">
</FORM>

<div id="loading"></div>
<div id="body"> tag is: <?php $tags; ?> </div>

</body>
</html>