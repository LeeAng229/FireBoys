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
            itemNode.active = false;
            this.unUsedNodes.push(itemNode);
        }

        // let jsonUrl = 'JSON/package';
        // this.getDataByJson(jsonUrl);
        this.getItemInfo();
        this.exitBtn();
        this.nextPage();
        this.beforePage();
        this.refreshPageCount();
    },

    //当背包内某道具为0的时候，调用此函数，进行刷新界面
    refreshPage(){
        this.itemInfos = [];
        this.getItemInfo();
    },

    //获取json配置文件中的数据
    getDataByJson(url){
        //let self = this;
        // cc.loader.loadRes(url,(err,data)=>{
        //     if(err){
        //         cc.error('读取json数据有误，请检查路径是否正确！');
        //         return;
        //     }
        //     this.jsonObj = data.json;
        //     self.getItemInfo();
        //     this.refreshPageCount();
        // });
    },

    //遍历得到的json配置，得到道具信息
    getItemInfo(){
        let self = this;
        // for(let key in this.jsonObj){
        //     let itemInfo = this.jsonObj[key];
        //     for(let i in itemInfo){
        //         this.itemInfos.push([itemInfo[i],key]);
        //     }
        // }

        boy.getLocalData.getBagData({
            getSuccess(data){
                cc.log('package:',data);
                for(let i = 0; i<data.length; i++){
                    self.itemInfos.push([data[i],'shopItemList']);
                    //cc.log(data[i]);
                }
            }
        })

        // for(let i in this.itemInfos){
        //     this.getItem(this.itemInfos,this.itemInfos[i][1]);
        // }

        //this.itemInfos = this.getItemCount(this.itemInfos);
        //cc.log(this.itemInfos);

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

    addItem(itemNode,itemData,itemType,shoppingNode,itemCount){
        itemNode.getComponent('view_main_package_item').initByData(itemData,itemType,shoppingNode,itemCount);
    },

    exitBtn(){
        this.node.getChildByName('view_main_package_exit').on(cc.Node.EventType.TOUCH_END,(event)=>{
            this.node.destroy();
        });
    },

    nextPage(){
        this.node.getChildByName('view_main_package_right').on(cc.Node.EventType.TOUCH_END,(event)=>{
            this.state = 0;
            cc.log(this.index);
            if(this.index + 4 <= this.itemInfos.length-1){
                this.index += 4;
            }
            this.getItem();
            cc.log(this.index);
            this.refreshPageCount();
        })
    },

    beforePage(){
        this.node.getChildByName('view_main_package_left').on(cc.Node.EventType.TOUCH_END,(event)=>{
            this.state = 1;
            if(this.index > 0){
                this.index -= 4;
            }
            this.getItem();
            cc.log(this.index);
            this.refreshPageCount();
        });
    },

    refreshPageCount(){
        //获取当前页码
        let momentPage = Math.floor(this.index/4)+1;
        let pageCount = Math.floor(this.itemInfos.length/4);
        if(this.itemInfos.length - pageCount*4 > 0){
            pageCount++;
        }
        if(pageCount == 0){
            momentPage = 0;
        }
        if(momentPage > pageCount){
            this.index -= 4;
            this.getItem();
            momentPage -= 1;
        }
        this.node.getChildByName('view_main_package_pageNum').getComponent(cc.Label).string = `${momentPage}/${pageCount}`;
    },

    //统计各种item的数量
    getItemCount(itemInfos){
        this.finalInfos = [];
        //遍历itemInfos，
        for(let i in itemInfos){
            if(this.finalInfos.length > 0){
                let itemInfo = itemInfos[i][0];
                let itemInfoKey = str[itemInfos[i][1]].id;
                let itemInfoId = itemInfo[itemInfoKey];
                //遍历this.finalInfos;
                for(let j in this.finalInfos){
                    let finalInfo = this.finalInfos[j][0];
                    let finalInfoKey = str[this.finalInfos[j][1]].id;
                    let finalInfoId = finalInfo[finalInfoKey];
                    if(itemInfoId == finalInfoId){
                        this.finalInfos[j][2]+=1;
                        itemInfos[i] = null;
                    }
                }
                if(itemInfos[i] != null){
                    itemInfos[i].push(1);
                    this.finalInfos.push(itemInfos[i]);
                }
            }else{
                itemInfos[i].push(1);
                this.finalInfos.push(itemInfos[i]);
            }
        }
        return this.finalInfos;
    },

    start () {

    },

    // update (dt) {},

    //当道具数等于0的时候刷新界面
    // refreshPage(targetNode){
    //     //遍历itemInfo数组
    //     boy.getLocalData.getBagData({
    //         getSuccess(data){
    //             for(let i in data){
    //                 if(targetNode.id == data[i].itemId){
    //                     data.splice(i,1);
    //                 }
    //             }
    //         }
    //     })
    // }
});
