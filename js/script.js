var logo = new Logo(document.body,250,250,7);


function refresh(){
	logo.refresh();
		requestAnimationFrame(refresh);
};
refresh();	
