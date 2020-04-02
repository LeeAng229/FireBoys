//点一下就买一个
//购买成功的回调函数里面需要客户端调用金币减少的接口
function buyItem({ _itemId, reqSuccess }) {
    for (let i = 0; i < localData.itemList.length; i++) {
        if (localData.itemList[i].itemId == _itemId) {
            let data = reduceCoinNum(localData.itemList[i].itemPrice);
            if (data == 1) {
                if (localData.bagData.length != 0) {
                    for (let j = 0; j < localData.bagData.length; j++) {
                        if (localData.bagData[j].itemId == _itemId) {
                            localData.bagData[j].itemCount++
                            setAllData();
                            reqSuccess(1)
                            return
                        }
                    }
                    localData.bagData.push(localData.itemList[i])
                    let length = localData.bagData.length
                    localData.bagData[length-1].isHave = 1;
                    
                    //#####给新加入的道具加一个数值
                    localData.bagData[length-1].itemCount += 1;
                    //金币减小
                    setAllData();
                    reqSuccess(1)
                    return
                }
                //背包是空的
                localData.bagData.push(localData.itemList[i])
                localData.bagData[0].isHave = 1;

                //#####给新加入的道具加一个数值
                localData.bagData[0].itemCount += 1;
                setAllData();
                reqSuccess(1)
                return
            }else if(data==0){
                reqSuccess(0)
            }

        }
    }
};
//卖道具
//出售成功的回调函数里面需要客户端调用金币减少的接口
function sellItem({ _itemId, reqSuccess }) {
    if (localData.bagData.length != 0) {
        for (let i = 0; i < localData.bagData.length; i++) {
            if (localData.bagData[i].itemId == _itemId) {
                if (localData.bagData[i].itemCount > 1) {
                    localData.bagData[i].itemCount--;
                    //增加金币
                    reqSuccess(1)
                    setAllData();
                    return
                } else {
                    //   ###这里也要减1
                    localData.bagData[i].itemCount -= 1;
                    localData.bagData.splice(i, 1);
                    reqSuccess(0)
                    //增加金币
                    setAllData();
                    return
                }
            }
        }
    }

}
//使用道具
function useItem({ _itemId, reqSuccess }) {
    if (localData.bagData.itemList.length != 0) {
        for (let i = 0; i < localData.bagData.itemList.length; i++) {
            if (localData.bagData.itemList[i].itemId == _itemId) {
                if (localData.bagData.itemList[i].itemCount > 1) {
                    localData.bagData.itemList[i].itemCount--;
                    reqSuccess()
                    setAllData();
                    return
                } else {
                    localData.bagData.itemList.splice(i, 1);
                    reqSuccess()
                    setAllData();
                }
            }
        }
    }

};
// //点一下就买一个车
// // 购买成功的回调函数里面需要客户端调用金币减少的接口
// function buyCar({ _carId, reqSuccess }) {
//     for (let i = 0; i < localData.carList.length; i++) {
//         if (localData.carList[i].carId == _carId) {
//             if (localData.bagData.carList.length != 0) {
//                 for (let j = 0; j < localData.bagData.carList.length; j++) {
//                     if (localData.bagData.carList[j].carId == _carId) {
//                         localData.bagData.carList[j].carCount++
//                         reqSuccess(localData.bagData.carList[j])
//                         setAllData();
//                         return
//                         //金币减小
//                     }
//                 }
//                 localData.bagData.carList.push(localData.carList[i])
//                 let length = localData.bagData.carList.length
//                 localData.bagData.carList[length].isMake = 1;
//                 reqSuccess(localData.bagData.carList[length])
//                 //金币减小
//                 //上传服务器 把本地背包的数据上传到服务器上面
//                 setAllData();
//                 return
//             }
//             localData.bagData.carList.push(localData.carList[i])
//             localData.bagData.carList[0].isMake = 1;
//             reqSuccess(localData.bagData.carList[0])
//             //上传服务器 把本地背包的数据上传到服务器上面
//             setAllData();
//             return
//         }
//     }
// };
//点一下就买一个车
// 购买成功的回调函数里面需要客户端调用金币减少的接口
function buyCar({ _carId, reqSuccess }) {
    for (let i = 0; i < localData.carList.length; i++) {
        if (localData.carList[j].carId == _carId) {
            localData.carList[j].isFirstMake = 1
            reduceCoinNum(localData.carList[i].needCoin)
            setAllData();
            reqSuccess()
            return
            //金币减小
        }
    }
};
// //卖车
// // 出售成功的回调函数里面需要客户端调用金币减少的接口
// function sellCar({ _carId, reqSuccess }) {
//     if (localData.bagData.carList.length != 0) {
//         for (let i = 0; i < localData.bagData.carList.length; i++) {
//             if (localData.bagData.carList[i].carId == _carId) {
//                 if (localData.bagData.carList[i].carCount > 1) {
//                     localData.bagData.carList[i].carCount--;
//                     localData.bagData.carList[i].isMake = 1
//                     //增加金币
//                     reqSuccess()
//                     setAllData();
//                     return
//                 } else {
//                     localData.bagData.carList.splice(i, 1);
//                     //增加金币
//                     reqSuccess()
//                     setAllData();
//                     return
//                 }
//             }
//         }
//     }

