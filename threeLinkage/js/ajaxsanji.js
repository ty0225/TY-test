ajaxapp=(function(){
	var province=TY.$("province");
	var city=TY.$("city");
	var area=TY.$("area");
	var response;
	function init(){
		ajaxEvent();
		bindEvent();
	}
	function bindEvent(){
		TY.addEventListener(province,'change',function(){
			provinceNext();
		});
		TY.addEventListener(city,'change',function(){
			cityNext();
		});
	}
	function ajaxEvent(){
		var obj={
			type:"get",
			url:"js/ty.json",
			success:function(rep){
				response=JSON.parse(rep);
				for(var i=0;i<response.length;i++){
					addProvice(i);
				}
			},
			error:function(){
				alert("Error");
			}
		}
		$.ajax(obj);
	}
	function addProvice(i){
		province.options.add(new Option(response[i]["name"],i));//i为新建option的value值，sanJi[i].name为新建option的文本值
	}
	function provinceNext(){
		city.length = area.length = 1;
		city.selectedIndex = area.selectedIndex = 0;
        if(province.value === ''){
            return;
        }
		var provincechild=response[province.value]["city"];
		for(var i=0;i<provincechild.length;i++){
			city.options.add(new Option(provincechild[i]["name"],i));
		}
	}
	function cityNext(){
		area.length = 1;
		area.selectedIndex = 0;
		if(city.value === ''){
            return;
        }
		var citychild=response[province.value]["city"]
		[city.value]["district"];
		for(var i=0;i<citychild.length;i++){
			area.options.add(new Option(citychild[i]["name"],i));
		}
	}
	return{
		run:init
	}
})();
ajaxapp.run();

// ajaxapp=(function(){
// 	var province=TY.$("province");
// 	var city=TY.$("city");
// 	var area=TY.$("area");
// 	function init(){
// 		addProvice();
// 		bindEvent();
// 	}
// 	function bindEvent(){
// 		province.onchange=function(){
// 			provinceNext();
// 		}
// 		city.onchange=function(){
// 			cityNext();
// 		}
// 	}
// 	// function noChild(obj){
// 	// 	while(obj.options.length>0){ 
// 	// 		obj.removeChild(obj.options[0]); 
// 	// 	}
// 	// }
// 	function addProvice(){
// 		for(var i in sanJi){
// 			province.options.add(new Option(sanJi[i].name,i));//i为新建option的value值，sanJi[i].name为新建option的文本值
// 		}
// 	}
// 	function provinceNext(){
// 		//noChild(city); 
// 		city.innerHTML="";//刷新
// 		var provincechild=sanJi[province.value].children;
// 		for(var citylist in provincechild){
// 			city.options.add(new Option(provincechild[citylist].name,citylist));
// 		}
// 	}
// 	function cityNext(){
// 		//noChild(area);
// 		area.innerHTML="";//刷新
// 		var citychild=sanJi[province.value].children[city.value].children;
// 		for(var arealist in citychild){
// 			area.options.add(new Option(citychild[arealist].name,arealist));
// 		}
// 	}
// 	return{
// 		run:init
// 	}
// })();
// ajaxapp.run();
