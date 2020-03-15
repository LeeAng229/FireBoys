cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab:cc.Prefab,
        itemNodes:[cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化一个状态,0代表向前翻页，1代表向后翻页
        this.state = 0;
        //定义一个初始的索引值
        this.index = 0;
        //定义一个存储item节点的数组
        this.unUsedNodes = [];
        this.itemInfos = [];
        //实例化出4个item节点
        for(let i = 0;i<4;i++){
            let itemNode = cc.instantiate(this.itemPrefab);
            itemNode.parent = this.itemNodes[i];
            cc.log(this.itemNodes[i].y);
            itemNode.active = false;
            this.unUsedNodes.push(itemNode);
        }

        let jsonUrl = 'JSON/package';
        this.getDataByJson(jsonUrl);
        this.exitBtn();
        this.nextPage();
        this.beforePage();
    },

    //获取json配置文件中的数据
    getDataByJson(url){
        let self = this;
        cc.loader.loadRes(url,(err,data)=>{
            if(err){
                cc.error('读取json数据有误，请检查路径是否正确！');
                return;
            }
            this.jsonObj = data.json;
            self.getItemInfo();
        });
    },

    //遍历得到的json配置，得到道具信息
    getItemInfo(){
        for(let key in this.jsonObj){
            let itemInfo = this.jsonObj[key];
            for(let i in itemInfo){
                this.itemInfos.push([itemInfo[i],key]);
            }
        }

        // for(let i in this.itemInfos){
        //     this.getItem(this.itemInfos,this.itemInfos[i][1]);
        // }

        this.getItem();
    },

    //根据道具信息，实例化出相应的view_item
    getItem(){ //itemInfo,itemType
        //操作之前先把所有的节点设置为不可见
        for(let i in this.unUsedNodes){
            this.unUsedNodes[i].active = false;
        }

        let itemInfo = this.itemInfos;
        if(((itemInfo.length - 1) - this.index) >= 3){
            let count = 0;
            for(let i = this.index; i <= this.index + 3; i++){
                this.addItem(this.unUsedNodes[count],itemInfo[i][0],itemInfo[i][1],this.node);
                count++;
            }
        }else if(0 <= ((itemInfo.length - 1) - this.index) < 3){
            let count = 0;
            for(let i = this.index; i < itemInfo.length; i++){
                this.addItem(this.unUsedNodes[count],itemInfo[i][0],itemInfo[i][1],this.node);
                count++;
            }
        }
    },

    addItem(itemNode,itemData,itemType,shoppingNode){
        itemNode.getComponent('view_package_item').initByData(itemData,itemType,shoppingNode);
    },

    exitBtn(){
        this.node.getChildByName('view_main_package_exit').on(cc.Node.EventType.TOUCH_END,(event)=>{
            this.node.active = false;
        });
    },

    nextPage(){
        this.node.getChildByName('view_main_package_right').on(cc.Node.EventType.TOUCH_END,(event)=>{
            this.state = 0;
            cc.log(this.index);
            if(this.index + 5 <= this.itemInfos.length-1){
                this.index += 5;
            }
            this.getItem();
            cc.log(this.index);
        })
    },

    beforePage(){
        this.node.getChildByName('view_main_package_left').on(cc.Node.EventType.TOUCH_END,(event)=>{
            this.state = 1;
            if(this.index > 0){
                this.index -= 5;
            }
            cc.log(this.index);
            this.getItem();
            cc.log(this.index);
        });
    },

    start () {

    },

    // update (dt) {},
});
