import * as THREE from "three";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

console.log(THREE);

const body = document.querySelector("body");
const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

// Variable Definition
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camPos = {
  x: 0,
  y: 0,
  z: 10,
};

const camRot = {
  x: 0,
  y: 0,
  z: 0,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = camPos.z;
scene.add(camera);
const controls = new FirstPersonControls(camera, document.body);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// Helper Axes
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.rotation.set(0, 1, 0);

renderer.render(scene, camera);

//// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

//// TEXTURES
const textureLoader = new THREE.TextureLoader();
const sciFiWallColor = textureLoader.load(
  "Textures/SciFiWall/Sci-Fi_Wall_016_basecolor.png"
);
sciFiWallColor.colorSpace = THREE.SRGBColorSpace;
sciFiWallColor.repeat.set(8, 8);
sciFiWallColor.wrapS = THREE.RepeatWrapping;
sciFiWallColor.wrapT = THREE.RepeatWrapping;

//// OBJECTS

const gltfLoader = new GLTFLoader();
gltfLoader.load("Models/Skull/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
});

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshBasicMaterial({ map: sciFiWallColor })
);
scene.add(plane);

const group = new THREE.Group();
scene.add(group);

const forme2 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(forme2);

const forme3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(forme3);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(
    1,
    32,
    32,
    0,
    2 * Math.PI,
    0.5 * Math.PI,
    0.5 * Math.PI
  ),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);
scene.add(sphere);

const tick = () => {
  mesh.rotation.x += 0.001;
  mesh.rotation.y += 0.001;

  group.position.x += 0.001;
  group.rotation.x += 0.001;
  group.rotation.y += 0.001;

  controls.update(0.1);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

document.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.key == "ArrowUp") {
    controls.moveForward += 0.1;
  }
});
