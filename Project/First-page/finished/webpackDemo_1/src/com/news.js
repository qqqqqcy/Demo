
		function Pinterest($ct) {
			this.$ct = $ct
			this.init()
		}

		Pinterest.prototype.init = function() {
			this.cardWidth = $(this.$ct).find('.getWidth').innerWidth()
			this.pageNum = 2
			this.cardPad = 30
			this.pageIdx = 0
			this.cardArr = []
			this.nowLoad = 0
			this.status = true
			this.$btn = $(this.$ct.find('.getMore'))
			this.getWidth()
			this.runAjax( this.rowNum * 2 )
			this.bindBtn()
			this.reorder()
		};

		Pinterest.prototype.getWidth = function() {
			this.maxHeight = 0
			this.rowNum = Math.floor ( $( this.$ct ).innerWidth() / ( this.cardWidth + this.cardPad ) )
			this.beginLeft = ( $( this.$ct ).innerWidth() - this.rowNum * ( this.cardWidth + this.cardPad ) + this.cardPad ) / 2 
			this.hArr = []
			for (let i = 0; i<this.rowNum; i++)
				this.hArr[i] = 0
		};

		Pinterest.prototype.runAjax = function(n) {
			let _this = this
			$.ajax({
				url:"https://platform.sina.com.cn/slide/album_tech",
				data: {
					num: n, 
					page: this.pageNum, 
					app_key:1271687855, 
				} ,
				dataType: "jsonp",
				jsonp: "jsoncallback"
			}).done(function(e){
				_this.dealData($(e.data))
			})
		};

		Pinterest.prototype.dealData = function($e) {
			let _this = this
			$e.each(function(idx,e){
				let $tmp =$(`
					<div class="card" clickUrl=` +  e.url + `>
						<img src=` + e.img_url + `>
						<h3>` + e.short_name + `</h3>
						<p>` + e.name + `</p>
						<p>` + e.short_intro +`</p>
						<div class="cover"></div>
					</div>
				`)
				$tmp.find('img')[0].onload = function(){
					_this.cardArr.push($tmp)
					_this.nowLoad++	//	已经加载了 nowLoad 张图片
					_this.status = _this.nowLoad === _this.rowNum * 2 ? true : false
					_this.cardArr[_this.pageIdx].click(function(e){
						window.open($(this).attr('clickUrl'))
					})
					_this.renderCard(_this.pageIdx)
					_this.pageIdx ++
				}

			})
		};

		Pinterest.prototype.renderCard = function(i) {	
			let idx = this.hArr.indexOf(Math.min.apply([],this.hArr))
			this.cardArr[i].appendTo(this.$ct).animate( { left: this.beginLeft + idx * ( this.cardWidth + this.cardPad ), top: this.hArr[idx] } ,100) 
			this.hArr[idx] += this.cardArr[i].innerHeight() + this.cardPad
			this.maxHeight = Math.max( this.maxHeight, this.hArr[idx])
			this.$ct.css({paddingTop: this.maxHeight})
		};
		//	加载更多
		Pinterest.prototype.bindBtn = function() {
			let _this = this
			this.$btn.click(function(){
				if (_this.status) {
					_this.status = false;
					_this.nowLoad = 0
					_this.pageNum = Math.ceil(_this.pageIdx / _this.rowNum) + 1
					_this.runAjax( _this.rowNum * 2 )
				}
			})
		};

		Pinterest.prototype.reorder = function(){
			let _this = this
			let clock
			$(window).resize(function(){
				clearTimeout(clock)
				clock = setTimeout(function(){
					if ( _this.status ) {
						console.log(1)
						_this.getWidth()
						$.each( _this.cardArr, function(i,e){
							_this.renderCard(i)
						})
					}
				}, 300)
			})
		}

	module.exports =  {
			init: function(ct){
				new Pinterest(ct)
			}
	}
