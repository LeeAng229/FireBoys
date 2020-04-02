const str = {
    "itemList":{
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
        let idKey = str[itemType].id;

        cc.loader.loadRes(`${Data[urlKey]}`,cc.SpriteFrame,(err,data)=>{
            if(err){
                cc.error('读取有误，请检查路径是否正确！',Data);
                return;
            }
            this.node.getChildByName('item_image_border').getChildByName('item_image').getComponent(cc.Sprite).spriteFrame = data;
        });
        this.node.getChildByName('item_name').getComponent(cc.Label).string = Data[nameKey];
        this.node.getChildByName('item_price').getChildByName('item_price_label').getComponent(cc.Label).string = Data[priceKey];
        this.node.getChildByName('item_introduction').getComponent(cc.Label).string  = Data[introduceKey];
        this.node.active = true;
        this.node.price = Data[priceKey];
        this.node.id = Data[idKey];

        let self = this;
        //获取现在已经拥有的数量
        this.hadNum = 0;
        boy.getLocalData.getBagData({
            getSuccess(data){
                for(let i = 0; i<data.length; i++){
                    if(self.node.id == data[i].itemId){
                        self.hadNum = Number(data[i].itemCount);
                    }
                }
                self.refreshItemHadNum();
            }
        })
    },

    //给购买按键添加一个点击事件
    buyBtn(){
        let self = this;
        //获取当前道具的价格
        let itemPrice = Number(this.node.price);
        //获取当前拥有的金币数量
        let coinCount = 0;
        boy.getLocalData.getCoinNum({
            getSuccess(data){
                coinCount = data;
            }
        })
        // if(coinCount > itemPrice){
        //     coinCount -= itemPrice;
        //     boy.getReqData.buyItem()
        //     cc.log('购买成功');

        //     this.hadNum += 1;
        //     this.refreshItemHadNum();
        // }else{
        //     cc.log('金币不足，不能购买');
        // }
        let itemId = this.node.id;
        boy.getReqData.buyItem({
            _itemId:itemId,
            reqSuccess(req){
                if(req){
                    self.hadNum += 1;
                    self.refreshItemHadNum();
                }
            }
        })
        this.shoppingNode.getComponent('view_main_shopping').refreshCoinCount();
    },

    start () {

    },

    // update (dt) {},
});
