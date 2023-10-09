//code from: https://editor.p5js.org/Arkimedz/sketches/0VHgrQruB with minor adjustments
function rotateText(x, y, radius, txt, position) 
{
    let chars = txt.split("")
    let charSpacingAngleDeg = 4.65;
    textAlign(CENTER, BASELINE);
    textSize(27);
    textStyle(BOLD);
    fill(0);
    push();
    translate(x, y);
    rotate(radians(-chars.length * charSpacingAngleDeg / 2 - position * 0.1 + 140));
    for (let i = 0; i < chars.length; i++) 
    {
        text(chars[i], 0, -radius);
        rotate(radians(charSpacingAngleDeg));
    }
    pop();

}