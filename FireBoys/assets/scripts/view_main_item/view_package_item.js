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
    },

    initByData(Data,itemType,shoppingNode,itemCount){
        this.shoppingNode = shoppingNode;
        let urlKey = str[itemType].image;
        let nameKey = str[itemType].name;
        let priceKey = str[itemType].price;
        let sellPriceKey = str[itemType].sell;
        let introduceKey = str[itemType].introduce;

        cc.loader.loadRes(`${Data[urlKey]}`,cc.SpriteFrame,(err,data)=>{
            if(err){
                cc.error('读取有误，请检查路径是否正确！');
                return;
            }
            this.node.getChildByName('item_border').getChildByName('item_image').getComponent(cc.Sprite).spriteFrame = data;
        });
        this.node.getChildByName('item_name').getComponent(cc.Label).string = Data[nameKey];
        this.node.getChildByName('item_introduce').getComponent(cc.Label).string  = Data[introduceKey];
        this.node.active = true;
        this.node.price = Data[priceKey];
        this.node.sellPrice = Data[sellPriceKey];
        this.node.getChildByName('item_number').getChildByName('item_number').getComponent(cc.Label).string = itemCount;
    },

    //给购买按键添加一个点击事件
    sellBtn(){
        //判断当前道具数量是否大于0
        let momentItemCount = Number(this.node.getChildByName('item_number').getChildByName('item_number').getComponent(cc.Label).string);
        if(momentItemCount > 0){    
            //获取当前道具的售出价格
            let itemSellPrice = Number(this.node.sellPrice);
            //获取当前拥有的金币数量
            cc.loader.loadRes('JSON/player',(err,data)=>{
                if(err){
                    cc.error('player文件读取有误，请检查路径是否有误！');
                    return;
                }
                let coinCount = Number(data.json.playerCoinCount);
                coinCount += itemSellPrice;
                this.node.getChildByName('item_number').getChildByName('item_number').getComponent(cc.Label).string -= 1;
                //this.shoppingNode.getComponent('view_main_shopping').refreshCoinCount();
            });
        }else{
            
        }
    },

    start () {

    },

    // update (dt) {},
});
