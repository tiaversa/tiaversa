function backgroupPage(backgroundColor, lineColor, squareSpace)
{
	console.log('here')
	background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
	stroke(lineColor[0],lineColor[1],lineColor[2]);
    strokeWeight(1);
	for(let i = 0; i < windowHeight; i *= squareSpace)
	{
		line(0, i * squareSpace, windowWidth, i * squareSpace);
	}
	for(let i = 0; i < windowWidth; i *= squareSpace)
	{
		line(i * squareSpace,0, i * squareSpace,windowHeight);
	}
}