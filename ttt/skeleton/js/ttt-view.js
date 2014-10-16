(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
		this.game = game;
		this.$grid = $el;
		this.setupBoard();
		this.bindEvents();
  };

  View.prototype.bindEvents = function () {
		var that = this;
		this.$grid.on("click", "li", function(event) {
			var $clicked = $(this);
			that.makeMove($clicked);
		});
  };

  View.prototype.makeMove = function ($square) {
		currentPlayer = this.game.currentPlayer;
		var currentPos = $square.attr("data-id").split(",");
		console.log(typeof currentPos)
		//this.game.playMove(currentPos); // test
    try {
			// playMove.call(this.game, $square.id);
			this.game.playMove(currentPos);
			$square.addClass(currentPlayer);

    } catch (e) {
      if (e instanceof TTT.MoveError) {
        alert(e.msg);
			};
			// console.log(e)
		};

    if (this.game.isOver()) {
      if (this.game.winner()) {
        alert(this.game.winner() + " has won!");
      } else {
        alert("NO ONE WINS!");
      }
		}

  };

  View.prototype.setupBoard = function () {
		var GRID =
	    [[0, 0], [0, 1], [0, 2],
	     [1, 0], [1, 1], [1, 2],
	     [2, 0], [2, 1], [2, 2]];

		var $grid = this.$grid;
		GRID.forEach(function (position) {
			var $pos = $("<li class='pos'></li>");

			$pos.attr("data-id", position);
			$grid.append($pos);

		});

  };
})();
