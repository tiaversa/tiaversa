function backgroupPage(backgroundColor, lineColor, squareSpace)
{
	console.log('here')
	background(backgroundColor.r,backgroundColor.g,backgroundColor.b);
	stroke(lineColor.r,lineColor.b,lineColor.c);
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