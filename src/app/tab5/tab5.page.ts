import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { carsServices } from '../services/cars-services';
import * as $ from 'jquery';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  constructor(private service: carsServices) {}

  ngOnInit(): void {
    this.canvas();

    let colors = $('.colors-item');

    $('.colors-item').on('click', function (e) {
      $(colors).removeClass('active');
      $(this).addClass('active');
    });
  }

  canvas() {
    //Render
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    renderer.toneMapping = THREE.NeutralToneMapping;

    //Camera
    let camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );
    //x = width / left and right
    //y = height / top and bottom
    //z = depth / zoom in or out
    camera.position.set(5, 0, 8);
    camera.lookAt(0, 0, 0);

    //Orbit Control
    const controls = new OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = 1.4;
    controls.enableDamping = false; //Coloca peso na camera
    controls.enablePan = false; //Permite arrastar o objeto
    controls.autoRotate = false; //Roda o objeto.
    controls.minDistance = 5;
    controls.maxDistance = 150;
    controls.update();

    //Scene
    let scene: any = new THREE.Scene();

    //Light

    const light = new THREE.DirectionalLight(0xccccff, 30);
    light.position.set(0, 10, 5);
    light.castShadow = true;
    scene.add(light);
    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);

    // SETUP SCENE
    const floorTexture = new THREE.TextureLoader().load(
      '../../assets/scenes/background/floor/b.jpg'
    );
    const ambientOclussionTexture = new THREE.TextureLoader().load(
      '../../assets/scenes/background/floor/a.jpg'
    );

    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(150, 150),
      new THREE.MeshStandardMaterial({
        map: floorTexture,
      })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    const hdriLoader = new RGBELoader();
    hdriLoader.load(
      '../../assets/scenes/background/sky.hdr',
      function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
      }
    );

    //Model
    let loader = new GLTFLoader();
    let selectedCarUrl: any = localStorage.getItem('carUrl');
    loader.load(selectedCarUrl, function (gltf) {
      const mesh = gltf.scene;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.traverse((child) => {
        child.castShadow = true;
        child.receiveShadow = true;
      });
      scene.add(mesh);
    });

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    $('#car').append(renderer.domElement); //coloca o canvas dentro da div car.

    animate();

    //Clear
    $('.showroom-btn').on('click', function () {
      scene = null;
      $('#car').remove();
    });
  }

  clear() {
    localStorage.setItem('carUrl', '');
  }
}
