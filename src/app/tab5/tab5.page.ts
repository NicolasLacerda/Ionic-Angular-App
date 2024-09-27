import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as $ from 'jquery';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  private isCurrentView!: boolean;

  constructor(private platform: Platform) {}

  ionViewDidEnter() {
    this.isCurrentView = true;
  }

  ionViewWillLeave() {
    this.isCurrentView = false;
  }

  ngOnInit(): void {
    let showingMenu = false;
    let showingConfig = false;

    let wrapBrandLogo = localStorage.getItem('brandWrapSel');
    if (wrapBrandLogo == '3m' || wrapBrandLogo == 'imageP') {
      $('#vinil-brand').append(
        '<img src="../../assets/img/wrapBrandLogos/' +
          wrapBrandLogo +
          '.png" style="width:70%" >'
      );
    } else {
      $('#vinil-brand').append(
        '<img src="../../assets/img/wrapBrandLogos/' +
          wrapBrandLogo +
          '.png" style="width:55%" >'
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
        $('.infoColor').empty();
        $('.roofColor').empty();
        $('.retroColor').empty();
        $('.menu-page').hide();
        $('.link').empty();
        showingMenu = false;
      });
      $('.config').on('click', function (e) {
        $('.config-page').show();
        showingConfig = true;
        showingMenu = true;
      });
      $('#back-btn-config').on('click', function (e) {
        $('.config-page').hide();
        showingConfig = false;
      });

      let carImg = localStorage.getItem('carUrl');

      $('.carImg').append(
        '<img src="./assets/scenes/' + carImg + '.png" style="width:75%" >'
      );

      let carName: any = localStorage.getItem('carName');
      let carYear: any = localStorage.getItem('carYear');

      $('.carName').append(carName);

      let brand: any = localStorage.getItem('brandWrapSel');

      $('.brand').append(brand);

      let type: any = localStorage.getItem('wrapTypeSel');

      $('.type').append(type);

      $('.showroom-menu').on('click', () => {
        let infoColor: any = localStorage.getItem('color');
        let roofColor: any = localStorage.getItem('colorRoof');
        let retroColor: any = localStorage.getItem('colorRetro');

        if (infoColor == 'feeb1d') {
          $('.infoColor').append('Light yellow');
        } else if (infoColor == 'cb1701') {
          $('.infoColor').append('Light red');
        } else if (infoColor == '5e3682') {
          $('.infoColor').append('Deep violet');
        } else if (infoColor == '60ccbc') {
          $('.infoColor').append('Mint blue');
        } else if (infoColor == '83888d') {
          $('.infoColor').append('Middle grey');
        } else if (infoColor == 'ecdc1a') {
          $('.infoColor').append('Crocus yellow');
        } else if (infoColor == 'fac615') {
          $('.infoColor').append('Golden yellow');
        } else if (infoColor == 'c00a16') {
          $('.infoColor').append('Cardinal red');
        } else if (infoColor == '8260a9') {
          $('.infoColor').append('Purple');
        } else if (infoColor == '6a0b35') {
          $('.infoColor').append('Bordeaux');
        } else if (infoColor == '708ea2') {
          $('.infoColor').append('Dove blue');
        } else if (infoColor == '42a5d6') {
          $('.infoColor').append('Ice blue');
        } else if (infoColor == '192643') {
          $('.infoColor').append('Moonlight blue');
        } else if (infoColor == '009999') {
          $('.infoColor').append('Blue turquoise');
        } else if (infoColor == '00476c') {
          $('.infoColor').append('Blue green');
        } else if (infoColor == '75ca3b') {
          $('.infoColor').append('Lime green');
        } else if (infoColor == '03903f') {
          $('.infoColor').append('Light green');
        } else if (infoColor == '004a2f') {
          $('.infoColor').append('Dark green');
        } else if (infoColor == 'b08550') {
          $('.infoColor').append('Sahara beige');
        } else if (infoColor == 'b2521f') {
          $('.infoColor').append('Terracotta');
        } else if (infoColor == '442c22') {
          $('.infoColor').append('Cocoa brown');
        } else if (infoColor == '0e0c0a') {
          $('.infoColor').append('Black');
        } else if (infoColor == 'eef0f0') {
          $('.infoColor').append('White');
        } else if (infoColor == '82888c') {
          $('.infoColor').append('Telegrey');
        } else if (infoColor == 'd34e81') {
          $('.infoColor').append('Magenta');
        }

        if (roofColor == 'feeb1d') {
          $('.roofColor').append('Light yellow');
        } else if (roofColor == 'cb1701') {
          $('.roofColor').append('Light red');
        } else if (roofColor == '5e3682') {
          $('.roofColor').append('Deep violet');
        } else if (roofColor == '60ccbc') {
          $('.roofColor').append('Mint blue');
        } else if (roofColor == '83888d') {
          $('.roofColor').append('Middle grey');
        } else if (roofColor == 'ecdc1a') {
          $('.roofColor').append('Crocus yellow');
        } else if (roofColor == 'fac615') {
          $('.roofColor').append('Golden yellow');
        } else if (roofColor == 'c00a16') {
          $('.roofColor').append('Cardinal red');
        } else if (roofColor == '8260a9') {
          $('.roofColor').append('Purple');
        } else if (roofColor == '6a0b35') {
          $('.roofColor').append('Bordeaux');
        } else if (roofColor == '708ea2') {
          $('.roofColor').append('Dove blue');
        } else if (roofColor == '42a5d6') {
          $('.roofColor').append('Ice blue');
        } else if (roofColor == '192643') {
          $('.roofColor').append('Moonlight blue');
        } else if (roofColor == '009999') {
          $('.roofColor').append('Blue turquoise');
        } else if (roofColor == '00476c') {
          $('.roofColor').append('Blue green');
        } else if (roofColor == '75ca3b') {
          $('.roofColor').append('Lime green');
        } else if (roofColor == '03903f') {
          $('.roofColor').append('Light green');
        } else if (roofColor == '004a2f') {
          $('.roofColor').append('Dark green');
        } else if (roofColor == 'b08550') {
          $('.roofColor').append('Sahara beige');
        } else if (roofColor == 'b2521f') {
          $('.roofColor').append('Terracotta');
        } else if (roofColor == '442c22') {
          $('.roofColor').append('Cocoa brown');
        } else if (roofColor == '0e0c0a') {
          $('.roofColor').append('Black');
        } else if (roofColor == 'eef0f0') {
          $('.roofColor').append('White');
        } else if (roofColor == '82888c') {
          $('.roofColor').append('Telegrey');
        } else if (roofColor == 'd34e81') {
          $('.roofColor').append('Magenta');
        }

        if (retroColor == 'feeb1d') {
          $('.retroColor').append('Light yellow');
        } else if (retroColor == 'cb1701') {
          $('.retroColor').append('Light red');
        } else if (retroColor == '5e3682') {
          $('.retroColor').append('Deep violet');
        } else if (retroColor == '60ccbc') {
          $('.retroColor').append('Mint blue');
        } else if (retroColor == '83888d') {
          $('.retroColor').append('Middle grey');
        } else if (retroColor == 'ecdc1a') {
          $('.retroColor').append('Crocus yellow');
        } else if (retroColor == 'fac615') {
          $('.retroColor').append('Golden yellow');
        } else if (retroColor == 'c00a16') {
          $('.retroColor').append('Cardinal red');
        } else if (retroColor == '8260a9') {
          $('.retroColor').append('Purple');
        } else if (retroColor == '6a0b35') {
          $('.retroColor').append('Bordeaux');
        } else if (retroColor == '708ea2') {
          $('.retroColor').append('Dove blue');
        } else if (retroColor == '42a5d6') {
          $('.retroColor').append('Ice blue');
        } else if (retroColor == '192643') {
          $('.retroColor').append('Moonlight blue');
        } else if (retroColor == '009999') {
          $('.retroColor').append('Blue turquoise');
        } else if (retroColor == '00476c') {
          $('.retroColor').append('Blue green');
        } else if (retroColor == '75ca3b') {
          $('.retroColor').append('Lime green');
        } else if (retroColor == '03903f') {
          $('.retroColor').append('Light green');
        } else if (retroColor == '004a2f') {
          $('.retroColor').append('Dark green');
        } else if (retroColor == 'b08550') {
          $('.retroColor').append('Sahara beige');
        } else if (retroColor == 'b2521f') {
          $('.retroColor').append('Terracotta');
        } else if (retroColor == '442c22') {
          $('.retroColor').append('Cocoa brown');
        } else if (retroColor == '0e0c0a') {
          $('.retroColor').append('Black');
        } else if (retroColor == 'eef0f0') {
          $('.retroColor').append('White');
        } else if (retroColor == '82888c') {
          $('.retroColor').append('Telegrey');
        } else if (retroColor == 'd34e81') {
          $('.retroColor').append('Magenta');
        }

        setTimeout(() => {
          let carWrap = $('.infoColor').text();
          let retroWrap = $('.retroColor').text();
          let roofWrap = $('.roofColor').text();
          let brandC = brand.substr(0, 1).toUpperCase() + brand.substr(1);

          $('.link').append(
            '<a href="https://wa.me/34698272509?text=Me+gustaría+una+cotización+para+mi ' +
              carName +
              ' ' +
              carYear +
              '%0DVinilo elegido: ' +
              brandC +
              '%0DTipo de vinilo: ' +
              type +
              '%0DCoche entero: ' +
              carWrap +
              '%0DTecho: ' +
              roofWrap +
              '%0DVista trasera: ' +
              retroWrap +
              '" class="presuposto" style="display: block; border-radius: 500px; background-color: #49ade7; font-size: 1rem;padding: 1rem; width: 70%; color: white; font-weight: 700; text-decoration: none;">Pedir presuposto</a>'
          );
        }, 50);
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
          res = 'ligado';
          $('.aliasbtn1').hide();
        } else {
          res = 'desligado';
          $('.aliasbtn2').hide();
        }
      }

      aliasing();

      $('#callAlias').append('O anti-serrilhado está ' + res);

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
                localStorage.setItem('color', $(this).attr('value')!);
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
                localStorage.setItem('colorRoof', $(this).attr('value')!);
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
                localStorage.setItem('colorRetro', $(this).attr('value')!);
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
                    localStorage.setItem('colorRoof', $(this).attr('value')!);
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
                    localStorage.setItem('colorRetro', $(this).attr('value')!);
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
                    localStorage.setItem('color', $(this).attr('value')!);
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
                    localStorage.setItem('colorRoof', $(this).attr('value')!);
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
                    localStorage.setItem('colorRetro', $(this).attr('value')!);
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
      }

      //Clear
      $('.showroom-btn').on('click', function () {
        scene = null!;
        $('canvas').remove();
        $('renderer').remove();
        cancelAnimationFrame(myReq);
      });

      $('.showroom-menu').on('click', function () {
        showingConfig = false;
        showingMenu = true;
      });

      $('.config').on('click', function () {
        showingMenu = false;
        showingConfig = true;
      });

      this.platform.backButton.subscribeWithPriority(9998, (e) => {
        if (this.isCurrentView) {
          if (showingMenu == false && showingConfig == false) {
            scene = null!;
            $('canvas').remove();
            $('renderer').remove();
            cancelAnimationFrame(myReq);
            history.go(-1);
          } else if (showingMenu == true) {
            $('.menu-page').hide();
            $('.infoColor').empty();
            $('.roofColor').empty();
            $('.retroColor').empty();
            $('.link').empty();
            showingMenu = false;
          } else if (showingConfig == true) {
            $('.config-page').hide();
            showingMenu = true;
            showingConfig = false;
          }
        }
      });
    }, 50);
  }
}
