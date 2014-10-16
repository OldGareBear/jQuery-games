(function () {
  var Hanoi = window.Hanoi = (window.Hanoi || {});

  var View = Hanoi.View = function View (game, $el) {
		this.game = game;
		this.hanoi = $el;
		this.gameTowers = game.towers;
		this.left = $("#left");
		this.center = $("#center");
		this.right = $("#right");
		this.viewTowers = [this.left, this.center, this.right]

		this.clicked = null;

		this.bindHandlers();
		this.render();
  };

	View.prototype.bindHandlers = function() {
		var view = this
		this.hanoi.on("click", "ul", this.clickTower);
	};

  View.prototype.clickTower = function (event) {
		var $tower = $(this);
		var id = $tower.attr("id");

		if (view.clicked === null) {
			view.clicked = id;
			$tower.toggleClass("tower");
			$tower.toggleClass("clicked");
		}	else if (id === view.clicked) {
			view.clicked = null;
			$tower.toggleClass("tower");
			$tower.toggleClass("clicked");
		} else {
			var startIdx = ["left", "center", "right"].indexOf(view.clicked);
			var endIdx = ["left", "center", "right"].indexOf(id);

			view.game.move(startIdx, endIdx);

			view.viewTowers.forEach(function(el){
				console.log(el);
				el.empty();
			});

			$("#" + view.clicked).toggleClass("tower");
			$("#" + view.clicked).toggleClass("clicked");

			view.clicked = null;
			view.render();
			view.isWon();
		}

  };

	View.prototype.isWon = function () {
		if (this.game.isWon()) {
			alert("Congratulations!")
			location.reload();
		}
	};

  View.prototype.render = function () {
		for (var idx = 0; idx < 3; idx++) {
			this.renderTower(idx);
		}
  };

  View.prototype.renderTower = function (idx) {
		var $thisTower = this.viewTowers[idx];
		var thisGameTower = this.gameTowers[idx];

		for (var i = 0; i < 3; i++) {
			switch(thisGameTower[2-i]) {
			case 1:
				var disc = $("<li class='one'></li>");
				$thisTower.append(disc)
				break;
			case 2:
				var disc = $("<li class='two'></li>");
				$thisTower.append(disc)
				break;
			case 3:
				var disc = $("<li class='three'></li>");
				$thisTower.append(disc)
				break;
			default:
				var disc = $("<li class='fake'></li>");
				$thisTower.append(disc)
				break;
			}
		};
  };
})();
