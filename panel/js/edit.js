var log = console.log.bind(console);

///////////////////////////////////////////////////////////

var detail = [];
var chartlist = [];
var chartdetail = [];
var pdetail = [];
var pchartlist = [];
var sizelist = [];
var subcat = [];
var product_id = 0;
var brand_id = 0;

function getProductDetail(product_id, callback){
  $.ajax({
      url: '/appproductdetail/' + product_id,
    })
    .done(callback);
}

function getChartList(product_id, callback){
  $.ajax({
      url: '/chartlist/' + product_id,
    })
    .done(callback);
}

function getChartDetail(size_id, product_id, callback){
  $.ajax({
      url: '/chartdetail/' + size_id + '/' + product_id,
    })
    .done(callback);
}

function addproduct(data, callback) {
  log(data);
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

function onSave() {	
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
	    for(i in chartlist){
		    for(var j=1; j<chartlist[i].length; j+=2){			    
			  	addsizechart({
						prefix: pdetail[3],
						product_id: parseInt(msg),
						size: parseInt(chartlist[i][j+1]),
						body_id: parseInt(chartlist[i][j]),
						size_id: parseInt(chartlist[i][0])
			   	}, function (msg2){
// 				   	alert(msg2);
			   	});      
		    }				
	    }
	    if(confirm("Saved.")) window.location.href = "product.html";  
    });
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

function pSave(){
  detail[0] = document.getElementById("pname").value;
  detail[1] = document.getElementById("descrioption").value;
  detail[2] = document.getElementById("cate").value;
  detail[3] = document.getElementById("selectcat").value;
  detail[4] = document.getElementById("selectgender").value;
  detail[5] = document.getElementById("pimage").src;
  detail[6] = document.getElementById("plink").value;
}

function pReset(){
  if(confirm("Sure to reset?")) pdetail = [];
}

function cSave(){
  var name = document.getElementById("chartname").value;
  
  if(name != null){
    var chartdetail = [];
    chartdetail[0] = name;
    for(var i=1; i<6; i++){      
      if(document.getElementById(subcatu[i-1])) chartdetail[i] = document.getElementById(subcatu[i-1]).value;
      else if(document.getElementById(subcatb[i-1])) chartdetail[i] = document.getElementById(subcatb[i-1]).value;
        else chartdetail[i] = 0;
    }
    
    chartlist[xi++] = chartdetail;    
    drawSize();
  }
}

