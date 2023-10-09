let computer;
let position;

function setup() {
	createCanvas(windowWidth, windowHeight);
	computer = new Computer();
	position = 0;
}

function backgroupPage()
{
	background(202, 237, 255);
	stroke(130, 160, 216);
	for(let i = 0; i < windowHeight; i++)
	{
		line(0, i * 20, windowWidth, i * 20);
	}
	for(let i = 0; i < windowWidth; i++)
	{
		line(i * 20,0, i * 20,windowHeight);
	}
}

function landing()
{
	backgroupPage()
	let size = windowWidth/500 + windowHeight/ 600;
	fill(251, 240, 178, 70);
	noStroke();
	ellipse(windowWidth/2, windowHeight/2, windowHeight - 80 * size);
	if (size > 4.5)
	{
		size = 4.5;
	}
	fill(0);
	textSize(18);
	textFont('Palatino');
	rotateText(windowWidth/2,windowHeight/2,min(150 * size, 380) ,"Welcome to my Portfolio, I'm a Data Engineer from Brazil and forever learner." , position);
	console.log(windowHeight,position)
	screenSize = position * 0.005;
	computer.draw(windowWidth/2, windowHeight/2, size + screenSize);
}

function draw() {
	if(position < 1325)
	{
		landing();
	}
	
}
  
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
	position += event.delta;
	if( position < 0)
	{
		position = 0;
	}
}