# chi-qstatus

A QQ account status checker and report the result to [DingTalk](https://dingtalk.com/) platform.

## How to use?

```shell
  git clone https://github.com/chi-net/chi-qstatus.git
  cd chi-qstatus
  yarn install
  cp config.sample.ts config.ts
  (configuration like vim config.ts)
  yarn start
```

The QQ account name, password and DingTalk robot credentials are required in `config.sample.ts`.
You should rename it after change the configuration or you can just copy `config.sample.ts` and write the configuration file in `config.ts`

Slutions for some common problems:

1. Tip: '当前QQ版本太低，请更新版本再试'
 You can change the device configuration in the 'data/[QQ number]/device-[QQ number].json' file and try again.
 This is an example[And PLEASE COPY IT WISELY]:
 ```json
  {
    "--begin--": "该设备由账号作为seed固定生成，账号不变则永远相同",
    "product": "PB5A",
    "device": "OPPO A5",
    "board": "OPPOPB5A",
    "brand": "OPPO",
    "model": "A5",
    "wifi_ssid": "Tenda_7F3D2A",
    "bootloader": "C-boot",
    "android_id": "COLOROS.19528131.912",
    "boot_id": "4c48835b-8c41-58c0-5f9e-d4c799d07496",
    "proc_version": "Linux version 4.19.71-36673",
    "mac_address": "00:50:58:CF:5F:9E",
    "ip_address": "192.168.1.103",
    "imei": "353211076852245",
    "incremental": 2580571382,
    "--end--": "修改后可能需要重新验证设备"
  }
  ```
