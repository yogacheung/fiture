var log = console.log.bind(console);
var user_id;
///////////////////////////////////////////////////////////

function getBodysize(user_id, callback){
  $.ajax({
      url: '/getbodysizea/' + user_id,
    })
    .done(callback);
}

function addBodysize(data, callback){
	$.ajax({
		method: 'POST',
		url: '/addbodysizea',
		contentType: 'application/json',
		data: JSON.stringify(data)
	})
	.done(callback)
}

function login(data, callback){
  $.ajax({
		method: 'POST',
		url: '/applogin',
		contentType: 'application/json',
		data: JSON.stringify(data)
	})
	.done(callback)
}

function regsiter(data, callback){
  $.ajax({
		method: 'POST',
		url: '/appregister',
		contentType: 'application/json',
		data: JSON.stringify(data)
	})
	.done(callback)
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

function signin(){
  var gemail = document.getElementById("inemail").value;
  var gpw = document.getElementById("inpw").value;
	login({
      email: gemail,
      pw: gpw
    }, function(res){
		if(res != null){
			//log(res[0]);
			user_id = res[0].user_id;
			getBodysize(user_id, function(res2){
				document.getElementById("height").value = res2[0].height;
				document.getElementById("weight").value = res2[0].weight;
				document.getElementById("shoulder").value = res2[0].shoulder;
				document.getElementById("chest").value = res2[0].chest;
				document.getElementById("wasit").value = res2[0].waist;
				document.getElementById("low_waist").value = res2[0].low_waist;
				document.getElementById("hip").value = res2[0].hip;
				document.getElementById("neck").value = res2[0].neck;
				document.getElementById("rise").value = res2[0].rise;
				document.getElementById("thigh").value = res2[0].thigh;
				document.getElementById("calves").value = res2[0].calves;
				document.getElementById("top_length").value = res2[0].top_length;
				document.getElementById("sleeve_length").value = res2[0].sleeve_length;
				document.getElementById("bottom_length").value = res2[0].bottom_length;
				document.getElementById("footwear").value = res2[0].footwear;
				if (res2[0].gender == "M") document.getElementById("male").checked;
				else document.getElementById("female").checked;
			});
		}
	});
}

function signup(){
  var gemail = document.getElementById("signemail").value;
  var gpw = document.getElementById("signpw").value;
  var gname = document.getElementById("signename").value;
	regsiter({
	  name: gname,
      email: gemail,
      pw: gpw
    }, function(res){
		if(res != null || res!= 0){
			user_id = res[0];
			confirm("Success!");
		}
	});
}

function onSave() {	
	var pdetail = [];
	pdetail[0] = document.getElementById("height").value;
	pdetail[1] = document.getElementById("weight").value;
	pdetail[2] = document.getElementById("shoulder").value;
	pdetail[3] = document.getElementById("chest").value;
	pdetail[4] = document.getElementById("wasit").value;
	pdetail[5] = document.getElementById("low_waist").value;
	pdetail[6] = document.getElementById("hip").value;
	pdetail[7] = document.getElementById("neck").value;
	pdetail[8] = document.getElementById("rise").value;
	pdetail[9] = document.getElementById("thigh").value;
	pdetail[10] = document.getElementById("calves").value;
	pdetail[11] = document.getElementById("top_length").value;
	pdetail[12] = document.getElementById("sleeve_length").value;
	pdetail[13] = document.getElementById("bottom_length").value;
	pdetail[14] = document.getElementById("footwear").value;
	if (document.getElementById("male").checked) pdetail[15] = "M";
	if (document.getElementById("female").checked) pdetail[15] = "F";
	pdetail[16] = "1";
	log(pdetail);
 
	if (confirm('Save?')){
	    addBodysize({
		    user_id : parseFloat(pdetail[16]),
	    	gender: pdetail[15],
	        height: parseFloat(pdetail[0]),
	        weight: parseFloat(pdetail[1]),
	        top_length: parseFloat(pdetail[11]),
	        bottom_length: parseFloat(pdetail[13]),
	        neck : parseFloat(pdetail[7]),
	        shoulder: parseFloat(pdetail[2]),
	        chest: parseFloat(pdetail[3]),
	        waist: parseFloat(pdetail[4]),
	        low_waist: parseFloat(pdetail[5]),
	        sleeve_length: parseFloat(pdetail[12]),
	        hip: parseFloat(pdetail[6]),
	        rise: parseFloat(pdetail[8]),
	        thigh: parseFloat(pdetail[9]),
	        calves: parseFloat(pdetail[10]),
	        footwear: parseFloat(pdetail[14])
	    }, function(msg) {
		    //log(msg);							
		    if(confirm("Saved.")) window.location.href = "index.html";  				    
	    });	
    }
}