// };
// //使用车
// function useCar({ _carId, reqSuccess }) {
//     if (localData.bagData.carList.length != 0) {
//         for (let i = 0; i < localData.bagData.carList.length; i++) {
//             if (localData.bagData.carList[i].carId == _carId) {
//                 localData.bagData.carList[i].isMake = 0
//                 //需要减少车的耐久度
//                 localData.bagData.carList[i].carDurability-= localData.bagData.carList[i].reduceDurability;
//                 setAllData();
//                 reqSuccess();
//                 return
//             }
//         }
//     }
// };
//使用车
function useCar({ _carId, DuraNum, reqSuccess }) {
    if (localData.carList.length != 0) {
        for (let i = 0; i < localData.carList.length; i++) {
            if (localData.carList[i].carId == _carId) {
                localData.carList[i].isMake = 0
                if (localData.carList[i].carDurability < DuraNum) {
                    reqSuccess(0);
                } else {
                    //需要减少车的耐久度
                    localData.carList[i].carDurability -= DuraNum;
                    if (localData.carList[i].carDurability <= 0) {
                        localData.carList[i].carDurability = 0
                    }
                    setAllData();
                    reqSuccess(1);
                    return
                }
            }
        }
    }
};
//修车
function repairCar({ _carId, reqSuccess }) {
    if (localData.carList.length != 0) {
        for (let i = 0; i < localData.carList.length; i++) {
            if (localData.carList[i].carId == _carId) {
                if (localData.carList[i].carDurability = localData.carList[i].firstDurability) {
                    reqSuccess(0);
                    return
                }
                let data = reduceCoinNum(localData.carList[i].repairPrice)
                if (data == 1) {
                    localData.carList[i].carDurability += localData.carList[i].addDurability;
                    //消耗金币 提升耐久度
                    if (localData.carList[i].carDurability >= localData.carList[i].firstDurability) {
                        localData.carList[i].carDurability = localData.carList[i].firstDurability
                        setAllData();
                        reqSuccess(1);
                        return
                    }
                    setAllData();
                    reqSuccess(1);
                    return
                } else if (data == 0) {
                    reqSuccess(0);
                }
            }
        }
    }
};
//解锁车
function openCar({ _carId, reqSuccess }) {
    if (localData.carList.length != 0) {
        for (let i = 0; i < localData.carList.length; i++) {
            if (localData.carList[i].carId == _carId) {
                localData.carList[j].isFirstMake = 1
                let data = reduceCoinNum(localData.carList[i].needCoin)
                setAllData();
                reqSuccess(data);
                return
            }
        }
    }
};

//使用角色
function usePlayer({ _playerId, reqSuccess }) {
    if (localData.bagData.teamDataList != null) {
        for (let i = 0; i < localData.bagData.teamDataList.length; i++) {
            if (localData.bagData.teamDataList[i].playerId == _playerId) {
                localData.bagData.teamDataList[i].isMake = 0;
                setAllData();
                reqSuccess()
            }
        }
    }
};
// //角色升级
// function upLevelPlayer({ _playerId, reqSuccess }) {
//     if (localData.bagData.teamDataList != null) {
//         for (let i = 0; i < localData.bagData.teamDataList.length; i++) {
//             if (localData.bagData.teamDataList[i].playerId == _playerId) {
//                 localData.bagData.teamDataList[i].playerLevel+= 1;
//                 if(localData.bagData.teamDataList[i].playerLevel>=5){
//                     localData.bagData.teamDataList[i].playerLevel=5
//                     reqSuccess(localData.bagData.teamDataList[i])
//                     return
//                 }
//                 setAllData();
//                 reqSuccess(localData.bagData.teamDataList[i]);
//                } 

