class Computer
{
    constructor()
    {
        this.on = true;
        this.totalXSize = 0;
        this.starpointX = 0;
        this.starpointY = 0;
        this.r = 8;
        this.step = TWO_PI/8;
        this.draw = function(x,y,size)
        {
            this.totalXSize = 130 * size;
            this.starpointX =  x - this.totalXSize/2;
            this.starpointY = y/2 - x /6;
            fill(246, 244, 235);
            stroke(0);
            rect(this.starpointX,this.starpointY,this.totalXSize,100 * size,2 * size);
            fill(235, 228, 209);
            rect(this.starpointX + 3 * size,this.starpointY + 4 * size,this.totalXSize - 6 * size,80 * size,2 * size);
            noStroke();
            fill(180, 180, 179);
            rect(this.starpointX + 7 * size,this.starpointY + 8 * size,this.totalXSize - 14 * size,70 * size,1.5 * size);
            fill(246, 244, 235);
            stroke(0);
            //lower base
            beginShape();
            vertex(this.starpointX,this.starpointY + 101 * size);
            vertex(this.starpointX + this.totalXSize,this.starpointY + 101 * size);
            vertex(this.starpointX + this.totalXSize + 10 * size,this.starpointY + 116 * size);
            vertex(this.starpointX + this.totalXSize + 10 * size,this.starpointY + 151 * size);
            vertex(this.starpointX - 10 * size,this.starpointY + 151 * size);
            vertex(this.starpointX - 10 * size,this.starpointY + 116 * size);
            vertex(this.starpointX + this.totalXSize + 10 * size,this.starpointY + 116 * size);
            vertex(this.starpointX - 10 * size,this.starpointY + 116 * size);
            vertex(this.starpointX,this.starpointY + 101 * size);
            endShape();
            //neck
            stroke(0);
            rect(this.starpointX + 10 * size,this.starpointY + 100 * size,this.totalXSize - 20 * size,10 * size,2 * size);
            //neck shade
            fill(0,0,0,35);
            noStroke();
            beginShape();
            vertex(this.starpointX + 11 * size,this.starpointY + 90 * size);
            vertex(this.starpointX + this.totalXSize - 9 * size,this.starpointY + 90 * size);
            vertex(this.starpointX + this.totalXSize - 2 * size,this.starpointY + 113 * size);
            vertex(this.starpointX + 2  * size,this.starpointY + 113 * size);
            endShape();
            fill(0);
            ellipse(this.starpointX + 100 * size, this.starpointY + 103 * size, 5 * size, 3 * size);
            ellipse(this.starpointX + 90 * size, this.starpointY + 103 * size, 5 * size, 3 * size);
            ellipse(this.starpointX + 80 * size, this.starpointY + 103 * size, 5 * size, 3 * size);
            //base monitor
            stroke(0);
            fill(246, 244, 235);
            rect(this.starpointX,this.starpointY + 88 * size,this.totalXSize,15 * size,0,0,2 * size,2 * size);
            stroke(0);
            rect(this.starpointX + this.totalXSize / 2 - 5 * size, this.starpointY + 90 * size, 10 * size,10 * size);

            // textFont(MeninBlue);
            textSize(3 * size);
            text("Titi's", this.starpointX + this.totalXSize / 2 - 2.5 * size, this.starpointY + 95 * size);
            text("world", this.starpointX + this.totalXSize / 2 - 3.2 * size, this.starpointY + 98 * size);
            stroke(0,0,0,35);
            triangle(this.starpointX + 78 * size, this.starpointY + 98.5 * size, this.starpointX + 83 * size, this.starpointY + 98.5 * size, this.starpointX + 83 * size, this.starpointY + 95 * size);
            ellipse(this.starpointX + 90 * size, this.starpointY + 96.5 * size,18);
            this.sun(this.starpointX + 100 * size, this.starpointY + 96.5 * size,size);
            

            this.ventilation(this.starpointX + 2 * size,this.starpointY + 120 * size,size,17,true);
            this.ventilation(this.starpointX + 2 * size,this.starpointY + 132 * size,size,17,true);
            this.ventilation(this.starpointX + this.totalXSize - 2 * size,this.starpointY + 112 * size,size,10,false);

            //screen
            noStroke();
            fill(141, 223, 203);
            rect(this.starpointX + 10 * size,this.starpointY + 11 * size,this.totalXSize - 20 * size,64 * size,3 * size);
            //shades
            fill(0,0,0,25);
            beginShape();
            vertex(this.starpointX + 7 * size,this.starpointY + 8 * size);
            vertex(this.starpointX - 7 * size + this.totalXSize,this.starpointY + 8 * size);
            vertex(this.starpointX + this.totalXSize - 10 * size,this.starpointY + 15 * size);
            vertex(this.starpointX + 10 * size,this.starpointY + 15 * size);
            endShape();
            fill(255,255,255,50);
            beginShape();
            vertex(this.starpointX + 7 * size,this.starpointY + 78 * size);
            vertex(this.starpointX - 7 * size + this.totalXSize,this.starpointY + 78 * size);
            vertex(this.starpointX + this.totalXSize - 10 * size,this.starpointY + 74 * size);
            vertex(this.starpointX + 10.5 * size,this.starpointY + 74 * size);
            endShape();
        }
        this.ventilation = function(x,y,size,amount,isHorizontal)
        {
            for (let i = 0; i < amount ; i++)
            {
                if (isHorizontal)
                {
                    this.eachVentilationWindow(x + i * 3 * size,y,size);
                }
                else{
                    this.eachVintilationVertical(x - i * 0.3 * size,y - i * 1 * size,size - i * 0.05 * size);
                }
                
            }
        }
        this.eachVentilationWindow = function (x,y,size)
        {
            fill(0);
            rect(x,y,0.3 * size, 10 * size, 140 * size);
        }
        this.eachVintilationVertical = function(x,y,size,)
        {
            fill(0);
            rect(x,y,8 * size, 0.2 * size,40 * size);
        }
        this.sun = function(x,y,size)
        {   
            fill(246, 244, 235);
            stroke(0,0,0,35);
            ellipse(x, y,2.3 * size);
            fill(0,0,0,35);
            for(let i = 0; i < 8; i ++)
            {
                let xMove = this.r * sin(i * this.step);
                let yMove = this.r * cos(i * this.step);
                ellipse(x + xMove, y + yMove, 0.8 * size);
            }
            
        }
    }
}