require(['jqurey','carousel','news','goTop'],function(jqurey, carousel, news, goTop){
	news.init($('.pinterest'))
	goTop.init($('body'),$('.goTop'))
	carousel.init($('.carousel-info'))
	console.log(goTop)
})