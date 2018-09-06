var log = console.log.bind(console);

///////////////////////////////////////////////////////////

function getBrandList(prefix, callback){
  $.ajax({
    url: '/wwbrandlist/' + prefix,
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

function getProductList(brandid){
	setCookie("brandid", brandid, 3);
	window.location.href = "product.html";
}

function getLetter(data){
	var letter = [];
	for(i in data){
		var check = 0;
		for(j in letter){
			if(letter[j] === data[i].charAt(0)) {
				check = 1;
				break;
			}
		}
		if(check == 0) letter.push(data[i].charAt(0));
	}	
	return(letter.sort());	
}

function refresh(prefix){
	getBrandList(prefix, function(msg) {
		var brand = [];
		var brandid = [];

		for(i in msg){
			brand.push((msg[i].brand_name).toUpperCase());
			var id =msg[i].brand_id;
			brandid.push(id.substring(1));			
		}
		
		var letter = getLetter(brand);
		
		document.getElementById("category").innerHTML = '';
		document.getElementById("category").innerHTML += '<button onclick="refresh(\'M\')">MALE</button>';
		document.getElementById("category").innerHTML += '<button onclick="refresh(\'F\')">FEMALE</button>';
		document.getElementById("category").innerHTML += '<button onclick="location.href=\'bodysize.html\'">bodysize</button>';
		
		document.getElementById("brand_list").innerHTML = '';

		for (j in letter) {
			document.getElementById("brand_list").innerHTML += letter[j] + '<br>';
			for(k in brand) {
				if(letter[j] === brand[k].charAt(0)) document.getElementById("brand_list").innerHTML += '<a href="#" onclick="getProductList('+ brandid[k] +')">' + brand[k] + '</a>&nbsp;&nbsp;&nbsp;&nbsp;';				
			}
			document.getElementById("brand_list").innerHTML += '<br><br>';
		}
		
	});
}

//refresh();