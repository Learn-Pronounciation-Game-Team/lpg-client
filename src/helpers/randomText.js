class Word {
  constructor(x, y, xSpeed, ySpeed, text, width, height, image) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.text = text
    this.width = width
    this.height = height
    this.image = image
  }

  move() {
    this.x += this.xSpeed;
    if (this.x < 30 || this.x > this.width / 2 - 100) {
      this.xSpeed *= -1;
    }

    this.y += this.ySpeed;
    if (this.y < 30 || this.y > this.height / 2 - 100) {
      this.ySpeed *= -1;
    }
  }

  display(p5) {
    p5.textSize((3/100) * this.height);
    p5.fill('white')
    p5.text(this.text, this.x, this.y);
    p5.image(this.image, this.x, this.y, 100, 100)
  }
}

export default Word