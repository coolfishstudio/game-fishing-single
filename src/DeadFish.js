function DeadFish(img, w, h, n, maxFrame){
	this.x = 0;
	this.y = 0;
	
	this.w = w;
	this.h = h;
	this.n = n;//前面有几个鱼
	this.img = img;
	
	this.maxFrame = maxFrame;
	this.nowFrame = 0;
	
	this.rotate = 0;
}

DeadFish.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x, this.y);
	gd.rotate(util.d2a(this.rotate));
	if(Math.abs(this.rotate) >= 90){
		gd.scale(1, -1);
	}
	gd.drawImage(this.img, 0, this.n * this.h + this.nowFrame * this.h, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
	gd.restore();
};

DeadFish.prototype.nextFrame = function(){
	this.nowFrame++;
	if(this.nowFrame >= this.maxFrame){
		this.nowFrame = 0;
	}
};