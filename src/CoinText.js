function CoinText(img, sx, sy, x, y, w, h, targetX, targetY){
	this.x = x;
	this.y = y;

	this.sx = sx;
	this.sy = sy;

	this.img = img;
	this.w = w;
	this.h = h;

	this.time = 0;
	this.speed = 5;
	this.targetX = targetX;
	this.targetY = targetY;
}
//绘制金币
CoinText.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x, this.y);
	gd.drawImage(this.img, this.sx, this.sy, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
	gd.restore();
};
//移动金币
CoinText.prototype.move = function(gd){
	this.time++;
	
	var disX = this.targetX - this.x;
	var disY = this.targetY - this.y;
	
	this.x = this.x + disX * this.speed / 30;
	this.y = this.y + disY * this.speed / 30;
};
