class computerWindow
{
    constructor(x,y,height,width,message,color)
    {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.message = message;
        this.color = color;
        this.isForDraw = true;
        this.topseparation = 30;
        this.isMinimized = false;
        this.size = 8;
        this.closeWindow = {x:0,
                            y:0,
                            size:0};
        this.minimizeWindow = {x:0,
                            y:0,
                            size:0};
        this.draw = function (size)
        {
            if (this.isForDraw)
            {
                this.updateSize(size);
                stroke(0);
                fill(237, 183, 237);
                rect(this.x,this.y,this.width,this.topseparation);
                noStroke();
                fill(0,0,0,15);
                console.log(this.closeWindow.size)
                rect(this.closeWindow.x, this.closeWindow.y, this.closeWindow.size,this.closeWindow.size);
                rect(this.minimizeWindow.x, this.minimizeWindow.y, this.minimizeWindow.size,this.minimizeWindow.size);
                fill(255);
                stroke(0);
                textSize(5 * size);
                text('X', this.closeWindow.x, this.closeWindow.y);
                rect(this.x, this.y + this.topseparation,this.width,this.height - this.topseparation);
            }
            
        }
        this.isPressed = function(mouseX,mouseY)
        {
            //check all possible buttons in the window
            this.closeWindowCheck(mouseX,mouseY)
        }
        this.updateSize = function(size)
        {
            this.size = size;
            this.closeWindow.x = this.x + this.width - this.topseparation - 2;
            this.closeWindow.y = this.y + 2;
            this.closeWindow.size = this.topseparation - 4;
            this.minimizeWindow.x = this.x + this.width - 2 *this.topseparation - 6;
            this.minimizeWindow.y = this.y + 2;
            this.minimizeWindow.size = this.topseparation - 4;
        }
        this.minimizeWindowCheck = function(mouseX, mouseY)
        {
            if(this.isForDraw)
            {
                let checkButtonResult = this.checkButton(mouseX,mouseY,this.minimizeWindow.x, this.minimizeWindow.y, this.minimizeWindow.size, this.minimizeWindow.size)
                if(checkButtonResult)
                {
                    this.isForDraw = false;
                    this.isMinimized = true;
                }
            }
        }
        this.closeWindowCheck = function(mouseX, mouseY)
        {
            if(this.isForDraw)
            {
                let checkButtonResult = this.checkButton(mouseX,mouseY,this.closeWindow.x, this.closeWindow.y, this.closeWindow.size, this.closeWindow.size)
                if(checkButtonResult)
                {
                    this.isForDraw = false;
                }
            }
        }
        this.checkButton = function(mouseX,mouseY,buttonX, buttonY, buttonWidth, buttonHeight)
        {
            if ((mouseX > buttonX) && 
                (mouseX < buttonX + buttonWidth) && 
                (mouseY > buttonY) && 
                (mouseY < buttonY + buttonHeight))
            {
                return true
            }
            return false
        }
    }
}