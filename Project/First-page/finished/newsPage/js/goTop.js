define(function(){
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
          if (self.nowTop > 100 && flag) {
            self.target.fadeIn(100)
            flag = false
          } else if (self.nowTop <= 100 && !flag){
            self.target.fadeOut(100)
            flag = true
          }
      })
    }

   return {
      init: function(ct,target){
        new GoTop(ct,target)
      }
    }
})    