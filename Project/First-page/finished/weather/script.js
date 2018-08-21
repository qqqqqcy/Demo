$(function(){
  var dicW = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  
  function src(foo){
    return 'http://ou2esgjjd.bkt.clouddn.com/' + foo + '.png'
  }
  
  function countTime(){   //  设置时间
    var time = new Date()
    var arr = []
    if (time.getHours()>=13) {
      arr[0] = 'PM'
      arr[1] = time.getHours() - 12
    } else {
      arr[0] = 'AM'
      arr[1] = time.getHours()
    }
    var dicM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    if (arr[1]<10) arr[1] ='0'+arr[1]
    arr[2] = time.getMinutes()  // 分
    if (arr[2]<10) arr[2] ='0'+arr[2]
    arr[3] = time.getDate()     // 日
    arr[4] = dicW[time.getDay()]      // 星期
    arr[5] = dicM[time.getMonth()]    // 月
    arr[6] = time.getFullYear() // 年
    
     $('.time .hour').text(arr[1])
     $('.time .min').text(arr[2])
     $('.time .sub').text(arr[0])
     $('.info').text(arr[4] + ' ' + arr[3] + ' ' + arr[5] + ' ' + arr[6])
  } 
  

  
  
  countTime()
  setInterval(countTime,60000)
  var nowCity;
  function run(e){
    $.get('https://free-api.heweather.com/v5/weather?lang=en&city=' + e +'&key=ac2e5198e2aa43bcb7c250f8ae9681cf',function(e){
      var data = e.HeWeather5[0]
      
      $.ajax({url:'https://api.asilu.com/bg',dataType:'JSONP'}).done(function(e){
        var picNum = Math.round(7*(Math.random()))
        $('.ct').css('backgroundImage','url('+e.images[picNum].url+')')
      })

      function setInfo($li,i){
        $li.find('img').attr('src',src(data.daily_forecast[i-1].cond.code_d))
        var weekS = new Date()
        weekS = dicW[(weekS.getDay()+i)%7]
        $li.find('.week').text(weekS.slice(0,3).toUpperCase())
        $li.find('.temp').text(data.daily_forecast[i-1].tmp.max+'°')
      }
      
      nowCity= data.basic.city[0].toUpperCase()+data.basic.city.slice(1,999)
      $('.city').val(nowCity)
      $('.today img').attr('src',src(data.now.cond.code))
      $('.today .temp').text(data.now.tmp+'°')
      
      
     
      for (var i=1; i<=3; i++){
        setInfo($('.footer ul li').eq(i),i)
       }
      
      $('.weatherText').text(data.now.cond.txt)

      $('.weatherBasic p').eq(0).contents()[1].nodeValue = data.aqi.city.pm10
      $('.weatherBasic p').eq(1).contents()[1].nodeValue = data.aqi.city.pm25
      $('.weatherBasic p').eq(2).contents()[1].nodeValue = data.aqi.city.qlty
    })  
  }

  $.get('https://weixin.jirengu.com/weather/ip',function(e){
    run(e.data)
  $('.city').change(function(e){    
    $.get('https://api.heweather.com/v5/search?city='+ $(this).val()+'&key=ac2e5198e2aa43bcb7c250f8ae9681cf',function(e){
      if (e.HeWeather5[0].status != 'ok') {
        $('.cityError').slideDown(200).delay(1200).slideUp(200)
        $('.city').val(nowCity)        
      } else {
        run(e.HeWeather5[0].basic.city)
        $('.city').val(nowCity)
      }
    })
  })
  function flash(){
    $('.colon').delay(1500).fadeOut(1500).show(0)
  }
  setInterval(flash,1000)

  })
})

