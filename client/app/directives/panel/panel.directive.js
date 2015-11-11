'use strict';

angular.module('homeDashboardApp')
  	.directive('panel', function (User, Util, panelModel, realtimeModel, $interval, $timeout) {
    	return {
      		templateUrl: 'app/directives/panel/panel.html',
      		restrict: 'EA',
      		link: function (scope, element, attrs) {
      			var target = document.getElementById('panel'),
      				svg,
      				center = { 
        				x: target.offsetWidth / 2,
        				y: target.offsetHeight / 2,
        				r: target.offsetWidth * 0.3
      				};

    			svg = d3.select('#panel')
      				.append('svg')
      				.attr({
       					width: target.offsetWidth,
        				height: target.offsetHeight
      				});

				scope.init = function () {
					scope.render();
					//scope.osciliate();
					panelModel.getModel().then(function (responses) {
						scope.update(1, 162, 4, responses[0].step);
						scope.update(2, 162, responses[1].maxLimitUsage, responses[1].meteringPeriodUsage);
						//scope.update(3, 225, 800, responses[2].meteringPeriodUsage);
						scope.update(4, 225, 600, responses[3].power);

						
						scope.realtimeInterval = $interval(function () {
							realtimeModel.getModel().then(function (response) {
								scope.update(4, 225, 600, response.power);
							});
						}, 1000);

					});
				};

				scope.osciliate = function (range) {
					if (scope.osciliationInterval) {
						$interval.cancel(scope.osciliationInterval);
					}

					scope.osciliationInterval = $interval(function () {
						d3.select('#circle4')
							.transition()
							.attr('transform', 'translate(10,10)');
						$timeout(function () {
							d3.select('#circle4')
								.transition()
								.attr('transform', 'translate(-10,-10)');
						}, 50);
						
					}, 100);

				};

				scope.render = function () {
					var w = target.offsetWidth,
				        h = target.offsetHeight,
				        bigRadius = w * 0.15,
				        smallRadius = w * 0.09,
				        svgPaddingBottom = h * 0.1,
				        circleList = [{
				            cx: w * 0.1,
				            cy: h * 0.9 - smallRadius,
				            r: smallRadius
				        },{
				            cx: w * 0.9,
				            cy: h * 0.9 - smallRadius,
				            r: smallRadius
				        },{
				            cx: w * 0.34,
				            cy: h * 0.9 - bigRadius,
				            r: bigRadius
				        },{
				            cx: w * 0.66,
				            cy: h * 0.9 - bigRadius,
				            r: bigRadius
				        }],
				        RADIUS_CALIBRATION = 40,
				        lineData = [
				            [{
				              x: circleList[0].cx,
				              y: circleList[0].cy
				            },{
				              x: circleList[0].cx - circleList[0].r / Math.pow(2, 1/2) + RADIUS_CALIBRATION,
				              y: circleList[0].cy + circleList[0].r / Math.pow(2, 1/2) - RADIUS_CALIBRATION
				            }],
				            [{
				              x: circleList[1].cx,
				              y: circleList[1].cy
				            },{
				              x: circleList[1].cx - circleList[1].r / Math.pow(2, 1/2) + RADIUS_CALIBRATION,
				              y: circleList[1].cy + circleList[1].r / Math.pow(2, 1/2) - RADIUS_CALIBRATION
				            }],
				            [{
				              x: circleList[2].cx,
				              y: circleList[2].cy
				            }, {  
				              x: circleList[2].cx - circleList[2].r / Math.pow(2, 1/2) + RADIUS_CALIBRATION,
				              y: circleList[2].cy + circleList[2].r / Math.pow(2, 1/2) - RADIUS_CALIBRATION
				            }], 
				            [{  
				              x: circleList[3].cx,
				              y: circleList[3].cy
				            },{
				              x: circleList[3].cx - circleList[3].r / Math.pow(2, 1/2) + RADIUS_CALIBRATION,
				              y: circleList[3].cy + circleList[3].r / Math.pow(2, 1/2) - RADIUS_CALIBRATION
				            }]
			        	],
			        	lineFunction = d3.svg.line()
				        	.x(function (d) { return d.x; })
				          	.y(function (d) { return d.y; })
				          	.interpolate('linear');
				     
				    function renderPanels () {
				       	svg.append('g')
				        	.selectAll('circle')
				        	.data(circleList)
				        	.enter()
				        	.append('circle')
				        	.attr({
					            'stroke': '#000000',
					            'stroke-width': 1,
					            //fill: 'transparent',
					            cx: function (d) { return d.cx; },
					            cy: function (d) { return d.cy; },
					            r: function (d) { return d.r; },
					            fill: '#FFFFFF',
					            id: function (d, i) { return 'circle' + (i + 1); }
					            //opacity: 0.3
					        });
				    }

				    function renderDirections () {
				   		for (var i = 0, len = lineData.length; i < len; i += 1) { 
				        	svg.append('path')
				            	.attr('d', lineFunction(lineData[i]))
				            	.attr({
				              		//'stroke': '#5b2424',
				              		'stroke': '#000',
				              		'stroke-width': 2,
				              		id: 'circle-direction' + (i + 1) 
				            	});
				        }
				    }

				    function renderTicks (id, initDegree, minFigure, maxFigure, tickNumber) {
				    	var core = circleList[id - 1],
				    		initDegree = initDegree || 225,
				    		finalDegree = 180 + (360 - initDegree),
				    		degreeDiff = 360 - (finalDegree - initDegree),
				    		line = [],
				    		start,
				    		end;

				    	for (var i = 0; i < tickNumber; i += 1) {
				    		start = finalDegree - 360;
				    		end = initDegree;
				    		line.push([{
				    			x: core.cx + (core.r - 5) * Math.cos((((end - start) / (tickNumber - 1)) * i + start) *  Math.PI / 180),
				    			y: core.cy - (core.r - 5) * Math.sin((((end - start) / (tickNumber - 1)) * i + start) *  Math.PI / 180)
				    		},{	
				    			x: core.cx + (core.r - 20) * Math.cos((((end - start) / (tickNumber - 1)) * i + start) *  Math.PI / 180),
				    			y: core.cy - (core.r - 20) * Math.sin((((end - start) / (tickNumber - 1)) * i + start) *  Math.PI / 180)
				    		}]);
				    	}

				    	for (var i = 0, len = line.length; i < len; i += 1) {
				    		svg.append('path')
				    			.attr('d', lineFunction(line[i]))
				    			.attr({
				    				'stroke': '#000',
				    				'stroke-width': 3
				    			});
				    	}
				    }

				    scope.update = function (id, initDegree, maxFigure, figure) {
						var initDegree = initDegree || 225,
							finalDegree = 180 + (360 - initDegree),
							degreeDiff = 360 - (finalDegree - initDegree),
							maxFigure = maxFigure || 600,
							increasement,
							figure = figure > maxFigure ? maxFigure : figure,
							line = [];

						increasement = (degreeDiff * figure) / maxFigure;
						line.push(lineData[id - 1][0]);
						line.push({
							x: circleList[id - 1].cx + (circleList[id - 1].r - RADIUS_CALIBRATION) * Math.cos((initDegree - increasement) * Math.PI / 180),
							y: circleList[id - 1].cy - (circleList[id - 1].r - RADIUS_CALIBRATION) * Math.sin((initDegree - increasement) * Math.PI / 180)
						});	

						function getDegree (point, core, tanValue, limitDegree) {
							var x = point.x,
								y = point.y,
								degree;

							if (x > core.cx && y < core.cy) {
								degree = Math.abs(Math.atan(tanValue) * (180 / Math.PI));
								// 1 사분면
							} else if (x < core.cx && y < core.cy) {
								degree = 180 - Math.abs(Math.atan(tanValue) * (180 / Math.PI));
								// 2 사분면
							} else if (x < core.cx && y > core.cy) {
								degree = 180 + Math.abs(Math.atan(tanValue) * (180 / Math.PI));
								// 3 사분면
							} else if (x > core.cx && y > core.cy) {
								degree = - Math.atan(tanValue) * (180 / Math.PI);
								// 4 사분면
							}

							if (degree > limitDegree) {
								degree = degree - 360;
							}
							return degree;
						}

						function customInterpolater (k, tempLine, core) {
							var originPoints = [],
								k = k.split('M')[1],
								tanA,
								tanB,
								degreeA,
								degreeB,
								degreeDiff,
								standard;

							originPoints.push(k.split('L')[0].split(','));
							originPoints.push(k.split('L')[1].split(','));
							originPoints = [{
								x: Number(originPoints[0][0], 10),
								y: Number(originPoints[0][1], 10)
							},{
								x: Number(originPoints[1][0], 10),
								y: Number(originPoints[1][1], 10)
							}]

							tanA = (originPoints[1].y - core.cy) / (originPoints[1].x - core.cx);
							tanB = (tempLine[1].y - core.cy) / (tempLine[1].x - core.cx);

							degreeA = getDegree(originPoints[1], core, tanA, finalDegree);
							degreeB = getDegree(tempLine[1], core, tanB, finalDegree);
							degreeDiff = degreeB >= degreeA ? degreeB - degreeA : degreeA - degreeB;
							standard = degreeA

							return function (t) {
								var returnLine = [{
									x: originPoints[0].x,
									y: originPoints[0].y	
								},{
									x: degreeA > degreeB ? core.cx + (core.r - RADIUS_CALIBRATION) * Math.cos((standard - (degreeDiff * t)) * (Math.PI / 180)) : core.cx + (core.r - RADIUS_CALIBRATION) * Math.cos((standard + (degreeDiff * t)) * (Math.PI / 180)),
									y: degreeA > degreeB ? core.cy - (core.r - RADIUS_CALIBRATION) * Math.sin((standard - (degreeDiff * t)) * (Math.PI / 180)) : core.cy - (core.r - RADIUS_CALIBRATION) * Math.sin((standard + (degreeDiff * t)) * (Math.PI / 180))
								}];
								return lineFunction(returnLine);		
							}
						}

						d3.select('#circle-direction' + id)
							.transition()
							.duration(1000)
							.ease('linear')
							.attrTween('d', function (d, i, k) {
								var interpolater = customInterpolater(k, line, circleList[id - 1]);

								return function (t) {
									return interpolater(t);
								}
							});

					};

				    renderPanels();
				    renderDirections();
				    renderTicks(1, 162, undefined, undefined, 3);
				    renderTicks(2, 162, undefined, undefined, 3);
				    renderTicks(3, 225, undefined, undefined, 7);
				    renderTicks(4, 225, undefined, undefined, 7);
				};

				scope.init();
				
      		}
    	};
  	});