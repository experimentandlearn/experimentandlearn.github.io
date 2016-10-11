
var width;
var height;
var x_range;
var y_range;
var pupil_offset_x = 0;
var eyepairs = [];
var neyepairs = 0;
var clear_bg = false;
var crowd = function(p) {

    var eye_width_min;
    var eye_width_max;
    
    p.setup = function() {
	// Create the canvas
	var canvas_div = document.getElementById('sketch-holder');
	width = canvas_div.offsetWidth;
	height = Math.round(width / 2.5);
	x_range = [Math.round(width*.1), Math.round(width*.9)];
	y_range = [Math.round(height*.1), Math.round(height*.9)];
	eye_width_min = Math.round(width / 40);
	eye_width_max = Math.round(width / 15);

        var canvas = p.createCanvas(width, height);
        canvas.parent('sketch-holder');
        p.background(0,0,0);    
    };
    p.draw = function() {
        var eyepair;
	if (clear_bg) {
	    p.background(0,0,0);
	    clear_bg = false;
	}
        if (neyepairs > eyepairs.length) {
            eyepair = add_eyepair(eyepairs, p,
                                  x_range, y_range,
				  eye_width_min, eye_width_max,
				  pupil_offset_x);
            if (eyepair == null) {
                neyepairs -= 1;
            } else {
                eyepairs.push(eyepair);
            }
	} else if (neyepairs < eyepairs.length) {
	    while (neyepairs < eyepairs.length) {
		eyepairs.pop();
	    }
	}
        for (var i = 0; i < neyepairs; i++) {
	    eyepair = eyepairs[i];
	    if (eyepair != undefined) {
		eyepair.draw(p);
	    }
	}
    };
};

var crowd_sketch = new p5(crowd);

var slider_change = function() {
    neyepairs = slider.getValue();
    clear_bg = true;
    crowd_sketch.redraw();
};

var slider = $("#sl1").slider()
    .on('slide', slider_change)
    .data('slider');

var slider_change_x = function() {
    pupil_offset_x_pct = slider2.getValue();
    var pupil_offset_x;
    for (var i = 0; i < neyepairs; i++) {
	eyepair = eyepairs[i];
	if (eyepair != undefined) {
	    pupil_offset_x = Math.round((eyepair.left_eye.eye_width / 2) * pupil_offset_x_pct / 100.0);
	    eyepair.set_pupil_offset_x(pupil_offset_x);
	}
    }
    clear_bg = true;
    crowd_sketch.redraw();
};

var slider2 = $("#sl2").slider()
    .on('slide', slider_change_x)
    .data('slider');
