var eye_main = false;
var eye_pupil = false;
var eye_x;
var eye_y;
var pupil_offset_x = 0;
var other_eye = false;

var one_eye = function(p) {
    var height;
    var width;
    var eye_width;
    var eye_height;
    var iris_width;
    var width_between;
    
    var b3 = document.getElementById('b3');
    var b4 = document.getElementById('b4');
    var clear = false;

    var draw_base = function(p) {
	p.background(0,0,0);
    }

    var b1 = document.getElementById('b1');
    b1.onclick = function() {
        eye_main = !eye_main;
        if (eye_main) {
            b1.innerHTML = 'Remove';
            b1.value = 'remove';
        } else {
            b1.innerHTML = 'Add';
            b1.value = 'add';
        }
	clear = true;
    };
    var b2 = document.getElementById('b2');
    b2.onclick = function() {
	eye_pupil = !eye_pupil;
	if (eye_pupil) {
	    b2.innerHTML = 'Remove';
	    b2.value = 'remove';
	} else {
	    b2.innerHTML = 'Add';
	    b1.value = 'add'
	}
	clear = true;
    };

    var b5 = document.getElementById('b5');
    b5.onclick = function() {
	other_eye = !other_eye;
	if (other_eye) {
	    b5.innerHTML = 'Remove';
	    b5.value = 'remove';
	} else {
	    b5.innerHTML = 'Add';
	    b5.value = 'add';
	}
	clear = true;
    };

    p.setup = function() {
	// Create the canvas
	var canvas_div = document.getElementById('sketch-holder');
        width = canvas_div.offsetWidth;
	height = Math.round(width / 1.5);
	eye_x = Math.round(width/3);
	eye_y = Math.round(height/2);
	eye_width = Math.round(width / 7);
	eye_height = Math.round(eye_width / 2.5);
	iris_width = Math.round(eye_width / 2.5);
	width_between = Math.round(eye_width * 1.3);
	var canvas = p.createCanvas(width, height);
        canvas.parent('sketch-holder');
	draw_base(p);
    };
    p.draw = function() {
	if (clear) {
	    draw_base(p);
	    clear = false;
	}
        if (eye_main) {
            // Create an eye
            p.fill(255, 255, 255);
            p.ellipse(eye_x, eye_y, eye_width, eye_height);
        }
        if (eye_pupil) {
            p.fill(0, 0, 0);
            p.ellipse(eye_x+pupil_offset_x, eye_y, iris_width, iris_width);
        }
        if (other_eye) {
            // Create an eye
            p.fill(255, 255, 255);
            p.ellipse(eye_x+width_between, eye_y, eye_width, eye_height);
            p.fill(0, 0, 0);
            p.ellipse(eye_x+pupil_offset_x+width_between, eye_y, iris_width, iris_width);
        }
    };
};
var sketch = new p5(one_eye);

var slider_change = function() {
    pupil_offset_x = slider.getValue();
    sketch.redraw();
};

var slider = $("#sl1").slider()
    .on('slide', slider_change)
    .data('slider');
