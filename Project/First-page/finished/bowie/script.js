     
$(function(){
     function foo(e){

          function bowie(ct){
          	this.ct = ct
          	this.arr = []
          	this.nowNum = 0
          	this.height = 200
          	this.ctWidth = this.ct.width()
          	this.cacheImg = []
          	this.tWidth = 0
          	this.rowNum = 0
          	this.gap = 20
          	this.lastHeight = 0
          	this.bottomLoad()
          }

          bowie.prototype.loadImg = function() {
          	let self = this
          	let width = function(){return Math.round(Math.random() * 200 + 100)}
          	let height = function(){return Math.round(Math.random() * 30 + 200)}
          	let color = function(){
          		let t = ''
          		let dic = '0123456789abcdef'
          		for (let i=0; i<6; i++)
          			t += dic[Math.round(Math.random() * 15)]
          		return t
          	}

      		let image = new Image()
      		image.src = "http://via.placeholder.com/" + width() + "x" + height() + "/" + color()
      		image.onload = function(e){
      			self.arr.push(this) 				
      			self.putImg()
      			self.nowNum ++
      		}

          };



          bowie.prototype.putImg = function(n) {
      		let width = (this.height * this.arr[this.nowNum].width) / this.arr[this.nowNum].height
      		if (width + this.tWidth <= this.ctWidth) {
      			this.cacheImg.push(this.arr[this.nowNum])
      			this.tWidth += width
      			this.loadImg()
      		} else {
      			this.rendImg()
      			this.cacheImg.push(this.arr[this.nowNum])
      			this.tWidth += width
      		}
          };

          bowie.prototype.rendImg = function() {	
          	let cof = this.ctWidth / this.tWidth
          	let left = 0
          	for (let i=0; i<this.cacheImg.length; i++){
          		this.cacheImg[i].height = this.height * cof
          		$(this.cacheImg[i]).appendTo(this.ct).css({top:this.lastHeight, left:left})
          		left += this.cacheImg[i].width
          	}
          	this.cacheImg = []
          	this.tWidth = 0
          	this.rowNum ++ 
          	this.lastHeight += this.height * cof + this.gap
          	this.bottomFlag.offset({top:this.lastHeight})
               this.ct.css({height:this.lastHeight + 50})
          };

          bowie.prototype.bottomLoad = function() {
          	this.bottomFlag = $('<div class="bottomLoad"></div>')
          	this.bottomFlag.css({position:'absolute'})
          	this.ct.after(this.bottomFlag)
          	let clock
          	self = this
          	$(window).scroll(function(){
          		clearTimeout(clock)
     	     	clock =	setTimeout(function(){
     	     		if (self.bottomFlag.offset().top <= $(window).scrollTop()+$(window).height()){
     	     			self.loadImg()
     	     		}
     	     	},300)
          	})
          };
  
          
          return new bowie(e)       
     }
     var test = foo($('.ct')) 


     for (let i =0; i<Math.ceil($(window).height() / test.height); i++)
          test.loadImg()     
})   
    // 放一张图片
    // 如果放得下继续
    // 放不下处理一行
    // 另起一行

    //   .loadImg
    //   .putImg
 // http://via.placeholder.com/350x150/123ed23 