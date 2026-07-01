function WaveNode(e) {
  this.init(e || {});
}
WaveNode.prototype = {
  init: function (e) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.frequency = e.frequency || 0.001;
    this.amplitude = e.amplitude || 1;
  },
  update: function () {
    this.phase += this.frequency;
    e = this.offset + Math.sin(this.phase) * this.amplitude;
    return e;
  },
  value: function () {
    return e;
  },
};

function Line(opts) {
  this.init(opts || {});
}
Line.prototype = {
  init: function (opts) {
    this.spring = opts.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (var i = 0; i < E.size; i++) {
      var node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  },
  update: function () {
    var spring = this.spring;
    var head = this.nodes[0];
    head.vx += (pos.x - head.x) * spring;
    head.vy += (pos.y - head.y) * spring;
    for (var i = 0, len = this.nodes.length; i < len; i++) {
      var t = this.nodes[i];
      if (i > 0) {
        var prev = this.nodes[i - 1];
        t.vx += (prev.x - t.x) * spring;
        t.vy += (prev.y - t.y) * spring;
        t.vx += prev.vx * E.dampening;
        t.vy += prev.vy * E.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      spring *= E.tension;
    }
  },
  draw: function () {
    var x = this.nodes[0].x;
    var y = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (var i = 1, len = this.nodes.length - 2; i < len; i++) {
      var a = this.nodes[i];
      var b = this.nodes[i + 1];
      x = 0.5 * (a.x + b.x);
      y = 0.5 * (a.y + b.y);
      ctx.quadraticCurveTo(a.x, a.y, x, y);
    }
    var a = this.nodes[i];
    var b = this.nodes[i + 1];
    ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
    ctx.stroke();
    ctx.closePath();
  },
};

function onMousemove(ev) {
  function initLines() {
    lines = [];
    for (var i = 0; i < E.trails; i++) {
      lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }));
    }
  }
  function onMove(ev) {
    if (ev.touches) {
      pos.x = ev.touches[0].pageX;
      pos.y = ev.touches[0].pageY;
    } else {
      pos.x = ev.clientX;
      pos.y = ev.clientY;
    }
    ev.preventDefault();
  }
  function onTouch(ev) {
    if (ev.touches.length === 1) {
      pos.x = ev.touches[0].pageX;
      pos.y = ev.touches[0].pageY;
    }
  }
  document.removeEventListener('mousemove', onMousemove);
  document.removeEventListener('touchstart', onMousemove);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchstart', onTouch);
  onMove(ev);
  initLines();
  render();
}

function render() {
  if (!ctx || !ctx.running) return;
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = 'lighter';
  // warm gold/amber tones to match champagne brand palette
  ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',90%,60%,0.028)';
  ctx.lineWidth = 9;
  for (var i = 0; i < E.trails; i++) {
    lines[i].update();
    lines[i].draw();
  }
  ctx.frame++;
  window.requestAnimationFrame(render);
}

function resizeCanvas() {
  if (!ctx) return;
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function Node() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
}

var ctx, f;
var e = 0;
var pos = { x: 0, y: 0 };
var lines = [];
var E = {
  friction: 0.5,
  trails: 60,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

export function renderCanvas() {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  ctx.running = true;
  ctx.frame = 1;
  // offset 47 = brand yellow #FFCA02 hue, amplitude 8 → tight yellow range
  f = new WaveNode({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 8,
    frequency: 0.0012,
    offset: 47,
  });
  document.addEventListener('mousemove', onMousemove);
  document.addEventListener('touchstart', onMousemove);
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('focus', function () {
    if (!ctx.running) {
      ctx.running = true;
      render();
    }
  });
  window.addEventListener('blur', function () {
    ctx.running = false;
  });
  resizeCanvas();
}

export function destroyCanvas() {
  if (ctx) ctx.running = false;
}
