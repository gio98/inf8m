console.clear();
window.requestFrame = function () {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

(_8 => {
  const canvas = document.createElement('canvas'),
  context = canvas.getContext('2d'),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight,
  centerWidth = width / 2,
  centerHeight = height / 2,
  size = Math.min(height / 4, width / 4),
  startTime = new Date().getTime();

  let currentTime = 0;
  canvas.id = '_8';

  var lines = [];
  context.fillStyle = 'rgba(0,0,0,1)';
  context.fillRect(0, 0, width, height);

  context.strokeStyle = '#FFF';
  context.lineWidth = 20;

  class line {
    constructor() {
      this.move();
      this.speed = Math.random() * 10 + 15;
      this.timeOffset = Math.random() * 1000;
      this.length = (Math.random() * 5 + 10) * 0.03;
      lines.push(this);
    }

    move() {
      let { speed, x, y, timeOffset, length } = this;
      this.oldx = Math.cos((currentTime + timeOffset - length) * 0.1 * speed) * size;
      this.oldy = Math.sin((currentTime + timeOffset - length) * 0.1 * speed * 2) * size / 2;
      this.x = Math.cos((currentTime + timeOffset) * 0.1 * speed) * size;
      this.y = Math.sin((currentTime + timeOffset) * 0.1 * speed * 2) * size / 2;
    }

    draw() {
      let { x, y, oldx, oldy } = this;
      x += centerWidth;
      oldx += centerWidth;
      y += centerHeight;
      oldy += centerHeight;

      context.fillStyle = 'rgba(255,255,255,1)';

      context.beginPath();
      context.arc(oldx, oldy, 10, 0, 2 * Math.PI);
      context.fill();

      context.beginPath();
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fill();

      context.beginPath();
      context.moveTo(oldx, oldy);
      context.lineTo(x, y);
      context.stroke();
    }

    render() {
      this.move();
      this.draw();
    }}


  for (var i = 0; i < Math.floor(Math.random() * 12) + 1; i++) {
    new line();
  }

  context.fillRect(0, 0, width, height);

  InfinityRender = () => {
    let now = new Date().getTime();
    currentTime = (now - startTime) / 1000;

    context.fillStyle = 'rgba(0,0,0,0.01)';
    context.fillRect(0, 0, width, height);

    lines.map(line => line.render());

    window.requestFrame(InfinityRender);
  };

  InfinityRender();
  document.body.appendChild(canvas);
})();

(_9 => {
  const scene = new THREE.Scene(),
  renderer = new THREE.WebGLRenderer(),
  canvas = renderer.domElement,
  width = window.innerWidth,
  height = window.innerHeight,
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000000),
  startTime = new Date().getTime();

  let currentTime = 0;
  canvas.id = '_9';

  renderer.setSize(width, height);
  camera.position.z = 12;


  var starsMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.015 });


  const geometry = new THREE.BufferGeometry(),
  positions = [],
  sizes = [];

  const spiralSize = 1,
  xDiffusion = 3,
  yDiffusion = 3;
  for (var i = 0; i < 10000; i++) {
    var angle = i * 0.001;
    positions.push((1 + angle) * Math.cos(angle) * spiralSize + (Math.random() * xDiffusion - xDiffusion / 2));
    positions.push((1 + angle) * Math.sin(angle) * spiralSize + (Math.random() * yDiffusion - yDiffusion / 2));
    positions.push(Math.random() * 3);
    sizes.push(1);
  }

  geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.addAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setDynamic(true));
  const galaxy = new THREE.Points(geometry, starsMaterial);
  galaxy.position.x = 0;
  galaxy.position.y = 0;
  galaxy.position.z = 0;
  scene.add(galaxy);


  const backgroundGeometry = new THREE.BufferGeometry(),
  backgroundStarPositions = [],
  backgroundSizes = [];

  for (var x = 0; x < 10000; x++) {
    var p = randomSpherePoint(0, 0, 0, 1000000 + Math.random() * 1000);
    backgroundStarPositions.push(p[0]);
    backgroundStarPositions.push(p[1]);
    backgroundStarPositions.push(p[2]);
    backgroundSizes.push(1);
  }

  backgroundGeometry.addAttribute('position', new THREE.Float32BufferAttribute(backgroundStarPositions, 3));
  backgroundGeometry.addAttribute('size', new THREE.Float32BufferAttribute(backgroundSizes, 1).setDynamic(true));
  const starfield = new THREE.Points(backgroundGeometry, starsMaterial);
  starfield.position.x = 0;
  starfield.position.y = 0;
  starfield.position.z = 0;
  scene.add(starfield);

  render = () => {
    let now = new Date().getTime();
    currentTime = (now - startTime) / 1000;

    scene.rotation.z = Math.cos(currentTime * 0.1);
    scene.rotation.y = Math.sin(currentTime * 0.1) * 0.5;

    renderer.render(scene, camera);
    window.requestFrame(render);
  };


  document.body.appendChild(canvas);
  render();

  function randomSpherePoint(x0, y0, z0, radius) {
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);
    var x = x0 + radius * Math.sin(phi) * Math.cos(theta);
    var y = y0 + radius * Math.sin(phi) * Math.sin(theta);
    var z = z0 + radius * Math.cos(phi);
    return [x, y, z];
  }
})();