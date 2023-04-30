import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
let renderer;
let camera;

init(); //our setup
render(); //the update loop

function init() {
  //setup the camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(-1.8, 0.6, 2.7);

    
  // load the model
  const loader = new GLTFLoader();
  loader.load(
    "https://pub-8f5daad4926a4505b689da801061ae18.r2.dev/test.gltf",
    function (gltf) {
      scene.add(gltf.scene);
      render(); //render the scene for the first time
    }
  );

  //setup the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas, alpha: true  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //added contrast for filmic look
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding; //extended color space for the hdr

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render); // use if there is no animation loop to render after any changes
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, -0.2);
  controls.update();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

//

function render() {
  renderer.render(scene, camera);
}



// lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, );
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight)