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

    //animação do objeto
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    //Cria o canvas.
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    //Luz do ambiente.
    const hlight = new THREE.AmbientLight(0x404040, 100);
    scene.add(hlight);

    //Renderização do Objeto.
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    //Coloca o canvas dentro do elemento div.
    this.container.appendChild(renderer.domElement);

    //Cria o Objeto quadrado.
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    //posição do objeto no ambiente
    camera.position.z = 5;
    camera.position.y = 0.5;

    animate();
  }
}
