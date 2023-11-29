//mobile first

let computer;
let position;
let buttons;
let screens = {};

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
	screens.aboutMeScreen = new computerWindow(100,100,200,200,"About Me",(255));
}

function mainPage()
{
	background(255);
	//backgroupPage((141,223,203), (255,255,0), 20);
	// computerWindow(100,100,200,200,"Heere");
	screens.aboutMeScreen.draw(10);

}

function draw() {
	// if(position < 5005)
	// {
	// 	landing();
	// }
	// else{
	// 	backgroupPage();
	// }
	mainPage();
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
	buttons.forEach((button) => {position = button.isPressed(mouseX,mouseY,position)});
	for (const [name, screenObj] of Object.entries(screens)) {
		screenObj.isPressed(mouseX,mouseY);
	}
}