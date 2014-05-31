window.TY = {
	$:function(id){
		return document.getElementById(id);
	},
	gettag:function(element){
		return document.getElementsByTagName(element);
	},
	create:function(name){
		return document.createElement(name);
	},
	addEventListener: function(ele, type, fun){
        if(window.addEventListener){
            ele.addEventListener(type, fun, false);
        }else{
            ele.attachEvent('on' + type, fun);
        }
    },
    pushResult:function(array,string,obj){
    	var str=string;
    	array = array.reverse();//数组需要调转过来
    	array.push(str);
    	obj.innerHTML=array.reverse().join("");
    },
    fineBlock:function(element){
    	element.style.display="block";
    },
    fineNone:function(element){
    	element.style.display="none";
    },
    mouseCssstyle:function(element){
        element.style.cursor="crosshair";
    },
    addcssstyle:function(node,attribute,value){ 
        node.style[attribute]=value;   
    }
}