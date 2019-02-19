Ajax = {};

Ajax.makeRequest = function(method, url, callbackMethod)
{
	this.request = (window.XMLHttpRequest)? new XMLHttpRequest(): new ActiveXObject("MSXML2.XMLHTTP");
	this.request.onreadystatechange = callbackMethod;
	this.request.open(method, url, true);
	this.request.send(url);
}
	
Ajax.checkReadyState = function(_id)
{
	switch(this.request.readyState)
	{
		case 1:
			document.getElementById(_id).innerHTML = 'Loading ...';
			break;
		case 2:
			document.getElementById(_id).innerHTML = 'Loading ...';
			break;
		case 3:
			document.getElementById(_id).innerHTML = 'Loading ...';
			break;
		case 4:
			AjaxUpdater.isUpdating = false;
			document.getElementById(_id).innerHTML = '';
			return this.request.status;
		default:
			document.getElementById(_id).innerHTML = "An unexpected error has occurred.";
	}
}
	
Ajax.getResponse = function()
{
	if(this.request.getResponseHeader('Content-Type').indexOf('html') != 1)
	{
		return this.request.responseXML;
	}
	else
	{
		return this.request.responseText;
	}
}

