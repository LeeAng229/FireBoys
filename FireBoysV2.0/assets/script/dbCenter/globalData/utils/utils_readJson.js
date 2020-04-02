//读取本地数据
window.readJson = ({success,fail}) => {
 
    cc.loader.loadRes('demo.json', function (err, object) {
        if (err) {
            console.log(err);
            return;
        }
        if (object != null) {
            //此时的obj是整个数据对象
            let obj = object.json;
            //存储到本地数据
            cc.sys.localStorage.setItem('obj',JSON.stringify(obj));
            //读取成功，把读取到的数据返回给调用函数
            if(cc.sys.localStorage.getItem('obj')){
                localData=JSON.parse(cc.sys.localStorage.getItem('obj'))
            }else{
                localData=obj
            }
            success(localData)
        }else{
            fail()
            console.log('读取失败')
        }
    });
};
//读取网络数据
//把读取到的数据存放到本地网络数据文件里面
window.readNetData=({success,fail})=>{
    success(1);
    fail(2)
};