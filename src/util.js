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



};