// A THREE.js enviroment is made up of 5 things:
// - a renderer (what the user sees)
// - scene (the data)
// - camera (the perspective)
// - meshes (the object in the 3D world)
// - lights

// Aframe - vr/ar for three.js
// babylon.js games for three.js

const THREE = require("three");
//console.log(THREE);
function createRenderer() {
	let renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight); // getting the window size
	renderer.setClearColor("#16161d"); // background
	let output = document.querySelector("#output");
	output.appendChild(renderer.domElement);
	return renderer; // we will be calling this a lot
}

function createScene() {
	return new THREE.Scene();
}

function createCamera() {
	let camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, //aspect ratio
		0.1, // near value
		1000 // far value
	);
	// position consider it meter
	camera.position.set(-30, 40, 30); // x,y,z
	camera.lookAt(0, 0, 0); // camera look at the center
	return camera;
}

function createCube() {
	// geometry - the actual shape/skeleton of the object
	let geometry = new THREE.BoxGeometry(4, 4, 4);
	// material - the colour/ how it interacts with light

	// let material = new THREE.MeshBasicMaterial({ // this doesnt reponds to light
	// 	color: "tomato",
	// });

	let material = new THREE.MeshLambertMaterial({
		// this reponds to light
		color: "tomato",
	});

	// create a mesh by combining the geometry and the material
	let mesh = new THREE.Mesh(geometry, material);
	// return it so we can add it to the scene
	return mesh;
	// box geometry
}

function createAxesHelper() {
	//development tool
	let axesHelper = new THREE.AxesHelper(40);
	return axesHelper;
	// three axes x y z;
	// x left to right
	// y down to up
	// z is far to near
}

function createSphere() {
	// geometry
	let geo = new THREE.SphereGeometry(
		4, // radius
		30, //
		30 //
	);
	// material
	let mat = new THREE.MeshLambertMaterial({
		color: "dodgerblue",
	});
	// mesh
	let mesh = new THREE.Mesh(geo, mat);
	// return the mesh
	return mesh;
}

function createLight() {
	let light = new THREE.PointLight(
		"white",
		1 // intensity
	);
	return light;
}

function createLightHelper(light) {
	let helper = new THREE.PointLightHelper(light);
	return helper;
}

let renderer = createRenderer();
let scene = createScene();
let camera = createCamera();
let cube = createCube();
let axeshelper = createAxesHelper();
let sphere = createSphere();
let light = createLight();
let lightHelper = createLightHelper(light);

light.position.x = 10;
light.position.y = 10;
light.position.z = 20;

sphere.position.x = 20;

scene.add(axeshelper, lightHelper);
scene.add(cube, sphere, light);
// create cube we can pass it as many as we want

renderer.render(scene, camera); // render a scene with camera

function animate() {
	//cube.position.x += 0.1;
	//cube.position.y -= 0.001;
	//cube.position.z -= 0.01;
	//cube.rotation.x -= 0.2;
	//cube.rotation.y += 0.2;
	//cube.rotation.z -= 0.2;
	renderer.render(scene, camera); // rerender it everytime u need to change
	requestAnimationFrame(animate);
}

animate();
