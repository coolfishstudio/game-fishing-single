function main() {
  //------------ Fish.js 鱼元素
  function Fish(img, w, h, maxFrame) {//图片,宽度,高度,最大帧数
    this.x = 0;
    this.y = 0;
    this.c = 0;
    this.num = 1;

    this.img = img;
    this.w = w;
    this.h = h;

    this.maxFrame = maxFrame;
    this.nowFrame = 0;//当前帧数

    this.speed = Math.random() * 1 + 1;//鱼游动的速度

    this.rotate = 0;//鱼游动的角度
  };
  //绘制鱼
  Fish.prototype.draw = function (gd) {
    gd.save();
    gd.translate(this.x, this.y);
    gd.rotate(util.d2a(this.rotate));
    if (Math.abs(this.rotate) >= 90) {//如果角度的绝对值大于90度 那么就翻转
      gd.scale(1, -1);
    }
    //剪切图像，并在画布上定位被剪切的部分：context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    //规定要使用的图像,开始剪切的 x 坐标位置,开始剪切的 y 坐标位置,被剪切图像的宽度,被剪切图像的高度,在画布上放置图像的 x 坐标位置,在画布上放置图像的 y 坐标位置,要使用的图像的宽度,要使用的图像的高度
    // gd.drawImage(this.img, 0, this.nowFrame*this.h, this.w, this.h, this.x - this.w/2, this.y - this.h/2, this.w, this.h);
    gd.drawImage(this.img, 0, this.nowFrame * this.h, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

    gd.restore();
  };
  //鱼的换图动作
  Fish.prototype.nextFrame = function () {
    this.nowFrame++;
    if (this.nowFrame >= this.maxFrame) {
      this.nowFrame = 0;
    }
  };
  //鱼的移动
  Fish.prototype.move = function () {
    //三角函数
    //y=sin(a)*speed
    //x=cos(a)*speed
    this.x += Math.cos(util.d2a(this.rotate)) * this.speed;
    this.y += Math.sin(util.d2a(this.rotate)) * this.speed;
  };
  //------------ Cannon.js 炮体元素
  function Cannon(img, w, h, maxFrame) {
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
  Cannon.prototype.draw = function (gd) {
    gd.save();
    gd.translate(this.x, this.y);
    gd.rotate(util.d2a(this.rotate));
    gd.drawImage(this.img, 0, 0, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
    gd.restore();
  }
  //炮体的换图动作
  Cannon.prototype.nextFrame = function () {
    this.nowFrame++;
    if (this.nowFrame >= this.maxFrame) {
      this.nowFrame = 0;
    }
  };
  //------------ Play.js 组件元素
  function Play(img, w, h) {
    this.x = 0;
    this.y = 0;

    this.img = img;
    this.w = w;
    this.h = h;
  }
  //绘制炮体
  Play.prototype.draw = function (gd) {
    gd.save();
    gd.translate(this.x, this.y);
    gd.drawImage(this.img, 0, 0, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
    gd.restore();
  }
  //------------ Bullet.js 炮弹元素
  function Bullet(img, sx, sy, w, h) {
    this.x = 0;
    this.y = 0;
    this.num = 1;

    this.img = img;
    this.w = w;
    this.h = h;
    this.sx = sx;
    this.sy = sy;

    this.rotate = 0;
    this.speed = 7;
  }
  //绘制炮弹
  Bullet.prototype.draw = function (gd) {
    gd.save();

    gd.translate(this.x, this.y);
    gd.rotate(util.d2a(this.rotate));

    gd.drawImage(this.img, this.sx, this.sy, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

    gd.restore();
  };
  //炮弹移动
  Bullet.prototype.move = function () {
    var speedX = Math.cos(util.d2a(this.rotate - 90)) * this.speed;
    var speedY = Math.sin(util.d2a(this.rotate - 90)) * this.speed;

    this.x += speedX;
    this.y += speedY;
  };
  //------------ Coin.js 金币元素
  function Coin(img, x, y, w, h, targetX, targetY, maxFrame) {
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
  Coin.prototype.draw = function (gd) {
    gd.save();
    gd.translate(this.x, this.y);
    gd.drawImage(this.img, 0, this.nowFrame * this.h, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
    gd.restore();
  };
  //移动金币
  Coin.prototype.move = function (gd) {
    this.n++;

    var disX = this.targetX - this.startX;
    var disY = this.targetY - this.startY;

    this.x = this.startX + disX * this.n / 30;
    this.y = this.startY + disY * this.n / 30;
  };
  //换图
  Coin.prototype.nextFrame = function (gd) {
    this.nowFrame++;
    if (this.nowFrame >= this.maxFrame) {
      this.nowFrame = 0;
    }
  };
  //------------ CoinText.js 金币数字元素
  function CoinText(img, sx, sy, x, y, w, h, targetX, targetY) {
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
  CoinText.prototype.draw = function (gd) {
    gd.save();
    gd.translate(this.x, this.y);
    gd.drawImage(this.img, this.sx, this.sy, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
    gd.restore();
  };
  //移动金币
  CoinText.prototype.move = function (gd) {
    this.time++;

    var disX = this.targetX - this.x;
    var disY = this.targetY - this.y;

    this.x = this.x + disX * this.speed / 30;
    this.y = this.y + disY * this.speed / 30;
  };
  //------------ DeadFish.js 死鱼元素
  function DeadFish(img, w, h, n, maxFrame) {
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

  DeadFish.prototype.draw = function (gd) {
    gd.save();
    gd.translate(this.x, this.y);
    gd.rotate(util.d2a(this.rotate));
    if (Math.abs(this.rotate) >= 90) {
      gd.scale(1, -1);
    }
    gd.drawImage(this.img, 0, this.n * this.h + this.nowFrame * this.h, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
    gd.restore();
  };

  DeadFish.prototype.nextFrame = function () {
    this.nowFrame++;
    if (this.nowFrame >= this.maxFrame) {
      this.nowFrame = 0;
    }
  };
  //------------ Web.js 渔网元素
  function Web(img, w, h, x, y, sx, sy) {
    this.x = x;
    this.y = y;

    this.img = img;
    this.w = w;
    this.h = h;

    this.sx = sx;
    this.sy = sy;
    this.scale = 0.5;

  }
  //绘制渔网
  Web.prototype.draw = function (gd) {
    gd.save();
    gd.translate(this.x, this.y);
    gd.scale(this.scale, this.scale);
    gd.drawImage(this.img, this.sx, this.sy, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
    gd.restore();
  };
  //------------ util
  var util = {
    //加载图片
    loadImages: function (arr, fn, fnError) {
      var _count = 0;
      var _json = {};
      for (var i = 0; i < arr.length; i++) {
        var _oImg = new Image();
        (function (index) {
          _oImg.onload = function () {
            var name = arr[index].split('.')[0];
            _json[name] = this;
            _count++;
            if (_count == arr.length) {
              fn(_json);
            }
          };
          _oImg.onerror = function () {
            fnError && fnError();
          };
        })(i);
        _oImg.src = 'https://coolfishstudio.github.io/game-fishing-single/images/' + arr[i];
      };
    },
    //弧度转角度
    d2a: function (n) {
      return n * Math.PI / 180;
    },
    //角度转弧度
    a2d: function (n) {
      return n * 180 / Math.PI;
    },
    //判断鱼是否出去
    isNotInScreen: function (W, H, obj, padding) {
      if (obj.x < -padding || obj.x > W + padding || obj.y < -padding || obj.y > H + padding) {
        return true;
      } else {
        return false;
      }
    },
    //人为规定出现几率
    getOdds: function (num) { //0-99
      if (num < 20 && num >= 0) { //20%
        return 0;
      } else if (num < 35 && num > 19) { //15%
        return 1;
      } else if (num < 47 && num > 34) { //12%
        return 2;
      } else if (num < 57 && num > 46) { //10%
        return 3;
      } else if (num < 65 && num > 56) { //8%
        return 4;
      } else if (num < 73 && num > 64) { //8%
        return 5;
      } else if (num < 80 && num > 72) { //7%
        return 6;
      } else if (num < 87 && num > 79) { //7%
        return 7;
      } else if (num < 92 && num > 86) { //5%
        return 8;
      } else if (num < 97 && num > 91) { //5%
        return 9;
      } else if (num < 99 && num > 96) { //2%
        return 10;
      } else if (num < 100 && num > 98) { //1%
        return 11;
      }
    },
    //判断两物体是否碰撞
    isNotCollision: function (obj1, obj2) {

      var x = obj1.x - obj2.x;
      var y = obj1.y - obj2.y;
      var dis = Math.sqrt(x * x + y * y);
      if (dis <= obj1.w / 2 + obj2.w / 2) {
        return true;
      } else {
        return false;
      }
    },
    //捕鱼概率
    randomFish: function (m, n) {//m 炮弹 n 鱼
      var randomNum = Math.random();//[0,1)
      var getNum = 0.05 + (m - n) * 0.0005;
      if (getNum > randomNum) {
        return true;
      } else {
        return false;
      }
    }
  };
  //------------ material
  var material = {
    //图片
    img: [
      //鱼				//宽		高		游		死
      'fish1.png',	//55 	37		4		4
      'fish2.png',	//78	64		4		4
      'fish3.png',	//72	56		4		4
      'fish4.png',	//77	59		4		4
      'fish5.png',	//107	122		4		4
      'fish6.png',	//105	79		8 		4
      'fish7.png',	//92	151		6 		4
      'fish8.png',	//174	126		8		4
      'fish9.png',	//166	183		8		4
      'fish10.png',	//178	187		6 		4
      //鲨鱼
      'shark1.png',	//509	270		8		4
      'shark2.png',	//516	273		8		4
      //组件
      'bottomBar.png',//765	71
      'energyBar.png',//213	19
      'cannonMinus.png',//44	31
      'cannonPlus.png',//44	31
      'cannonMinusDown.png',//44	31
      'cannonPlusDown.png',//44	31
      //炮体
      'cannon1.png',	//74	74
      'cannon2.png',	//74	76
      'cannon3.png',	//74	76
      'cannon4.png',	//74	83
      'cannon5.png',	//74	85
      'cannon6.png',	//74	90
      'cannon7.png',	//74	94
      //炮弹
      'bullet.png',
      //金币
      'coinAni1.png',	//60	60
      'coinAni2.png',	//60	60
      //数字
      'coinText.png',
      //渔网
      'web.png'
    ],
    //音乐
    music: []
  };
  //------------ main
  var oBox = document.getElementById('playBox');//游戏盒子
  var gd = oBox.getContext('2d');//用来绘制元素
  var fish_padding = 300;
  var bull_padding = 0;
  var aFish = [];//用来存放鱼元素
  var aBull = [];//用来存放炮弹的
  var oNum = 0;//记录当前是第几个炮体
  var oPBtn = false;//记录按钮是否被点击
  var oMBtn = false;//记录按钮是否被点击
  var aCoin = [];//用来存放金币元素
  var aCoinText = [];//用来存放金币数字元素
  var aDeadFish = [];//用来存放死鱼元素
  var aWeb = [];//用来存放渔网元素
  //加载图片
  util.loadImages(material.img, function (imgs) {
    //加载成功
    var fishs = [
      { img: imgs.fish1, w: 55, h: 37, m: 4, c: 1 },
      { img: imgs.fish2, w: 78, h: 64, m: 4, c: 2 },
      { img: imgs.fish3, w: 72, h: 56, m: 4, c: 5 },
      { img: imgs.fish4, w: 77, h: 59, m: 4, c: 10 },
      { img: imgs.fish5, w: 107, h: 122, m: 4, c: 15 },
      { img: imgs.fish6, w: 105, h: 79, m: 8, c: 20 },
      { img: imgs.fish7, w: 92, h: 151, m: 6, c: 25 },
      { img: imgs.fish8, w: 174, h: 126, m: 8, c: 30 },
      { img: imgs.fish9, w: 166, h: 183, m: 8, c: 40 },
      { img: imgs.fish10, w: 178, h: 187, m: 6, c: 50 },
      { img: imgs.shark1, w: 509, h: 270, m: 8, c: 100 },
      { img: imgs.shark2, w: 516, h: 273, m: 8, c: 200 }
    ];
    var cannons = [
      { img: imgs.cannon1, w: 74, h: 74 },
      { img: imgs.cannon2, w: 74, h: 76 },
      { img: imgs.cannon3, w: 74, h: 76 },
      { img: imgs.cannon4, w: 74, h: 83 },
      { img: imgs.cannon5, w: 74, h: 85 },
      { img: imgs.cannon6, w: 74, h: 90 },
      { img: imgs.cannon7, w: 74, h: 94 },
    ];
    var bulls = [
      { img: imgs.bullet, sx: 86, sy: 0, w: 24, h: 26 },
      { img: imgs.bullet, sx: 61, sy: 0, w: 25, h: 29 },
      { img: imgs.bullet, sx: 32, sy: 35, w: 27, h: 31 },
      { img: imgs.bullet, sx: 30, sy: 82, w: 29, h: 33 },
      { img: imgs.bullet, sx: 0, sy: 82, w: 30, h: 34 },
      { img: imgs.bullet, sx: 30, sy: 0, w: 31, h: 35 },
      { img: imgs.bullet, sx: 0, sy: 44, w: 32, h: 38 },
      { img: imgs.bullet, sx: 0, sy: 0, w: 30, h: 44 }
    ];
    var coins = [
      { img: imgs.coinAni1, w: 60, h: 60 },
      { img: imgs.coinAni2, w: 60, h: 60 }
    ];
    var coinTexts = {
      '0': { img: imgs.coinText, sx: 0, w: 36, h: 49 },//0
      '1': { img: imgs.coinText, sx: 36, w: 36, h: 49 },//1
      '2': { img: imgs.coinText, sx: 72, w: 36, h: 49 },//2
      '3': { img: imgs.coinText, sx: 108, w: 36, h: 49 },//3
      '4': { img: imgs.coinText, sx: 144, w: 36, h: 49 },//4
      '5': { img: imgs.coinText, sx: 180, w: 36, h: 49 },//5
      '6': { img: imgs.coinText, sx: 216, w: 36, h: 49 },//6
      '7': { img: imgs.coinText, sx: 252, w: 36, h: 49 },//7
      '8': { img: imgs.coinText, sx: 288, w: 36, h: 49 },//8
      '9': { img: imgs.coinText, sx: 324, w: 36, h: 49 },//9
      'x': { img: imgs.coinText, sx: 360, w: 36, h: 49 }//x
    };
    var webs = [
      { img: imgs.web, sx: 319, sy: 355, w: 116, h: 118 },
      { img: imgs.web, sx: 0, sy: 399, w: 137, h: 142 },
      { img: imgs.web, sx: 163, sy: 355, w: 156, h: 162 },
      { img: imgs.web, sx: 242, sy: 181, w: 180, h: 174 },
      { img: imgs.web, sx: 0, sy: 244, w: 163, h: 155 },
      { img: imgs.web, sx: 242, sy: 0, w: 191, h: 181 },
      { img: imgs.web, sx: 0, sy: 0, w: 242, h: 244 },
    ];
    //点击事件
    document.onclick = function (ev) {
      //控制面板的位置

      var x1 = ev.pageX - oBox.offsetLeft;
      var y1 = ev.pageY - oBox.offsetTop;
      if (x1 > 87 && x1 < 850 && y1 < oBox.height && y1 > oBox.height - 40) {
        //左侧按钮 433 467    671 695
        if (x1 < 467 && x1 > 433 && y1 < 695 && y1 > 671) {
          oNum--;
          if (oNum < 0) {
            oNum = 6;
          }
          oMBtn = true;
        }
        //右侧按钮 557 591 	671 695
        if (x1 < 591 && x1 > 557 && y1 < 695 && y1 > 671) {
          oNum++;
          if (oNum > 6) {
            oNum = 0;
          }
          oPBtn = true;
        }
        //绘制新炮体
        _cannon = cannons[oNum];
        cannon = new Cannon(_cannon.img, _cannon.w, _cannon.h, 5);
        cannon.x = 512;
        cannon.y = oBox.height - 30;
      } else {
        //旋转炮体
        var x2 = cannon.x;
        var y2 = cannon.y;
        var x = x1 - x2;
        var y = y1 - y2;
        var a = Math.atan2(y, x);
        cannon.rotate = util.a2d(a) + 90;

        //创建炮弹
        var _bull = bulls[oNum];
        var bullet = new Bullet(_bull.img, _bull.sx, _bull.sy, _bull.w, _bull.h);
        bullet.x = cannon.x;
        bullet.y = cannon.y;
        bullet.num = oNum + 1;
        bullet.rotate = cannon.rotate;
        aBull.push(bullet);
      }
    };
    //出现下一只鱼
    function nextFish() {
      setTimeout(function () {
        // var _fish = fishs[Math.floor(Math.random() * fishs.length)];
        var _fishNum = util.getOdds(parseInt(Math.random() * 100));
        var _fish = fishs[_fishNum];
        var oF = new Fish(_fish.img, _fish.w, _fish.h, _fish.m);
        if (Math.random() < 0.5) {
          //鱼从左面出来
          oF.x = -fish_padding;
          oF.rotate = Math.random() * 120 - 60;//[-60,60)
        } else {
          //鱼从右面出来
          oF.x = oBox.width + fish_padding;
          oF.rotate = Math.random() * 120 - 240;//[-240,120)
        }
        oF.y = Math.random() * oBox.height;
        oF.c = _fish.c;
        oF.num = _fishNum + 1;
        aFish.push(oF);
        nextFish();
      }, Math.random() * 500);
    }
    nextFish();
    //定义炮体
    var _cannon = cannons[oNum];
    var cannon = new Cannon(_cannon.img, _cannon.w, _cannon.h, 5);
    cannon.x = 512;
    cannon.y = oBox.height - 30;
    //定义组件
    var bottomBar = new Play(imgs.bottomBar, 765, 71);
    bottomBar.x = 468;
    bottomBar.y = oBox.height - 35;
    //定义能量管
    var energyBar = new Play(imgs.energyBar, 213, 19);
    energyBar.x = 735;
    energyBar.y = oBox.height - 17;
    //定义增加按钮
    var cannonMinus = new Play(imgs.cannonMinus, 44, 31);
    cannonMinus.x = 450;
    cannonMinus.y = oBox.height - 20;
    var cannonMinusDown = new Play(imgs.cannonMinusDown, 44, 31);
    cannonMinusDown.x = 450;
    cannonMinusDown.y = oBox.height - 20;
    //定义增加按钮
    var cannonPlus = new Play(imgs.cannonPlus, 44, 31);
    cannonPlus.x = 575;
    cannonPlus.y = oBox.height - 20;
    var cannonPlusDown = new Play(imgs.cannonPlusDown, 44, 31);
    cannonPlusDown.x = 575;
    cannonPlusDown.y = oBox.height - 20;



    //两个定时器 一个处理换图 一个处理移动绘制
    //绘制
    _setInterval(function () {
      //清除画布
      gd.clearRect(0, 0, oBox.width, oBox.height);
      //绘制鱼
      for (var i = 0; i < aFish.length; i++) {
        if (util.isNotInScreen(oBox.width, oBox.height, aFish[i], fish_padding)) {
          aFish.splice(i--, 1);
          continue;
        }
        aFish[i].move();
        aFish[i].draw(gd);
      };
      //绘制死鱼
      for (var i = 0; i < aDeadFish.length; i++) {
        aDeadFish[i].draw(gd);
      }
      //绘制渔网
      for (var i = 0; i < aWeb.length; i++) {
        aWeb[i].scale += 0.04;
        aWeb[i].draw(gd);
        if (aWeb[i].scale >= 1) {
          aWeb.splice(i--, 1);
        }
      }

      //绘制金币
      for (var i = 0; i < aCoin.length; i++) {
        if (aCoin[i].x >= aCoin[i].targetX - 50 && aCoin[i].x <= aCoin[i].targetX + 50 && aCoin[i].y >= aCoin[i].targetY - 30 && aCoin[i].y <= aCoin[i].targetY + 30) {
          aCoin.splice(i--, 1);
          continue;
        }
        aCoin[i].move();
        aCoin[i].draw(gd);
      };
      //绘制分数
      for (var i = 0; i < aCoinText.length; i++) {
        if (aCoinText[i].time >= 20) {
          aCoinText.splice(i--, 1);
          continue;
        }
        aCoinText[i].move();
        aCoinText[i].draw(gd);
      };
      //绘制组件
      bottomBar.draw(gd);
      energyBar.draw(gd);
      if (oMBtn) {
        cannonMinusDown.draw(gd);
        oMBtn = false;
      } else {
        cannonMinus.draw(gd);
      }
      if (oPBtn) {
        cannonPlusDown.draw(gd);
        oPBtn = false;
      } else {
        cannonPlus.draw(gd);
      }
      //绘制炮弹
      for (var i = 0; i < aBull.length; i++) {
        if (util.isNotInScreen(oBox.width, oBox.height, aBull[i], bull_padding)) {
          aBull.splice(i--, 1);
          continue;
        }
        aBull[i].move();
        aBull[i].draw(gd);
      }

      //绘制炮体
      cannon.draw(gd);
      //碰撞检测
      for (var i = 0; i < aFish.length; i++) {
        for (var j = 0; j < aBull.length; j++) {
          if (util.isNotCollision(aFish[i], aBull[j])) {
            //渔网
            var _web = webs[oNum];
            var oWeb = new Web(_web.img, _web.w, _web.h, aBull[j].x, aBull[j].y, _web.sx, _web.sy);
            aWeb.push(oWeb);
            for (var f = 0; f < aFish.length; f++) {
              for (var w = 0; w < aWeb.length; w++) {
                if (util.isNotCollision(aFish[f], aWeb[w]) && util.randomFish(aBull[j].num, aFish[f].num)) {
                  //生成金币
                  var _coinText = aFish[f].c + 'x';
                  if (aFish[f].c < 10) {
                    var _coin = coins[0];
                  } else {
                    var _coin = coins[1];
                  }
                  var oCoin = new Coin(_coin.img, aFish[f].x, aFish[f].y, _coin.w, _coin.h, 160, 665, 10);
                  aCoin.push(oCoin);
                  //生成积分
                  for (var t = 0; t < _coinText.length; t++) {
                    var _coinTextAt = coinTexts[_coinText.charAt(t)];
                    var oCoinText = new CoinText(_coinTextAt.img, _coinTextAt.sx, 0, aFish[f].x + 36 * t, aFish[f].y, _coinTextAt.w, _coinTextAt.h, aFish[f].x + 36 * t, aFish[f].y - 50);
                    aCoinText.push(oCoinText);
                  }
                  //生成死鱼
                  var oDeadFish = new DeadFish(aFish[f].img, aFish[f].w, aFish[f].h, aFish[f].maxFrame, 4);
                  oDeadFish.x = aFish[f].x;
                  oDeadFish.y = aFish[f].y;
                  oDeadFish.rotate = aFish[f].rotate;
                  aDeadFish.push(oDeadFish);
                  (function (odf) {
                    setTimeout(function () {
                      for (var i = 0; i < aDeadFish.length; i++) {
                        if (aDeadFish[i] == odf) {
                          aDeadFish.splice(i, 1);
                          break;
                        }
                      }
                    }, 800);
                  })(oDeadFish);
                  aFish.splice(f--, 1);
                }
              }
            }
            aBull.splice(j--, 1);
            break;
          }
        }
      }

    }, 16);
    //换图
    _setInterval(function () {
      for (var i = 0; i < aFish.length; i++) {
        aFish[i].nextFrame();
      }
      for (var i = 0; i < aCoin.length; i++) {
        aCoin[i].nextFrame();
      }
      for (var i = 0; i < aDeadFish.length; i++) {
        aDeadFish[i].nextFrame();
      }
      cannon.nextFrame();
    }, 150);

  }, function () {
    //加载失败
    alert('加载失败，请刷新重试。');
  });

  function _setInterval(func, delay) {
    let timer = null;
    const interval = () => {
      func();
      timer = setTimeout(interval, delay);
    }
    setTimeout(interval, delay);
    return {
      cancel: () => {
        clearTimeout(timer);
      }
    }
  }
}

const isInMicroApp = window.__POWERED_BY_QIANKUN__;

const render = () => {
  //加载
  main();
  return Promise.resolve();
};

(global => {
  global['gamePanel'] = {
    bootstrap: () => {
      return Promise.resolve();
    },
    mount: () => {
      return render();
    },
    unmount: () => {
      return Promise.resolve();
    },
  };
})(window);

if (!isInMicroApp) {
  //加载
  document.addEventListener('DOMContentLoaded', function () {
    main();
  }, false);
}
