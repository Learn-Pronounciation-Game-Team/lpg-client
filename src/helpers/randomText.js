class Word {
  constructor(x, y, xSpeed, ySpeed, text, width, height) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.text = text
    this.width = width
    this.height = height
  }

  move() {
    this.x += this.xSpeed;
    if (this.x < 30 || this.x > this.width / 2 - 30) {
      this.xSpeed *= -1;
    }

    this.y += this.ySpeed;
    if (this.y < 30 || this.y > this.height / 2) {
      this.ySpeed *= -1;
    }
  }

  display(p5) {
    p5.textSize(32);
    p5.fill('white')
    p5.text(this.text, this.x, this.y);
  }
}

export default Word