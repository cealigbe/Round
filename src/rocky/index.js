var rocky = require('rocky');

var settings = null;

function fractorad(fraction) {
	return fraction * 2 * Math.PI;
}

function drawHour(ctx, cx, cy, angle, rad, color, size) {
	//Circle center
	var x0 = cx + Math.sin(angle) * rad;
	var y0 = cy - Math.cos(angle) * rad;
	
	//Style
	ctx.fillStyle = color;
	ctx.rockyFillRadial(x0, y0, 0, size, 0, 2 * Math.PI);
}

function drawMin(ctx, cx, cy, angle, inner, outer, color, weight) {
	//Startpoint
	var x0 = cx + Math.sin(angle) * inner;
	var y0 = cy - Math.cos(angle) * inner;
	
	//Endpoint
	var x1 = cx + Math.sin(angle) * outer;
	var y1 = cy - Math.cos(angle) * outer;
	
	//Style
	ctx.lineWidth = weight;
	ctx.strokeStyle = color;
	
	//Draw
	ctx.beginPath();
	
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	
	ctx.stroke();
	
}

rocky.on('draw', function(event) {
	//Initialize
	var ctx = event.context;
	var d = new Date();
	
	//Clear screen
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	
	//Display dims
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;
	
	//Get center
	var cx = w/2;
	var cy = h/2;
	
	var radius = (Math.min(w, h) - 60) / 2;
	
	var bgColor = "black";
	var cirColor = "white";
	var hourColor = "red";
	var minColor = "red";
	var dateColor = "red";
	var showDate = true;
	
	if (settings) {
		bgColor = cssColor(settings.bgColor);
		cirColor = cssColor(settings.cirColor);
		hourColor = cssColor(settings.hourColor);
		minColor = cssColor(settings.minColor);
		dateColor = cssColor(settings.dateColor);
		showDate = settings.date;
	}
	
	//Draw bg elements
	ctx.fillStyle = bgColor;
	ctx.rect(0, 0, w, h);
	
	ctx.fillStyle = cirColor;
	ctx.rockyFillRadial(cx, cy, 0, radius, 0, 2 * Math.PI);
	
	//Day
	if (showDate) {
		ctx.fillStyle = dateColor;
		ctx.textAlign = 'center';
		ctx.font = '30px bolder Bitham';
		ctx.fillText(d.getDate(), cx, cy-18, w/2);
	}
	
	//Min
	var minFrac = (d.getMinutes()) / 60;
	var minAngle = fractorad(minFrac);
	
	drawMin(ctx, cx, cy, minAngle, radius+7, radius+21, minColor, 6);
	
	//Hour
	var hourFrac = (d.getHours() % 12 + minFrac) / 12;
	var hourAngle = fractorad(hourFrac);
	
	drawHour(ctx, cx, cy, hourAngle, radius-10, hourColor, 3);
});

rocky.on('message', function(event) {
	settings = event.data;
	rocky.requestDraw();
});

rocky.on('minutechange', function(event) {
	console.log("Next minute");
	rocky.requestDraw();
});

rocky.postMessage({command: 'settings'});

// Borrowed from Clay.js

/**
 * @param {string|boolean|number} color
 * @returns {string}
 */
function cssColor(color) {
	if (typeof color === 'number') {
		color = color.toString(16);
	} else if (!color) {
		return 'transparent';
	}

	color = padColorString(color);

	return '#' + color;
}

/**
 * @param {string} color
 * @return {string}
 */
function padColorString(color) {
	color = color.toLowerCase();

	while (color.length < 6) {
		color = '0' + color;
	}

	return color;
}
