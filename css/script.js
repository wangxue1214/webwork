/*
* @Author: wangxue1214
* @Date:   2020-12-11 15:46:52
* @Last Modified by:   wangxue1214
* @Last Modified time: 2020-12-11 15:53:46
*/
function next(){
			if(!isMoving){
				isMoving=true;
				i++;
				navChange();
				move(slider,{left:-1200*i},function(){
					if(i==5){
						slider.style.left='-1200px';
						i=1;
					}
					isMoving=false;
				});
			}
			// 或者写成下面的形式
			// if(isMoving){
			// 	return;
			// }
			// i++;
			// 	navChange();
			// 	move(slider,{left:-1200*i},function(){
			// 		if(i==5){
			// 			slider.style.left='-1200px';
			// 			i=1;
			// 		}
			// 		isMoving=false;
			// 	});
			
		}
		function prev(){
			if(!isMoving){
				isMoving=true;
				i--;
				navChange();
				move(slider,{left:-1200*i},function(){
					if(i==0){
						slider.style.left=-1200*4+'px';
						i=4;
					}
					isMoving=false;
				});
			}
		}
function getStyle(obj,style){
			if(obj.currentStyle){
				return obj.currentStyle(style);
			}else{
				return getComputedStyle(obj)[style];
			}
		}

		function move(obj,json,callback){
			clearInterval(obj.timer1);
			obj.timer1=setInterval(function(){
				var isStop=true;
				for(var attr in json){
					var now;
					if(attr=='opacity'){
						now=parseInt(getStyle(obj,attr)*100);
					}else{
						now=parseInt(getStyle(obj,attr));
					}
					var speed=(json[attr]-now)/6;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);
					var current=now+speed;
					if(attr=='opacity'){
						obj.style[attr]=current/100;
					}else{
						obj.style[attr]=current+'px';
					}
					if(current!=json[attr]){
						isStop=false;
					}
				}
				if(isStop){
					clearInterval(obj.timer1);
					if(callback){
						callback();
					}
				}
			},60);
		}
		
		//小按钮背景色切换
		function navChange(){
			for(var s=0;s<oNavlist.length;s++){
				oNavlist[s].className='';
			}
			if(i==5){
				oNavlist[0].className='active';
			}else if(i==0){
				oNavlist[3].className='active';
			}else{
				oNavlist[i-1].className='active';
			}
		}