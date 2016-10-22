var microphone;
var microphone_low = 0.07;
var microphone_high = 0.7;
var microphone_bar;
var eye_x;
var eye_y;
var eye_width;
var eye_height;
var pupil_offset_x = 0;
var new_pupil_offset_x = 0;
var upper_lid_lowest;
var upper_lid;
var target_upper_lid;
var delay_to_sleep;
var gaze_locked = false;
var eyepair;
var canvas_div;
var canvas;

var one_eye = function(p) {
    var width;
    var height;
    var iris_width;
    var width_between;

    var vol;
    var high_vol;
    var redraw = false;

    var draw_base = function(p) {
	p.background(0,0,0);
    }

    var want_fullscreen = false;
    var b_fullscreen = document.getElementById('b_fullscreen');
    if (b_fullscreen) {
	b_fullscreen.onclick = function() {
            want_fullscreen = !want_fullscreen;
	    if (want_fullscreen) {
		canvas_div.webkitRequestFullScreen();
		width = screen.width+1;
		update_locations(width);
		canvas.size(width, height);
		draw_base(p);
		eyepair = new EyePair(eye_width, 
				      eye_height,
				      iris_width, //iris_radius,
				      width_between,
				      eye_x, eye_y,
				      upper_lid=upper_lid);
	    } else {
		document.webkitExitFullScreen(); 
	    }
	}
    };

    var update_locations = function(width) {
	height = Math.round(width / 3);
	eye_width = Math.round(width / 7);
	eye_height = Math.round(eye_width / 2.5);
	iris_width = Math.round(eye_width / 2.5);
	width_between = Math.round(eye_width * 1.3);
	eye_x = Math.round(width/2);
	eye_y = Math.round(height/2);
	upper_lid_lowest = Math.round(eye_height * 0.9);
    }
    

    p.setup = function() {
	canvas_div = document.getElementById('sketch-holder');
        width = canvas_div.offsetWidth;
	update_locations(width);

        canvas = p.createCanvas(width, height);
        canvas.parent('sketch-holder');
	draw_base(p);

	eyepair = new EyePair(eye_width, 
			      eye_height,
			      iris_width, //iris_radius,
			      width_between,
			      eye_x, eye_y,
			      upper_lid=upper_lid);

	microphone_bar = document.getElementById('microphone-level');
	microphone = new p5.AudioIn();
	// start the Audio Input.
	// By default, it does not .connect() (to the computer speakers)
	microphone.start();
    };
    p.draw = function() {
	vol = microphone.getLevel();
	microphone_bar.style.width = vol*100 + "%";
	//
	if (vol < microphone_low) {
	    vol = 0;
	} else if (vol < microphone_high) {
	    vol = (1 / (microphone_high-microphone_low)) * vol - microphone_low * (1 / (microphone_high-microphone_low));
	} else {
	    vol = 1;
	}
	if ((high_vol == undefined) || (vol > high_vol)) {
	    high_vol = vol;
	    target_upper_lid = Math.round(upper_lid_lowest * (1-high_vol));
	    delay_to_sleep = Math.round(p.random(300*high_vol,
						 600*high_vol));
	}
	if (eyepair.update_upper_lid(target_upper_lid, step=delay_to_sleep <= 0 ? 2 : .1) >= 0) {
	    if (delay_to_sleep > 0) {
		delay_to_sleep -= 1;
	    } else {
		target_upper_lid = upper_lid_lowest;
		high_vol = undefined;
	    }
	}

	if (gaze_locked) {
	    if ((pupil_offset_x == new_pupil_offset_x) ||
		(pupil_offset_x > eye_width/2) ||
		(pupil_offset_x < -eye_width/2)) {
		gaze_locked = false;
	    } else if (pupil_offset_x < new_pupil_offset_x) {
		pupil_offset_x += 1;
		eyepair.set_pupil_offset_x(pupil_offset_x);
	    } else {
		pupil_offset_x -= 1;
		eyepair.set_pupil_offset_x(pupil_offset_x);
	    }
	} else {
	    var action = p.random(0, 1);
	    if (action < .01) {
		gaze_locked = true;
		new_pupil_offset_x = Math.round(p.random(-eye_width/2*.8, eye_width/2*.8));
	    }
	}
	draw_base(p);
	eyepair.draw(p);
    };
};
var crowd_sketch = new p5(one_eye);
