'use strict';

angular.module('homeDashboardApp')
  	.directive('jarvis', function ($interval, $rootScope) {
    	return {
      		templateUrl: 'app/directives/jarvis/jarvis.html',
      		restrict: 'EA',
      		scope: {
      			isCounting: '='
      		},
      		link: function (scope, element, attrs) {
      			scope.init = function () {
      				var countInterval;

      				scope.startText = 3;
      				countInterval = $interval(function () {
      					if (scope.startText === 1) {
      						$rootScope.$emit('isCounting');
      						scope.startText -= 1;
      					} else if (scope.startText === 0) {
      						$interval.cancel(countInterval);
      					} else {
	      					scope.startText -= 1;
	      				}
      				}, 1000);
      			};
      			scope.init();
      			/*
      			var target = document.getElementById('jarvis-canvas'),
      				svg = d3.select('#jarvis-canvas')
      					.append('svg')
      					.attr({
      						width: target.offsetWidth,
      						height: target.offsetHeight
      					});

      			scope.init = function () {
      				var welcomeText = 'Home dashboard에 오신것을 환영합니다.'
      				svg.append('text')
      					.text(welcomeText)
      					.attr({
      						x: 0,
      						y: 30
      					});
      				//scope.render();
      				//scope.moveRoad();
      			};

      			scope.render = function () {
      				var w = target.offsetWidth,
      					h = target.offsetHeight,
      					leftLineList,
      					centerLineList,
      					rightLineList,
      					lineFunction = d3.svg.line()
				        	.x(function (d) { return d.x; })
				          	.y(function (d) { return d.y; })
				          	.interpolate('linear');

      				function getLeftLine () {
      					var startPoint = {
      							x: w / 5,
      							y: 0
      						},
      						endPoint = {
      							x: 0,
      							y: h
      						},
      						line = [];

      					line.push(startPoint);
      					line.push(endPoint);

      					svg.append('path')
      						.attr('d', lineFunction(line))
      						.attr({
      							'stroke-width': 1,
      							'stroke': '#000'
      						});
      				}

      				function getCenterLine () {
      					var pointDatas = [],
      						startPoint = {
      							x: 2 * w / 3,
      							y: 0
      						},
      						endPoint = {
      							x: 3 * w / 4,
      							y: h
      						},
      						tempPoint,
      						interpolater;

      					interpolater = d3.interpolateArray([startPoint.x, startPoint.y], [endPoint.x, endPoint.y]);

      					for (var i = 0, len = 3; i < len; i += 1) {
      						pointDatas = [];
      						pointDatas.push({
      							x: interpolater(i / len)[0],
      							y: interpolater(i / len)[1]
      						});
      						pointDatas.push({
      							x: interpolater((Math.pow(i, 2) + 0.5) / len)[0],
      							y: interpolater((Math.pow(i, 2) + 0.5) / len)[1]
      						});
      						svg.append('path')
      							.attr('d', lineFunction(pointDatas))
      							.attr({
      								'stroke-width': (2 * i + 1) / len,
      								'stroke': '#000',
      								'class': 'center-line'
      							});
      					}

      				}

      				function getRightLine () {

      				}

      				scope.moveRoad = function () {
	      				var x,
	      					y;

	      				function getLineY (x) {
	      					return (h / ((3 * w / 4) - (2 * w /3))) * x - 8 * h;
	      				}

	      				console.log(d3.selectAll('.center-line'))
	      				d3.selectAll('.center-line')
	      					.transition()
	      					.duration(2000)
	      					.attr('transform', 'translate(' + 100 + ',' + (- getLineY(100)) + ')');

	      			};

      				getLeftLine();
      				getCenterLine();
      				getRightLine();
      			};

      			scope.init();*/
      		}
    	};
  	});