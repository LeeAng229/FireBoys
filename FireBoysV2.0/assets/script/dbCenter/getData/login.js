// window.login = ({ getSuccess }) => {
//     wx.login({
//         success(params) {
//             if (params.code) {
//                 console.log("111111111111111111111")
//                 console.log(params.code)
//                 getSetting({ reqSuccess() { } })
//             };
//         },
//         fail(params) {
//             console.log("失败")
//         }
//     });
//     function getSetting({ reqSuccess }) {
//         let sysInfo = window.wx.getSystemInfoSync();
//         //获取微信界面大小
//         let width = sysInfo.screenWidth;
//         let height = sysInfo.screenHeight;
//         window.wx.getSetting({
//             success(res) {
//                 if (res.authSetting["scope.userInfo"]) {
//                     console.log("用户已授权");
//                     window.wx.getUserInfo({
//                         success(res) {
//                             console.log(res)
//                             //此时可进行登录操作
//                             //此时应该向服务器发起网络请求，得到数据
//                         }
//                     });
//                 } else {
//                     console.log("用户未授权");
//                     let button = window.wx.createUserInfoButton({
//                         type: 'text',
//                         text: '',
//                         style: {
//                             left: 0,
//                             top: 0,
//                             width: width,
//                             height: height,
//                             backgroundColor: '#00000000',//最后两位为透明度
//                             color: '#ffffff',
//                             fontSize: 20,
//                             textAlign: "center",
//                             lineHeight: height,
//                         }
//                     });
//                     button.onTap((res) => {
//                         console.log(res)
//                         if (res.userInfo) {
//                             console.log("用户授权");
//                             //此时可进行登录操作
//                             button.destroy();
//                             //此时可进行登录操作
//                             //此时应该向服务器发起网络请求，得到数据
//                         } else {
//                             console.log("用户拒绝授权");
//                         }
//                     });
//                 }
//             }
//         })
//     }
// }