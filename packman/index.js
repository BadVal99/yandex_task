$(document).ready(function() {
  var BODY    = $('body');
  var PACMAN  = $('.PACMAN');
  var FIELD   = $('.Field');
  var FOOD    = $('.food');
  var SCORE   = $('.Score');
  var step = 1;
  var timerId;
  var food = new Food();
  var Total = 0;




  BODY.keydown(function(e) {
    var key = e.keycode || e.which;
    console.log(key);
    if (key == 37) {
      clearTimeout(timerId);
      PACMAN.removeClass('rad_90 rad_270').addClass('rad_180');
      drop('LEFT');
    }

    if (key == 38) {
      clearTimeout(timerId);
      PACMAN.removeClass('rad_90 rad_180').addClass('rad_270');
      drop('TOP');
    }

    if (key == 39) {
      clearTimeout(timerId);
      PACMAN.removeClass('rad_90 rad_180 rad_270');
      drop('RIGHT');
    }

    if (key == 40) {
      clearTimeout(timerId);
      PACMAN.removeClass('rad_180 rad_270').addClass('rad_90');
      drop('BOTTOM');
    }

    if (key == 65) {
     clearTimeout(timerId);
      ENEMY.removeClass('rad_180 rad_270').addClass('rad_90');
      drop_enemy('BOTTOM');
    }
  });

  function PosCompare() {
      var foodlenght = $('.food').length;
    if (foodlenght > 0) {
      var posfood = $('.food').position();
      var posPack = $('.PACMAN').position();
      var space_t = (posPack.top - posfood.top);
      var space_l = (posPack.left - posfood.left);

      if ((space_t >= -10 && space_t <= 10) && (space_l >= -10 && space_l <= 10)) {
        $('.food').remove();
        Total +=  1;
        SCORE.empty();
        SCORE.append(Total);
        setTimeout(function() {
          Food();
        }, 1000);


      };
    }





  };

  function drop(vector) {
    var positions = PACMAN.position();
    var PACMANPosTop = positions.top;
    var PACMANPosLeft = positions.left;
    var MAX_TOP = 0;
    var MAX_RIGHT = FIELD.width() - PACMAN.width();
    var MAX_BOTTOM = FIELD.height() - PACMAN.height();
    var MAX_LEFT = 0;
    switch (vector) {
      case 'TOP':
        if (!(PACMANPosTop < MAX_TOP)) {
          PACMANPosTop -= step;
          PACMAN.css('top', PACMANPosTop + 'px');
        } else(
          PACMAN.css('top', MAX_BOTTOM + 'px')
        )
        break;
      case 'RIGHT':
        if (!(PACMANPosLeft > MAX_RIGHT)) {
          PACMANPosLeft += step;
          PACMAN.css('left', PACMANPosLeft + 'px');
        } else(
          PACMAN.css('left', MAX_LEFT + 'px')
        )
        break;
      case 'BOTTOM':
        if (!(PACMANPosTop > MAX_BOTTOM)) {
          PACMANPosTop += step;
          PACMAN.css('top', PACMANPosTop + 'px');
        } else(
          PACMAN.css('top', MAX_TOP + 'px')
        )
        break;
      case 'LEFT':
        if (!(PACMANPosLeft < MAX_LEFT)) {
          PACMANPosLeft -= step;
          PACMAN.css('left', PACMANPosLeft + 'px');
        } else(
          PACMAN.css('left', MAX_RIGHT + 'px')
        )
        break;

    }
    PosCompare();
    timerId = setTimeout(function() {
      drop(vector);

    }, 0.1);
  };




  function Food() {
    this.getRandPos = function(min, max) {
      return Math.ceil(Math.random() * (max - min) + min) + 'px';
    };
    var $div = $('<div></div>', {
      'data-food': '',
      'class': 'food',
      'style': 'top:' + this.getRandPos(15, 470) + ';' + 'left:' + this.getRandPos(15, 470)
    });
    this.$element = $div;

    FIELD.append(this.$element);

  }

;

});
