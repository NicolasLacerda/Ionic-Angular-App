import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as $ from 'jquery';
import Stats from 'three/examples/jsm/libs/stats.module';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  constructor() {}

  ngOnInit(): void {
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
    $('.other-colors').css('display', 'none');

    setTimeout(() => {
      let vinils: any = localStorage.getItem('colorGroup');
      let vinil: any = vinils.split(',');

      for (var i = 0; i < vinils.length; i++) {
        if (i <= 4) {
          $('.colors').append(
            '<button class="colors-item" value=' +
              vinil[i] +
              ' style="width:2.3rem; height:2.3rem; border-radius: 10px; background: #' +
              vinil[i] +
              '" ></button>'
          );
        } else if (i > 4 && i < 25) {
          $('.colors2').append(
            '<button class="colors-item" value=' +
              vinil[i] +
              ' style="width:3rem; height:3rem; border-radius: 10px; background: #' +
              vinil[i] +
              '" ></button>'
          );
        }
      }

      $('#upBtn').on('click', () => {
        $('.arrowUp').toggleClass('rotate');
        $('.other-colors').toggle();
      });

      $('#wrapper').on('click', function () {
        $(this).toggleClass('open');
        $('.btnR').toggle();
      });

      $('.teto').on('click', function (e) {
        $('.todos').removeClass('active-btn');
        $('.retro').removeClass('active-btn');
        $('.teto').addClass('active-btn');

        $('.colors-item-roof').remove();
        for (var i = 0; i < vinils.length; i++) {
          if (i <= 4) {
            $('.colors').append(
              '<button class="colors-item-roof" value=' +
                vinil[i] +
                ' style="width:2.3rem; height:2.3rem; border-radius: 10px; background: #' +
                vinil[i] +
                '" ></button>'
            );
          } else if (i > 4 && i < 25) {
            $('.colors2').append(
              '<button class="colors-item-roof" value=' +
                vinil[i] +
                ' style="width:3rem; height:3rem; border-radius: 10px; background: #' +
                vinil[i] +
                '" ></button>'
            );
          }
        }
        $('.colors-item').remove();
        $('.colors-item-retro').remove();
      });

      $('.retro').on('click', function (e) {
        $('.todos').removeClass('active-btn');
        $('.teto').removeClass('active-btn');
        $('.retro').addClass('active-btn');

        $('.colors-item-retro').remove();
        for (var i = 0; i < vinils.length; i++) {
          if (i <= 4) {
            $('.colors').append(
              '<button class="colors-item-retro" value=' +
                vinil[i] +
                ' style="width:2.3rem; height:2.3rem; border-radius: 10px; background: #' +
                vinil[i] +
                '" ></button>'
            );
          } else if (i > 4 && i < 25) {
            $('.colors2').append(
              '<button class="colors-item-retro" value=' +
                vinil[i] +
                ' style="width:3rem; height:3rem; border-radius: 10px; background: #' +
                vinil[i] +
                '" ></button>'
            );
          }
        }
        $('.colors-item').remove();
        $('.colors-item-roof').remove();
      });

      $('.todos').on('click', function (e) {
        $('.retro').removeClass('active-btn');
        $('.teto').removeClass('active-btn');
        $('.todos').addClass('active-btn');

        $('.colors-item').remove();
        for (var i = 0; i < vinils.length; i++) {
          if (i <= 4) {
            $('.colors').append(
              '<button class="colors-item" value=' +
                vinil[i] +
                ' style="width:2.3rem; height:2.3rem; border-radius: 10px; background: #' +
                vinil[i] +
                '" ></button>'
            );
          } else if (i > 4 && i < 25) {
            $('.colors2').append(
              '<button class="colors-item" value=' +
                vinil[i] +
                ' style="width:3rem; height:3rem; border-radius: 10px; background: #' +
                vinil[i] +
                '" ></button>'
            );
          }
        }
        $('.colors-item-retro').remove();
        $('.colors-item-roof').remove();
      });

      $('.showroom-menu').on('click', function (e) {
        $('.menu-page').show();
      });
      $('#back-btn-menu').on('click', function (e) {
        $('.menu-page').hide();
      });
    }, 50);

    //Canvas
    setTimeout(() => {
      let aliasRaw: any;
      let aliasToggle: any;

      $('.alias').on('click', function () {
        aliasRaw = $(this).attr('value')!;
        localStorage.setItem('antiA', aliasRaw);
        window.location.reload();
      });

      aliasToggle = localStorage.getItem('antiA');
      let alias = aliasToggle === 'true';

      let res: any;

      function aliasing() {
        if (alias == true) {
          res = 'Ligado';
        } else {
          res = 'Desligado';
        }
      }

      aliasing();

      $('#callAlias').append('Anti Serrilhado: ' + res);

      //Render
      let renderer = new THREE.WebGLRenderer({ antialias: alias });
      renderer.setSize(720, 1280);
      renderer.setClearColor(0x000000);
      renderer.shadowMap.enabled = true;

      renderer.toneMapping = THREE.NeutralToneMapping;

      //Camera
      let camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        15
      );
      //x = width / left and right
      //y = height / top and bottom
      //z = depth / zoom in or out
      camera.position.set(5, 0, 8);
      camera.lookAt(0, 0, 0);

      //Orbit Control
      let controls = new OrbitControls(camera, renderer.domElement);
      document.body.appendChild(renderer.domElement);
      controls.target.set(0, 0.3, 0);
      controls.maxPolarAngle = 1.4;
      controls.enableDamping = false; //Coloca peso na camera
      controls.enablePan = false; //Permite arrastar o objeto
      controls.autoRotate = false; //Roda o objeto.
      controls.minDistance = 4;
      controls.maxDistance = 12;
      controls.update();

      //Scene
      let scene: any = new THREE.Scene();

      //Light
      let light = new THREE.SpotLight(0xffffff, 250);
      light.position.set(0, 10, 0);
      light.distance = 20;
      light.angle = 0.4;
      light.penumbra = 0.5;
      light.castShadow = true;
      scene.add(light);

      let dirlight = new THREE.DirectionalLight(0xffffff, 2);
      dirlight.position.set(5, 0, 0);
      scene.add(dirlight);

      let dirlight2 = new THREE.DirectionalLight(0xffffff, 2);
      dirlight2.position.set(-5, 0, 0);
      scene.add(dirlight2);

      let dirlight3 = new THREE.DirectionalLight(0xffffff, 2);
      dirlight3.position.set(0, 0, 5);
      scene.add(dirlight3);

      let dirlight4 = new THREE.DirectionalLight(0xffffff, 2);
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

      //TEXTURE EM DESENVOLVIMENTO
      /*
      let textureLoader = new THREE.TextureLoader().load('');
      */

      //GET LOCALSTORAGE
      let selectedCarUrl: any = localStorage.getItem('carUrl');
      let carUrl = '../../assets/scenes/' + selectedCarUrl + '.glb';

      //Model
      let loader = new GLTFLoader();
      loader.load(carUrl, (gltf) => {
        let mesh = gltf.scene;
        mesh.castShadow = true;
        mesh.traverse((child) => {
          child.castShadow = true;
          let vinils: any = localStorage.getItem('colorGroup');
          let vinil: any = vinils.split(',');
          let body = child.getObjectByName('body');
          let roof = child.getObjectByName('teto');
          let retro = child.getObjectByName('retro');
          $('.retro').removeClass('active-btn');
          $('.teto').removeClass('active-btn');
          $('.todos').addClass('active-btn');

          body?.traverse((wrap) => {
            if (wrap instanceof THREE.Mesh) {
              wrap.material.color.setHex(0xffffff);
              let colors = $('.colors-item');
              $('.colors-item').on('click', function (e) {
                $(colors).css('border', '0px');
                $(this).css('border', '3px solid #49ade7');
                wrap.material.color.setHex('0x' + $(this).attr('value'));
              });
            }
          });

          roof?.traverse((wrap) => {
            if (wrap instanceof THREE.Mesh) {
              wrap.material.color.setHex(0xffffff);
              let colors = $('.colors-item');
              $('.colors-item').on('click', function (e) {
                $(colors).css('border', '0px');
                $(this).css('border', '3px solid #49ade7');
                wrap.material.color.setHex('0x' + $(this).attr('value'));
              });
            }
          });

          retro?.traverse((wrap) => {
            if (wrap instanceof THREE.Mesh) {
              wrap.material.color.setHex(0xffffff);
              let colors = $('.colors-item');
              $('.colors-item').on('click', function (e) {
                $(colors).css('border', '0px');
                $(this).css('border', '3px solid #49ade7');
                wrap.material.color.setHex('0x' + $(this).attr('value'));
              });
            }
          });

          //Botão Teto
          $('.teto').on('click', function (e) {
            setTimeout(() => {
              roof?.traverse((wrap) => {
                if (wrap instanceof THREE.Mesh) {
                  let colorsRoof = $('.colors-item-roof');
                  $('.colors-item-roof').on('click', function (e) {
                    $(colorsRoof).css('border', '0px');
                    $(this).css('border', '3px solid #49ade7');
                    wrap.material.color.setHex('0x' + $(this).attr('value'));
                  });
                }
              });
            }, 50);
          });

          //Botão Retrovisor
          $('.retro').on('click', function (e) {
            setTimeout(() => {
              retro?.traverse((wrap) => {
                if (wrap instanceof THREE.Mesh) {
                  let colorsRetro = $('.colors-item-retro');
                  $('.colors-item-retro').on('click', function (e) {
                    $(colorsRetro).css('border', '0px');
                    $(this).css('border', '3px solid #49ade7');
                    wrap.material.color.setHex('0x' + $(this).attr('value'));
                  });
                }
              });
            }, 50);
          });

          //Botão Carro Inteiro
          $('.todos').on('click', function (e) {
            setTimeout(() => {
              body?.traverse((wrap) => {
                if (wrap instanceof THREE.Mesh) {
                  let colors = $('.colors-item');
                  $('.colors-item').on('click', function (e) {
                    $(colors).css('border', '0px');
                    $(this).css('border', '3px solid #49ade7');
                    wrap.material.color.setHex('0x' + $(this).attr('value'));
                  });
                }
              });
              roof?.traverse((wrap) => {
                if (wrap instanceof THREE.Mesh) {
                  let colors = $('.colors-item');
                  $('.colors-item').on('click', function (e) {
                    $(colors).css('border', '0px');
                    $(this).css('border', '3px solid #49ade7');
                    wrap.material.color.setHex('0x' + $(this).attr('value'));
                  });
                }
              });

              retro?.traverse((wrap) => {
                if (wrap instanceof THREE.Mesh) {
                  let colors = $('.colors-item');
                  $('.colors-item').on('click', function (e) {
                    $(colors).css('border', '0px');
                    $(this).css('border', '3px solid #49ade7');
                    wrap.material.color.setHex('0x' + $(this).attr('value'));
                  });
                }
              });
            }, 125);
          });
        });

        scene.add(mesh);
        animate();
      });

      $('#car').append(renderer.domElement); //coloca o canvas dentro da div car.
      $('canvas').css('width', '100vw');
      $('canvas').css('height', '100vh');

      var stats1 = new Stats();
      stats1.showPanel(0);
      stats1.dom.style.cssText =
        'position:absolute;top:0px;left:80px;z-index:98;';
      document.body.appendChild(stats1.dom);

      var stats2 = new Stats();
      stats2.showPanel(1);
      stats2.dom.style.cssText =
        'position:absolute;top:0px;left:160px;z-index:98;';
      document.body.appendChild(stats2.dom);

      var stats3 = new Stats();
      stats3.showPanel(2);
      stats3.dom.style.cssText =
        'position:absolute;top:0px;left:240px;z-index:98;';
      document.body.appendChild(stats3.dom);

      let clock = new THREE.Clock();
      let delta = 0;
      let interval = 1 / 45;

      let myReq: any;

      function animate() {
        myReq = requestAnimationFrame(animate);
        delta += clock.getDelta();

        if (delta > interval) {
          renderer.render(scene, camera);

          delta = delta % interval;
        }
        stats1.update();
        stats2.update();
        stats3.update();
      }

      //Clear
      $('.showroom-btn').on('click', function () {
        scene = null!;
        stats1 = null!;
        stats2 = null!;
        stats3 = null!;
        $('canvas').remove();
        $('renderer').remove();
        cancelAnimationFrame(myReq);
      });
    }, 50);
  }
}
