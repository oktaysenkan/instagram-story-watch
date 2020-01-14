function Timer(callback, delay, tickCallback, tickDelay) {
  var timerId,
    start,
    remaining = delay;

  let interval;

  this.pause = function() {
    console.log('paused');
    window.clearTimeout(timerId);
    window.clearInterval(interval);
    remaining -= new Date() - start;
  };

  this.resume = function() {
    console.log('resumed');
    start = new Date();
    window.clearTimeout(timerId);
    window.clearInterval(interval);
    timerId = window.setTimeout(callback, remaining);
    interval = window.setInterval(tickCallback, tickDelay);
    console.log('remaing', remaining);
  };

  this.repeat = function(newDelay = delay) {
    remaining = newDelay;
    this.resume();
  };

  this.clear = function() {
    window.clearTimeout(timerId);
    window.clearInterval(interval);
  };

  this.resume();
}

export default Timer;
