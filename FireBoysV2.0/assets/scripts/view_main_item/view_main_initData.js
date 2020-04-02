cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //cc.sys.localStorage.removeItem('obj');
        if(!cc.sys.localStorage.getItem('obj')){
            boy.getLocalData.getLocalData({
                localPullSuccess(data){
                }
            })
        }
    },

    start () {

    },

    // update (dt) {},
});
