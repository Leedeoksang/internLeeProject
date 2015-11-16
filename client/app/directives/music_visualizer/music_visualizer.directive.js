'use strict';

angular.module('homeDashboardApp')
  	.directive('musicVisualizer', function ($window, $timeout) {
    	return {
      		templateUrl: 'app/directives/music_visualizer/music_visualizer.html',
      		restrict: 'EA',
      		scope: {
      			musicName: '@'
      		},
      		link: function (scope, element, attrs) {
      			var audio,
      				context,
      				analyser,
      				canvas,
      				ctx,
      				source,
      				fbc_array,
      				BARS = 70;

      			scope.initAudio = function (musicName) {
      				audio = new Audio();
      				audio.src = '../../assets/musics/' + musicName + '.mp3';
      				audio.controls = true;
      				audio.loop = true;
      				audio.autoplay = true;
      			};

      			scope.initMusicPlayer = function () {
      				document.getElementById('audio-box').appendChild(audio);
      				context = new AudioContext();
      				analyser = context.createAnalyser();
      				canvas = document.getElementById('analyser');
      				ctx = canvas.getContext('2d');
      				source = context.createMediaElementSource(audio);
      				source.connect(analyser);
      				analyser.connect(context.destination);
      				frameLooper();
      			};

      			function frameLooper () {
      				var bar_x,
      					bar_width,
      					bar_height;

      				$timeout(function () {
      					$window.requestAnimationFrame(frameLooper);
      				}, 30);

      				fbc_array = new Uint8Array(analyser.frequencyBinCount);
      				analyser.getByteFrequencyData(fbc_array);
      				ctx.clearRect(0, 0, canvas.width, canvas.height);
      				ctx.fillStyle = '#ffffff';
      				for (var i = 0; i < BARS; i += 1) {
      					bar_x = i * 5;
      					bar_width = 3;
      					bar_height = - (fbc_array[i] / 2);
      					ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      				}
      			}

      			scope.$watch('musicName', function (newSong) {
      				if (newSong) {
      					scope.initAudio(newSong);
      					scope.initMusicPlayer()
      				}
      			});
      		}
    	};
  	});