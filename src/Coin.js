function Coin(img, x, y, w, h, targetX, targetY, maxFrame){
	this.x = x;
	this.y = y;

	this.img = img;
	this.w = w;
	this.h = h;

	this.maxFrame = maxFrame;
	this.nowFrame = 0;

	this.speed = 5;
	this.targetX = targetX;
	this.targetY = targetY;
	this.startX = this.x;
	this.startY = this.y;

	this.n = 0;
}
//绘制金币
Coin.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x, this.y);
	gd.drawImage(this.img, 0, this.nowFrame * this.h, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
	gd.restore();
};
//移动金币
Coin.prototype.move = function(gd){
	this.n++;
	
	var disX = this.targetX - this.startX;
	var disY = this.targetY - this.startY;
	
	this.x = this.startX + disX * this.n / 30;
	this.y = this.startY + disY * this.n / 30;
};
//换图
Coin.prototype.nextFrame = function(gd){
	this.nowFrame++;
	if(this.nowFrame >= this.maxFrame){
		this.nowFrame = 0;
	}
};