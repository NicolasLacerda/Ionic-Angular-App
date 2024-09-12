import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  container: any;
  ngOnInit(): void {
    //Variável container pega a div "car".
    this.container = document.getElementById('car');

    //Renderização do Objeto.
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //Cria o canvas.
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      10,
      2000
    );
    //x = width / left and right
    //y = height / top and bottom
    //z = depth / zoom in or out
    camera.position.set(1050, 0, -450);
    camera.lookAt(0, 0, 0);

    const groundGeometry = new THREE.PlaneGeometry(1500, 1500, 32, 32);
    groundGeometry.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      side: THREE.DoubleSide,
    });

    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.castShadow = false;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 400, 20);
    spotLight.castShadow = true;
    spotLight.penumbra = 1;
    spotLight.distance = 1200;
    spotLight.intensity = 10;
    spotLight.decay = 0;
    spotLight.shadow.bias = -0.0001;

    scene.add(spotLight);

    const dirLight1 = new THREE.DirectionalLight(0xffddcc, 3);
    dirLight1.position.set(1, -0.5, 0.5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xccccff, 3);
    dirLight2.position.set(-1, -0.5, -0.5);
    scene.add(dirLight2);

    //Cria o Objeto quadrado.
    let loader = new GLTFLoader();
    let url = '../../assets/scenes/dacia/duster/scene.gltf';
    loader.load(url, function (gltf) {
      let car = gltf.scene.children[0];
      car.scale.set(1, 1, 1);
      scene.add(gltf.scene);
      animate();
    });

    //Orbit Control
    const controls = new OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.maxPolarAngle = 1.4;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.autoRotate = false;
    controls.minDistance = 500;
    controls.maxDistance = 1250;
    controls.update();

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    //Coloca o canvas dentro do elemento div.
    this.container.appendChild(renderer.domElement);
  }
}
