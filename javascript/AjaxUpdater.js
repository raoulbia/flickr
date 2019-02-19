AjaxUpdater = {};

AjaxUpdater.initialize = function()
{
	AjaxUpdater.isUpdating = false;
}

AjaxUpdater.initialize()
{
}

AjaxUpdater.Update = function(method , service, callback)
{
	if(callback == undefined || callback == "")
	{
		callback = AjaxUpdater.onResponse;
	}
	Ajax.makeRequest(method, service, callback);
	AjaxUpdater.isUpdating = true;
}

AjaxUpdater.onResponse = function()
{
	out = Array() 
	var title ;
	if(Ajax.checkReadyState("loading"))
	{
		rsp = this.responseText
		if (rsp.indexOf("jsonFlickrFeed({") != -1)
		{
			myreturndata = parseFlickrFeedJson(rsp)
			if (myreturndata.items == "")
			{
				out.push("")
			}
			else
			{
			out = getFeedImagesFromJsonObject(myreturndata) ;
			}
			display(out) ;
		}
		else
		{
			myreturndata = parseFlickrApiJson(rsp)
			data= myreturndata.photos.photo
			if (data == "")
			{
				out.push("")
			}
			else
			{
		
			getApiImagesFromJsonObject() ;

			}
			display(out) ;
		}
		
		AjaxUpdater.isUpdating = true;
	}// END checkReadyState
}// END AjaxUpdater.onResponse 


function getFeedImagesFromJsonObject(myreturndata){


		for(var i = 0 ; i < 6 ; ++i){
		num = Math.round(Math.random() * myreturndata.items.length-1) ;		

		if (myreturndata.items[num].title != ''){
			photoTitle = myreturndata.items[num].title
		} else {
			photoTitle = 'Untitled'
		}

		photoTitle = getFeedTitle(num) ;
		tags = myreturndata.items[num].tags
		tags = getTags() ;
		img = myreturndata.items[num].description
		img = extractURLfromDesc();
		// alert(img);
		out.push('<span id"=header" class="align-top"> \
		<p class=" text-nowrap font-italic">' + photoTitle + '<p> </span>' + img);
		}
		return out ;
}

function getApiImagesFromJsonObject(){

		for(var i = 0 ; i < 6 ; ++i){
		num = Math.round(Math.random() * data.length-1) ;
		
		if (data[num].title != ''){
			photoTitle = data[num].title
		} else {
			photoTitle = 'Untitled'
		}
		
		
		photoTitle = getApiTitle() ;
		out.push( '<span id"=header" class="align-top"> \
		<p class=" text-nowrap font-italic">' + photoTitle + '<p> \
		</span> \
		<img class="img-fluid" src="http://farm' + data[num].farm +
		 '.static.flickr.com/' + data[num].server + '/' 
		 + data[num].id + '_' + data[num].secret + '.jpg">') ;
		}
		return out ;
}


function display(out)
{			
	
	if (out=="")
	{
		document.getElementById("cell-0").innerHTML  = "No Images found" ;
		for(var i = 1 ; i < 6 ; ++i)
		{
		
		document.getElementById("cell-"+i).innerHTML  = "" ;

		}
	}
	else
	{
		for(var i = 0 ; i < 6 ; ++i)
		{
		
		document.getElementById("cell-"+i).innerHTML  = out[i] ;

		}
	}

}



function parseFlickrFeedJson(jsonstring){
    var data=null;

     var jsonFlickrFeed=function(d){
	    data = d;
    	}

    eval(jsonstring);
    return data;
}


function parseFlickrApiJson(jsonstring){
    var data=null;

     var jsonFlickrApi=function(d){
	    data = d;
    	}

    eval(jsonstring);
    return data;
}

function getTags()
{
	
	if (tags.length > 100)
	{
		tags = tags.substring(0,100)+"..." ;
	}
	tags = '<span id="photoTags">' + tags + '</span>' ;
	return tags
}

function extractURLfromDesc()
{
	
	img = img.substring(img.indexOf('<img src'), img.indexOf('width'))
	
	img = img.replace(/_m.jpg/i, '_z.jpg">')
	img = img.replace(/img src/i, 'img class="img-fluid" src')
	// alert(img);

	return img
}
function getApiTitle()
{
	if (photoTitle.length > 40)
	{
		photoTitle = photoTitle.substring(0,40)+"..." ;
	}
	if (photoTitle.indexOf("[") != -1 || photoTitle.indexOf("]") != -1)
	{
		photoTitle = photoTitle.replace(/[]|[]/g, "")
		
	}
	t = '<span id="header">' + photoTitle + '</span>'
	return photoTitle
}

function getFeedTitle(num)
{
	photoTitle = '<span class="d-inline-block text-truncate" style="max-width: 300px" id="header">' + photoTitle + '</span>'
	return photoTitle
}