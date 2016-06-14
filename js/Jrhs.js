//事件的绑定兼容
function addEvent(obj,evName,evFn){
	window.fn1 = function(){
		evFn.call(obj);
	}
	if(obj.addEventListener){
		obj.addEventListener(evName,evFn,false);
	}else{
		obj.attachEvent('on'+evName,window.fn1)
	}
}
//鼠标滚轮的上下滚动事件兼容
function addWheel(obj,fn){
	//判断是否为FF
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
		addEvent(obj,'DOMMouseScroll',evFn);
	}else{
		addEvent(obj,'mousewheel',evFn);
	}
	function evFn(ev){
		var down = 0;
		//查看是向上滚动还是向下滚动
		if(ev.wheelDelta){
			//在非FF下大于0就是向上小于0就是向下
			down = ev.wheelDelta>0?true:false;
		}else{
			//在FF下大于0就是向下小于0就是向上
			down = ev.detail<0?true:false;
		}
		if(fn && typeof fn === 'function'){
			fn(down);
		}
		//阻止浏览器默认行为。
		if(ev.preventDefault){
			ev.preventDefault();
		}
		return false;
	}
}
addWheel(document,function(down){
	if(down){
		alert('向上')
	}else{
		alert('下')
	}
});
