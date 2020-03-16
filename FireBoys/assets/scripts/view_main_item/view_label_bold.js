cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent(cc.Label)._isBold = true;
    },

    start () {

    },

    // update (dt) {},
});
