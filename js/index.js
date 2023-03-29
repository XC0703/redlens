let infoList = document.querySelectorAll('.contrastBtn');
const megs = ['empty_shot','motion','color','motion'];
for(let i = 0;i<infoList.length;i++){
    if(i!=2){
        infoList[i].addEventListener("click",function(){
            //路径+参数名+参数值  使用encodeURI进行编码，可以传中文
            window.open(encodeURI('./src/pages/compare.html?'+'message='+megs[i]))
        })
    }else{
        infoList[i].addEventListener("click",function(){
            //路径+参数名+参数值  使用encodeURI进行编码，可以传中文
            window.open(encodeURI('./src/pages/ChangjinLake.html?'+'message='+megs[i]))
        })
    }
}