function Fish(img, w, h, maxFrame){//图片,宽度,高度,最大帧数
	this.x = 0;
	this.y = 0;

	this.img = img;
	this.w = w;
	this.h = h;

	this.maxFrame = maxFrame;
	this.nowFrame = 0;//当前帧数

	this.speed = Math.random() * 1 + 1;//鱼游动的速度

	this.rotate = 0;//鱼游动的角度
};
//绘制鱼
Fish.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x, this.y);
	gd.rotate(util.d2a(this.rotate));
	if(Math.abs(this.rotate) >= 90){//如果角度的绝对值大于90度 那么就翻转
		gd.scale(1, -1);
	}
	//剪切图像，并在画布上定位被剪切的部分：context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	//规定要使用的图像,开始剪切的 x 坐标位置,开始剪切的 y 坐标位置,被剪切图像的宽度,被剪切图像的高度,在画布上放置图像的 x 坐标位置,在画布上放置图像的 y 坐标位置,要使用的图像的宽度,要使用的图像的高度
	// gd.drawImage(this.img, 0, this.nowFrame*this.h, this.w, this.h, this.x - this.w/2, this.y - this.h/2, this.w, this.h);
	gd.drawImage(this.img, 0, this.nowFrame*this.h, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);

	gd.restore();
};
//鱼的换图动作
Fish.prototype.nextFrame = function(){
	this.nowFrame++;
	if(this.nowFrame >= this.maxFrame){
		this.nowFrame = 0;
	}
};
//鱼的移动
Fish.prototype.move = function(){
	//三角函数
	//y=sin(a)*speed
	//x=cos(a)*speed
	this.x += Math.cos(util.d2a(this.rotate)) * this.speed;
	this.y += Math.sin(util.d2a(this.rotate)) * this.speed;
};