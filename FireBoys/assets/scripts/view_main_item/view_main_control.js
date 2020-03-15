cc.Class({
    extends: cc.Component,

    properties: {
        openShoppingBtn:cc.Node,
        shoppingPre:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.shoppingArr = [];
        this.openShoppingBtn.on(cc.Node.EventType.TOUCH_END,(event)=>{
            if(this.shoppingArr.length<1){
                let shopping = cc.instantiate(this.shoppingPre);
                shopping.parent = this.node.getChildByName('view_main_shopping');
                this.shoppingArr.push(shopping);
            }else{
                this.shoppingArr[0].active = true;
            }
        })
    },

    start () {

    },

    // update (dt) {},
});
