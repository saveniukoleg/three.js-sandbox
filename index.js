import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';

const scene = new THREE.Scene();
const fov = 75;
// const aspect = 2;  // the canvas default
const aspect = window.innerWidth / window.innerHeight;  // the canvas default
const near = 0.1;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
const cube2 = cube.clone()
cube2.position.y = 5;
cube2.position.z = 5;
const cube3 = cube.clone()
cube3.position.z = 5;
cube3.position.y = -5;
scene.add(cube);
scene.add(cube2);
scene.add(cube3);

camera.position.z = 5;

let i = 0;

const animate = function (time) {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();

let btn = document.getElementById('btn-color')
btn.addEventListener('click', () => {
    console.log('click')
    cube.material.color.g ? cube.material.color.set('#f00') : cube.material.color.set('#0f0')
})

let input = document.getElementById('input-value')
input.addEventListener('input', (e) => {
    cube.position.y = e.target.value
})

let range = document.getElementById('range')
range.addEventListener('input', (e) => {
    cube.position.x = e.target.value
})