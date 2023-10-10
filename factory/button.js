class Button
{
    constructor(button)
    {
        this.x = button.x - button.width/2;
        this.y = button.y - button.height / 2;
        this.width = button.width;
        this.height = button.height;
        this.border = button.border;
        this.colorButton = button.colorButton;
        this.colorText = button.colorText;
        this.text = button.text;
        this.isForDraw = button.isForDraw;
        this.draw = function()
        {
            if(this.isForDraw)
            {
                fill(this.colorButton);
                rect(this.x,this.y,this.width, this.height,this.border);
                fill(this.colorText);
                textAlign(CENTER);
                text(this.text, this.x + this.width/2, this.y  + this.height/2);
            }
        }
        this.isPressed = function(mouseX, mouseY, position)
        {
            if(this.isForDraw)
            {
                if((mouseX > this.x) && 
                    (mouseX < this.x+this.width) && 
                    (mouseY > this.y) && 
                    (mouseY < this.y+this.height))
                {
                    this.colorButton = (237, 183, 237);
                    position += 300;
                    this.y += 300;
                    if(position > 2005)
                    {
                        this.isForDraw = false;
                    }
                }
            }
            return position;
        }
    }
}