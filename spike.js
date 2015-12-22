var Spike = function () {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  var cellWidth = canvas.width / 26;
  var cellHeight = canvas.height / 40;

  // These will be externalised in a model somewhere.
  var guess = [9, 3, 2, 3, 34, 5, 2, 12, 16, 2, 1, 4, 3, 19, 11, 3, 1, 13, 36, 26, 6, 7, 7, 6, 5, 3];
  var actual = [5, 4, 6, 5, 4, 6, 5, 4, 6, 5, 4, 6, 5, 4, 6, 5, 4, 6, 5, 4, 6, 5, 4, 6, 5, 4];

  var setLowerLeftOrigin = function () {
    context.translate(0, canvas.height);
    context.scale(1, -1);
  };

  var drawGrid = function () {
    for (var y = 0; y < 63; y += 1) {
      for (var x = 0; x < 26; x += 1) {
        context.beginPath();
        context.strokeStyle = "#eeeeee";
        context.lineWidth = 1;

        context.moveTo(x * cellWidth, y * cellHeight);
        context.lineTo((x + 1) * cellWidth, y * cellHeight);
        context.lineTo((x + 1) * cellWidth, (y + 1) * cellHeight);
        context.lineTo(x * cellWidth, (y + 1) * cellHeight);

        context.stroke();
        context.closePath();
      }
    }
  };

  var drawActual = function () {
    context.fillStyle = "#ff0000";

    for (var i = 0; i < actual.length; i += 1) {
      var a = actual[i];
      var g = guess[i];

      var x = i * cellWidth;
      var y = Math.min(a * cellHeight, g * cellHeight);
      var width = cellWidth;
      var height = Math.abs(a * cellHeight - g * cellHeight);

      context.fillRect(x, y, width, height);
      context.stroke();
    }
  };

  var drawGuess = function () {
    context.beginPath();
    context.strokeStyle = "#000000";

    for (var i = 0; i < guess.length; i += 1) {
      var value = guess[i];

      context.lineTo(i * cellWidth, value * cellHeight);
      context.lineTo((i + 1) * cellWidth, value * cellHeight);
      context.stroke();
    }

    context.closePath();
  };

  setLowerLeftOrigin();
  drawActual();
  drawGrid();
  drawGuess();
};
