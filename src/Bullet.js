function Bullet(img, sx, sy, w, h){
	this.x = 0;
	this.y = 0;

	this.img = img;
	this.w = w;
	this.h = h;
	this.sx = sx;
	this.sy = sy;

	this.rotate = 0;
	this.speed = 7;
}
//绘制炮弹
Bullet.prototype.draw = function(gd){
	gd.save();
	
	gd.translate(this.x, this.y);
	gd.rotate(util.d2a(this.rotate));
	
	gd.drawImage(this.img, this.sx, this.sy, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
	
	gd.restore();
};
//炮弹移动
Bullet.prototype.move = function(){
	var speedX = Math.cos(util.d2a(this.rotate - 90)) * this.speed;
	var speedY = Math.sin(util.d2a(this.rotate - 90)) * this.speed;
	
	this.x += speedX;
	this.y += speedY;
};