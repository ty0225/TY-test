gameapp=(function(){
	var tybtn=TY.$("ty-btn");
	var tyrebtn=TY.$("ty-rebtn");
	var start=TY.$("start");
	var trues=TY.$("trues");
	var error=TY.$("error");
	var checks=TY.$("checks");
	var result=TY.$("result");
	var around=TY.$("around");
	var close=TY.$("close");
	var box=TY.$("box");
	var sure=TY.$("sure");

	var body=TY.gettag("body")[0];
	var label=TY.gettag("label")[0];

	var inArray=[];
	var HTMLarray=[];
	var mathArray;
	var savea;
	var saveb;
	var pattern=/^\d{4}$/;

	function init(){
		bindEvent();
	}
	function norepeatNumber(){
		var index=0;
		while(index<4){
			var math= Math.floor(Math.random()*10);
			if(mathArray.indexOf(math)===-1) {
				mathArray[index]=math;
				index++;
			}
		}
	}
	function repeatNumber(){
		for(var i=0;i<4;i++){
			var math=Math.floor(Math.random()*10);
			mathArray[i]=math;
		}
	}
	function clearPage(){
		window.location.reload();
	}
	function judgeRepeat(){
		if(checks.checked){
			norepeatNumber();
		}else{
			repeatNumber();
		}
		checks.setAttribute("disabled",false);
	}
	function bindEvent(){
		TY.addEventListener(start,'click',function(){
			HTMLarray=[];
			mathArray=[];
			label.innerHTML="Games begin!";
			for(var i=4;i<=8;i++){
				var innumber=TY.gettag("input")[i];
				innumber.removeAttribute("disabled");
			}
			judgeRepeat();
		});
		TY.addEventListener(tybtn,'click',function(){
			generateResult();
			for(var i=4;i<=7;i++){
				var innumber=TY.gettag("input")[i];
				innumber.value="";
			}
		});
		TY.addEventListener(sure,'click',function(){
			clearPage();
		});
		TY.addEventListener(close,'click',function(){
			TY.fineNone(around);
			TY.fineNone(box);
			return false;
		});
		TY.addEventListener(tyrebtn,'click',function(){
			clearPage();
		});
	}
	function matchNumber(){
		savea=0;
		saveb=0;
		var savematArray= new Array(4);
		var saveinArray= new Array(4);//初始化
	    for(var i=0;i<4;i++){
	    	if(inArray[i]==mathArray[i]){
	    		savematArray[i]=1;
	    		saveinArray[i]=1;
	    		savea++;
	    		continue;
	    	}
	    }
    	for(var a in inArray){
    		if(saveinArray[a]==1) continue;
    		for(var b in mathArray){
    			if(savematArray[b]==1) continue;
    			else if(mathArray[b]==inArray[a]){
    				savematArray[b]=1;
    				saveinArray[a]=1;
    				saveb++;
    				break;
    			}
    		}
    	}
    }
    function restartGame(){
    	TY.fineBlock(around);
    	TY.fineBlock(box);
    }
	function generateResult(){
		for(var i=4;i<=7;i++){
			var innumber=TY.gettag("input")[i];
			inArray[i-4]=innumber.value;
		}
		if(pattern.test(inArray.join(""))){
			matchNumber();
	    	if(savea==4){
	    		var sucstr='<div id="success">YOU WIN!!!</div>';
	    		TY.pushResult(HTMLarray,sucstr,result);
				setTimeout(restartGame,1000);
	    	}else{
	    		var truestr='<div id="trues">'+'Result:'+inArray.join(" ")+'    '+savea+'A'+saveb+'B'+'</div>';
	    		TY.pushResult(HTMLarray,truestr,result);
	    	}
		}else{
			var errorstr='<div id="error">'+'Result:'+'FOUL'+'-_-|||'+'</div>';
			TY.pushResult(HTMLarray,errorstr,result);
		}		
	}
	return{
		run:init
	}
})();
gameapp.run();
