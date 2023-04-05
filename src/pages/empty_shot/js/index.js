// 预加载图片
let imgs = [];
function preloadImages() {
	let imgArray = [
		decodeURI('./images/movie_imgs/empty_shot/0_八佰.png'),
		decodeURI('./images/movie_imgs/empty_shot/1_渡江侦察记.png'),
		decodeURI('./images/movie_imgs/empty_shot/2_芙蓉镇.png'),
		decodeURI('./images/movie_imgs/empty_shot/3_红灯记.png'),
		decodeURI('./images/movie_imgs/empty_shot/4_红海行动.png'),
		decodeURI('./images/movie_imgs/empty_shot/5_湄公河行动.png'),
		decodeURI('./images/movie_imgs/empty_shot/6_上甘岭.png'),
		decodeURI('./images/movie_imgs/empty_shot/7_我和我的祖国.png'),
		decodeURI('./images/movie_imgs/empty_shot/8_战狼.png'),
		decodeURI('./images/movie_imgs/empty_shot/9_战狼2.png'),
		decodeURI('./images/movie_imgs/empty_shot/10_长津湖.png'),
	];
	for (let i = 0; i < imgArray.length; i++) {
		let tempImage = new Image();
		tempImage.src = imgArray[i];
		imgs.push(tempImage);
	}
}
// 页面加载完成后调用预加载图片函数
window.onload = preloadImages;


//导入本地数据
// 深拷贝函数
// 类型判断
function judgeType (data) {
	return Object.prototype.toString.call(data).slice(8, -1)
}
// 递归实现深拷贝
function deepCopy (param) {
	let np = judgeType(param) === 'Array'? []:{}
	for (let i in param) {
		if (['Array','Object'].includes(judgeType(param[i]))) {
			np[i] = deepCopy(param[i])
		} else {
			// 包括函数，也在此直接赋值
			np[i] = param[i]
		}
	}
	return np
}
// 使用封装的深拷贝读取json数据
let movieData;
$.ajaxSetup({async:false});//将getJson函数的执行方式改为同步执行，即可对外面的变量进行赋值操作
$.getJSON('./data/movie.json',data=>{
    movieData=deepCopy(data);
})
$.ajaxSetup({async:true});//将执行方式改回异步执行即可



// 全局对象--左边select的值、右边select的值、下方电影属性的值(根据url获得)
let select_left = "";
let select_right = "";
let select_info = decodeURI(document.URL).slice(decodeURI(document.URL).indexOf("=")+1);



// 使用select2.js
$(document).ready(function() {
    $('.singleSelect').select2({
        placeholder: '---请选择电影---',
        data:movieData,
		allowClear: true
    });
});
// 监听下拉选择框的改变,并执行回调
$('.select1').change(()=>{
	// 获取左边select的值
	select_left = $(".select1").select2("data")[0];
	// const dom_left_map = document.querySelector(".bot_leftbox .chart_box .map");
	const dom_left_word = document.querySelector(".bot_leftbox .chart_box .word");
	const p1 = dom_left_word.querySelector("p:first-child");
	const p2 = dom_left_word.querySelector("p:nth-child(2)");
	const dom_left_img = document.querySelector(".bot_leftbox .chart_box .chart img");
	if(select_left.id){
		// dom_left_map.style.opacity = 0;
		if(select_info=='empty_shot'){
			p1.textContent = select_left.director;
			p2.textContent = select_left.year;
			// dom_left_img.src = decodeURI('./images/movie_imgs/'+select_info+'/'+select_left.id+'_'+select_left.text+'.png');
			dom_left_img.src = imgs[select_left.id].src;
		}
	}
	else{
		p1.textContent = '';
		p2.textContent = '';
		dom_left_img.src = '';
		// dom_left_map.style.opacity = 1;
	}
	// console.log(select_left,select_right,select_info)
});
$('.select3').change(()=>{
	// 获取右边select的值
	select_right = $(".select3").select2("data")[0];
	// const dom_right_map = document.querySelector(".bot_rightbox .chart_box .map");
	const dom_right_word = document.querySelector(".bot_rightbox .chart_box .word");
	const p1 = dom_right_word.querySelector("p:first-child");
	const p2 = dom_right_word.querySelector("p:nth-child(2)");
	const dom_right_img = document.querySelector(".bot_rightbox .chart_box .chart img");
	if(select_right.id){
		// dom_right_map.style.opacity = 0;
		if(select_info=='empty_shot'){
			p1.textContent = select_right.director;
			p2.textContent = select_right.year;
			// dom_right_img.src = decodeURI('./images/movie_imgs/'+select_info+'/'+select_right.id+'_'+select_right.text+'.png');
			dom_right_img.src = imgs[select_right.id].src;;
		}
	}
	else{
		p1.textContent = '';
		p2.textContent = '';
		dom_right_img.src = '';
		// dom_right_map.style.opacity = 1;
	}
	// console.log(select_left,select_right,select_info)
});