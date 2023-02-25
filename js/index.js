let infoList = document.querySelectorAll('.contrastBtn');
const megs = ['empty_shot','motion','empty_shot','motion'];
for(let i = 0;i<infoList.length;i++){
    infoList[i].addEventListener("click",function(){
        //路径+参数名+参数值  使用encodeURI进行编码，可以传中文
        window.open(encodeURI('./src/pages/compare.html?'+'message='+megs[i]))
    })
}