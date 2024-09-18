import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { carsServices } from '../services/cars-services';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  constructor(private service: carsServices) {}

  ngOnInit(): void {
    this.canvas();

    let wrapBrandLogo = localStorage.getItem('brandWrapSel');
    if (wrapBrandLogo == '3m' || wrapBrandLogo == 'imageP') {
      $('#vinil-brand').append(
        '<img src="../../assets/img/wrapBrandLogos/' +
          wrapBrandLogo +
          '.png" style="width:75%; padding:5px" >'
      );
    } else {
      $('#vinil-brand').append(
        '<img src="../../assets/img/wrapBrandLogos/' +
          wrapBrandLogo +
          '.png" style="width:75%; padding:10px" >'
      );
    }

    setTimeout(() => {
      let colors = $('.colors-item');

      $('.colors-item').on('click', function (e) {
        $(colors).removeClass('active');
        $(this).addClass('active');
      });

      let vinils: any = localStorage.getItem('colorGroup');
      let vinil: any = vinils.split(',');

      for (var i = 0; i < colors.length; i++) {
        $(colors[i]).append(
          '<img class="teste" value="../../assets/scenes/seat/ibiza/scene975CarbonFiberBlack.glb" id="' +
            vinil[i] +
            '" src="../../assets/img/wrapColors/' +
            vinil[i] +
            '" style="width:100%; height:100%; border-radius: 10px; padding:3px" >'
        );
      }
    }, 100);

    setTimeout(() => {
      $('.colors-item').on('click', () => {
        localStorage.setItem('carUrl', 'seat/ibiza/scene975CarbonFiberBlack');
        window.location.reload();
      });
    }, 250);
  }

  canvas() {
    setTimeout(() => {}, 200);
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
    let controls = new OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = 1.4;
    controls.enableDamping = false; //Coloca peso na camera
    controls.enablePan = false; //Permite arrastar o objeto
    controls.autoRotate = false; //Roda o objeto.
    controls.minDistance = 1;
    controls.maxDistance = 15;
    controls.update();

    //Scene
    let scene: any = new THREE.Scene();

    //Light
    let light = new THREE.SpotLight(0xffffff, 1500);
    light.position.set(0, 10, 0);
    light.distance = 20;
    light.angle = 0.4;
    light.penumbra = 0.5;
    light.castShadow = true;
    scene.add(light);

    let dirlight = new THREE.DirectionalLight(0xffffff, 3);
    dirlight.position.set(5, 0, 0);
    scene.add(dirlight);

    let dirlight2 = new THREE.DirectionalLight(0xffffff, 3);
    dirlight2.position.set(-5, 0, 0);
    scene.add(dirlight2);

    let dirlight3 = new THREE.DirectionalLight(0xffffff, 3);
    dirlight3.position.set(0, 0, 5);
    scene.add(dirlight3);

    let dirlight4 = new THREE.DirectionalLight(0xffffff, 3);
    dirlight4.position.set(0, 0, -5);
    scene.add(dirlight4);

    // SETUP SCENE
    let plane = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshStandardMaterial({
        color: 0x555555,
        side: THREE.DoubleSide,
      })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    //TEXTURE
    let textureLoader = new THREE.TextureLoader().load(
      '../../assets/scenes/seat/ibiza/1.jpg'
    );

    //GET LOCALSTORAGE
    let selectedCarUrl: any = localStorage.getItem('carUrl');
    let carUrl = '../../assets/scenes/' + selectedCarUrl + '.glb';
    let claudio = 0x0000ff;

    //Model
    let loader = new GLTFLoader();
    loader.load(carUrl, (gltf) => {
      let mesh = gltf.scene;
      mesh.castShadow = true;
      mesh.traverse((child) => {
        child.castShadow = true;
        let body = child.getObjectByName('body');
        body?.traverse((wrap) => {
          if (wrap instanceof THREE.Mesh) {
            wrap.material = new THREE.MeshBasicMaterial({ map: textureLoader });
          }
        });
        if (child instanceof THREE.Mesh) {
        }
      });

      console.log(mesh);
      scene.add(mesh);
      animate();
    });

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    $('#car').append(renderer.domElement); //coloca o canvas dentro da div car.

    //Clear
    $('.showroom-btn').on('click', function () {
      scene = null!;
      $('#car').remove();
    });
  }
}
