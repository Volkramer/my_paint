window.onload=function(){
  var canvas = $("#painto");
  var ctx = document.getElementById('painto').getContext("2d");

  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black'

  /** pencil function **/

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
      ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      ctx.stroke();
    };
  });

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
        ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        ctx.stroke();
        mclick = 1;
      }
    });
  });

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
        console.log(topLeftX, topLeftY);
        mclick = 2;
      }
      else {
        bottomRightX = e.pageX - this.offsetLeft - topLeftX;
        bottomRightY = e.pageY - this.offsetTop - topLeftY;
        console.log(topLeftX, topLeftY, bottomRightX, bottomRightY);
        ctx.rect(topLeftX, topLeftY, bottomRightX, bottomRightY);
        ctx.stroke();
        mclick = 1;
      }
    });
  });

};
