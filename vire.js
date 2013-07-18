(function($) {
  $.fn.vire = function(args) {
    var events = {};
    var froogInstance = $f(this.attr('id'));
    froogInstance.addEvent('ready', bindEvents);

    function v_add(eventTime, cb) {
      events[eventTime] = {
        callback: cb,
        fired: false
      }

      if(eventTime == 'finish')
        bindFinishEvent()
    }

    function addEvent(element, eventName, callback) {
      $(element).on(eventName, callback);
    }

    function bindEvents() {
      checkTime();
      bindFinishEvent();
    }

    function checkTime() {
      froogInstance.addEvent('playProgress', function(data) {
        var curTime = Math.floor(Number(data.seconds));
        if (events[curTime] && events[curTime].fired == false) {
          events[curTime].callback();
          events[curTime].fired = true;
        }
      });
    }

    function bindFinishEvent() {
      if (events.finish && !events.finish.fired) {
        froogInstance.addEvent('finish', function(data) {
          events.finish.callback();
          events.finish.fired = true;
        })
      };
    }

    function setConstructorEvents(args) {
      if(typeof(args) == "object" && args.length) {
        for( var i =0 ;i < args.length; ++i) {
          v_add(args[i].eventTime, args[i].cb);
        }
      }
    }

    setConstructorEvents(args);
    this.vireAdd = v_add;
    return this;
  }
})(jQuery);
