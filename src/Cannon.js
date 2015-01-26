function Cannon(img, w, h, maxFrame){
	this.x = 0;
	this.y = 0;

	this.img = img;
	this.w = w;
	this.h = h;
	this.rotate = 0;

	this.maxFrame = maxFrame;
	this.nowFrame = 0;//当前帧数
}
//绘制炮体
Cannon.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x, this.y);
	gd.rotate(util.d2a(this.rotate));
	gd.drawImage(this.img, 0, 0, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
	gd.restore();
}
//炮体的换图动作
Cannon.prototype.nextFrame = function(){
	this.nowFrame++;
	if(this.nowFrame >= this.maxFrame){
		this.nowFrame = 0;
	}
};

