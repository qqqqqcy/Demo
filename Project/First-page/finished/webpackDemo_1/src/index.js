import news from './com/news'
import goTop from './com/goTop'
import carousel from './com/carousel'
import './style.css'

	news.init($('.pinterest'))
	goTop.init($('body'),$('.goTop'))
	carousel.init($('.carousel-info'))
