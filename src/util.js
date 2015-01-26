var util = {
	//加载图片
	loadImages : function(arr, fn, fnError){
		var _count = 0;
		var _json = {};
		for(var i = 0; i < arr.length; i++){
			var _oImg = new Image();
			(function(index){
				_oImg.onload = function(){
					var name = arr[index].split('.')[0];
					_json[name] = this;
					_count++;
					if(_count == arr.length){
						fn(_json);
					}
				};
				_oImg.onerror = function(){
					fnError && fnError();
				};
			})(i);
			_oImg.src = 'images/' + arr[i];
		};
	},
	//弧度转角度
	d2a : function(n){
		return n * Math.PI / 180;
	},
	//角度转弧度
	a2d : function(n){
		return n * 180 / Math.PI;
	},
	//判断鱼是否出去
	isNotInScreen : function(W, H, obj, padding){
		if(obj.x < -padding || obj.x > W + padding || obj.y < -padding || obj.y > H + padding){
			return true;
		}else{
			return false;
		}
	},
	//人为规定出现几率
	getOdds : function(num){ //0-99
		if(num < 20 && num >= 0){ //20%
			return 0;
		}else if(num < 35 && num > 19){ //15%
			return 1;
		}else if(num < 47 && num > 34){ //12%
			return 2;
		}else if(num < 57 && num > 46){ //10%
			return 3;
		}else if(num < 65 && num > 56){ //8%
			return 4;
		}else if(num < 73 && num > 64){ //8%
			return 5;
		}else if(num < 80 && num > 72){ //7%
			return 6;
		}else if(num < 87 && num > 79){ //7%
			return 7;
		}else if(num < 92 && num > 86){ //5%
			return 8;
		}else if(num < 97 && num > 91){ //5%
			return 9;
		}else if(num < 99 && num > 96){ //2%
			return 10;
		}else if(num < 100 && num > 98){ //1%	
			return 11;
		}
	}

};