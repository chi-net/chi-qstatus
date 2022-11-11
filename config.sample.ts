export default {
  uin: 10000, // Your QQ number here.
  platform: 5, // 1.安卓手机 2.aPad 3.安卓手表 4.MacOS 5.iPad 可共存，但是不能同时占用一个协议，建议4/5，比较稳定
  // login platform: 1-Android Protocol 2-aPad Protocol 3-Watch Protocol 4-MacOS Protocol 5-iPad Protocol The 4 and 5 are recommended because they are stable.
  password: 'mhtnmsl@tencent.com', // password of your QQ account[empty password is QR login or md5(password)
  checkuin: 10001, // the number you want to check(currently 1 supported)
  checkduration: 60, // the duration you want to check (in seconds) 60s is recommended because the limits of DingTalk is 20 messages per minute.
  ak: 'dingtalkaccesstoken' // The access token of DingTalk robot. URI: https://oapi.dingtalk.com/robot/send?access_token=(ak)
}