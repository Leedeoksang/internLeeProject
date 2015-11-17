'use strict';

angular.module('homeDashboardApp')
  .controller('MainCtrl', function ($scope, $window, $rootScope) {
    var target = document.getElementById('3d-canvas'),
      scene,
      camera,
      renderer,
      light,
      light2,
      sphere,
      plane,
      planeGeometry,
      planeMaterial,
      plane2,
      plane2Geometry,
      plane2Material,
      plane3,
      plane3Geometry,
      plane3Material,
      plane4,
      plane4Geometry,
      plane4Material,
      planeLine,
      planeLineGeometry,
      planeLineMaterial,
      loader,
      ambient,
      groundTexture,
      skyTexture,
      car,
      controlsCar = {
        moveLeft: false,
        moveRight: false
      },
      clock = new THREE.Clock(),
      veyron;

    $scope.height = $window.innerHeight + 'px';
    $scope.isLoading = true;
    $scope.initCameraAnimation = true;
    $scope.isCounting = true;
    $rootScope.$on('isCounting', function () {
      $scope.isCounting = false;
    });
    $rootScope.$on('realtimeData', function (event, data) {
      $scope.realtimeData = data.power;
    });
    function init () {
      scene = new THREE.Scene();
      //scene.fog = new THREE.Fog(0x000000, 1, 20000);

      camera = new THREE.PerspectiveCamera(45, $window.innerWidth / $window.innerHeight, 1, 30000);
      camera.position.z = 500;
      camera.position.y = 50;

      //camera.position.x = 1000;
      //camera.rotation.y = Math.PI / 3;
      //camera.rotation.y = -Math.PI / 4;


      ambient = new THREE.AmbientLight( 0x101030 );
      scene.add( ambient );

      light = new THREE.PointLight( 0xffffff, 1.2, 20000 );
      light.position.set( 0, 5000, 5000 );
      scene.add( light );

      light2 = new THREE.PointLight(0xffffff, 1.2, 30000);
      light2.position.set(0, 1000, -9000);
      scene.add(light2);

      groundTexture = THREE.ImageUtils.loadTexture('../../assets/images/ground.jpg');
      groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWriting;
      groundTexture.repeat.set(50, 50);

      skyTexture = THREE.ImageUtils.loadTexture('../../assets/images/sky.jpg');
      //skyTexture.wrapS = skyTexture.wrapT = THREE.RepeatWriting;
      //skyTexture.repeat.set(10,10);

      
      car = new THREE.Car();
      car.callback = function (object) {
        object.root.position.set(0, 0, 0);
        //object.root.rotation.set(0, Math.PI / 2, 0);
        scene.add(object.root);
        veyron = object.root;
      };
      car.loadPartsBinary( "../../bower_components/threejs/examples/obj/veyron/parts/veyron_body_bin.js", "../../bower_components/threejs/examples/obj/veyron/parts/veyron_wheel_bin.js" );

      makePlanes();

      plane4Geometry = new THREE.PlaneGeometry(30000, 10000);
      plane4Material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide, map: skyTexture});
      plane4 = new THREE.Mesh(plane4Geometry, plane4Material);
      plane4.position.y = 5000;
      plane4.position.z = -10000;

      planeLineGeometry = new THREE.PlaneGeometry(10, 30000);
      planeLineMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});
      planeLine = new THREE.Mesh(planeLineGeometry, planeLineMaterial);
      planeLine.rotation.x = Math.PI / 2;
      planeLine.position.y += 0.1;

      scene.add(plane4);

      scene.add(planeLine);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( $window.devicePixelRatio );
      renderer.setSize($window.innerWidth, $window.innerHeight);
      target.appendChild(renderer.domElement);
    }

    function render () {
      var delta = clock.getDelta();
      car.updateCarModel(delta, controlsCar);
      car.root.position.y = 0;
      car.root.position.z = 0;
      renderer.render( scene, camera );
    }

    function animate () {
      requestAnimationFrame( animate );

      if ($scope.initCameraAnimation) {
        moveInitialCamera();
      }
      if (!$scope.isCounting) {
        controlsCar.moveForward = true;
        moveBackground();
      }
      render();
    }
    init();
    animate();

    function makePlanes () {
      planeGeometry = new THREE.PlaneGeometry(1500, 30000);
      planeMaterial = new THREE.MeshPhongMaterial({color: 0x878787, side: THREE.DoubleSide});
      plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = Math.PI / 2;

      plane2Geometry = new THREE.PlaneGeometry(20000, 30000);
      plane2Material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide, map: groundTexture});
      plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
      plane2.position.x = 10750
      plane2.rotation.x = Math.PI / 2;

      plane3Geometry = new THREE.PlaneGeometry(20000, 30000);
      plane3Material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide, map: groundTexture});
      plane3 = new THREE.Mesh(plane3Geometry, plane3Material);
      plane3.position.x = -10750;
      plane3.rotation.x = Math.PI / 2;

      scene.add(plane);
      scene.add(plane2);
      scene.add(plane3);
    }

    function moveInitialCamera () {
      if (camera.position.y < 200) {
        camera.position.y += 0.5;
        camera.rotation.x -= 0.001;
      } else {
        if (camera.rotation.y <= Math.PI / 2) {
          camera.position.z -= 1.5;
          camera.position.x += 3; 
          camera.rotation.y += 0.005;
          camera.rotation.x += 0.001;
          //camera.rotation.z += 0.01;
        } else {
          if (camera.rotation.y <= Math.PI) {
            camera.position.z -= Math.pow(1.5 * camera.position.x / camera.position.x, 2);
            camera.position.x -= 3;
            camera.rotation.y += 0.005;
          } else {
            // end
            $scope.initCameraAnimation = false;
            $scope.$apply();
          }
        }
      }
    }

    function moveBackground () {
      if (plane.position.z < -4000) {
        plane.position.y = 0;
        plane.position.z = 0;
        plane2.position.y = 0;
        plane2.position.z = 0;
        plane3.position.y = 0;
        plane3.position.z = 0;
      } else {
        if ($scope.realtimeData) {
          plane.position.z -= (100 * $scope.realtimeData / 600);
          plane2.position.z -= (100 * $scope.realtimeData / 600);
          plane3.position.z -= (100 * $scope.realtimeData / 600);
        }
      }
    }

    document.addEventListener('keydown', keyDownEvent);
    document.addEventListener('keyup', keyUpEvent);

    function keyDownEvent (event) {
      switch (event.keyIdentifier) {
        /*
        case 'Up':
          controlsCar.moveForward = true;
          break;
        case 'Down':
          controlsCar.moveBackward = true;
          break;
          */
        case 'Left': 
          controlsCar.moveLeft = true;
          break;
        case 'Right':
          controlsCar.moveRight = true;
          break;
      }
    }
    function keyUpEvent (event) {
      switch (event.keyIdentifier) {
        /*
        case 'Up':
          controlsCar.moveForward = false;
          break;
        case 'Down':
          controlsCar.moveBackward = false;
          break;
          */
        case 'Left':
          controlsCar.moveLeft = false;
          break;
        case 'Right':
          controlsCar.moveRight = false;
          break;
      }
    }


	});	
