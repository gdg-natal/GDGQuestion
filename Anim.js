(function(){
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Anim = (function () {
		function Anim(container, colors) {
			_classCallCheck(this, Anim);
			this.container = container;
			this.colors = colors;
			this.i = 0;
			if(!colors){
				console.error("This app needs colors, enter a array with two colors to continue");
			}
		}

		_createClass(Anim, [{
			key: "init",
			value: function init() {
				this.text = document.createElement("span");
				this.text.className = "text";
				this.activeElement = document.createElement("div");
				this.activeElement.className = "active";
				this.activeElement.setAttribute("data-color", this.colors[0]);
				this.transitionElement = document.createElement("div");
				this.transitionElement.className = "next";
				this.transitionElement.setAttribute("data-color", this.colors[0]);

				this.container.appendChild(this.activeElement);
				this.container.appendChild(this.text);
				this.container.appendChild(this.transitionElement);

				this.scale = this.container.clientWidth > this.container.clientHeight ? this.container.clientWidth * 2 : this.container.clientHeight * 2;
				this.paint();
			}
		}, {
			key: "changeColor",
			value: function changeColor() {
				var tmp = this.colors[0];
				this.colors[0] = this.colors[1];
				this.colors[1] = tmp;
			}
		}, {
			key: "paint",
			value: function paint() {
				this.activeElement.style.backgroundColor = this.colors[0];
				this.transitionElement.style.backgroundColor = this.colors[1];
			}
		}, {
			key: "next",
			value: (function () {
				'use strict';

				var timeWindow = 1000; // tempo em ms
				var lastExecution = new Date((new Date()).getTime() - timeWindow);

				function next(text) {
					this.transitionElement.setAttribute("style", "width:" + this.scale + "px; height:" + this.scale + "px; background-color:" + this.colors[1] + "; left:" + (-this.scale / 4) + "px; top:" + (-this.scale / 4 )+ "px;");
					this.transitionElement.className = "next active";
					var self = this;
					self.text.setAttribute("style", "opacity: 0");
					setTimeout(function () {
						self.text.innerHTML = text;
						self.transitionElement.setAttribute("style", "transition: none;");
						self.transitionElement.className = "next";
						self.changeColor();
						self.paint();
						self.text.setAttribute("style", "opacity: 1");
					}, 1000);
				}

				return function() {
					if ((lastExecution.getTime() + timeWindow) <= (new Date()).getTime()) {
						lastExecution = new Date();
						return next.apply(this, arguments);
					}
				};
			}())
		}]);

		return Anim;
	})();
	window["Anim"] = Anim;
}())
