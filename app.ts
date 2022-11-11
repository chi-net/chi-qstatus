import { createClient, OnlineStatus, core } from 'oicq'

import config from './config'
import axios from 'axios'

const client = createClient(config.uin, { platform: config.platform })

const jce = core.jce

// login errors catched!
client.on("system.login.slider", function (e) {
  console.log("输入ticket：")
  process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()))
})

client.on("system.login.device", () => {
  client.logger.mark("输入密保手机收到的短信验证码后按下回车键继续。");
  client.sendSmsCode();
  process.stdin.once("data", (input) => {
    client.submitSmsCode(input.toString())
  })
})

client.login(config.password)

let status = ''

async function hook (msg: string) {
  try {
    const data = {
      msgtype: 'text',
      text: {
        content: msg
      }
    }
    const conf = {}
    const res = await post('https://oapi.dingtalk.com/robot/send?access_token=' + config.ak, data, conf)
    console.log(res.data)
  } catch (err) {
    console.error(err)
  }
}

function post (uri: string, data: object, conf: object) {
  return Object(new Promise((resolve, reject) => {
    axios.post(uri, data, conf)
      .then(data => resolve(data))
      .catch(err => reject(err))
  }))
}

async function checkStatus () {
  client.logger.mark('checking status...')
  const FSOLREQ = jce.encodeStruct([
    config.uin, 0, 0, null, 1, 31, 0
  ])
  const body = jce.encodeWrapper({ FSOLREQ }, "mqq.IMService.FriendListServiceServantObj", "GetSimpleOnlineFriendInfoReq")
  const payload = await client.sendUni("friendlist.GetSimpleOnlineFriendInfoReq", body)
  const rsp = jce.decodeWrapper(payload)[1]
  rsp.forEach(async element => {
    if (element[0] === config.checkuin) {
      if (status !== element[14]) {
        client.logger.mark('check successful: status changed.')
        await hook('消息:你关注的QQ\'' + client.pickFriend(config.checkuin).info?.nickname + '\'['+ client.pickFriend(config.checkuin).nickname + '](' + config.checkuin + ')的在线状态更改了！最新状态:' + element[14] + '\n' + '更新于' + new Date())
        status = element[14]
      } else {
        client.logger.mark('check successful: status not changed.')
      }
    }
  })
}

client.on('system.online', async () => {
  client.setOnlineStatus(OnlineStatus.Invisible)
  await checkStatus()
  setInterval(checkStatus, config.checkduration * 1000)
})