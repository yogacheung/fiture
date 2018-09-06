var log = console.log.bind(console);

///////////////////////////////////////////////////////////

var pdetail = [];
var chartlist = [];
var xi = 0;
var subcat = [];
var sizelist = [];
var brandid = 0;
var done = 0;

function addproduct(data, callback) {
  //log(data);
  $.ajax({
      method: 'POST',
      url: '/addproduct',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
    .done(callback)
}

function addsizechart(data, callback) {
  $.ajax({
      method: 'POST',
      url: '/addchart',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
    .done(callback)
}

function getSizeList(callback){
  $.ajax({
      url: '/sizelist',
    })
    .done(callback);
}

function getBodyList(callback){
  $.ajax({
      url: '/bodylist',
    })
    .done(callback);
}

///////////////////////////////////////////////////////////

function onloadadd(){
	brandid = getCookie("userid");
// 	alert(brandid);
	getSizeList(function(res){
		sizelist = res;
		getBodyList(function(resb){
			subcat = resb;
		});
	});
}

function onSave() {	
	if(pdetail.length>0 && chartlist.length>0){
		if (confirm('Save?'))
	    addproduct({
	      prefix: pdetail[3], 
	      name: pdetail[0], 
	      currency: "USD", 
	      retail_price: parseInt(pdetail[6]), 
	      sales_price: parseInt(pdetail[7]), 
	      link: pdetail[5], 
	      imgurl: pdetail[4], 
	      description: pdetail[1], 
	      brand_id: parseInt(brandid),
	      body_part: parseInt(pdetail[2]), 
	      subcategory_id: parseInt(pdetail[8])
	    }, function(msg) {
	// 	  alert(msg);
// 		    for(i in chartlist){
// 			    for(var j=1; j<chartlist[i].length; j+=2){			    
// 				  	addsizechart({
// 							prefix: pdetail[3],
// 							product_id: parseInt(msg),
// 							size: parseInt(chartlist[i][j+1]),
// 							body_id: parseInt(chartlist[i][j]),
// 							size_id: parseInt(chartlist[i][0])
// 				   	}, function (msg2){
// 	// 				   	alert(msg2);
// 				   	});      
// 			    }								
		    }
		    if(confirm("Saved.")) window.location.href = "product.html";  
	    });	
	}else {
		alert("Enter and save product information and chart data first!");
	}
  
}

function onCancel(){
  if(confirm("Sure to cancel?")){
    window.location.href = "product.html";
  }
}

function pSave(){
  pdetail[0] = document.getElementById("pname").value;
  pdetail[1] = document.getElementById("description").value;
  pdetail[2] = document.getElementById("cate").value;
  pdetail[3] = document.getElementById("selectgender").value;
  pdetail[4] = document.getElementById("link").value;
  pdetail[5] = document.getElementById("plink").value;
  pdetail[6] = document.getElementById("retailprice").value;
  pdetail[7] = document.getElementById("salesprice").value;
	pdetail[8] = document.getElementById("selectcat").selectedIndex;
 
//   log(pdetail);
}

function pReset(){
  if(confirm("Sure to reset?")) pdetail = [];
}

function cSave(){
  var name = document.getElementById("selectsize").value;
  
  if(name != null){
    var chartdetail = [];
    var c = 0;
    chartdetail[c++] = name;
    
    for(i in subcat){
	    if(document.getElementById(subcat[i].name)){
				chartdetail[c++] = subcat[i].body_id;
				chartdetail[c++] = document.getElementById(subcat[i].name).value;    
	    }
    }
// 		log(chartdetail);      
    chartlist[xi++] = chartdetail;    

    drawSize();
  }
}

function cReset(){
// 	for(i in chartlist){
// 		    for(var j=1; j<chartlist[i].length; j+=2){			    
// 						var t = {prefix: pdetail[3],
// 						product_id: parseInt("1"),
// 						size: parseInt(chartlist[i][j+1]),
// 						body_id: parseInt(chartlist[i][j]),
// 						size_id: parseInt(chartlist[i][0])
// 						}
// 						log(t);
// 				}
// 		}

  if(confirm("Sure to reset?")){
    chartlist = [];
    xi = 0;
    drawSize();
  }
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

function drawSize() {
    document.getElementById("chartlist").innerHTML = '';
    for(i in chartlist){
      document.getElementById("chartlist").innerHTML += '<button class="ui button" type="button" onclick="drawChartDetail('+ i +')">' + sizelist[parseInt(chartlist[i][0])-1].name + '</button>';
    }
    document.getElementById("chartlist").innerHTML += '<button class="ui button" type="button" onclick="addChart()"> + </button>';
}

function drawChartDetail(pos){
  document.getElementById("chartdetail").innerHTML = '';
  
  document.getElementById("chartdetail").innerHTML += '<div class="field">'+
    '<label>SIZE NAME</label>' +
    '<select class="ui fluid dropdown" id="selectsize">' +
      '<option value="0">SELECT A SIZE NAME</option>';    

  for(i in sizelist){
	  if(sizelist[i].name == sizelist[chartlist[pos][0]].name){
		  document.getElementById("selectsize").innerHTML +=	
      '<option value="' + sizelist[i].size_id + '" selected>' + sizelist[i].name + '</option>';
	  }else{
			document.getElementById("selectsize").innerHTML +=	
      '<option value="' + sizelist[i].size_id + '">' + sizelist[i].name + '</option>';  
	  }
	  
  } 
  
  document.getElementById("selectsize").innerHTML += '</select>';
  document.getElementById("chartdetail").innerHTML += '</div>';
  
  var link = document.getElementById("selectcat").value;
  switch(link){
    case "Blazer":{}
    case "Coat":{}
    case "Dress":{}
    case "Jacket":{}
    case "LSTop":{}  
    case "Shirt":{}
    case "Top":{
	    for(var i=0; i<5; i++){
		  	document.getElementById("chartdetail").innerHTML += '<div class="field">' +
		  	'<label>' + subcat[i].name + ' (CM)</label>' +  
		  	'<input type="text" id="' + subcat[i].name + '"value="'+ chartlist[pos][(i+1)*2] +'">' +
        '</div>';
	    }      
        break;
    }
    case "Cardigan":{}
    case "CrewneckPullover":{}
    case "Hoodie":{}
    case "LSTshirt":{}
    case "Poloshirt":{}
    case "LSTshirt":{}
    case "Sweater":{}
    case "Tshirt":{}
    case "Turtleneck":{
      for(var i=0; i<4; i++){
		  	document.getElementById("chartdetail").innerHTML += '<div class="field">' +
		  	'<label>' + subcat[i].name + ' (CM)</label>' +  
		  	'<input type="text" id="' + subcat[i].name + '"value="'+ chartlist[pos][(i+1)*2] +'">' +
        '</div>';
	    }      
      break;
    }
    case "Tank":{
      for(var i=0; i<2; i++){
		  	document.getElementById("chartdetail").innerHTML += '<div class="field">' +
		  	'<label>' + subcat[i].name + ' (CM)</label>' +  
		  	'<input type="text" id="' + subcat[i].name + '"value="'+ chartlist[pos][(i+1)*2] +'">' +
        '</div>';
	    }      
      break;
    }
    case "JeansPants":{}
    case "PantsJeans":{}    
    case "Sweatpant":{
      for(var i=5; i<10; i++){
		  	document.getElementById("chartdetail").innerHTML += '<div class="field">' +
		  	'<label>' + subcat[i].name + ' (CM)</label>' +  
		  	'<input type="text" id="' + subcat[i].name + '"value="'+ chartlist[pos][i*2-8] +'">' +
        '</div>';
	    }      
      break;
    }
    case "Waistcoat":{
      document.getElementById("chartdetail").innerHTML += '<div class="field">' +
                '<label>' + subcat[0].name + ' (CM)</label>' +
                '<input type="text" id="'+ subcat[0].name +'" value="'+ chartlist[pos][2] +'">' +
                '</div>' +               
                '<div class="field">' +
                  '<label>' + subcat[1].name + ' (CM)</label>' +
                  '<input type="text" id="'+ subcat[1].name +' value="'+ chartlist[pos][4] +'">' +
                '</div>' +
                '<div class="field">' +
                  '<label>' + subcat[2].name + ' (CM)</label>' +
                  '<input type="text" id="'+ subcat[2].name +'" value="'+ chartlist[pos][6] +'">' +
                '</div>' +
                '<div class="field">' +
                  '<label>' + subcat[4].name + ' (CM)</label>' +
                  '<input type="text" id="'+ subcat[4].name +'" value="'+ chartlist[pos][8] +'">' +
                '</div>';
                break;
    }
    case "Skirt":{}
    case "Longskirt":{
        document.getElementById("chartdetail").innerHTML += '<div class="field">' +
                '<label>' + subcat[5].name + ' (CM)</label>' +
                '<input type="text" id="'+ subcat[5].name +'" value="'+ chartlist[pos][2] +'">' +
                '</div>' +               
                '<div class="field">' +
                  '<label>' + subcat[7].name + ' (CM)</label>' +
                  '<input type="text" id="'+ subcat[7].name +'" value="'+ chartlist[pos][4] +'">' +
                '</div>';
                break;              
      }
    case "Shorts":{
      var gender = document.getElementById("selectgender").value;
      if(gender == 'M'){
        for(var i=5; i<10; i++){
		  	document.getElementById("chartdetail").innerHTML += '<div class="field">' +
		  	'<label>' + subcat[i].name + ' (CM)</label>' +  
		  	'<input type="text" id="' + subcat[i].name + ' "value="'+ chartlist[pos][i*2-8] +'">' +
        '</div>';
	    }      
      }else {
        document.getElementById("chartdetail").innerHTML += '<div class="field">' +
      '<label>' + subcat[5].name + ' (CM)</label>' +
      '<input type="text" id="'+ subcat[5].name +'" value="'+ chartlist[pos][2] +'">' +
      '</div>' +               
      '<div class="field">' +
        '<label>' + subcat[6] + ' (CM)</label>' +
        '<input type="text" id="'+ subcat[6].name +'" value="'+ chartlist[pos][4] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcat[7].name + ' (CM)</label>' +
        '<input type="text" id="'+ subcat[7].name +'" value="'+ chartlist[pos][6] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcat[9].name + ' (CM)</label>' +
        '<input type="text" id="' + subcat[9].name + '" value="'+ chartlist[pos][8] +'">' +
      '</div>';
      }
      break;
    }


  }

    document.getElementById("chartdetail").innerHTML += '<button class="ui button" type="button" onclick="cSave()">SAVE</button>' +
  '<button class="ui button" type="button" onclick="cReset()">RESET</button>'; 
}

function imglink(){
  var link = document.getElementById("link").value;
  if(link != ''){
    document.getElementById("linkimg").innerHTML = '';
    document.getElementById("linkimg").innerHTML += '<img class="ui image" src="'+ link +'">';  
  }else {
    document.getElementById("linkimg").innerHTML = '';
    document.getElementById("linkimg").innerHTML += '<img class="ui fluid image" src="img/fiture.png">';  
  }
  
}

function cateimg(){
  addChart();
  document.getElementById("imgcat").innerHTML = '';
  var link = document.getElementById("selectcat").value;
  var gender = document.getElementById("selectgender").value;
  if(link == "fiture"){
    document.getElementById("imgcat").innerHTML += '<img class="ui fluid image" src="img/' + link + '.png">';
  } else{
    if(gender == "M"){    
      document.getElementById("imgcat").innerHTML += '<img class="ui fluid image" src="img/' + link + 'Male.png">';
    }else {
      document.getElementById("imgcat").innerHTML += '<img class="ui fluid image" src="img/' + link + 'Female.png">';         
    } 
  }
}

function categender(){
  var gender = document.getElementById("selectgender").value;
  if(gender == "M"){
    document.getElementById("selectcat").innerHTML = '';
    document.getElementById("selectcat").innerHTML += 
                  '<option value="fiture">SELECT A SUB-CATEGORY FOR THE PRODUCT</option>' +
                  '<option value="Blazer">Blazer</option>' +
                  '<option value="Cardigan">Cardigan</option>' +
                  '<option value="Coat">Coat</option>' +
                  '<option value="Hoodie">Hoodie</option>' +
                  '<option value="Jacket">Jacket</option>' +
                  '<option value="JeansPants">JeansPants</option>' +
                  '<option value="LSTshirt">LSTshirt</option>' +                                    
                  '<option value="Poloshirt">Poloshirt</option>' +                  
                  '<option value="Shirt">Shirt</option>' +
                  '<option value="Shorts">Shorts</option>' +
                  '<option value="Sweater">Sweater</option>' +
                  '<option value="Sweatpant">Sweatpant</option>' +
                  '<option value="Tank">Tank</option>' +
                  '<option value="Tshirt">Tshirt</option>' +
                  '<option value="Turtleneck">Turtleneck</option>' +
                  '<option value="Waistcoat">Waistcoat</option>' +
                '</select>' +
              '</div>';
  }else{
    document.getElementById("selectcat").innerHTML = '';
    document.getElementById("selectcat").innerHTML += '<option value="fiture">SELECT A SUB-CATEGORY FOR THE PRODUCT</option>' +
                  '<option value="Blazer">Blazer</option>' +
                  '<option value="Cardigan">Cardigan</option>' +
                  '<option value="Coat">Coat</option>' +
                  '<option value="CrewneckPullover">CrewneckPullover</option>' +
                  '<option value="Dress">Dress</option>' +
                  '<option value="Hoodie">Hoodie</option>' +
                  '<option value="Jacket">Jacket</option>' +
                  '<option value="Longskirt">Longskirt</option>' +
                  '<option value="LSTop">LSTop</option>' +
                  '<option value="PantsJeans">PantsJeans</option>' +
                  '<option value="Poloshirt">Poloshirt</option>' +                                    
                  '<option value="Shorts">Shorts</option>' +
                  '<option value="Skirt">Skirt</option>' +
                  '<option value="Sweater">Sweater</option>' +
                  '<option value="Sweatpant">Sweatpant</option>' +
                  '<option value="Tank">Tank</option>' +
                  '<option value="Top">Top</option>' +
                  '<option value="Turtleneck">Turtleneck</option>' +
                  '<option value="Waistcoat">Waistcoat</option>';
  }
  cateimg();  
}

function addChart(){	
	var link = document.getElementById("selectcat").value;

	document.getElementById("chartdetail").innerHTML = '';
  
	document.getElementById("chartdetail").innerHTML += '<div class="field">'+
    '<label>SIZE NAME</label>' +
    '<select class="ui fluid dropdown" id="selectsize">' +
      '<option value="0">SELECT A SIZE NAME</option>';    

  for(i in sizelist){
	  document.getElementById("selectsize").innerHTML +=	
      '<option value="' + sizelist[i].size_id + '">' + sizelist[i].name + '</option>';
	  
  } 
  
  document.getElementById("selectsize").innerHTML += '</select>';
  document.getElementById("chartdetail").innerHTML += '</div>';

  switch(link){
    case "Blazer":{}
    case "Coat":{}
    case "Dress":{}
    case "Jacket":{}
    case "LSTop":{}  
    case "Shirt":{}
    case "Top":{
      for(var i=0; i<5; i++){
		  	document.getElementById("chartdetail").innerHTML += '<div class="field">' +
		  	'<label>' + subcat[i].name + ' (CM)</label>' +  
		  	'<input type="text" id="' + subcat[i].name + '">' +
        '</div>';
	    }      
        break;
    }
    case "Cardigan":{}
    case "CrewneckPullover":{}
    case "Hoodie":{}
    case "LSTshirt":{}
    case "Poloshirt":{}
    case "LSTshirt":{}
    case "Sweater":{}
    case "Tshirt":{}
    case "Turtleneck":{
      for(var i=0; i<4; i++){
		  	document.getElementById("chartdetail").innerHTML += '<div class="field">' +
		  	'<label>' + subcat[i].name + ' (CM)</label>' +  
		  	'<input type="text" id="' + subcat[i].name + '">' +
        '</div>';
	    }      
      break;
    }
    case "Tank":{
      for(var i=0; i<2; i++){
		  	document.getElementById("chartdetail").innerHTML += '<div class="field">' +
		  	'<label>' + subcat[i].name + ' (CM)</label>' +  
		  	'<input type="text" id="' + subcat[i].name + '">' +
        '</div>';
	    }      
      break;
    }
    case "JeansPants":{}
    case "PantsJeans":{}    
    case "Sweatpant":{
      for(var i=5; i<10; i++){
		  	document.getElementById("chartdetail").innerHTML += '<div class="field">' +
		  	'<label>' + subcat[i].name + ' (CM)</label>' +  
		  	'<input type="text" id="' + subcat[i].name + '">' +
        '</div>';
	    }      
      break;
    }
    case "Waistcoat":{
      document.getElementById("chartdetail").innerHTML += '<div class="field">' +
                '<label>' + subcat[0].name + ' (CM)</label>' +
                '<input type="text" id="' + subcat[0].name + '">' +
                '</div>' +               
                '<div class="field">' +
                  '<label>' + subcat[1].name + ' (CM)</label>' +
                  '<input type="text" id="' + subcat[1].name + '">' +
                '</div>' +
                '<div class="field">' +
                  '<label>' + subcatu[2].name + ' (CM)</label>' +
                  '<input type="text" id="' + subcat[2].name + '">' +
                '</div>' +
                '<div class="field">' +
                  '<label>' + subcatu[4].name + ' (CM)</label>' +
                  '<input type="text" id="' + subcat[4].name + '">' +
                '</div>';
                break;
    }
    case "Skirt":{}
    case "Longskirt":{
        document.getElementById("chartdetail").innerHTML += '<div class="field">' +
                '<label>' + subcat[5].name + ' (CM)</label>' +
                '<input type="text" id="' + subcat[5].name + '">' +
                '</div>' +               
                '<div class="field">' +
                  '<label>' + subcat[7].name + ' (CM)</label>' +
                  '<input type="text" id="' + subcat[7].name + '">' +
                '</div>';
                break;              
      }
    case "Shorts":{
      var gender = document.getElementById("selectgender").value;
      if(gender == 'M'){
        for(var i=5; i<10; i++){
		  	document.getElementById("chartdetail").innerHTML += '<div class="field">' +
		  	'<label>' + subcat[i].name + ' (CM)</label>' +  
		  	'<input type="text" id="' + subcat[i].name + '">' +
        '</div>';
	    }      
      }else {
        document.getElementById("chartdetail").innerHTML += '<div class="field">' +
      '<label>' + subcat[5].name + ' (CM)</label>' +
      '<input type="text" id="' + subcat[5].name + '">' +
      '</div>' +               
      '<div class="field">' +
        '<label>' + subcat[6].name + ' (CM)</label>' +
        '<input type="text" id="' + subcat[6].name + '">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcat[7].name + ' (CM)</label>' +
        '<input type="text" id="' + subcat[7].name + '">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcat[9].name + ' (CM)</label>' +
        '<input type="text" id="' + subcat[9].name + '">' +
      '</div>';
      }
      break;
    }
  }
	 

	document.getElementById("chartdetail").innerHTML += '<button class="ui button" type="button" onclick="cSave()">SAVE</button>' +
	'<button class="ui button" type="button" onclick="cReset()">RESET</button>';
	
}

onloadadd();