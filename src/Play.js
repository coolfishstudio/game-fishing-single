function Play(img, w, h){
	this.x = 0;
	this.y = 0;

	this.img = img;
	this.w = w;
	this.h = h;
}
//绘制炮体
Play.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x, this.y);
	gd.drawImage(this.img, 0, 0, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
	gd.restore();
}