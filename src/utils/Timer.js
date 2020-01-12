function Timer(callback, delay) {
  var timerId,
    start,
    remaining = delay;

  this.pause = function() {
    console.log('paused');
    window.clearTimeout(timerId);
    remaining -= new Date() - start;
  };

  this.resume = function() {
    console.log('resumed');
    start = new Date();
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, remaining);
    console.log('remaing', remaining);
  };

  this.repeat = function() {
    remaining = delay;
    start = new Date();
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, remaining);
  };

  this.resume();
}

export default Timer;