function cReset(){
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

function imglink(){
  var link = document.getElementById("link").value;
  if(link != ''){
    document.getElementById("linkimg").innerHTML = '';
    document.getElementById("linkimg").innerHTML += '<img class="ui image" src="'+ link +'">';  
  }else {
    document.getElementById("linkimg").innerHTML = '';
    document.getElementById("linkimg").innerHTML += '<img class="ui fluid image" src="img/Fiture.jpg">';  
  }
  
}

function refresh(){
	brand_id = getCookie("brandid");
	product_id = getCookie("productid");
	
	//getSizeList(function(res){
		//sizelist = res;
		//getBodyList(function(resb){
			//subcat = resb;
			
			getProductDetail(product_id, function(msg) {    
			    detail = msg;
		// 		log(messageList);
					//getChartList(product_id, function(result) {
						//chartlist = result;
						//getChartDetail(chartlist[0].size_id, product_id, function(res) {
							//chartdetail = res;
// 							log(chartdetail);
							redraw();	
						//});
					//});
			    
			});
		//});
	//});
	
}

function redraw() {
	$('.productid').empty();
  $('.productdetail').empty();

  document.getElementById("productid").innerHTML += 'EDIT PRODUCT' +
  '<button class="ui button" type="submit" onclick="">SAVE</button>' +
  '<button class="ui button" onclick="onCancel()">CANCEL</button>';
  
	document.getElementById("productdetail").innerHTML += '<div class="field">'+
                '<label>PRODUCT NAME</label>'+
                '<input type="text" id="pname" value="'+ detail[0].name +'">' +
              '</div>' +
              '<div class="field">'+
                '<label>PRODUCT DESCRIPTION</label>'+
                '<input type="text" id="description" value="'+ detail[0].description +'">' +
              '</div>' +
              '<div class="field">' +
                '<label>RETAIL PRICE (' + detail[0].currency + ')</label>' +
                '<input type="text" id="retailprice" value="' + detail[0].retail_price + '">' +
              '</div>' +
              '<div class="field">' +
                '<label>SALES PRICE (' + detail[0].currency + ')</label>' +
                '<input type="text" id="salesprice" value="' + detail[0].sales_price + '">' +
              '</div>';
              
              if(detail[0].body_part == '1'){
                  document.getElementById("productdetail").innerHTML += '<div class="field">' +
              '<label>CATEGORY</label>' +
              '<select class="ui fluid dropdown" id="cate">' +
              '<option value="0">SELECT A CATEGORY FOR THE PRODUCT</option>' +
              '<option value="1" selected>TOP</option>' +
                  '<option value="2">BOTTOM</option>' +
                  '<option value="3">FOOTWEAR</option>' +
                  '</select>' +
              '</div>';
              } else if (detail[0].body_part == '2'){
	              	document.getElementById("productdetail").innerHTML += '<div class="field">' +
              '<label>CATEGORY</label>' +
              '<select class="ui fluid dropdown" id="cate">' +
              '<option value="0">SELECT A CATEGORY FOR THE PRODUCT</option>' +
              '<option value="1">TOP</option>' +
                  '<option value="2" selected>BOTTOM</option>' +
                  '<option value="3">FOOTWEAR</option>' +
                  '</select>' +
              '</div>';
              } else {
	              document.getElementById("productdetail").innerHTML += '<div class="field">' +
              '<label>CATEGORY</label>' +
              '<select class="ui fluid dropdown" id="cate">' +
              '<option value="0">SELECT A CATEGORY FOR THE PRODUCT</option>' +
              '<option value="1">TOP</option>' +
                  '<option value="2">BOTTOM</option>' +
                  '<option value="3" selected>FOOTWEAR</option>' +
                  '</select>' +
              '</div>';
              }
                        
              if(detail[0].prefix == 'M'){
	              document.getElementById("productdetail").innerHTML += '<div class="field">' +
                '<label>SUB-CATEGORY</label>' +
                '<select class="ui fluid dropdown" id="selectcat" onchange="cateimg()">' +
                  '<option value="Fiture">SELECT A SUB-CATEGORY FOR THE PRODUCT</option>' +
                  '<option value="Blazer">Blazer</option>' +
                  '<option value="Cardigan">Cardigan</option>' +
                  '<option value="Coat">Coat</option>' +
                  '<option value="Hoodie">Hoodie</option>' +
                  '<option value="Jacket">Jacket</option>' +
                  '<option value="JeansPants">JeansPlants</option>' +
                  '<option value="LSTshirt">LSTshirt</option>' +
                  '<option value="Poloshirt">Poloshirt</option>' +
	                '<option value="Shirt">Shirt</option>' +
                  '<option value="Shorts">Shorts</option>' +
                  '<option value="Sweater">Sweater</option>' +
                  '<option value="Sweatpant">Sweatpant</option>' +
                  '<option value="Tank">Tank</option>' +
                  '<option value="Tshirt" selected>Tshirt</option>' +
                  '<option value="Turtleneck">Turtleneck</option>' +
                  '<option value="Waistcoat">Waistcoat</option>' +
                '</select>' +
              '</div>' +	            
	              '<div class="field">' +
	                '<label>GENDER</label>' +
	                '<select class="ui fluid dropdown" id="selectgender" onchange="categender()">' +                  
	                  '<option value="M" selected>M</option>' +
	                  '<option value="F">F</option>' +
	                '</select>' +
	              '</div>';	              
              }else {
	              document.getElementById("productdetail").innerHTML += '<div class="field">' +
                '<label>SUB-CATEGORY</label>' +
                '<select class="ui fluid dropdown" id="selectcat" onchange="cateimg()">' +
                  '<option value="Fiture">SELECT A SUB-CATEGORY FOR THE PRODUCT</option>' +
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
                  '<option value="Waistcoat">Waistcoat</option>' +
                '</select>' +
              '</div>' +	              
	              '<div class="field" id="selectgend">' +
	                '<label>GENDER</label>' +
	                '<select class="ui fluid dropdown" id="selectgender" onchange="categender">' +                  
	                  '<option value="M">M</option>' +
	                  '<option value="F" selected>F</option>' +
	                '</select>' +
	              '</div>';	              
              }

              document.getElementById("productdetail").innerHTML += '<div class="field">' +
                '<label>IMAGE</label>' +
                '<input type="text" id="link" onkeyup="imglink()" value="'+ detail[0].imgurl +'">' +
                  '<div class="ui tiny images">' +
                    '<img class="ui image" id="pimage" src="' + detail[0].imgurl + '">' +
                  '</div>' +
              '</div>' +
              '<div class="field">' +
                '<label>PRODUCT REDIRECT LINK</label>' +
                '<input type="text" name="plink" value="' + detail[0].link + '">' +
              '</div>'+
              '<button class="ui button" type="button" onclick="pSave()">SAVE</button>' +
              '<button class="ui button" type="button" onclick="pReset()">RESET</button>';

							drawSize();
							cateimg();
}

function drawSize() {
	 $('.chartlist').empty();
	 document.getElementById("chartlist").innerHTML = '';
    for(i in chartlist){
      document.getElementById("chartlist").innerHTML += '<button class="ui button" type="button" onclick="drawChartDetail('+ i +')">' + chartlist[i].name + '</button>';
    }
    document.getElementById("chartlist").innerHTML += '<button class="ui button" type="button" onclick="addChart()"> + </button>';
    
}

function cateimg(){
	document.getElementById("imgcat").innerHTML = '';
	var link = document.getElementById("selectcat").value;
	var gender = document.getElementById("selectgender").value;
	if(link == "Fiture"){
		document.getElementById("imgcat").innerHTML += '<img class="ui fluid image" src="img/' + link + '.jpg">';
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
                  '<option value="Fiture">SELECT A SUB-CATEGORY FOR THE PRODUCT</option>' +
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
		document.getElementById("selectcat").innerHTML += '<option value="Fiture">SELECT A SUB-CATEGORY FOR THE PRODUCT</option>' +
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

function chartconv(){
	var pchartdetail = [];
	for(i in chartdetail){
		switch(chartdetail[i].name){
			case "A. SHOULDER":{pchartdetail[1] = chartdetail[i].size;break;}
			case "B. CHEST":{pchartdetail[2] = chartdetail[i].size;break;}
			case "C. GARMENT LENGTH":{pchartdetail[3] = chartdetail[i].size;break;}
			case "D. SLEEVE LENGTH":{pchartdetail[4] = chartdetail[i].size;break;}
			case "E. WAIST":{pchartdetail[5] = chartdetail[i].size;break;}
			case "A. WAIST":{pchartdetail[1] = chartdetail[i].size;break;}
			case "B. RISE":{pchartdetail[2] = chartdetail[i].size;break;}
			case "C. OUTER LENGTH":{pchartdetail[3] = chartdetail[i].size;break;}
			case "D. INNER LENGTH":{pchartdetail[4] = chartdetail[i].size;break;}
			case "E. HEM WIDTH":{pchartdetail[5] = chartdetail[i].size;break;}
		}		
	}
}

function drawChartDetail(pos){
	document.getElementById("chartdetail").innerHTML = '';
	
	document.getElementById("chartdetail").innerHTML += '<div class="field">'+
    '<label>SIZE NAME</label>' +
    '<input type="text" id="chartname" value="' + chartlist[pos].name + '">' +
    '</div>';
    
					var link = document.getElementById("selectcat").value;
  switch(link){
    case "Blazer":{}
    case "Coat":{}
    case "Dress":{}
    case "Jacket":{}
    case "LSTop":{}  
    case "Shirt":{}
    case "Top":{	   
      document.getElementById("chartdetail").innerHTML += '<div class="field">' +
        '<label>' + subcatu[0] + ' (CM)</label>' +
        '<input type="text" id="' + subcatu[0] + '"value="'+ chartdetail[pos].size +'">' +
        '</div>' +               
        '<div class="field">' +
          '<label>' + subcatu[1] + ' (CM)</label>' +
          '<input type="text" id="' + subcatu[1] + '"value="'+ chartdetail[pos].size +'">' +
        '</div>' +
        '<div class="field">' +
          '<label>' + subcatu[2] + ' (CM)</label>' +
          '<input type="text" id="' + subcatu[2] + '"value="'+ chartlist[pos][3] +'">' +
        '</div>' +
        '<div class="field">' +
          '<label>' + subcatu[3] + ' (CM)</label>' +
          '<input type="text" id="' + subcatu[3] + '"value="'+ chartlist[pos][4] +'">' +
        '</div>' +
        '<div class="field">' +
          '<label>' + subcatu[4] + ' (CM)</label>' +
          '<input type="text" id="' + subcatu[4] + '"value="'+ chartlist[pos][5] +'">' +
        '</div>';
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
      document.getElementById("chartdetail").innerHTML += '<div class="field">' +
        '<label>' + subcatu[0] + ' (CM)</label>' +
        '<input type="text" id="' + subcatu[0] + '"value="'+ chartdetail[0].size +'">' +
        '</div>' +               
        '<div class="field">' +
          '<label>' + subcatu[1] + ' (CM)</label>' +
          '<input type="text" id="' + subcatu[1] + '"value="'+ chartlist[pos][2] +'">' +
        '</div>' +
        '<div class="field">' +
          '<label>' + subcatu[2] + ' (CM)</label>' +
          '<input type="text" id="' + subcatu[2] + '"value="'+ chartlist[pos][3] +'">' +
        '</div>' +
        '<div class="field">' +
          '<label>' + subcatu[3] + ' (CM)</label>' +
          '<input type="text" id="' + subcatu[3] + '"value="'+ chartlist[pos][4] +'">' +
        '</div>';        
      break;
    }
    case "Tank":{
      document.getElementById("chartdetail").innerHTML += '<div class="field">' +
      '<div class="field">' +
        '<label>' + subcatu[1] + ' (CM)</label>' +
        '<input type="text" id="' + subcatu[1] + '"value="'+ chartlist[pos][1] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcatu[2] + ' (CM)</label>' +
        '<input type="text" id="' + subcatu[2] + '"value="'+ chartlist[pos][2] +'">' +
      '</div>';
      break;
    }
    case "JeansPants":{}
    case "PantsJeans":{}    
    case "Sweatpant":{
      document.getElementById("chartdetail").innerHTML += '<div class="field">' +
      '<label>' + subcatb[0] + ' (CM)</label>' +
      '<input type="text" id="' + subcatb[0] + '"value="'+ chartlist[pos][1] +'">' +
      '</div>' +               
      '<div class="field">' +
        '<label>' + subcatb[1] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[1] + '"value="'+ chartlist[pos][2] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcatb[2] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[2] + '"value="'+ chartlist[pos][3] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcatb[3] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[3] + '"value="'+ chartlist[pos][4] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcatb[4] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[4] + '"value="'+ chartlist[pos][5] +'">' +
      '</div>';
      break;
    }
    case "Waistcoat":{
      document.getElementById("chartdetail").innerHTML += '<div class="field">' +
                '<label>' + subcatu[0] + ' (CM)</label>' +
                '<input type="text" id="' + subcatu[0] + '"value="'+ chartlist[pos][1] +'">' +
                '</div>' +               
                '<div class="field">' +
                  '<label>' + subcatu[1] + ' (CM)</label>' +
                  '<input type="text" id="' + subcatu[1] + '"value="'+ chartlist[pos][2] +'">' +
                '</div>' +
                '<div class="field">' +
                  '<label>' + subcatu[2] + ' (CM)</label>' +
                  '<input type="text" id="' + subcatu[2] + '"value="'+ chartlist[pos][3] +'">' +
                '</div>' +
                '<div class="field">' +
                  '<label>' + subcatu[4] + ' (CM)</label>' +
                  '<input type="text" id="' + subcatu[4] + '"value="'+ chartlist[pos][4] +'">' +
                '</div>';
                break;
    }
    case "Skirt":{}
    case "Longskirt":{
        document.getElementById("chartdetail").innerHTML += '<div class="field">' +
                '<label>' + subcatb[0] + ' (CM)</label>' +
                '<input type="text" id="' + subcatb[0] + '"value="'+ chartlist[pos][1] +'">' +
                '</div>' +               
                '<div class="field">' +
                  '<label>' + subcatb[2] + ' (CM)</label>' +
                  '<input type="text" id="' + subcatb[2] + '"value="'+ chartlist[pos][2] +'">' +
                '</div>';
                break;              
      }
    case "Shorts":{
      var gender = document.getElementById("selectgender").value;
      if(gender == 'M'){
        document.getElementById("chartdetail").innerHTML += '<div class="field">' +
      '<label>' + subcatb[0] + ' (CM)</label>' +
      '<input type="text" id="' + subcatb[0] + '"value="'+ chartlist[pos][1] +'">' +
      '</div>' +               
      '<div class="field">' +
        '<label>' + subcatb[1] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[1] + '"value="'+ chartlist[pos][2] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcatb[2] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[2] + '"value="'+ chartlist[pos][3] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcatb[3] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[3] + '"value="'+ chartlist[pos][4] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcatb[4] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[4] + '"value="'+ chartlist[pos][5] +'">' +
      '</div>';      
      }else {
        document.getElementById("chartdetail").innerHTML += '<div class="field">' +
      '<label>' + subcatb[0] + ' (CM)</label>' +
      '<input type="text" id="' + subcatb[0] + '"value="'+ chartlist[pos][1] +'">' +
      '</div>' +               
      '<div class="field">' +
        '<label>' + subcatb[1] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[1] + '"value="'+ chartlist[pos][2] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcatb[2] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[2] + '"value="'+ chartlist[pos][3] +'">' +
      '</div>' +
      '<div class="field">' +
        '<label>' + subcatb[4] + ' (CM)</label>' +
        '<input type="text" id="' + subcatb[4] + '"value="'+ chartlist[pos][4] +'">' +
      '</div>';
      }
      break;
    }

   } 
   
   document.getElementById("chartdetail").innerHTML += '<button class="ui button" type="button" onclick="cSave()">SAVE</button>' +
  '<button class="ui button" type="button" onclick="cReset()">RESET</button>'; 

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

refresh();