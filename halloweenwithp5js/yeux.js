var eye_x;
var eye_y;
var eye_width;
var eye_height;

var pupil_offset_x = 0;
var upper_lid = 0;
var eyepair;

var one_eye = function(p) {
    var width;
    var height;
    var iris_width;
    var width_between;
    
    var redraw = false;

    var draw_base = function(p) {
	p.background(0,0,0);
    }

    p.setup = function() {
	// Create the canvas
	var canvas_div = document.getElementById('sketch-holder');
        width = canvas_div.offsetWidth;
	height = Math.round(width / 1.5);
	eye_width = Math.round(width / 7);
	eye_height = Math.round(eye_width / 2.5);
	iris_width = Math.round(eye_width / 2.5);
	width_between = Math.round(eye_width * 1.3);
	eye_x = Math.round(width/2 - width_between/2);
	eye_y = Math.round(height/2);

        var canvas = p.createCanvas(width, height);
        canvas.parent('sketch-holder');
	draw_base(p);

	eyepair = new EyePair(eye_width, 
			      eye_height,
			      iris_width, //iris_radius,
			      width_between,
			      eye_x, eye_y,
			      upper_lid=upper_lid);

	
    };
    p.draw = function() {
	if (redraw) {
	    draw_base(p);
	    redraw = false;
	}	
	eyepair.draw(p);
    };
};
var crowd_sketch = new p5(one_eye);

var slider_change_x = function() {
    pupil_offset_x_pct = slider1.getValue();
    var pupil_offset_x = Math.round((eye_width / 2) * pupil_offset_x_pct / 100.0);
    eyepair.set_pupil_offset_x(pupil_offset_x);
    crowd_sketch.redraw();
};

var slider1 = $("#sl1").slider()
    .on('slide', slider_change_x)
    .data('slider');

var slider_change_close = function() {
    var eyelid_pct = slider2.getValue();
    eyepair.set_upper_lid(eyelid_pct / 100.0 * eye_height);
    crowd_sketch.redraw();
};

var slider2 = $("#sl2").slider()
    .on('slide', slider_change_close)
    .data('slider');

