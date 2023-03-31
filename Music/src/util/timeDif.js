//计算两个时间之间的时间差多少秒
export const timeDif=(startTime,endTime)=> {
    var timestamp = (Date.parse(new Date()))/1000
     var date1 = "" //开始时间
    if(timestamp<startTime){
        date1=startTime
    }else{
        date1 = timestamp //开始时间
    }
    var date2 = endTime //结束时间
    
    var seconds =  (date2- date1)/1000 //时间差的毫秒数
    return seconds
}
