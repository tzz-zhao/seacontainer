export function resizeMyCharts(mycharts){
    window.addEventListener('resize',function(){
        mycharts.resize();
    })
}