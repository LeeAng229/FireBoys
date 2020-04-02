//生成随机数
window.randomNum=(lowerInteger, upperInteger)=> {
    let choices = upperInteger - lowerInteger + 1;
    return Math.floor(Math.random() * choices + lowerInteger);
}
