'use strict';

angular.module('homeDashboardApp')
	.controller('MainCtrl', function ($scope, $timeout) {
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


    $scope.init = function () {
      $scope.render();
    };

    $scope.render = function () {
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
          }];
      
      function renderPanels () {
        svg.append('g')
        .selectAll('circle')
          .data(circleList)
          .enter()
          .append('circle')
          .attr({
            'stroke': '#FFFFFF',
            'stroke-width': 2,
            fill: 'transparent',
            cx: function (d) { return d.cx; },
            cy: function (d) { return d.cy; },
            r: function (d) { return d.r; }
          });
      }

      function renderDirections () {
        var lineFunction = d3.svg.line()
          .x(function (d) { return d.x; })
          .y(function (d) { return d.y; })
          .interpolate('linear'),
          lineData = [
            [{
              x: circleList[0].cx,
              y: circleList[0].cy
            },{
              x: circleList[0].cx - 60,
              y: circleList[0].cy + 60
            }],
            [{
              x: circleList[1].cx,
              y: circleList[1].cy
            },{
              x: circleList[1].cx + 60,
              y: circleList[1].cy - 60
            }],
            [{
              x: circleList[2].cx,
              y: circleList[2].cy
            }, {  
              x: circleList[2].cx + 120,
              y: circleList[2].cy - 120
            }], 
            [{  
              x: circleList[3].cx,
              y: circleList[3].cy
            },{
              x: circleList[3].cx - 120,
              y: circleList[3].cy + 120
            }]
          ];
        
        for (var i = 0, len = lineData.length; i < len; i += 1) { 
          svg.append('path')
            .attr('d', lineFunction(lineData[i]))
            .attr({
              'stroke': '#FFFFFF',
              'stroke-width': 2,
              fill: '#FFFFFF'
            });
        }
      }

      renderPanels();
      renderDirections();

    };

    $scope.init();
    /*
    svg = d3.select('#canvas')
      .append('svg')
      .attr({
        width: target.offsetWidth,
        height: target.offsetHeight
      });

    $scope.init = function () {
      $scope.roomList = [0,1,2,3];
      $scope.render();
    };

    $scope.render = function () {
      function appendSideCircles (isDefault) {
        if (isDefault) {
          svg.append('circle')
            .attr({
              cx: center.x + center.r * Math.sin(Math.PI / 6),
              cy: center.y - center.r * Math.cos(Math.PI / 6),
              r: center.r * 0.4,
              'stroke-width': 2,
              'stroke': '#0F5070',
              fill: '#083A52'
            });
        } else {
          for (var i = 0, len = $scope.roomList.length; i < len; i += 1) {
            svg.append('circle')
              .attr({
                cx: center.x + center.r * Math.sin(Math.PI / 2 + i * ((3 * Math.PI) / (2 * $scope.roomList.length))),
                cy: center.y - center.r * Math.cos(Math.PI / 2 + i * ((3 * Math.PI) / (2 * $scope.roomList.length))),
                r: center.r * 0.3,
                fill: '#083A52'
              });
          }
        }
      }

      svg.append('circle')
        .attr({
          cx: center.x,
          cy: center.y,
          r: center.r,
          'stroke-width': 2,
          'stroke': '#FFFFFF',
          fill: 'transparent'
        });
      appendSideCircles(true);
      appendSideCircles(false);
    };

    $scope.init();
    */
		/*
    var target = document.getElementById('canvas'),
			svg;

		svg = d3.select('#canvas')
  				.append('svg')
  				.attr({
  					width: target.offsetWidth,
  					height: target.offsetHeight
  				})
  				.on('mouseup', function () {
  					$scope.trackMouseUp(d3.event);
  				})
  				.on('mousemove', function () {
  					$scope.trackMouseMove(d3.event);
  				})
  				.on('mousedown', function () {
  					$scope.trackMouseDown(d3.event);
  				});

  		$scope.selection = {
  			first: 0,
  			second: 0
  		};	
  		$scope.editHeaderList = [{
  			name: '방 모양 선택',
  			list: [{
  				name: '사각형',
  				id: 'rectangle'
  			},{
  				name: '삼각형',
  				id: 'triangle'
  			},{
  				name: '오각형',
  				id: 'pentagon'
  			}]
  		},{
  			name: '가전제품 선택',
  			list: [{
  				name: '세탁기'
  			},{
  				name: '냉장고'
  			},{
  				name: '김치냉장고'
  			}]
  		},{
  			name: '데코레이션',
  			list: [{
  				name: '책상'
  			},{
  				name: '침대'
  			},{
  				name: '변기'
  			}]
  		}];
  		$scope.isClickedTwice;

  		$scope.isEdit = false;
  		$scope.mouseDown = false;
  		$scope.rectNumber = 0;
  		$scope.changeTab = function (type, index) {
  			if (type === 'first') {
	  			$scope.selection.first = index;
	  			$scope.selection.second = 0;
  			} else if (type === 'second') {
  				$scope.selection.second = index;
  			}
  		};

  		$scope.renderShape = function (shape, data) {
  			switch(shape) {
  				case 'triangle':
  					break;
  				case 'rectangle':
  					$scope.rectNumber++;
  					svg.append('rect')
  						.attr({
  							x: data.startX,
  							y: data.startY,
  							width: data.width,
  							height: data.height,
  							'stroke-width': 2,
  							'stroke': '#000000',
  							'fill': '#FFFFFF',
  							id: 'room' + $scope.rectNumber
  						})
  						.on('mousedown', function (e) {
  							if (!$scope.isClickedTwice) {
	  							$scope.isClickedTwice = $timeout(function () {

	  							}, 200);
	  						} else {

	  						}
  							$scope.clickedElemId = this.id;
  							$scope.elemHelpOn = true;
  							$scope.$apply();
  							console.log('click');
  						})
  						.on('blur', function (e) {
  							$scope.clickedElemId = undefined;
  							$scope.elemHelpOn = false;
  							$scope.$apply();
  							console.log('blur');
  						});
  					break;
  				case 'pentagon':
  					break;
  			}
  		};
  		$scope.trackMouseDown = function (e) {
  			$scope.mouseDown = true;
  			console.log('test');
  			if ($scope.clickedElemId || $scope.delClicked || !$scope.isEdit) {
  				return;
  			}

  			var first = $scope.selection.first,
  				second = $scope.selection.second;

  			if (first === 0) {
  				var renderData = {};
  				if ($scope.editHeaderList[first].list[second].id === 'rectangle') {
	  				renderData.startX = e.offsetX;
	  				renderData.startY = e.offsetY;
	  				renderData.endX = renderData.startX + 10;
	  				renderData.endY = renderData.startY + 10;
	  				renderData.width = Math.abs(renderData.startX - renderData.endX);
	  				renderData.height = Math.abs(renderData.startY - renderData.endY);
	  				$scope.renderData = renderData;
	  				$scope.renderShape($scope.editHeaderList[first].list[second].id, renderData);
  				}
  			}// rendering
  			else if (first === 1) {

  			}// appliance dragging
  			else if (first === 2) {

  			}// else
  		};
  		$scope.trackMouseMove = function (e) {
  			if (!$scope.mouseDown || !$scope.isEdit) {
  				return;
  			}
  			if (!$scope.clickedElemId) {
	  			var first = $scope.selection.first,
	  				second = $scope.selection.second;

	  			if (first === 0) {
	  				if ($scope.editHeaderList[first].list[second].id === 'rectangle') {
			  			d3.select('#room' + $scope.rectNumber)
			  				.attr({
			  					width: Math.abs($scope.renderData.startX - e.offsetX),
			  					height: Math.abs($scope.renderData.startY - e.offsetY)
			  				});
		  			}
	  			} else if (first === 1) {

	  			} else if (first === 2) {

	  			}
  			} else {
  				var x,
  					y,
  					target = d3.select('#' + $scope.clickedElemId);
  		
  				x = parseInt(target[0][0].attributes['x'].value, 10);
  				y = parseInt(target[0][0].attributes['y'].value, 10);

  				d3.select('#' + $scope.clickedElemId)
  					.attr({
  						x: x + e.movementX,
  						y: y + e.movementY
  					});
  			}
  		};
  		$scope.trackMouseUp = function (e) {
  			$scope.mouseDown = false;
  		};

  		$scope.deleteElem = function () {
  			console.log('delete');
  			console.log(d3.select('#room' + $scope.clickedElemId));

  			d3.select('#room' + $scope.clickedElemId)
  				.remove();
  		};*/

	});	
