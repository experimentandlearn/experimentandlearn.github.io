var eye_x;
var eye_y;
var pupil_offset_x = 0;
var has_nose = false;
var has_mouth = false;

var blackisthenight = function(p) {
    var width;
    var height;
    var eye_width;
    var eye_height;
    var iris_width;
    var width_between;

    p.setup = function() {
	var canvas_div = document.getElementById('sketch-holder');
        width = canvas_div.offsetWidth;
	height = Math.round(width / 1.5);
	eye_width = Math.round(width / 7);
	eye_height = Math.round(eye_width / 2.5);
	iris_width = Math.round(eye_width / 2.5);
	width_between = Math.round(eye_width * 1.3);
	eye_x = Math.round(width/2 - width_between/2);
	eye_y = Math.round(height/2);

	// Create the canvas
        var canvas = p.createCanvas(width, height);
        canvas.parent('sketch-holder');
        p.background(0,0,0);
        // Create a pair of eyes

        //left eye
        p.fill(255,255,255);
        p.ellipse(eye_x, eye_y, eye_width, eye_height);
        p.fill(0, 0, 0);
        p.ellipse(eye_x+pupil_offset_x, eye_y, iris_width, iris_width);

        p.fill(255,255,255);
        p.ellipse(eye_x+width_between, eye_y,
		  eye_width, eye_height);
        p.fill(0, 0, 0);
        p.ellipse(eye_x+width_between+pupil_offset_x, eye_y, iris_width, iris_width);
	
    };
    p.draw = function() {
        p.fill(255, 255, 255);
        var mid = (2*eye_x+width_between)/2;
	var nose_offset = Math.round(eye_height / 3);
	var nose_height = nose_offset * 2;
        if (has_nose) {
            p.triangle(mid, eye_y+nose_offset,
		       mid-nose_offset, eye_y+nose_offset+nose_height,
		       mid+nose_offset, eye_y+nose_offset+nose_height);
        }
        if (has_mouth) {
            p.arc(mid,
		  Math.round((eye_y + nose_offset + nose_height) * 1.2),
		  2*eye_width+width_between,
		  Math.round(1.5*eye_width),
		  p.TWO_PI, -p.PI);
        }
    };
};
var b1 = document.getElementById('b1');
b1.onclick = function() {
    has_nose = !has_nose;
    if (has_nose) {
        b1.innerHTML = 'Remove';
        b1.value = 'remove'
    } else {
        b1.innerHTML = 'Add';
        b1.value = 'add';
    }
};
var b2 = document.getElementById('b2');
b2.onclick = function() {
    has_mouth = !has_mouth;
    if (has_mouth) {
        b2.innerHTML = 'Remove';
        b2.value = 'remove'
    } else {
        b2.innerHTML = 'Add';
        b2.value = 'add';
    }
};

var crowd_sketch = new p5(blackisthenight);
