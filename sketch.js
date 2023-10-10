//mobile first

let computer;
let position;
let buttons;

function setup() {
	createCanvas(windowWidth, windowHeight);
	computer = new Computer();
	position = 0;
	buttons = [new Button({x:windowWidth/2,
							y:windowHeight/2 + windowHeight/4,
							width:100,
							height:50,
							border:20,
							colorButton:(255,255,255),
							colorText:(0,0,0),
							text:'Scroll',
							isForDraw:true})];
}

function computerWindow()
{
	fill(237, 183, 237);
	rect(100,100,100,100);
}
function mainPage()
{
	backgroupPage({r:141,g:223,b:203}, {r:255,g:255,b:0}, 20);
	computerWindow();

}

function draw() {
	if(position < 5005)
	{
		landing();
	}
	else{
		backgroupPage();
	}
	// mainPage();
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
function mousePressed() {
	buttons.forEach((button) => {position = button.isPressed(mouseX,mouseY,position)})
}