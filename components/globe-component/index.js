import * as THREE from 'three';
import 'three-examples/controls/OrbitControls';
import Stats from 'three-examples/libs/stats.min';

// SEE: https://stackoverflow.com/questions/35968047/using-webpack-threejs-examples-and-typescript

import { Tween, autoPlay, Easing } from 'es6-tween';

import { select } from 'd3-selection';

import { cartesian2polar, polar2cartesian } from './common';
import { metrics } from './metrics';

import Glow from './glow';
import Water from './water';
import Avatar from './avatar';
import State from './state';
import Particles from './particles';

Array.range = (start, end) => Array.from({ length: (end - start) }, (v, k) => k + start);

let intersections = [];

const mouse = new THREE.Vector2();
const scene = new THREE.Scene();

// const avatars = new THREE.Object3D();

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 300);
camera.position.z = 30;

const controls = new THREE.OrbitControls(camera);

const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.4;

const renderer = new THREE.WebGLRenderer({
  alpha: false,
  antialias: true,
  autoClear: false,
});

// renderer.shadowMap.enabled = true;
// renderer.shadowMap.renderSingleSided = false;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x00002A);
// renderer.autoClear = false;
document.getElementById('globe').appendChild(renderer.domElement);

autoPlay(true);

const centerOnTarget = function() {
  if (intersections.length > 0) {
    const from = cartesian2polar(camera.position.x, camera.position.y, camera.position.z);

    const targetPos = {
      x: intersections[0].object.position.x,
      y: intersections[0].object.position.y,
      z: intersections[0].object.position.z,
    };

    const to = cartesian2polar(targetPos.x, targetPos.y, targetPos.z);
    to.radius = from.radius;


    let tween = new Tween(from)
      .to(to, 3000)
      .on('update', ({ radius, latitude, longitude }) => {
        const cart = polar2cartesian(radius, latitude, longitude);
        camera.position.set(cart.x, cart.y, cart.z);

        camera.lookAt(new THREE.Vector3(0, 0, 0));
      })
      .easing(Easing.Cubic.InOut)
      .start();
  }
};

select('#globe').on('click', centerOnTarget);

const stats = new Stats();
document.getElementById('globe').appendChild(stats.dom);

const globeEl = select('#globe');

const onDocumentMouseMove = (event) => {
  event.preventDefault();

  // NOTE: other elements part of the page may mess up the mouse positions this way!!!!
  mouse.x = ((event.clientX / window.innerWidth) * 2) - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2) + 1;
};

document.addEventListener('mousemove', onDocumentMouseMove, false);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffaa66, 4.2);
dirLight.position.set(15, 13, 15);
// scene.add(dirLight);

const globe = new THREE.Object3D();
globe.position.set(0, 0, 0);

const RED = new THREE.Color(0xff0000);
const WHITE = new THREE.Color(0xffffff);

const state = new State();
const particles = new Particles(state);
particles.load(() => particles.update());

globe.add(particles.mesh);

const water = new Water();
globe.add(water.mesh);

const glow = new Glow(camera);
globe.add(glow.mesh);

const avatar = new Avatar();
avatar.load(avs => globe.add(avs));

scene.add(globe);

const animate = (t) => {
  requestAnimationFrame(animate);

  particles.uniforms.time.value += 0.1;
  glow.uniforms.viewVector.value = new THREE.Vector3().subVectors(camera.position, globe.position);

  // globe.rotation.y += 0.0005;

  stats.begin();

  raycaster.setFromCamera(mouse, camera);

  intersections = raycaster.intersectObjects(avatar.mesh.children);

  avatar.mesh.children.forEach(d => d.material.color = WHITE);

  if (intersections.length > 0) {
    intersections[0].object.material.color = RED;

    globeEl
      .st({ cursor: 'pointer' });
  } else {
    globeEl
      .st({ cursor: 'default' });
  }

  renderer.render(scene, camera);

  stats.end();
};

select('#selectors').selectAll('button.metric')
  .data(Object.keys(metrics))
  .enter()
  .append('button.metric')
  .text(d => metrics[d].label)
  .on('click', function() {
    state.current = state.target;
    state.target = select(this).datum();

    particles.update();
  });

animate();
