window.onload = function()
 {
	
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

	var points =  []
	for(i=0;i<50;i++)
		for(j=0;j<50;j++)
			points.push({q:i-Math.floor(j/2),r:j});
			
	var length = points.length,
    element = null;
	for (var i = 0; i < length; i++) {
	  points[i].c=Math.floor((Math.random()*5)+1);
	}
	var radius = 20;

	var hexbin = d3.hexbin()
		.size([width, height])
		.radius(radius);





	var svg = d3.select("body").append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
		.selectAll(".hexagon")
		.data(hexbin(points))
	  .enter().append("path")
		.attr("class", "hexagon")
		.attr("d", function(d) { return hexbin.hexagon(); })
		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		d3.selectAll('path')
		.attr('fill', function(d){return d.fill;});

 }