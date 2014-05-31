/*(function(){
	var $content=$("content");
	var $btn = $("button");
	var leftty;
	var rightty;
	var describe = ["姓名:","年龄:","性别:"];//相当于Json中的名称
	var keys = ["name","age","sex"];//相当于Json中的值
	var ulty;
	var news;
	var bodyty;
	var ajaxApp = {
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			this.paramclick();
		},	
		paramclick:function(){
			var me = this;
			$btn.click(function(){
  				me.ajaxmethoed();
			});
		},
		ajaxmethoed:function(){
			var me=this;
			$.ajax({
				type: "get",
				url: "shownews.json",
				success:function(rep){
					var obj = jQuery.parseJSON(rep);
					//debugger;
					//$news.append(''<img src='+obj.picture+' class="typicture" alt="" />'+');
					for(var i=0;i<8;i++){
						me.createMessage(i,obj);
					}
					//me.changeColorClick();
				},
				error:function(error){
					$bodyty.text(error.statusText);
				}
			});
		},
		setClassDom:function(parentNode,classname,currentNode){
			currentNode.className=classname;
			parentNode.appendChild(currentNode);
		},
		addNode:function(newNode,parentNode){
			var _newNode =TY.create(newNode);
			parentNode.appendChild(_newNode);
			return _newNode;
		},
		createliDom:function(array,ul,num,obj){//array是json里名称数 有几个名称 就创建几个Li
		 	for(var i=0;i<array.length;i++){
		 		var lity=this.addNode("li",ul);
		 		lity.innerHTML=array[i];
		 		this.createspanDom(keys,i,lity,num,obj);
		 	}
		},
		createspanDom:function(keys,i,lity,num,obj){
		 	var spanty=this.addNode("span",lity);
		 	spanty.innerHTML= obj[num][keys[i]];
		 },
		createImg:function(num,obj){
			var imgty=TY.create("img");
			imgty.src =obj[num].picture;
			return imgty;
		},
		addContentDiv:function(){
			news=TY.create("div");
			this.setClassDom(bodyty,"news",news);

			leftty=TY.create("div");
			this.setClassDom(news,"leftcolumn",leftty);

			rightty=TY.create("div");
			this.setClassDom(news,"rightcolumn",rightty);
		},
		createMessage:function(num,obj){

			bodyty=TY.gettag("body")[0];//获取body元素

			ulty=TY.create("ul");

			this.addContentDiv();
		
			leftty.appendChild(this.createImg(num,obj));			

			rightty.appendChild(ulty);

			 this.createliDom(describe,ulty,num,obj);
			
		}
		// changeColorClick:function(){
		// 	$(".cnice").click(function(){
		// 		$(this).css("color","#f00");
		// 	});
		// }
	}
	ajaxApp.init();
})()*/

ajaxapp=(function(){
	var btn = TY.gettag("button")[0];
	var bodyty=TY.gettag("body")[0];
	var content = [];
	function init(){
		bindEvent();
	}
	function bindEvent(){
		btn.addEventListener("click",function(){
			ajaxEvent();
		},false);
	}
	function ajaxEvent(){
		var obj={
			type:"get",
			url:"shownews.json",
			success:function(rep){
				var response=JSON.parse(rep);
				for(var i=0;i<response.length;i++){
					createMessage(response,i);
				}
			},
			error:function(){
				alert("Error");
			}
		}
		$.ajax(obj);
	}
	function createMessage(array,index){//传入什么参数 就要用什么参数！！！！
		var uString=
			'<div class="news">'+
			'	<div class="leftcolumn bd">'+
			'		<img src="'+array[index].picture+'" alt="" />'+//相当于response[i]
			'	</div>'+
			'	<div class="rightcolumn">'+
			'		<ul>'+
			'			<li>姓名：<span >'+array[index].name+'</span></li>'+
			'			<li>年龄：<span >'+array[index].age+'</span></li>'+
			'			<li>性别：<span >'+array[index].sex+'</span></li>'+
			'			<li>地址：<span >'+array[index].address+'</span></li>'+
			'		</ul>'+
			'	</div>'+ 
			'</div>';
		bodyty.innerHTML += uString;
	}
	return{
		run:init//等价于run=init(){} 返回一个对象 由run变量保存 这个变量可以访问对象init中的方法run（） 
	}
})();
ajaxapp.run();


