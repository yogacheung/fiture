var log = console.log.bind(console);

///////////////////////////////////////////////////////////

function getProductList(brand_id, callback){
  $.ajax({
      url: '/appproductlist/' + brand_id,
    })
    .done(callback);
}

///////////////////////////////////////////////////////////

function setCookie(cname, cvalue, exhour) {
    var d = new Date();
    d.setTime(d.getTime() + (exhour*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function refresh(){	
	var brand_id = getCookie("brandid");
	//log(brand_id);
	getProductList(brand_id, function(msg) {    
		//log(msg);
	    document.getElementById("productlist").innerHTML = '';
   
		document.getElementById("productlist").innerHTML += '<table style="width:100%">';
				document.getElementById("productlist").innerHTML += '<tr>';
		for(var i=0; i<msg.length; i++){
			document.getElementById("productlist").innerHTML += '<td><a href="'+ msg[i].link +'"><img src="' + msg[i].imgurl + '" width="25%" height="50%"/></a></td>';
		}

		document.getElementById("productlist").innerHTML += '</tr>';

		document.getElementById("productlist").innerHTML += '</table>';
	
	});
}

//refresh();