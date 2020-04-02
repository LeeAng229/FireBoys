//拉去本地数据
function getLocalData({ localPullSuccess }) {
    if (cc.sys.localStorage.getItem('obj')) {
        localData = JSON.parse(cc.sys.localStorage.getItem('obj'));
		cc.log('调取的缓存内数据',localData);
        // console.log(localData)
        localPullSuccess(localData);
    } else {
        let success = (obj) => {
            localPullSuccess(obj)
        };
        let fail = () => {
            console.log('获取失败')
        };
        readJson({ success: success, fail: fail })
    }
};
//获得题库数据 每次只返回随机连续的十道题
function getQuestionData({ getSuccess }) {
    if (localData.questionDataList != null) {
        //写随机数
        if (localData.questionDataList.length >= 11) {
            let num = randomNum(0, (localData.questionDataList.length - 11))
            let array = []
            for (let i = num; i < num + 10; i++) {
                array.push(localData.questionDataList[i]);
            }
            getSuccess(array)
        }
        return;
    };
    getLocalData({
        localPullSuccess(data) {
            //写随机数
            if (data.questionDataList.length >= 11) {
                let num = randomNum(0, (data.questionDataList.length - 11))
                let array = []
                for (let i = num; i < num + 10; i++) {
                    array.push(data.questionDataList[i]);
                }
                getSuccess(array)
            }
        }
    })
};
//获得队员数据
function getTeamData({ getSuccess }) {
    if (localData.teamDataList != null) {
        getSuccess(localData.teamDataList);
        return
    }
    getLocalData({
        localPullSuccess(data) {
            getSuccess(data.teamDataList)
        }
    })
};
//获得任务数据
function getTaskData({ getSuccess }) {
    if (localData.taskDataList != null) {
        getSuccess(localData.taskDataList);
        return
    };
    getLocalData({
        localPullSuccess(data) {
            getSuccess(data.taskDataList)
        }
    })

};
// 获得道具数据
function getItemData({ getSuccess }) {
    if (localData.itemList != null) {
        getSuccess(localData.itemList);
        return
    };
    getLocalData({
        localPullSuccess(data) {
            getSuccess(data.itemList)
        }
    })
};
//获得车的数据
function getCarData({ getSuccess }) {
    if (localData.carList != null) {
        getSuccess(localData.carList);
        return
    };
    getLocalData({
        localPullSuccess(data) {
            getSuccess(data.carList)
        }
    })
};
//获得背包数据
function getBagData({ getSuccess }) {
    if (localData.bagData != null) {
        getSuccess(localData.bagData);
        return
    }
    getLocalData({
        localPullSuccess(data) {
            getSuccess(data.bagData)
        }
    })
};
// 获得当前的金币数量  这个函数是没有的回调函数的 直接用number的值接收就行
//这个需要走网络协议
function getCoinNum({ getSuccess }) {
    if (localData.coinNumbers != null) {
        getSuccess(localData.coinNumbers)

    } else {
        getLocalData({
            localPullSuccess(data) {
                getSuccess(data.coinNumbers)
            }
        })
    }
};
// 获得当前的声望  这个函数是没有的回调函数的 直接用number的值接收就行
//这个需要走网络协议
function getPrestige({ getSuccess }) {
    if (localData.Prestige != null) {
        getSuccess(localData.Prestige)
    } else {
        getLocalData({
            localPullSuccess(data) {
                getSuccess(data.Prestige)
            }
        })
    }
};
// //获得不同星级别队员属性的数据
// function getPlayLelData({ getSuccess }) {
//     if (localData.playerLevelData != null) {
//         getSuccess(localData.playerLevelData);
//         return
//     };
//     getLocalData({
//         localPullSuccess(data) {
//             getSuccess(data.playerLevelData)
//         }
//     })
// };
// //获得金币总收益
// function getAllCoin({ reqSuccess }) {
//     let array=[]
//     if (localData.carList) {
//         for (let i = 0; i < localData.carList.length; i++) {
//             if(localData.carList[i].isFirstMake == 1){
//                 array.push(localData.carList[i]);
//             }
//         }
//         setInterval(function(){localData.coinNumbers+=localData.carList[j].carEarn}, time);
//     }
    
// }
module.exports = {
    getQuestionData,
    getTeamData,
    getTaskData,
    getItemData,
    getCarData,
    getBagData,
    getCoinNum,
    getPrestige,
    getLocalData
}