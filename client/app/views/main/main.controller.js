'use strict';

angular.module('homeDashboardApp')
  .controller('MainCtrl', function ($scope, $window) {
    var gl;

    $scope.height = $window.innerHeight + 'px';

    $scope.init = function () {
      var canvas = document.getElementById('glcanvas');

      gl = initWebGL(canvas);

      if (gl) {
        // Set clear color to black, fully opaque
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Enable depth testing
        gl.enable(gl.DEPTH_TEST);
        // Near things obscure far things
        gl.depthFunc(gl.LEQUAL);
        // Clear the color as well as the depth buffer.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
    };

    function initWebGL (canvas) {
      gl = null;
  
      try {
        // Try to grab the standard context. If it fails, fallback to experimental.
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      }
      catch(e) {}
      
      // If we don't have a GL context, give up now
      if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
      }
      
      return gl;
    }

    function initShaders () {
      var fragmentShader = getShader(gl, "shader-fs"),
        vertexShader = getShader(gl, "shader-vs");
      
      // Create the shader program
      
      shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      
      // If creating the shader program failed, alert
      
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
      }
      
      gl.useProgram(shaderProgram);
      
      vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
      gl.enableVertexAttribArray(vertexPositionAttribute);
    }

    $scope.init();
	});	
