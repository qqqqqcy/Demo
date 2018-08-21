
	function Carousel($ct) {
		this.$ct = $ct
	    this.init()
	}


	Carousel.prototype.init = function(){
	    this.nowIndex = 1
	    this.nowIndicators = 1
	    this.$carousel = this.$ct.find('.carousel')
	    this.$info = this.$ct.find('.info')
	    this.$carousel.data("flag",0)
	    this.infoArr = []
	    this.imgArr = []
		this.imgNum = 1
		this.animTime = 300
	    this.runAjax()
	}

	Carousel.prototype.runAjax = function() {
		let _this = this
		$.ajax({
			url:"https://platform.sina.com.cn/slide/album_tech",
			data: {
				num: 5, 
				page: 1, 
				app_key:1271687855, 
			} ,
			dataType: "jsonp",
			jsonp: "jsoncallback"
		}).done(function(e){
			_this.dealData(e.data)
		})
	};


	Carousel.prototype.dealData = function(e) {
		let _this = this
		$(e).each(function(i,e){
			let img = new Image()
			img.src = e.img_url
			$(img).attr("clickUrl",e.url)
			let $info = $('<li><h2>' +
						 (e.short_name ? e.short_name : e.name) +
						 '</h2><p>' +
						 e.name +
						 '</p></li>')
			img.onload = function(){
				_this.imgArr[_this.imgNum] = this
				_this.infoArr[_this.imgNum] = $info
				_this.imgNum++
				if (_this.imgNum === 6) {
					_this.imgArr.push($(_this.imgArr[1]).clone()[0])
					_this.imgArr[0] = $(_this.imgArr[5]).clone()[0]
					_this.infoArr.push($(_this.infoArr[1]).clone()[0])
					_this.infoArr[0] = $(_this.infoArr[5]).clone()[0]
					_this.renderData()
	  				_this.widthInit()
	  				_this.bind()
	  
				}
			}
		})
	};


	Carousel.prototype.renderData = function() {
		let _this = this
		$(this.imgArr).each(function(i,e){
			$(e).appendTo(_this.$carousel)
			$(e).click(function(e){
							window.open($(this).attr('clickUrl'))
						})
		})

		$(this.infoArr).each(function(i,e){
			$(e).appendTo(_this.$info)
		})

		setInterval(function(){
			_this.play(1, 1)
		},2500)

	};


	Carousel.prototype.widthInit = function(){
	  this.carWidth = this.$ct.find('.carouselCt').width()
	  this.infoWidth = this.$ct.find('.infoCt').width()
	  this.$carousel.css({left: -1 * this.nowIndex * this.carWidth})
	  this.$info.css({left: -1 * this.nowIndex * this.infoWidth})
	}

	Carousel.prototype.bind = function(){
	  let self = this
	  
	  this.$ct.find('.pre').click(function(){
	    self.play(1,-1)
	  })

	  this.$ct.find('.next').click(function(){
	    self.play(1,1)
	  })

	  this.$ct.find('.trig').on('click','li',function(){
	    let t = -1
	    let num = $(this).index()+1
	    if  (num > self.nowIndex) 
	      t = 1
	    self.play((num-self.nowIndex)*t,t)
	  })

	  $(window).resize(function(){
	  	self.widthInit()
	  })

	}

	Carousel.prototype.play = function(n,direction){
	  let self = this
	  if (this.$carousel.data("flag")) return
	  this.$carousel.data("flag",1)
	  this.nowIndex += n*direction 
	  let sum = -1 * this.nowIndex

	  this.$carousel.animate({left:sum * this.carWidth},this.animTime,function(){
	    self.$carousel.data("flag",0)
	  })

	  this.$info.animate({left:sum * this.infoWidth},this.animTime)

	  if (self.nowIndex === 0) {
	    self.$carousel.animate({left:-this.carWidth*5},0)
	    self.$info.animate({left:-this.infoWidth*5},0)
	    self.nowIndex = 5
	  } 
	  if (self.nowIndex === 6) {
	    self.$carousel.animate({left:-this.carWidth},0)
	    self.$info.animate({left:-this.infoWidth},0)
	    self.nowIndex = 1
	  }
	  self.playIndicators(self.nowIndex)
	}

	Carousel.prototype.playIndicators = function(n) {
	  this.$ct.find('.trig li').eq(this.nowIndicators-1).removeClass('active')
	  this.$ct.find('.trig li').eq(n-1).addClass('active')
	  this.nowIndicators = n
	};

	module.exports = {
		init:function(e){
			new Carousel(e)
		}
	}
