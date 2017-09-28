CityChangeRelation='<div id="linkage">'+
                    '<select id="province" name="province" onchange="ProvAndCitychange();">'+
 　　　　　　　　       '<option id="choosePro" value="-1">请选择您所在省份</option>'+
 　　　　　　       '</select>'+
        　　　　　　'<select id="citys" name="city" onchange="CityAndCountychange();">'+
         　　　　　　　 '<option id="chooseCity" value="-1">请选择您所在城市</option>'+
         　　　　　 '</select>'+
        　　　　　　'<select id="county" name="county">'+
         　　　　　　　 '<option id="chooseCounty" value="-1">请选择您所在区/县</option>'+
        　　　　　　'</select>'+
                    '</div>'
$('body').html(CityChangeRelation); 
var cityJson; 
$(function draw92(){  
    $.ajax({  
        type:"get",  
        url:"92.json",  
        dataType: "json",  
        success: function(obj){ 
            cityJson = obj;
            var sb = new StringBuffer();
            $.each(obj, function(i, val) {
                if(val.code.substr(2, 4) == '0000'){
                    sb.append("<option value='"+val.code+"'>"+val.name+"</option>");
                }
            }); 
            $("#choosePro").after(sb.toString()); 
        }  
    });  
});  
// 省值变化时 处理市
function ProvAndCitychange(){
    var city = $("#citys");
    console.log(city);
    var county = $("#county");
    console.log(county);
    var cityChildren = city.children()
    console.log(cityChildren);
    var countyChildren = county.children()
    console.log(cityChildren)
    if(cityChildren.length > 1){
        city.empty();
    }
    if(countyChildren.length > 1){
        county.empty();
    }
    if($("#chooseCity").length == 0){
        city.append("<option id='chooseCity' value='-1'>请选择您所在城市</option>");
    }
    if($("#chooseCounty").length == 0){
        county.append("<option id='chooseCounty' value='-1'>请选择您所在区/县</option>");
    }
    var sb = new StringBuffer();
    var index = 1;
    $.each(cityJson, function(i, val) {
        if(val.code.substr(0, 2) == $("#province").val().substr(0, 2) && val.code.substr(2, 4) != '0000' && val.code.substr(4, 2) == '00'){
            if(index == 1){
                city.append("<option  checked value='"+val.code+"'>"+val.name+"</option>");
            }else {
                city.append("<option value='"+val.code+"'>"+val.name+"</option>");
            }
         
        }
    });
    $("#chooseCity").after(sb.toString());
}
 // 市值变化时 处理区/县
function CityAndCountychange(){
    var cityVal = $("#citys").val();
    var county = $("#county");
    if(county.children().length > 1){
        county.empty();
    }
    if($("#chooseCounty").length == 0){
        county.append("<option id='chooseCounty' value='-1'>请选择您所在区/县</option>");
    }
    var sb = new StringBuffer();
    $.each(cityJson, function(i, val) {
        if(cityVal=='110100' || cityVal=="120100" || cityVal=="310100" || cityVal=="500100"){
            if(val.code.substr(0, 3) == cityVal.substr(0, 3) && val.code.substr(4, 2) != '00'){
                sb.append("<option value='"+val.code+"'>"+val.name+"</option>");
            }
        }else{
            if(val.code.substr(0, 4) == cityVal.substr(0, 4) && val.code.substr(4, 2) != '00'){
                sb.append("<option value='"+val.code+"'>"+val.name+"</option>");
            }
        }
    });
    $("#chooseCounty").after(sb.toString());
    
}
              
function StringBuffer(str){    
    var arr = [];    
    str = str || "";
    var size = 0 ;
    arr.push(str);
    this.append = function(str1) {        
        arr.push(str1);        
        return this;    
    };
    this.toString = function(){        
        return arr.join("");    
    }; 
    this.clear = function(key){  
        size = 0 ;  
        arr = [] ;  
    }
    this.size = function(){  
        return size ;  
    }
    this.toArray = function(){  
        return buffer ;  
    }
    this.doReverse = function(){  
        var str = buffer.join('') ;   
        str = str.split('');    
        return str.reverse().join('');  
    }
};
