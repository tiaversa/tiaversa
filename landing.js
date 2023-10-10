function landing()
{
	backgroupPage({r:202,g:237,b:255},{r:130,g:160,b:216},10);
	let size = windowWidth/500 + windowHeight/ 600;
	fill(251, 240, 178, 70);
	noStroke();
	ellipse(windowWidth/2, windowHeight/2, windowHeight - 80 * size);
	screenSize = position * 0.005;
	computer.draw(windowWidth/2, windowHeight/2, size + screenSize);
	buttons[0].draw();
}