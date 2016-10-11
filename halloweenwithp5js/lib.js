var Rectangle = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

Rectangle.prototype.intersects = function(rectangle) {
    var res =
	(this.x < (rectangle.x + rectangle.width)) &&
	((this.x + this.width) > rectangle.x) &&
	(this.y < (rectangle.y + rectangle.height)) &&
	((this.y + this.height) > rectangle.y);
    return res;
}

var Eye = function(eye_width,
		   eye_height,
		   iris_radius,
		   x, y,
		   upper_lid=0) {
    this.eye_width = eye_width;
    this.eye_height = eye_height;
    this.iris_radius = iris_radius;
    this.x = x;
    this.y = y;
    this.iris_x = x;
    this.iris_y = y;
    this.upper_lid = upper_lid;
    this.lower_lid = y + (eye_height / 2);
};

Eye.prototype.set_upper_lid = function(value) {
    this.upper_lid = value;
};
    
Eye.prototype.update_upper_lid = function(target, step=2) {
    var diff = target - this.upper_lid;
    var res;
    if (diff > step) {
	this.upper_lid += step;
	res = 1;
    } else if (diff < -step) {
	this.upper_lid -= step;
	res = -1;
    } else {
	res = 0;
    }
    return res;
};

Eye.prototype.draw = function(p) {
    p.stroke(0, 0, 0);
    p.fill(255, 255, 255, 255);
    p.ellipse(this.x, this.y,
	      this.eye_width, this.eye_height);
    p.fill(0, 0, 0, 255);
    p.ellipse(this.iris_x, this.iris_y,
	      this.iris_radius, this.iris_radius);
    //stroke(255, 0, 0);
    p.rect(this.x - (this.eye_width/2),
	   this.y - (this.eye_height/2),
	   this.eye_width,
	   this.upper_lid);
};

var EyePair = function(eye_width,
		       eye_height,
		       iris_radius,
		       width_between,
		       x, y,
		       upper_lid=0) {
    this.width_between = width_between;
    var x_eye = x - (width_between / 2);
    var y_eye = y;
    this.left_eye = new Eye(eye_width, eye_height, iris_radius,
			    x_eye, y_eye,
			    upper_lid=upper_lid);
    x_eye = x + (width_between / 2);
    this.right_eye = new Eye(eye_width, eye_height, iris_radius,
			     x_eye, y_eye,
			     upper_lid=upper_lid);
    this.rectangle = new Rectangle(x-eye_width*1.5-width_between/2,
				   y-eye_height*1.5/2,
				   eye_width*2+eye_width*.5+(width_between-eye_width),
				   eye_height*1.5);
};

EyePair.prototype.update_upper_lid = function(target) {
    var res_left = this.left_eye.update_upper_lid(target);
    var res_right = this.right_eye.update_upper_lid(target);
    return res_left;
};

EyePair.prototype.set_upper_lid = function(value) {
    this.left_eye.set_upper_lid(value);
    this.right_eye.set_upper_lid(value);
};

EyePair.prototype.set_pupil_offset_x = function(value) {
    this.left_eye.iris_x = value + this.left_eye.x;
    this.right_eye.iris_x = value + this.right_eye.x;
};

EyePair.prototype.draw = function(p) {
    this.left_eye.draw(p);
    this.right_eye.draw(p);
};

var add_eyepair = function(eyepairs, p,
			   x_range, y_range,
			   eye_width_min, eye_width_max,
			   pupil_offset_x = 0) {
    var intersect = true;
    var max_try = 50;
    var try_i = 0;
    var eyepair = null;
    while (intersect && (try_i < max_try)) {
	try_i += 1;
	var x = p.random(x_range[0], x_range[1]);
	var y = p.random(y_range[0], y_range[1]);
	var width = p.random(eye_width_min, eye_width_max);
	var height = width * .6;
	//var upper_lid = height * .6;
	if (p.random(0, 1) < .1) {
	    var upper_lid = 0;
	} else {
	    var upper_lid = height / p.random(1.76, 2.4);
	}
	//var upper_lid = 0;
	var iris = width / 3;
	var between = width * 1.1;
	eyepair = new EyePair(width, height, iris, between,
			      x, y,
			      upper_lid=upper_lid);
	intersect = false;
	for (ep of eyepairs) {
	    if (ep.rectangle.intersects(eyepair.rectangle)) {
		intersect = true;
		break;
	    }
	}
    }
    if (intersect) {
	eyepair = null;
    } else {
	eyepair.set_pupil_offset_x(pupil_offset_x);
    }
    return eyepair;
};

var crowd = function(p) {
    var eyepairs = [];
    var neyepairs = 20
    p.setup = function() {
	// Create the canvas
	var canvas = p.createCanvas(900, 700);
	canvas.parent('sketch-holder');
	p.background(0,0,0);
	
	for (var i = 0; i < neyepairs; i++) {
	    var eyepair = add_eyepair(eyepairs, p);
	    eyepairs.push(eyepair);
	    eyepair.draw(p);
	}
	//eyepair.draw();
    }

    p.draw = function() {
	
    }

}

