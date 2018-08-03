window.onload=function(){
  var canvas = $("#painto");
  var ctx = document.getElementById('painto').getContext("2d");

  $('#brush-size').on('change', function(){
    ctx.lineWidth = $('#brush-size').val();
  });
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  $('#brush-color').on('change', function(){
    ctx.strokeStyle = $('#brush-color').val();
  });
  $('#brush-color').on('change', function(){
    ctx.fillStyle = $('#brush-color').val();
  });

  /** pencil tool function **/

  $("#pencil").on('click', function(){
    canvas.off();
    canvas.on('mousedown', function(e) {
      ctx.beginPath();
      ctx.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      canvas.on('mousemove', onPaint)
      canvas.on('mouseup', function() {
        canvas.off('mousemove', onPaint)
      });
      canvas.on('mouseleave', function() {
        canvas.off('mousemove', onPaint)
      });
    });
    var onPaint = function(e) {
      getDEMode();
      ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      ctx.stroke();
    };
  });

  /** line tool function **/

  $("#line").on('click', function(){
    canvas.off();
    var mclick = 1;
    canvas.on('click', function(e){
      if (mclick === 1){
        ctx.beginPath();
        ctx.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        mclick = 2;
      }
      else {
        getDEMode();
        ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        ctx.stroke();
        mclick = 1;
      }
    });
  });

  /** rectangle tool function **/

  $("#rectangle").on('click', function(){
    canvas.off();
    var mclick = 1;
    var topLeftX;
    var topLeftY;
    var bottomRightX;
    var bottomRightY;
    canvas.on('click', function(e){
      if (mclick === 1){
        ctx.beginPath();
        topLeftX = e.pageX - this.offsetLeft
        topLeftY = e.pageY - this.offsetTop
        mclick = 2;
      }
      else {
        bottomRightX = e.pageX - this.offsetLeft - topLeftX;
        bottomRightY = e.pageY - this.offsetTop - topLeftY;
        getDEMode();
        ctx.rect(topLeftX, topLeftY, bottomRightX, bottomRightY);
        ctx.stroke();
        mclick = 1;
      }
    });
  });

  /** rectangle-fill tool function **/

  $("#rectangle-fill").on('click', function(){
    canvas.off();
    var mclick = 1;
    var topLeftX;
    var topLeftY;
    var bottomRightX;
    var bottomRightY;
    canvas.on('click', function(e){
      if (mclick === 1){
        ctx.beginPath();
        topLeftX = e.pageX - this.offsetLeft
        topLeftY = e.pageY - this.offsetTop
        mclick = 2;
      }
      else {
        bottomRightX = e.pageX - this.offsetLeft - topLeftX;
        bottomRightY = e.pageY - this.offsetTop - topLeftY;
        getDEMode();
        ctx.fillRect(topLeftX, topLeftY, bottomRightX, bottomRightY);
        ctx.stroke();
        mclick = 1;
      }
    });
  });

  /** circle tool function **/

  $("#circle").on('click', function(){
    canvas.off();
    var mclick = 1;
    var centerX;
    var centerY;
    var radius;
    canvas.on('click', function(e){
      if (mclick === 1) {
        ctx.beginPath();
        centerX = e.pageX - this.offsetLeft;
        centerY = e.pageY - this.offsetTop;
        console.log(centerX, centerY);
        mclick = 2;
      }
      else {
        radius = Math.sqrt(Math.pow(e.pageX - this.offsetLeft - centerX, 2)+Math.pow(e.pageY - this.offsetTop - centerY, 2));
        getDEMode();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
        mclick = 1;
      }
    });
  });

  /** circle fill tool function **/

  $("#circle-fill").on('click', function(){
    canvas.off();
    var mclick = 1;
    var centerX;
    var centerY;
    var radius;
    canvas.on('click', function(e){
      if (mclick === 1) {
        ctx.beginPath();
        centerX = e.pageX - this.offsetLeft;
        centerY = e.pageY - this.offsetTop;
        console.log(centerX, centerY);
        mclick = 2;
      }
      else {
        radius = Math.sqrt(Math.pow(e.pageX - this.offsetLeft - centerX, 2)+Math.pow(e.pageY - this.offsetTop - centerY, 2));
        getDEMode();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fill();
        mclick = 1;
      }
    });
  });

  /** draw/erase mode function **/

  function getDEMode(){
    if ($('input[name=drawing-mode]:checked').val() === "draw"){
      ctx.globalCompositeOperation="source-over";
    }
    else if ($('input[name=drawing-mode]:checked').val() === "erase") {
      ctx.globalCompositeOperation="destination-out";
    }
  }

  $("#clear").on('click', function(){
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
  });
};
