function Timer(callback, delay) {
  var timerId,
    start,
    remaining = delay;

  this.pause = function() {
    console.log('paused');
    window.clearTimeout(timerId);
    remaining -= new Date() - start;
    console.log('remaining', remaining);
  };

  this.resume = function() {
    console.log('resumed');
    start = new Date();
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, remaining);
  };

  this.repeat = function() {
    remaining = delay;
    this.resume();
  };

  this.clear = function() {
    window.clearTimeout(timerId);
  };

  this.resume();
}

export default Timer;
