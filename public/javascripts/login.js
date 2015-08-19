$(function(){
	console.log();
	$('ul.navbar-nav').find('li').click(function(){
		debugger;
		$('ul.navbar-nav').find('li').removeClass('active');
		$(this).addClass('active');
	});
});