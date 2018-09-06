var log = console.log.bind(console);

///////////////////////////////////////////////////////////

var messageList = [];
var total = 0;
var brand_id = 0;

function getAppProductList(brand_id, callback){
  $.ajax({
      url: '/appproductlist/' + brand_id,
    })
    .done(callback);
}

function getTotal(brand_id, callback){
  $.ajax({
      url: '/productcount/' + brand_id,
    })
    .done(callback);
}

function deleteProduct(product_id, callback) {
  $.ajax({
      method: 'GET',
      url: '/deleteproduct/' + product_id,
    })
    .done(callback);
}

///////////////////////////////////////////////////////////

function onEdit(id){
	document.cookie = 'productid=' + id;
	window.location.href = "edit.html";
}

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

function onDelete(product_id) {
  if(confirm('Delete?')){
		deleteProduct(product_id, function(result){
			if(confirm('Deleted.')){
				messageList = [];
				total = 0;
				refresh();
			}
		});
	}
}

function refresh(){
	brand_id = getCookie("brandid");
	getTotal(brand_id, function(result) {    
		total = result[0].total;
// 		log(total);
		getAppProductList(brand_id, function(msg) {    
		    messageList = msg;
// 		    log(messageList);
		    redraw();
		});
	
	});
}

function redraw() {
  $('#prodcut_list').empty();
  
  document.getElementById("total").innerHTML = "TOTAL: " + total + " PRODUCTS";
  
  document.getElementById("prodcutlist").innerHTML = '';
  
  for (var i = 0; i < messageList.length; i++) {
    var m = messageList[i];    
// 		log(m.product_id);
	document.getElementById("prodcutlist").innerHTML += '<div class="item" data-value="' + m.product_id + '">' +
    	'<div class="ui tiny image">' +
    	'<img src="' + m.imgurl + '">' +
    	'</div>' +
    	'<div class="middle aligned content">' +
    	m.name +
    	'<button class="ui red right floated button" data-method="delete" onClick="onDelete('+ m.product_id +')">DELETE</button>' +
    	'<button class="ui black right floated button" data-method="edit" onclick="onEdit(' + m.product_id + ')">EDIT</button>' +
    	 '<br/> Sales Price: ' + m.currency + ' ' + m.sales_price +
    	'</div></div>'    ;
/*
    $('#prodcutlist').append(
    	'<div class="item" data-value="' + m.product_id + '">' +
    	'<div class="ui tiny image">' +
    	'<img src="' + m.imgurl + '">' +
    	'</div>' +
    	'<div class="middle aligned content">' +
    	m.name +
    	'<button class="ui red right floated button" data-method="delete" onClick="onDelete()">DELETE</button>' +
    	'<button class="ui black right floated button" data-method="edit">EDIT</button>' +
    	'</div>' +
    	'</div>'      
    );
*/
  }

}


refresh();