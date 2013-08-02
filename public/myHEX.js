(function() {

d3.hexbin = function() {
	var width = 1;
    var height = 1;
    var size;

	function hexbin(points) {
		var binsById = {};

		points.forEach(function(point, i) {
			var id = point.q + "_" + point.r; 
			binsById[id] = [point];
			binsById[id].name = point.name;
			binsById[id].x = size * Math.sqrt(3) * (point.q + point.r/2);
			binsById[id].y = size * 3/2 * point.r;
			switch(point.type){
				case 1:
					binsById[id].fill = "#111";
					break;
				case 2:
					binsById[id].fill = "#222";
					break;
				case 3:
					binsById[id].fill = "#333";
					break;
				case 4:
					binsById[id].fill = "#444";
					break;
				case 5:
					binsById[id].fill = "#555";
					break;
				case 6:
					binsById[id].fill = "#666";
					break;
				case 7:
					binsById[id].fill = "#777";
					break;
				case 8:
					binsById[id].fill = "#888";
					break;
				case 9:
					binsById[id].fill = "#999";
					break;
				case -1:
					binsById[id].fill = "#010";
					break;
				case -2:
					binsById[id].fill = "#020";
					break;
				case -3:
					binsById[id].fill = "#030";
					break;
				case -4:
					binsById[id].fill = "#040";
					break;
				case -5:
					binsById[id].fill = "#050";
					break;
				case -6:
					binsById[id].fill = "#060";
					break;
				case -7:
					binsById[id].fill = "#070";
					break;
				case -8:
					binsById[id].fill = "#080";
					break;
				case -9:
					binsById[id].fill = "#090";
					break;
				default:
					binsById[id].fill = "#FFF";
			}
		});
		return d3.values(binsById);
	}

	function hexagon(radius) {
		var x0 = 0, y0 = 0;
		return d3_hexbinAngles.map(function(angle) {
		  var x1 = Math.sin(angle) * radius,
			  y1 = -Math.cos(angle) * radius,
			  dx = x1 - x0,
			  dy = y1 - y0;
		  x0 = x1, y0 = y1;
		  return [dx, dy];
		});
	}
	hexbin.fill=function(_){
		if (!arguments.length) return fill;
		fill = _;
		return hexbin;
	}
	hexbin.x = function(_) {
		if (!arguments.length) return x;
		x = _;
		return hexbin;
	};

	hexbin.y = function(_) {
		if (!arguments.length) return y;
		y = _;
		return hexbin;
	};

  hexbin.hexagon = function() {
    return "m" + hexagon(size).join("l") + "z";
  };

  hexbin.centers = function() {
    var centers = [];
    for (var y = 0, odd = false; y < height + r; y += dy, odd = !odd) {
      for (var x = odd ? dx / 2 : 0; x < width; x += dx) {
        centers.push([x, y]);
      }
    }
    return centers;
  };

  hexbin.mesh = function() {
    var fragment = hexagon(size).slice(0, 4).join("l");
    return hexbin.centers().map(function(p) { return "M" + p + "m" + fragment; }).join("");
  };

  hexbin.size = function(_) {
    if (!arguments.length) return [width, height];
    width = +_[0], height = +_[1];
    return hexbin;
  };

  hexbin.radius = function(_) {
    if (!arguments.length) return size;
    size = +_;
    return hexbin;
  };

  return hexbin.radius(1);
};

var d3_hexbinAngles = d3.range(0, 2 * Math.PI, Math.PI / 3);

})();