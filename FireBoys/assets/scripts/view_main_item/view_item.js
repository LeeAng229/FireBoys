const str = {
    "shopItemList":{
        "id":"itemId",
        "name":"itemName",
        "rarity":"itemRarity",
        "price":"itemPrice",
        "sell":"itemSell",
        "image":"itemImage",
        "introduce":"itemIntroduce"
    },
    "carList":{
        "id":"carId",
        "name":"carName",
        "rarity":"carRarity",
        "price":"carPrice",
        "image":"goodCarImage",
        "introduce":"carIntroduce"
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //获取现在已经拥有的数量
        this.hadNum = 0;
        this.refreshItemHadNum();
    },

    refreshItemHadNum(){
        this.node.getChildByName('item_hadNum').getChildByName('item_num').getComponent(cc.Label).string = this.hadNum;
    },

    initByData(Data,itemType,shoppingNode){
        this.shoppingNode = shoppingNode;
        let urlKey = str[itemType].image;
        let nameKey = str[itemType].name;
        let priceKey = str[itemType].price;
        let introduceKey = str[itemType].introduce;

        cc.loader.loadRes(`${Data[urlKey]}`,cc.SpriteFrame,(err,data)=>{
            if(err){
                cc.error('读取有误，请检查路径是否正确！');
                return;
            }
            this.node.getChildByName('item_image_border').getChildByName('item_image').getComponent(cc.Sprite).spriteFrame = data;
        });
        this.node.getChildByName('item_name').getComponent(cc.Label).string = Data[nameKey];
        this.node.getChildByName('item_price').getChildByName('item_price_label').getComponent(cc.Label).string = Data[priceKey];
        this.node.getChildByName('item_introduction').getComponent(cc.Label).string  = Data[introduceKey];
        this.node.active = true;
        this.node.price = Data[priceKey];
    },

    //给购买按键添加一个点击事件
    buyBtn(){
        //获取当前道具的价格
        let itemPrice = Number(this.node.price);
        //获取当前拥有的金币数量
        cc.loader.loadRes('JSON/player',(err,data)=>{
            if(err){
                cc.error('player文件读取有误，请检查路径是否有误！');
                return;
            }
            let coinCount = Number(data.json.playerCoinCount);
            if(coinCount > itemPrice){
                coinCount -= itemPrice;
                data.json.playerCoinCount = coinCount;
                cc.log('购买成功');

                this.hadNum += 1;
                this.refreshItemHadNum();
            }else{
                cc.log('金币不足，不能购买');
            }
            this.shoppingNode.getComponent('view_main_shopping').refreshCoinCount();
        });
    },

    start () {

    },

    // update (dt) {},
});
