var star = function(x,  y,
		    radius1,  radius2,
		    nbranches,
		    p) {
    // angle between two consecutives branches
    var alpha = p.TWO_PI / nbranches; 
    var halfalpha = alpha/2.0;
    var angularoffset = p.random(0, alpha);
    p.beginShape();
    for (var a = angularoffset; a < p.TWO_PI; a += alpha) {
	var sx = x + p.cos(a) * radius2;
	var sy = y + p.sin(a) * radius2;
	p.vertex(sx, sy);
	sx = x + p.cos(a+halfalpha) * radius1;
	sy = y + p.sin(a+halfalpha) * radius1;
	p.vertex(sx, sy);
    }
    p.endShape(p.CLOSE);
}

var blackisthenight = function(p) {
    var height;
    var width;
    var baseradius;
    p.setup = function() {
        // Create the canvas
        var canvas_div = document.getElementById('sketch-holder');
        width = canvas_div.offsetWidth;
	height = Math.round(width / 1.5);
	baseradius = Math.round(width / 60);
        var canvas = p.createCanvas(width, height);
        canvas.parent('sketch-holder');
	p.background(0,0,0);
    };
    p.mouseClicked = function() {
	p.fill(255, 255, 255);
	var radius1 = Math.round(p.random(baseradius, baseradius*2));
	star(p.mouseX, p.mouseY,
	     radius1, Math.round(radius1*1.75),
	     5, p);
    };
};
var sketch = new p5(blackisthenight);
