HTMLWidgets.widget({

  name: 'getwidit',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var d0 = "M0,0c100,0 0,100 100,100c100,0 0,-100 100,-100",
    d1 = "M0,0c100,0 0,100 100,100c100,0 0,-100 100,-100c100,0 0,100 100,100";
    svg.append("path")
        .attr("transform", "translate(180,150)scale(2,2)")
        .attr("d", d0)
        .call(transition, d0, d1);

function transition(path, d0, d1) {
  path.transition()
      .duration(2000)
      .attrTween("d", pathTween(d1, 4))
      .each("end", function() { d3.select(this).call(transition, d1, d0); });
}

function pathTween(d1, precision) {
  return function() {
    var path0 = this,
        path1 = path0.cloneNode(),
        n0 = path0.getTotalLength(),
        n1 = (path1.setAttribute("d", d1), path1).getTotalLength();

    // Uniform sampling of distance based on specified precision.
    var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
    while ((i += dt) < 1) distances.push(i);
    distances.push(1);

    // Compute point-interpolators at each distance.
    var points = distances.map(function(t) {
      var p0 = path0.getPointAtLength(t * n0),
          p1 = path1.getPointAtLength(t * n1);
      return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
    });

    return function(t) {
      return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
    };
  };
}


    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        el.innerText = x.message;

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
