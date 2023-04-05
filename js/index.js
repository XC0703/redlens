let infoList = document.querySelectorAll('.contrastBtn');
const megs = ['color_motion','red_image','empty_shot'];
for(let i = 0;i<infoList.length;i++){
    if(i==0){
        infoList[i].addEventListener("click",function(){
            //路径+参数名+参数值  使用encodeURI进行编码，可以传中文
            window.open(encodeURI('./src/pages/color_motion/compare.html?'+'message='+megs[i]))
        })
    }else if(i==1){
        infoList[i].addEventListener("click",function(){
            //路径+参数名+参数值  使用encodeURI进行编码，可以传中文
            window.open(encodeURI('./src/pages/red_image/red_image.html?'+'message='+megs[i]))
        })
    }
    else{
        infoList[i].addEventListener("click",function(){
            //路径+参数名+参数值  使用encodeURI进行编码，可以传中文
            window.open(encodeURI('./src/pages/empty_shot/compare.html?'+'message='+megs[i]))
        })
    }
}

