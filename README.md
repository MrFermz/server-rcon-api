# Minecraft server-rcon-api

## Structure (Now API)
![alt text](/assets/api-structure.png)

## Installation
**Required**
- [Minecraft server-rcon](https://github.com/MrFermz/server-rcon)
- [Node.js >= 12.19.0](https://nodejs.org/en/download/)

**Optional**
- [Git bash >= 2.29.2](https://git-scm.com/downloads)

## Get started
### English

>**Windows**
1. Download and unzip

>**Linux**
1. Open Terminal
2. git clone https://github.com/MrFermz/server-rcon-api
3. Edit config file in `config.json`
``` json
    {
        "host": "Ip of minecraft server",
        "port": 7000,
        "rcon": {
            "port": 25575,
            "password": "password"
        },
        "query": {
            "port": 25565
        }
    }
```
4. Save `config.json`
5. Run `RUN.sh` or `RUN.bat` if in Windows.
6. If success you can see `xxx.xx.xx.xx:7000 Ready.`
7. Have fun.

### ภาษาไทย

>**Windows**
1. โหลดมาแล้วแตกไฟล์

>**Linux**
1. เปิด Terminal
2. git clone https://github.com/MrFermz/server-rcon-api
3. แก้ไขไฟล์เพื่อตั้งค่าเซิฟเวอร์ตัวเอง `config.json`
``` json
    {
        "host": "Ip ของเซิฟเวอร์ Minecraft",
        "port": 7000,
        "rcon": {
            "port": 25575,
            "password": "รหัส rcon"
        },
        "query": {
            "port": 25565
        }
    }
```
4. บันทึก `config.json`
5. รันไฟล์ `RUN.sh` หรือ `RUN.bat` ถ้าใช้ Windows
6. ถ้าสำเร็จจะขึ้นข้อความว่า `xxx.xx.xx.xx:7000 Ready.`
7. เสร็จแล้ว
