'use strict';

angular.module('homeDashboardApp')
	.service('graphic', function () {
    	// AngularJS will instantiate a singleton by calling "new" on this function
  		this.prototype = {
  			initWebGL: function (canvas) {
  				var gl = null;

  				try {
  					gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  				}
  				catch(e) {

  				}

  				if (!gl) {
  					alert('WebGL을 호환하지 않는 브라우저입니다.');
  					gl = null;
  				}

  				return gl;
  			},
  			initShaders: function (gl) {
  				var fragmentShader = getShader(gl, 'shader-fs'),
  					vertexShader = getShader(gl, 'shader-vs'),
  					shaderProgram;

  				shaderProgram = gl.createProgram();
  				gl.attachShader(shaderProgram, vertexShader);
  				gl.attachShader(shaderProgram, fragmentShader);
  				gl.linkProgram(shaderProgram);

  				
  			}
  		};
  	});
