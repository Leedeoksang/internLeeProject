'use strict';

angular.module('homeDashboardApp')
	.service('graphic', function () {
    	// AngularJS will instantiate a singleton by calling "new" on this function
  		this.initWebGL = function (canvas) {
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
		};

  		this.initShaders = function (gl) {
			var fragmentShader = getShader(gl, 'shader-fs'),
				vertexShader = getShader(gl, 'shader-vs'),
				shaderProgram;

			shaderProgram = gl.createProgram();
			gl.attachShader(shaderProgram, vertexShader);
			gl.attachShader(shaderProgram, fragmentShader);
			gl.linkProgram(shaderProgram);

			if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
				alert('shader program을 시작할 수 없습니다.');	
			}

			gl.useProgram(shaderProgram);

			vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
			gl.enableVertexAttribArray(vertexPositionAttribute);
		};

		this.getShader = function (gl, id) {
			var shaderScript,
				theSource,
				currentChild,
				shader;

			shaderScript = document.getElementById(id);

			if (!shaderScript) {
				return null;
			}

			theSource = '';
			currentChild = shaderScript.firstChild;

			while (currentChild) {
				if (currentChild.nodeType == currentChild.TEXT_NODE) {
					theSource += currentChild.textContent;
				}
				currentChild = currentChild.nextSibling;
			}

			if (shaderScript.type == 'x-shader/x-fragment') {
				shader = gl.createShader(gl.FRAGMENT_SHADER);
			} else if (shaderScript.type == 'x-shader/x-vertex') {
				shader = gl.createShader(gl.VERTEX_SHADER);
			} else {
				return null;
			}

			gl.shaderSource(shader, theSource);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				alert('shader를 컴파일하는데 실패하였습니다: ' + gl.getShaderInfoLog(shader));
				return null;
			}

			return shader;
		};
		
  	});
