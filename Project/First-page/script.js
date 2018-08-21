let porInfoJSON = `[
	{"title":"静态页面展示",
	 "content":"使用 html + css 完成的一个静态页面，以 <a href='http://book.jirengu.com/jirengu-inc/jrg-tehui/homework/%E8%8B%A5%E6%84%9A/16/index.html'> 此页面 </a> 为摹本，在不使用 js 情况下尽量做到完全还原",
	 "src":"finished/webPage/index.html"},

    {"title":"天气卡片",
	 "content":"使用 ajax + jQuery 完成的一个天气卡片，简单的 API 调用，可以实时显示用户时间、所在地天气情况，或者通过在卡片中输入指定地点查询目标地天气",
	 "src":"finished/weather/index.html"},

    {"title":"简单图片新闻页面",
	 "content":"使用了 webpack 打包的有自适应、运用瀑布流布局的新闻图片页面，同时运用了面向对象的设计思路，包含轮播组件，返回顶部组件，加载更多组件",
	 "src":"finished/webpackDemo_1/dist/index.html"},

	{"title":"图片新闻页面",
	 "content":"使用了 gulp 工作流 + requireJS 完成的一个新闻展示页面，深化了前一个项目，熟悉了在 npm 环境下的工程进行",
	 "src":"finished/newsPage/index.html"},

    {"title":"木桶流布局",
	 "content":"一个简单的木桶流布局，图片随机尺寸，然后每一行同高度的自上而下排列",
	 "src":"finished/bowie/index.html"},

    {"title":"其他",
	 "content":"学习前端过程中对所有问题的记录，以及其他小组件，小项目",
	 "src":"http://www.jianshu.com/u/980ce234712d"}	 	 	 	 	
]`


let $portfolio = $('.portfolio')
let $porShowAll = $('.portfolio-show-all')
let $porSec = $('.portfolio-sec')
let lastIdx = 0
let $porShow = $('.portfolio-show')
let porInfo = JSON.parse(porInfoJSON)

function goPor(){
  $('body').animate({scrollTop: $porShowAll.offset().top-10},300)
}

$porSec.on('click','li',function(){
  if ( lastIdx != $porSec.children().index($(this)))
    $porShowAll.children().eq(lastIdx).slideUp()
  goPor()
  lastIdx = $porSec.children().index($(this))
  $porShowAll.children().eq(lastIdx).slideDown()
})

$('.close-show').on('click',function(){
  $(this).parent().slideUp()
})

$('.hh').on('click',function(){
  animate({scrollTop:0},300)
})

$('.pp').on('click',function(){
  goPor()
})

$('.aa').on('click',function(){
  $('body').animate({scrollTop: $('.about').offset().top-10},300)
})

$('.cc').on('click',function(){
  $('body').animate({scrollTop: $('.contact').offset().top-10},300)
})

$porShow.each(function(i,e){
	$(e).find('img').attr('src','img/por'+ i + '.jpg' )
	$(e).find('p').html(porInfo[i].content)
	$(e).find('h3').text(porInfo[i].title)
	$(e).find('.visit').click(function(){
		window.open(porInfo[i].src)
	})
	$portfolio.find('img').eq(i).attr('src','img/por-sec' + i + '.png')

})


    function GoTop(ct,target){
      this.ct = ct
      this.preTop = $(window).scrollTop()
      this.target = target
      this.bindEvent()
    }

    GoTop.prototype.bindEvent = function() {
      let self = this
      self.target.click(function(){
        self.ct.animate({scrollTop: 0}, 300); 
      })
      let flag = true
      $(window).scroll(function(e){
          self.nowTop = $(window).scrollTop()
          if (self.nowTop > 500 && flag) {
            self.target.fadeIn(200)
            flag = false
          } else if (self.nowTop <= 100 && !flag){
            self.target.fadeOut(200)
            flag = true
          }
      })
    }


    new GoTop($('body'),$('.goTop'))


