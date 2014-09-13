$(function() {

  var android = (/android/i.test(navigator.userAgent.toLowerCase()));
  var ios = (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()));
  var micromessenger = (/micromessenger/i.test(navigator.userAgent.toLowerCase()));

  var openTips = function() {
    $("div.wechat-tips").show();
    $("div.modal").show();
    $("body").addClass("modal-open");
  }

  var closeTips = function() {
    $("div.wechat-tips").hide();
    $("div.modal").hide().unbind();
    $("body").removeClass("modal-open");
  }

  if (micromessenger) {
    $('.download-button').click(function(e){
      e.preventDefault();
      openTips();
      $('.modal').click(closeTips);
    })
  }

  if (!android && !ios) {
    $("div.top-bar").hide();
  }

  var player = videojs('post',{ 'children':{ 'loadingSpinner': false,'controlBar': false}}).ready(function() {
    // var size;
    // size = $('.video').width();
    // this.height(size);
    // this.width(size);
    // $('video').height(size);
    // $('video').width(size);

    this.on("play", function(e) {
      $('div.play-button').fadeOut();
    });

    this.on("pause", function(e) {
      $('div.play-button').fadeIn();
    });
    $('video')[0].controls = true;
    // Fix the fuck micromessenger webview
    // if (micromessenger && android) {
    //   var once = true;
    //   this.on("durationchange", function(e){
    //     $('video')[0].controls = false;
    //   });
    //   this.on("playing", function(e) {
    //     if (once) {
    //       $('video')[0].controls = true;
    //     }
    //     once = false;
    //   });
    // }
  });

  $('div.play-button').click(function(e){
    player.play();
  });

  $('span.share').click(function(e){
    $('div.share').slideToggle();
  });
});
