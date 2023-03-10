// Takes in a canvas element to create an element that can be drawn on

export class DrawingPad {
  constructor(cont){
    this.canvas = cont;
    this.ctx = this.canvas.getContext('2d');
    this.coord = {x:0 , y:0};
    this.paint = false;
    this.signed = false;

    this.canvas.addEventListener('pointerdown', this.startPainting);
    this.canvas.addEventListener('pointerup', this.stopPainting);
    this.canvas.addEventListener('pointermove', this.sketch);
    this.ctx.canvas.style.touchAction = "none"; //Prevents stylus hover from drawing
    window.addEventListener('resize', this.resize);

    this.resize(); // Resizes the canvas once the window loads
  }

  resize=()=>{
    let ratio = Math.max(window.devicePixelRatio || 1,1);
    this.ctx.canvas.width = this.canvas.offsetWidth * ratio;
    this.ctx.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext('2d').scale(ratio, ratio);
  }

  getPosition=(event)=>{
    this.coord.x = event.offsetX;
    this.coord.y = event.offsetY;
  }

  startPainting=(event)=>{
    this.signed = true;
    this.paint = true;
    this.getPosition(event);
  }

  stopPainting=()=>{
    this.paint = false;
  }

  sketch=(event)=>{
    if (!this.paint) return;
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(this.coord.x, this.coord.y);
    this.getPosition(event);
    this.ctx.lineTo(this.coord.x , this.coord.y);
    this.ctx.stroke();
  }

  getPainting=()=>{
    this.ctx.putImageData(this.ctx.getImageData(0,0,this.ctx.canvas.width, this.ctx.canvas.height), 0, 0);

    var image = new Image();
    image.src = this.ctx.canvas.toDataURL();
    return image;
  }

  clearPad=()=>{
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    this.signed = false;
  }
}
