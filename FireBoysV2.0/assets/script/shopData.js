
cc.Class({
    extends: cc.Component,

    properties: {
        label:cc.Label
    },

    onLoad() {
        // // window.login({ reqSuccess(){} })
        // cc.sys.localStorage.removeItem("obj");
        // // this.test()
        // this.test()
    //    let a= this.add(2)
    //    if(a==1){
    //        //请求解锁车辆的接口 
    //    }else if(a==0){
    //        //你自己写弹窗 让他无法解锁 或者购买
    // //    }
    // login({getSuccess(){
    //     console.log("登陆成功")
    // }})
    },
    
    // test3(){
    //     boy.getLocalData.getQuestionData({getSuccess(data){
    //         console.log("test3")
    //         console.log(data)
    //     }});
    //     // ti.num=100
    //     // boy.getReqData.addCoinNum(ti.num);
    // },
    // 
    test(){
        let self=this;
        boy.getLocalData.getCoinNum({getSuccess(data){
            console.log("test")
            console.log(data)
            self.label.string=""+data
        }});
    },

     // test(){
    //     let self=this;
    //     boy.getLocalData.getCoinNum({getSuccess(data){
    //         console.log(1)
    //         console.log(data)
    //         self.label.string=""+data
    //     }});
    start(){
        // this.test3()
    },
    add(ad){
        if(ad<1){
            return 0
        }else{
            console.log(222)
            return 1
        }
    },
    update(dt) {
        if(!this.bool){
            let self=this;
            boy.getLocalData.getCoinNum({getSuccess(data){
                self.label.string=""+data
                self._data=data
            }});
            if(self._data){
                this.bool=true;
            }
        }
     },
});
