// import p5 from 'p5'

class Explode {
  constructor(x, y, xSpeed, ySpeed, text, width, height, animations) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.text = text
    this.width = width
    this.height = height
    // this.image = image
    // this.json = json
    this.animations = animations
  }

  // setup(p5) {
  //   console.log('hereeeee');
    
  // }

  move() {
    this.x += this.xSpeed;
    if (this.x < 30 || this.x > this.width / 2 - 30) {
      this.xSpeed *= -1;
    }

    this.y += this.ySpeed;
    if (this.y < 30 || this.y > this.height / 1.5) {
      this.ySpeed *= -1;
    }
  }
  
  display(p5) {
    // let frames = this.json.frames
    // // console.log('here');
    // // console.log(JSON.stringify(this.json));
    // for (let i = 0; i < frames.length; i++) {
    //   let pos = frames[i].position
    //   // p5.image(this.image, 0,  0)
    //   let img = this.image.get(pos.x, pos.y, pos.w, pos.h)
    //   console.log(this.image);
    //   this.animation.push(img)
    // }
    p5.textSize(32);
    p5.fill('white')
    p5.text(this.text, this.x, this.y);
    // console.log(this.animation);
    p5.image(this.animations[p5.frameCount % this.animations.length], this.x, this.y, 100, 100)
  }
}

export default Explode