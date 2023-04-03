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
$.getJSON('../compareSite/data/movie.json',data=>{
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
	select_left = {
		id:$(".select1 option:selected").val(),
		text:$(".select1 option:selected").text()
	}
	// const dom_left_map = document.querySelector(".bot_leftbox .chart_box .map");
	const dom_left = document.querySelector(".bot_leftbox .chart_box .chart");
	switch(select_info){
		case 'color_motion':
			// 创建iframe元素
			let iframe = document.createElement('iframe');
			// 设置iframe属性
			iframe.src = '../cinemetrics_iframe/index.html';
			iframe.width = '100%';
			iframe.height = '100%';
			// 使用兼容性更好的写法设置frameBorder
			iframe.setAttribute("frameBorder", "0");
			iframe.setAttribute("frameborder", "0");
			iframe.allowFullscreen = true;
			var iframes = dom_left.querySelectorAll('iframe');
			if (iframes.length > 0) {
				// 获取第一个iframe节点，并将其从父节点中删除
				var prevIframe = iframes[0];
				dom_left.removeChild(prevIframe);
			}
			// 将iframe添加到dom_left中
			dom_left.appendChild(iframe);
			break;
		case 'empty_shot':
			let img = document.createElement('img');
			var imgs = dom_left.querySelectorAll('img');
			if (imgs.length > 0) {
				// 获取第一个img节点，并将其从父节点中删除
				var prevImg = imgs[0];
				dom_left.removeChild(prevImg);
			}
			dom_left.appendChild(img);
			if(select_left.id){
				// dom_left_map.style.opacity = 0;
				img.src = decodeURI('./images/movie_imgs/'+select_info+'/'+select_left.id+'_'+select_left.text+'.png');
			}
			else{
				img.src = '';
				// dom_left_map.style.opacity = 1;
			}
			// console.log(select_left,select_right,select_info)
			break;
	}
});
$('.select2').change(()=>{
	// 获取右边select的值
	select_right = {
		id:$(".select2 option:selected").val(),
		text:$(".select2 option:selected").text()
	}
	// const dom_right_map = document.querySelector(".bot_rightbox .chart_box .map");
	const dom_right = document.querySelector(".bot_rightbox .chart_box .chart");
	switch(select_info){
		case 'color_motion':
			alert("现在选择的是色彩运镜！！！")
			break;
		case 'empty_shot':
			let img = document.createElement('img');
			var imgs = dom_right.querySelectorAll('img');
			if (imgs.length > 0) {
				// 获取第一个img节点，并将其从父节点中删除
				var prevImg = imgs[0];
				dom_right.removeChild(prevImg);
			}
			dom_right.appendChild(img);
			if(select_right.id){
				// dom_right_map.style.opacity = 0;
				img.src = decodeURI('./images/movie_imgs/'+select_info+'/'+select_right.id+'_'+select_right.text+'.png');
			}
			else{
				img.src = '';
				// dom_right_map.style.opacity = 1;
			}
		}
	// console.log(select_left,select_right,select_info)
});