//             }
//         }
//     }
// //角色升级
// function upLevelPlayer({ _playerId, reqSuccess }) {
//     if (localData.teamDataList != null) {
//         for (let i = 0; i < localData.teamDataList.length; i++) {
//             if (localData.teamDataList[i].playerId == _playerId) {
//                 localData.teamDataList[i].playerLevel += 1;
//                 if (localData.teamDataList[i].playerLevel >= 5) {
//                     localData.teamDataList[i].playerLevel = 5
//                     reqSuccess(localData.teamDataList[i])
//                     return
//                 }
//                 setAllData();
//                 reqSuccess(localData.bagData.teamDataList[i]);
//             }

//         }
//     }
// }
//角色升级
function upLevelPlayer({ reqSuccess }) {
    if (localData.teamDataList != null) {
        for (let i = 0; i < localData.teamDataList.length; i++) {
            if (localData.teamDataList[i].playerLevel = 5) {
                return
            }
            localData.teamDataList[i].playerLevel += 1;
            if (localData.teamDataList[i].playerLevel >= 5) {
                localData.teamDataList[i].playerLevel = 5;
                reduceCoinNum(localData.teamDataList[i].needCoin)
                setAllData();
                reqSuccess();
                return
            }
            reduceCoinNum(localData.teamDataList[i].needCoin)
            setAllData();
            reqSuccess();
        }
    }
}
//金币增加的接口调用 需要传进金币数值的参数 每次的金币增加量 不是金币的总值
function addCoinNum(num) {
    let coinNumber = Number(localData.coinNumbers);
    localData.coinNumbers = coinNumber + num;
    setAllData();
};
// 声望增加的接口调用 需要传入每次增加的声望的数值 不是声望的总值
function addPrestige(num) {
    localData.Prestige += num;
    setAllData();
};
//金币减少的接口调用 需要传进金币数值的参数 每次的金币减少量 不是金币的总值
function reduceCoinNum(num) {
    if (num > localData.coinNumbers) {
        return 0;
    }
    localData.coinNumbers -= num;
    setAllData();
    return 1
};
// 声望减少的接口调用 需要传入每次减少的声望的数值 不是声望的总值
function reducePrestige(num) {
    localData.Prestige -= num;
    setAllData();
};
//function 
//开始任务的接口   我会把任务状态和开始任务时间保存到本地并且传到服务器
function startTask({ _taskId, _needTime, _startTime, reqSuccess }) {
    for (let i = 0; i < localData.taskDataList.length; i++) {
        for (let j = 0; j < localData.taskDataList[j].length; j++) {
            if (localData.taskDataList[i][j].taskId == _taskId) {
                localData.taskDataList[i][j].needTime = _needTime
                localData.taskDataList[i][j].isStart = 1;
                localData.taskDataList[i][j].startTime = _startTime;
                setAllData();
                reqSuccess();
                return;
            }
        }
    }
};
//结束任务的接口   我会把任务状态和结束任务时间保存到本地并且传到服务器
function endTask({ _taskId, _endTime, reqSuccess }) {
    for (let i = 0; i < localData.taskDataList.length; i++) {
        for (let j = 0; j < localData.taskDataList[i].length; j++) {
            if (localData.taskDataList[i][j].taskId == _taskId) {
                localData.taskDataList[i][j].isStart = 0;
                localData.taskDataList[i][j].endTime = _endTime;
                setAllData();
                reqSuccess();
                return;
            }
        }
    }
};
//存数据
function setAllData() {
    let obj = localData
    //清除本地缓存
    cc.sys.localStorage.removeItem("obj");
    //存储到本地数据
    cc.sys.localStorage.setItem('obj', JSON.stringify(obj));
};

module.exports = {
    buyItem,
    sellItem,
    useItem,
    buyCar,
    useCar,
    usePlayer,
    addCoinNum,
    addPrestige,
    reduceCoinNum,
    reducePrestige,
    startTask,
    endTask,
    repairCar,
    openCar,
    upLevelPlayer
}


/*
角色升级
买车 卖车 使用车 修车 不能都放在背包里面
登录 需要获得头像
车的收益 总共解锁了那几辆车 这几辆车的收益总值计算一下 传回客户端 更改金币总值
*/