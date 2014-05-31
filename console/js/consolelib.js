if(typeof window.CONSOLE === 'undefined'){
    window.CONSOLE = {};
}

CONSOLE.$ = function(id){
    return document.getElementById(id);
}

CONSOLE.showContent=function(string){
	var content=CONSOLE.$("content");
	content.innerHTML+='<div id="new-list">'+string+'</div>';
}