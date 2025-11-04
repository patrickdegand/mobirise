$(document).ready(function(){
	$('[data-email]').on('click', function () {
		var base64email =$(this).attr("data-email");
		window.location.href = `mailto:${atob(base64email)}`;
	});
	$("form").submit(function(){
		var fileUrl =$(this).attr("data-file");
		window.location = atob(fileUrl);
	});
	$('a[data-file]').on('click', function () {
		var fileUrl =$(this).attr("data-file");
		window.location =  atob(fileUrl);
	});
});
function mailtodeltapi(){
	var dataemail="ZGVsdGFfcGlAb3V0bG9vay5mcg=="
	window.location.href = `mailto:${atob(dataemail)}`;
}
!function(){
	if(document.getElementById('top-1')){
	var element = document.getElementById('top-1');
	element.parentNode.removeChild(element);
	};
	
}();