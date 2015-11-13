'use strict';

angular.module('homeDashboardApp')
  .controller('MainCtrl', function ($scope, $window) {
    var scene,
      camera,
      renderer,
      light,
      sphere,
      plane,
      planeGeometry,
      planeMaterial,
      planeLine,
      planeLineGeometry,
      planeLineMaterial,
      loader,
      ambient;

    $scope.height = $window.innerHeight + 'px';

    function init () {
      var target = document.getElementById('3d-canvas');

      scene = new THREE.Scene();
      //.fog = new THREE.Fog(0x000000, 1, 500);

      camera = new THREE.PerspectiveCamera(45, $window.innerWidth / $window.innerHeight, 1, 3500);
      camera.position.z = 100;

      ambient = new THREE.AmbientLight( 0x101030 );
      scene.add( ambient );

      //light = new THREE.PointLight( 0xffffff, 1.5, 1000 );
      //light.position.set( 0, 100, 2 );
      //scene.add( light );

      loader = new THREE.JSONLoader();
      loader.load('../../assets/3dmodels/car.js', function (geometry) {
        /*var material = new THREE.Material(),
          mesh = new THREE.Mesh(geometry, material);

        console.log(geometry);
        scene.add(mesh);*/
      });

      planeGeometry = new THREE.PlaneGeometry(120, 500);
      planeMaterial = new THREE.MeshPhongMaterial({color: 0x878787, side: THREE.DoubleSide});
      plane = new THREE.Mesh(planeGeometry, planeMaterial);
      console.log(planeGeometry);
      /*
      planeLineGeometry = new THREE.PlaneGeometry(1, 500);
      planeLineMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});
      planeLine = new THREE.Mesh(planeLineGeometry, planeLineMaterial);

      scene.add(plane);
      scene.add(planeLine);
      
      camera.position.z = 100;

      plane.rotation.x = -20.3;
      
      planeLine.rotation.x = -20.3;
      planeLine.position.y += 0.1;
*/
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( $window.devicePixelRatio );
      renderer.setSize($window.innerWidth, $window.innerHeight);
      target.appendChild(renderer.domElement);

      renderer.render( scene, camera );
    }
    init();
    /*
    $scope.init = function () {
      var target = document.getElementById('3d-canvas');

      //scene
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog( 0xffffff, 10, 300);

      //light

      light = new THREE.PointLight( 0xff0000, 10, 200 );
      light.position.set(50,50,50);
      scene.add( light );

      //camer
      camera = new THREE.PerspectiveCamera( 75, $window.innerWidth / $window.innerHeight, 1, 3500 );

      boxGeometry = new THREE.BoxGeometry( 100, 100, 100 );
      boxMaterial = new THREE.MeshBasicMaterial({color: 0x555555});

      cube = new THREE.Mesh( boxGeometry, boxMaterial );
      
      scene.add( cube );
      
      camera.position.z = 200;

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( $window.devicePixelRatio );
      renderer.setSize($window.innerWidth, $window.innerHeight);
      target.appendChild(renderer.domElement);

      document.addEventListener( 'resize', onWindowResize, false);
    }

    function onWindowResize () {
      camera.aspect = $window.innerWidth / $window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( $window.innerWidth, $window.innerHeight );
    }

    function animate () {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.01;

      renderer.render( scene, camera );
    }

    $scope.init();
    animate();
    */
	});	
