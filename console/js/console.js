consoleapp=(function(){
	var close=TY.$("close");
	var showbox=TY.$("showbox");
	var mouObjx;
	var mouObjy;
	var iMouseDown  = false;//标记
	function init(){
		bindEvent();
	}
	function bindEvent(){
		TY.addEventListener(close,'click',function(){
			TY.fineNone(showbox);
		},false);
		TY.addEventListener(document,'keyup',function(){
			codeBind();
		});
		TY.addEventListener(showbox,'mousedown',function(event){
			mouseDown(event);
			TY.addEventListener(showbox,'mousemove',function(event){
				mouseMove(event);
			});
			TY.addEventListener(document,'mouseup',function(event){
				mouseUp();
			});
		});
	}
	function codeBind(){
		var e = event || window.event || arguments.callee.caller.arguments[0];//兼容
		if((e && e.ctrlKey)&&(e && e.keyCode==123)){
			if(showbox.style.display=="block"){
				TY.fineNone(showbox);
			}
			else{
				TY.fineBlock(showbox);
			}
		}else{
			return false;
		}
	}
	function getViewport(){//获取页面大小
		if (document.compatMode == "BackCompat"){
			alert(document.body.clientWidth);
			return{
				widthm: document.body.clientWidth,
				heightm: document.body.clientHeight
			}
		}else{
			return{
				widthm: document.documentElement.clientWidth,
				heightm: document.documentElement.clientHeight
			}
		}
	}
	function getMousePoint(event){
		var x,y=0;
	    event = event||window.event;
	    if (typeof window.pageYoffset!= 'undefined') {//pageYoffset是Netscape特有
	        x = window.pageXOffset;
	        y = window.pageYOffset;
	    }else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {//检测标准模式
	        x = document.documentElement.scrollLeft;
	        y = document.documentElement.scrollTop;
	    }else if (typeof document.body != 'undefined') {
	        x = document.body.scrollLeft - document.body.clientLeft;
	        y = document.body.scrollTop - document.body.clientTop;
	    }
	    x += event.clientX;
	    y += event.clientY;
	    return {'xm' : x, 'ym' : y};
	}
	function mouseDown(event){
		iMouseDown=true;
		event = event||window.event;
		var mousepos=getMousePoint(event);
		mouObjx=mousepos.xm-showbox.offsetLeft;
		mouObjy=mousepos.ym-showbox.offsetTop;
		TY.mouseCssstyle(showbox);
	}
	function mouseMove(event){
		if(!iMouseDown) return;
		var size=getViewport();
		event = event||window.event;
		var mousepos=getMousePoint(event);
		var epageX = mousepos.xm - mouObjx;
		var epageY = mousepos.ym - mouObjy;
		if(epageX<0){
			epageX=0;
			return;
		}
		if(epageX>(size.widthm-showbox.offsetWidth)){
			epageX=size.widthm-showbox.offsetWidth;
			return;
		}
		if(epageY<0){
			epageY=0;
			return;
		}
		if(epageY>(size.heightm-showbox.offsetHeight)){
			epageY=size.heightm-showbox.offsetHeight;
			return;
		}
		showbox.style.left = epageX + "px";
		showbox.style.top = epageY + "px";		
	}	
	function mouseUp(){
		iMouseDown=false;
	}
	return{
		run:init 
	}
})();
consoleapp.run();