
// cc.Class({
//     extends: cc.Component,

//     properties: {
//         WXSubContextView:cc.Node,
//     },


//     onLoad () {},

//     start () {
//         this.subContextView=this.WXSubContextView.getComponent(cc.WXSubContextView);
//         this.subContextView.enabled=false;
//         this.WXSubContextView.active=false;
//     },
//     showRanking(){
//         console.log("showRank");
//         //获取时间戳
//         let updateTime=parseInt(new Date().getTime()/1000);
//         //获取排行榜上面的对应信息
//         let getArr=new Array();
//         getArr.push("score");

//         let openDataContext = wx.getOpenDataContext();
//         openDataContext.postMessage({
//             type:'GET',
//             data:getArr,
//             timer:updateTime 
//         })
//         this.subContextView.enabled=true;
//         this.WXSubContextView.active=true;
//         this.subContextView.update()
//     },
//     hideRanking(){
//         console.log("hideRank");
//         this.subContextView.enabled=false;
//         this.WXSubContextView.active=false;
//     },
//     sendMsgToOpendata(){
//         console.log("updateRank");
//         //获取时间戳
//         let updateTime=parseInt(new Date().getTime()/1000);
//         let _value=JSON.stringify({
//             "wxgame":{
//                 "score":Math.floor(100000*Math.random()),
//                 "update_time":updateTime
//             }
//         })
//         let arr =new Array();
//         arr.push({key:"score",value:_value});
//         let openDataContext=wx.getOpenDataContext();
//         openDataContext.postMessage({
//             type:"SET",
//             data:arr,
//             timer:updateTime
//         })
//     },

//     update (dt) {},
// });
