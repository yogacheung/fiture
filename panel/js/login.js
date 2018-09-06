function login(data, callback){
  $.ajax({
    method: 'POST',
    url: '/adminlogin',
    contentType: 'application/json',
    data: JSON.stringify(data)
  })
  .done(callback);
}

///////////////////////////////////////////////////////////

function onlogin() {
  var gemail = document.getElementById("email").value;
  var gpw = document.getElementById("password").value;
	var mdpw = CryptoJS.MD5(gpw).toString();
	login({
      email: gemail,
      pw: mdpw
    }, function(res){
		if(res != null){
			setCookie("adminid", res[0].admin_id, 3);
			setCookie("brandid", res[0].brand_id, 3);
			setCookie("name", res[0].name, 3);
			window.location.href = res[0].nextdir;
		}
	});
}

function setCookie(cname, cvalue, exhour) {
    var d = new Date();
    d.setTime(d.getTime() + (exhour*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}