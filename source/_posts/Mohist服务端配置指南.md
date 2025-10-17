---
title: Mohist 服务端完全配置指南
date: 2025-10-17 16:00:00
tags: [Minecraft,服务器,Mohist,教程]
categories: [服务器, 我的世界]
description: "全面讲解 Mohist 服务端的安装、配置、优化技巧和管理命令，打造高性能的 Forge + Bukkit 混合服务器，支持模组和插件共存。"
comments: true
---

{% note success::Mohist 是一款成熟的混合服务端核心，完美融合 Forge Mod 和 Bukkit/Spigot 插件生态，提供强大的兼容性和稳定性。 %}

<!-- more -->

{% note warning::如果你还没有开服，请先查看 [我的世界整合包服务器开服教程](/2025/08/08/00/) 了解如何搭建基础服务器。本文主要讲解 Mohist 服务端的详细配置和优化。 %}

## 什么是 Mohist？

Mohist（墨石）是一个开源的 Minecraft 混合服务端，它基于 Forge 和 Paper，允许你同时运行：
- ✅ **Forge Mods** - 完整的模组支持
- ✅ **Bukkit/Spigot/Paper 插件** - 丰富的插件生态
- ✅ **高性能优化** - 基于 Paper 的性能优化
- ✅ **持续更新** - 活跃的开发团队和社区

与 Arclight 相比，Mohist 在某些方面有不同的优势和特性。

(此文章由AI辅助生成，仅供参考)

## 🚀 快速开始

### 下载与安装

**1. 获取 Mohist**

访问 [Mohist 官方网站](https://mohistmc.com/downloads) 下载对应版本：

支持的版本：
- **1.20.1** - 最新长期支持版本
- **1.19.2** - 稳定版本
- **1.18.2** - 经典版本
- **1.16.5** - 老版本支持
- **1.12.2** - 经典模组版本

下载地址：
- 官网：https://mohistmc.com/
- GitHub：https://github.com/MohistMC/Mohist

**2. 服务器目录结构**

```
server/
├── mohist-xxx.jar              # Mohist 核心文件
├── libraries/                  # 依赖库文件夹
├── mods/                       # Forge 模组文件夹
├── plugins/                    # Bukkit 插件文件夹
├── coremods/                   # 核心模组文件夹
├── world/                      # 主世界
├── world_nether/               # 下界
├── world_the_end/              # 末地
├── config/                     # 配置文件夹
├── server.properties           # 服务器主配置
├── bukkit.yml                  # Bukkit 配置
├── spigot.yml                  # Spigot 配置
├── paper.yml                   # Paper 配置（部分版本）
├── mohist.yml                  # Mohist 专属配置
├── mohist-config/              # Mohist 配置文件夹
├── eula.txt                    # 用户协议
└── logs/                       # 日志文件夹
```

**3. 首次启动**

```bash
# Linux/Mac
java -Xms4G -Xmx4G -jar mohist-xxx.jar nogui

# Windows
java -Xms4G -Xmx4G -jar mohist-xxx.jar nogui
```

{% note warning::首次启动会自动下载必要的库文件，可能需要 5-15 分钟，请确保网络通畅。 %}

**4. 同意 EULA**

编辑 `eula.txt` 文件：

```properties
# 将 false 改为 true
eula=true
```

**5. 再次启动服务器**

```bash
java -Xms4G -Xmx4G -jar mohist-xxx.jar nogui
```

等待服务器完全启动，看到 `Done!` 字样即表示启动成功。

## ⚙️ 核心配置文件详解

### 1. server.properties（服务器主配置）

这是 Minecraft 服务器的基础配置文件：

```properties
# ========== 基础设置 ==========
server-name=Mohist Server            # 服务器名称
server-port=25565                    # 服务器端口
server-ip=                           # 绑定IP（留空表示全部）
max-players=20                       # 最大玩家数
motd=§6欢迎来到 Mohist 服务器\n§a模组+插件混合服  # 服务器描述（支持颜色代码）

# ========== 世界设置 ==========
level-name=world                     # 主世界名称
level-seed=                          # 世界种子（留空随机生成）
level-type=default                   # 世界类型（default/flat/largeBiomes/amplified）
generator-settings={}                # 自定义世界生成器设置

# ========== 游戏设置 ==========
gamemode=survival                    # 默认游戏模式
force-gamemode=false                 # 强制游戏模式
difficulty=normal                    # 难度（peaceful/easy/normal/hard）
hardcore=false                       # 极限模式
allow-flight=false                   # 允许飞行（装了飞行模组需设为true）
pvp=true                            # 允许PVP

# ========== 性能设置 ==========
view-distance=10                     # 视距（建议 6-12）
simulation-distance=10               # 模拟距离（建议 6-10）
max-tick-time=60000                 # 最大tick时间（-1禁用看门狗）
max-world-size=29999984             # 世界边界大小

# ========== 生物设置 ==========
spawn-monsters=true                  # 生成怪物
spawn-animals=true                   # 生成动物
spawn-npcs=true                      # 生成村民
spawn-protection=0                   # 出生点保护半径

# ========== 安全设置 ==========
online-mode=false                    # 正版验证（离线服false，正版服true）
white-list=false                     # 白名单
enforce-whitelist=false              # 强制白名单
enable-command-block=true            # 启用命令方块
enable-query=true                    # 启用查询

# ========== 网络设置 ==========
network-compression-threshold=256    # 网络压缩阈值（-1禁用，256推荐）
max-players=20                       # 最大玩家数
player-idle-timeout=0                # 玩家空闲超时（0禁用）
rate-limit=0                         # 速率限制

# ========== 资源包设置 ==========
resource-pack=                       # 资源包URL
resource-pack-sha1=                  # 资源包SHA1
require-resource-pack=false          # 强制资源包
resource-pack-prompt=                # 资源包提示信息

# ========== 其他设置 ==========
enable-status=true                   # 启用状态
enable-rcon=false                    # 启用RCON远程控制
rcon.port=25575                      # RCON端口
rcon.password=                       # RCON密码
broadcast-console-to-ops=true        # 向OP广播控制台消息
broadcast-rcon-to-ops=true           # 向OP广播RCON消息
op-permission-level=4                # OP权限等级（1-4）
function-permission-level=2          # 函数权限等级
```

{% folding cyan::性能优化配置建议 %}

**低配服务器（2-4G 内存）：**
```properties
view-distance=6
simulation-distance=6
max-players=10
network-compression-threshold=512
```

**中配服务器（4-8G 内存）：**
```properties
view-distance=8
simulation-distance=8
max-players=20
network-compression-threshold=256
```

**高配服务器（8G+ 内存）：**
```properties
view-distance=12
simulation-distance=10
max-players=40
network-compression-threshold=256
```

{% endfolding %}

### 2. mohist.yml（Mohist 专属配置）

Mohist 的核心配置文件，包含兼容性和优化选项：

```yaml
# Mohist 配置文件
mohist:
  # 语言设置
  lang: zh_CN                      # 语言（zh_CN中文/en_US英文）

  # 检查更新
  check_update: true               # 启动时检查更新

  # 不安全功能警告
  disable_plugins_blacklist: false # 禁用插件黑名单（不推荐）
  disable_mods_blacklist: false    # 禁用模组黑名单（不推荐）

  # 崩溃报告
  crash_report_upload: true        # 自动上传崩溃报告

  # 优化设置
  optimization:
    # 异步优化
    async_chunk_load: true         # 异步区块加载
    async_entity_tracker: true     # 异步实体追踪

    # 缓存优化
    cache_chunk_data: true         # 缓存区块数据
    cache_biome_data: true         # 缓存生物群系数据

    # 性能优化
    optimize_explosions: true      # 优化爆炸计算
    optimize_hoppers: true         # 优化漏斗性能
    optimize_redstone: true        # 优化红石性能

  # 兼容性设置
  compatibility:
    # Forge 兼容
    forge_compatibility_mode: true # Forge兼容模式

    # 插件兼容
    plugin_compatibility_mode: true # 插件兼容模式

    # 原版特性
    vanilla_hopper: false          # 使用原版漏斗（false使用优化版）
    vanilla_redstone: false        # 使用原版红石（false使用优化版）

  # 实体设置
  entity:
    # 实体激活范围（格）
    activation_range:
      animals: 32                  # 动物
      monsters: 32                 # 怪物
      raiders: 48                  # 劫掠者
      misc: 16                     # 其他
      water: 16                    # 水生生物
      villagers: 32                # 村民
      flying_monsters: 32          # 飞行怪物

    # 实体追踪范围（格）
    tracking_range:
      players: 48                  # 玩家
      animals: 48                  # 动物
      monsters: 48                 # 怪物
      misc: 32                     # 其他
      other: 64                    # 其他实体

  # 区块设置
  chunk:
    # 区块保持加载时间（tick）
    keep_spawn_loaded_range: 10    # 出生点区块保持加载范围

    # 区块垃圾回收
    gc_period: 600                 # GC周期（tick）
    gc_load_threshold: 0           # GC触发阈值

  # 日志设置
  logging:
    # 详细日志
    verbose: false                 # 详细输出（调试用）

    # 特定日志
    log_entity_spawns: false       # 记录实体生成
    log_chunk_loads: false         # 记录区块加载
    log_command_block_output: false # 记录命令方块输出

# 世界设置（可为每个世界单独配置）
world-settings:
  default:
    # 继承全局设置
    # 这里可以覆盖特定世界的设置

  # 示例：为特定世界配置
  # world:
  #   entity:
  #     activation_range:
  #       monsters: 48
```

### 3. bukkit.yml（Bukkit 配置）

```yaml
settings:
  # 允许终末之池
  allow-end: true
  # 警告过载
  warn-on-overload: true
  # 权限文件
  permissions-file: permissions.yml
  # 更新文件夹
  update-folder: update
  # 插件性能分析
  plugin-profiling: false
  # 连接限流（毫秒）
  connection-throttle: 4000
  # 查询插件
  query-plugins: true
  # 废弃警告
  deprecated-verbose: default
  # 关闭消息
  shutdown-message: Server closed
  # 最小API版本
  minimum-api: none

# 生物生成限制
spawn-limits:
  monsters: 70                     # 怪物
  animals: 10                      # 动物
  water-animals: 5                 # 水生动物
  water-ambient: 20                # 水生环境生物
  water-underground-creature: 5    # 地下水生生物
  axolotls: 5                      # 美西螈
  ambient: 15                      # 环境生物

# 区块垃圾回收
chunk-gc:
  period-in-ticks: 600             # GC周期

# 各类生物生成间隔（tick）
ticks-per:
  animal-spawns: 400
  monster-spawns: 1
  water-spawns: 1
  water-ambient-spawns: 1
  water-underground-creature-spawns: 1
  axolotl-spawns: 1
  ambient-spawns: 1
  autosave: 6000                   # 自动保存间隔

# 别名设置
aliases: now-in-commands.yml
```

### 4. spigot.yml（Spigot 配置）

```yaml
settings:
  # 调试
  debug: false
  # 仅在停止时保存用户缓存
  save-user-cache-on-stop-only: false
  # 统计样本数
  sample-count: 12
  # 玩家洗牌
  player-shuffle: 0
  # 用户缓存大小
  user-cache-size: 1000
  # 移动检测阈值
  moved-wrongly-threshold: 0.0625
  moved-too-quickly-multiplier: 10.0
  # 超时时间（秒）
  timeout-time: 60
  # 崩溃时重启
  restart-on-crash: false
  restart-script: ./start.sh
  # Netty 线程数（-1自动）
  netty-threads: 4
  # 日志设置
  log-villager-deaths: true
  log-named-deaths: true
  # Bungeecord 支持
  bungeecord: false

# 消息设置
messages:
  whitelist: You are not whitelisted on this server!
  unknown-command: Unknown command. Type "/help" for help.
  server-full: The server is full!
  outdated-client: Outdated client! Please use {0}
  outdated-server: Outdated server! I'm still on {0}
  restart: Server is restarting

# 指令设置
commands:
  # 指令标签模式
  tab-complete: 0
  # 发送垃圾邮件排除
  send-namespaced: true
  # 日志
  log: true
  # 指令替换
  replace-commands:
    - setblock
    - summon
    - testforblock
    - tellraw
  # 静默命令方块控制台
  silent-commandblock-console: false

# 统计
stats:
  disable-saving: false
  forced-stats: {}

# 世界设置
world-settings:
  default:
    # 详细输出
    verbose: false

    # 生物生成范围（区块）
    mob-spawn-range: 8

    # Hopper 设置
    hopper-amount: 1               # 漏斗每次传输数量
    hopper-transfer: 8             # 漏斗传输间隔（tick）
    hopper-check: 1                # 漏斗检查间隔（tick）

    # 实体激活范围（格）
    entity-activation-range:
      animals: 32
      monsters: 32
      raiders: 48
      misc: 16
      water: 16
      villagers: 32
      flying-monsters: 32
      wake-up-inactive:
        animals-max-per-tick: 4
        animals-every: 1200
        animals-for: 100
        monsters-max-per-tick: 8
        monsters-every: 400
        monsters-for: 100
        villagers-max-per-tick: 4
        villagers-every: 600
        villagers-for: 100
        flying-monsters-max-per-tick: 8
        flying-monsters-every: 200
        flying-monsters-for: 100

    # 实体追踪范围（格）
    entity-tracking-range:
      players: 48
      animals: 48
      monsters: 48
      misc: 32
      other: 64

    # 增长速率修饰符（百分比）
    growth:
      cactus-modifier: 100
      cane-modifier: 100
      melon-modifier: 100
      mushroom-modifier: 100
      pumpkin-modifier: 100
      sapling-modifier: 100
      beetroot-modifier: 100
      carrot-modifier: 100
      potato-modifier: 100
      wheat-modifier: 100
      netherwart-modifier: 100
      vine-modifier: 100
      cocoa-modifier: 100
      bamboo-modifier: 100
      sweetberry-modifier: 100
      kelp-modifier: 100
      twistingvines-modifier: 100
      weepingvines-modifier: 100
      cavevines-modifier: 100
      glowberry-modifier: 100

    # 合并半径
    merge-radius:
      item: 2.5                    # 物品
      exp: 3.0                     # 经验球

    # 最大实体碰撞数
    max-entity-collisions: 8

    # 箭矢消失速率（tick）
    arrow-despawn-rate: 1200
    trident-despawn-rate: 1200

    # 游戏机制
    zombie-aggressive-towards-villager: true
    nerf-spawner-mobs: false       # 削弱刷怪笼生物

    # 经验合并
    experience-merge-max-value: -1

    # 龙死亡总是掉落龙蛋
    dragon-death-sound-radius: 0

    # 种子设置
    seed-village: 10387312
    seed-desert: 14357617
    seed-igloo: 14357618
    seed-jungle: 14357619
    seed-swamp: 14357620
    seed-monument: 10387313
    seed-shipwreck: 165745295
    seed-ocean: 14357621
    seed-outpost: 165745296
    seed-endcity: 10387313
    seed-slime: 987234911
    seed-bastion: 30084232
    seed-fortress: 30084232
    seed-mansion: 10387319
    seed-fossil: 14357921
    seed-portal: 34222645

    # 饥饿设置
    hunger:
      jump-walk-exhaustion: 0.05
      jump-sprint-exhaustion: 0.2
      combat-exhaustion: 0.1
      regen-exhaustion: 6.0
      swim-multiplier: 0.01
      sprint-multiplier: 0.1
      other-multiplier: 0.0

    # 最大刻度时间
    max-tick-time:
      tile: 50
      entity: 50

    # 刻度速率
    squid-spawn-range:
      min: 45.0
```

{% note info::Spigot 配置包含大量性能优化选项，建议根据服务器硬件和玩家数量适当调整。 %}

## 🔧 Mohist 专属命令

### 服务器管理命令

```bash
# ========== Mohist 核心命令 ==========
/mohist                            # 查看 Mohist 信息
/mohist reload                     # 重载 Mohist 配置
/mohist version                    # 查看详细版本信息
/mohist mods                       # 列出所有已加载的模组
/mohist plugins                    # 列出所有插件
/mohist config                     # 配置管理

# ========== Bukkit/Spigot 命令 ==========
/bukkit:help                       # Bukkit 帮助
/plugins                           # 查看插件列表（简写 /pl）
/version [插件名]                  # 查看版本信息（简写 /ver）
/reload                            # 重载服务器（不推荐，可能导致内存泄漏）
/reload confirm                    # 确认重载

# ========== Timings 性能分析 ==========
/timings on                        # 开启性能监控
/timings off                       # 关闭性能监控
/timings paste                     # 生成并上传性能报告
/timings reset                     # 重置统计数据
/timings report                    # 生成本地报告

# ========== TPS 和性能监控 ==========
/tps                               # 查看服务器 TPS
/spark                             # 使用 Spark 插件分析性能（需安装）
```

### 玩家管理命令

```bash
# ========== 基础管理 ==========
/op <玩家>                         # 给予OP权限
/deop <玩家>                       # 移除OP权限
/kick <玩家> [理由]                # 踢出玩家
/ban <玩家> [理由]                 # 封禁玩家
/ban-ip <IP> [理由]                # 封禁IP
/pardon <玩家>                     # 解封玩家
/pardon-ip <IP>                    # 解封IP
/banlist                           # 查看封禁列表

# ========== 白名单管理 ==========
/whitelist on                      # 开启白名单
/whitelist off                     # 关闭白名单
/whitelist add <玩家>              # 添加白名单
/whitelist remove <玩家>           # 移除白名单
/whitelist list                    # 查看白名单
/whitelist reload                  # 重载白名单

# ========== 玩家信息 ==========
/list                              # 在线玩家列表
/minecraft:list                    # 原版列表命令
```

### 世界管理命令

```bash
# ========== 保存与备份 ==========
/save-all                          # 保存所有世界
/save-all flush                    # 强制保存并写入磁盘
/save-on                           # 开启自动保存
/save-off                          # 关闭自动保存

# ========== 世界设置 ==========
/difficulty <难度>                 # 设置难度
/defaultgamemode <模式>            # 设置默认游戏模式
/gamerule <规则> <值>              # 设置游戏规则
/setworldspawn [x y z]             # 设置世界出生点
/spawnpoint [玩家] [x y z]         # 设置玩家重生点

# ========== 时间与天气 ==========
/time set <时间>                   # 设置时间
/time add <时间>                   # 增加时间
/time query <daytime|gametime|day> # 查询时间
/weather <clear|rain|thunder> [持续秒数] # 设置天气

# ========== 世界边界 ==========
/worldborder set <大小> [时间]     # 设置世界边界
/worldborder center <x> <z>        # 设置中心点
/worldborder add <距离> [时间]     # 扩展边界
/worldborder damage amount <伤害>  # 设置边界外伤害
/worldborder damage buffer <距离>  # 设置伤害缓冲区
/worldborder warning distance <距离># 设置警告距离
/worldborder warning time <秒>     # 设置警告时间
/worldborder get                   # 查看当前边界大小
```

## 📦 推荐插件与配置

### 必装插件

**1. EssentialsX（核心功能套件）**

```yaml
# 下载：https://essentialsx.net/
# 包含：EssentialsX, EssentialsXChat, EssentialsXSpawn

功能：
- 传送系统（/home, /tpa, /warp）
- 经济系统
- 玩家管理
- 聊天格式化
- 称号系统

常用命令：
/home [名称]                       # 回家
/sethome [名称]                    # 设置家
/delhome [名称]                    # 删除家
/tpa <玩家>                        # 请求传送
/tpahere <玩家>                    # 请求玩家传送到你
/tpaccept                          # 接受传送
/tpdeny                            # 拒绝传送
/back                              # 返回上一位置
/spawn                             # 回到出生点
/warp <地标>                       # 传送到地标
/setwarp <地标>                    # 设置地标
/delwarp <地标>                    # 删除地标
/balance                           # 查看余额（简写 /bal）
/pay <玩家> <金额>                 # 支付
/eco give <玩家> <金额>            # 给予金钱（管理员）
```

**2. LuckPerms（权限管理）**

```yaml
# 下载：https://luckperms.net/
# 最强大的权限管理插件

常用命令：
/lp user <玩家> info                          # 查看玩家信息
/lp user <玩家> permission set <权限> true    # 给予权限
/lp user <玩家> permission unset <权限>       # 移除权限
/lp user <玩家> parent add <组>               # 添加到组
/lp user <玩家> parent remove <组>            # 从组移除
/lp group <组> create                         # 创建组
/lp group <组> permission set <权限> true     # 给组设置权限
/lp group <组> parent add <父组>              # 设置继承
/lp group <组> meta setprefix <前缀>          # 设置前缀
/lp group <组> meta setsuffix <后缀>          # 设置后缀
/lp editor                                    # 打开网页编辑器
/lp sync                                      # 同步数据
/lp import <文件>                             # 导入数据
/lp export <文件>                             # 导出数据

推荐权限组结构：
default（默认）-> vip（会员）-> mod（管理）-> admin（超管）
```

**3. CoreProtect（回档神器）**

```yaml
# 下载：https://www.spigotmc.org/resources/coreprotect.8631/
# 记录所有方块和容器变化

常用命令：
/co inspect                        # 查询模式（点击查看历史）
/co i                              # inspect 简写
/co lookup <参数>                  # 查询记录
/co rollback <参数>                # 回档
/co restore <参数>                 # 恢复回档
/co purge                          # 清理旧数据
/co status                         # 查看状态

查询参数：
u:<玩家>                           # 指定玩家
t:<时间>                           # 时间范围（如：t:1d = 1天内）
r:<半径>                           # 半径范围
a:<动作>                           # 动作类型（block/click/container等）
b:<方块>                           # 指定方块
e:<实体>                           # 指定实体

示例：
/co lookup u:Steve t:1d r:10       # 查询Steve在1天内10格范围的操作
/co rollback u:Griefer t:1h r:20   # 回档Griefer在1小时内20格范围的操作
/co restore u:Steve t:30m r:15     # 恢复Steve在30分钟内15格范围的操作
```

### 功能增强插件

**4. Chunky（区块预生成）**

```yaml
# 下载：https://www.spigotmc.org/resources/chunky.81534/

常用命令：
/chunky world <世界>               # 选择世界
/chunky center <x> <z>             # 设置中心点
/chunky radius <半径>              # 设置半径（格）
/chunky shape <square|circle>      # 设置形状
/chunky start                      # 开始生成
/chunky pause                      # 暂停
/chunky continue                   # 继续
/chunky cancel                     # 取消
/chunky silent                     # 静默模式（不广播进度）
/chunky quiet <间隔>               # 降低广播频率

使用流程：
1. /chunky world world             # 选择主世界
2. /chunky center 0 0              # 设置中心为0,0
3. /chunky radius 5000             # 设置半径5000格
4. /chunky start                   # 开始生成
5. 等待完成后：
6. /chunky world world_nether      # 预生成下界
7. /chunky radius 2000
8. /chunky start
```

**5. Vault（经济API）**

```yaml
# 下载：https://www.spigotmc.org/resources/vault.34315/
# 许多插件的前置，提供经济/权限/聊天API
# 安装后无需额外配置，自动连接 EssentialsX 等插件
```

**6. WorldEdit + WorldGuard**

```yaml
# WorldEdit - 地图编辑
# 下载：https://dev.bukkit.org/projects/worldedit

常用命令：
//wand                             # 获取选择工具（木斧）
//pos1 和 //pos2                   # 设置选区点1和点2
//set <方块>                       # 填充选区
//replace <旧> <新>                # 替换方块
//walls <方块>                     # 生成墙壁
//faces <方块>                     # 生成6个面
//copy                             # 复制选区
//cut                              # 剪切选区
//paste                            # 粘贴
//rotate <角度>                    # 旋转
//flip                             # 翻转
//undo                             # 撤销
//redo                             # 重做
//drain <半径>                     # 排水
//cyl <方块> <半径> <高度>         # 生成圆柱
//sphere <方块> <半径>             # 生成球体
//pyramid <方块> <大小>            # 生成金字塔

# WorldGuard - 领地保护
# 下载：https://dev.bukkit.org/projects/worldguard

常用命令：
/rg define <领地名>                # 创建领地（先用木斧选区）
/rg claim <领地名>                 # 申请领地（玩家）
/rg delete <领地名>                # 删除领地
/rg info <领地名>                  # 查看领地信息
/rg list                           # 列出所有领地
/rg addmember <领地> <玩家>        # 添加成员
/rg removemember <领地> <玩家>     # 移除成员
/rg addowner <领地> <玩家>         # 添加所有者
/rg removeowner <领地> <玩家>      # 移除所有者
/rg flag <领地> <标志> <值>        # 设置标志
/rg priority <领地> <优先级>       # 设置优先级
/rg setparent <领地> <父领地>      # 设置父领地

常用标志：
pvp                                # PVP开关
mob-spawning                       # 生物生成
creeper-explosion                  # 苦力怕爆炸
tnt                                # TNT
use                                # 交互（按钮、门等）
chest-access                       # 箱子访问
greeting                           # 进入消息
farewell                           # 离开消息
```

### 性能优化插件

**7. Spark（性能分析）**

```yaml
# 下载：https://www.spigotmc.org/resources/spark.57242/
# 现代化的性能分析工具，比Timings更强大

常用命令：
/spark profiler                    # 性能分析
/spark profiler --timeout 30       # 30秒性能分析
/spark profiler stop               # 停止分析并生成报告
/spark heapdump                    # 生成堆转储
/spark tps                         # 查看TPS
/spark ping                        # 查看延迟
/spark gc                          # 查看GC信息
/spark tickmonitoring              # Tick监控
```

**8. ClearLag（实体清理）**

```yaml
# 下载：https://www.spigotmc.org/resources/clearlagg.68271/

config.yml 配置：
auto-removal:
  enabled: true
  broadcast-message: true
  broadcast-warning: true
  autoremoval-interval: 300        # 5分钟清理一次
  world-filter:
    - world                        # 要清理的世界

  # 清理列表
  entities:
    - item                         # 掉落物
    - arrow                        # 箭
    - zombie 200                   # 僵尸（200+才清理）
    - skeleton 200                 # 骷髅

  # 不清理列表
  item-filter:
    - diamond                      # 钻石
    - netherite_ingot              # 下界合金锭
    - nether_star                  # 下界之星
    - elytra                       # 鞘翅

commands:
/lag                               # 查看服务器信息
/lagg clear                        # 立即清理
/lagg check                        # 检查实体数量
/lagg reload                       # 重载配置
/lagg gc                           # 强制垃圾回收
```

**9. FarmControl（农场限制）**

```yaml
# 下载：https://www.spigotmc.org/resources/farmcontrol.86923/
# 限制农场规模，防止卡服

功能：
- 限制区块内实体数量
- 限制刷怪塔效率
- 限制红石机器
- 限制漏斗传输

config.yml 配置：
entity-limits:
  chunk:
    animal: 20                     # 每区块最多20只动物
    monster: 30                    # 每区块最多30只怪物
    villager: 10                   # 每区块最多10个村民

farm-limiter:
  enabled: true
  max-farms-per-chunk: 2           # 每区块最多2个农场
```

## 🚀 性能优化完整指南

### JVM 启动参数优化

**Aikar's Flags（推荐，适用于 8G+ 内存）：**

```bash
#!/bin/bash
java -Xms8G -Xmx8G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem \
  -XX:MaxTenuringThreshold=1 \
  -Dusing.aikars.flags=https://mcflags.emc.gs \
  -Daikars.new.flags=true \
  -jar mohist-xxx.jar nogui
```

{% folding green::不同配置的启动参数 %}

**4G 内存（入门配置）：**
```bash
java -Xms4G -Xmx4G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -jar mohist-xxx.jar nogui
```

**6G 内存（标准配置）：**
```bash
java -Xms6G -Xmx6G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:G1HeapRegionSize=8M \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -jar mohist-xxx.jar nogui
```

**12G 内存（高配服务器）：**
```bash
java -Xms12G -Xmx12G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:G1HeapRegionSize=16M \
  -XX:G1ReservePercent=20 \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:InitiatingHeapOccupancyPercent=10 \
  -jar mohist-xxx.jar nogui
```

**16G+ 内存（旗舰配置）：**
```bash
java -Xms16G -Xmx16G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=40 \
  -XX:G1MaxNewSizePercent=50 \
  -XX:G1HeapRegionSize=16M \
  -XX:G1ReservePercent=15 \
  -XX:G1MixedGCCountTarget=3 \
  -XX:InitiatingHeapOccupancyPercent=10 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:SurvivorRatio=32 \
  -XX:MaxTenuringThreshold=1 \
  -XX:+PerfDisableSharedMem \
  -Dusing.aikars.flags=https://mcflags.emc.gs \
  -Daikars.new.flags=true \
  -jar mohist-xxx.jar nogui
```

{% endfolding %}

### 配置文件优化清单

**server.properties 优化：**
```properties
# 性能关键设置
view-distance=8                    # 降低视距
simulation-distance=6              # 降低模拟距离
network-compression-threshold=256  # 网络压缩
max-tick-time=60000               # 防止看门狗关服
```

**mohist.yml 优化：**
```yaml
optimization:
  async_chunk_load: true
  async_entity_tracker: true
  cache_chunk_data: true
  optimize_explosions: true
  optimize_hoppers: true
  optimize_redstone: true
```

**spigot.yml 优化：**
```yaml
world-settings:
  default:
    mob-spawn-range: 6             # 降低生成范围
    entity-activation-range:
      animals: 24
      monsters: 28
      raiders: 32
      misc: 12
      water: 12
    max-entity-collisions: 4       # 降低碰撞检测
    merge-radius:
      item: 4.0                    # 增大合并半径
      exp: 6.0
    hopper-transfer: 8             # 漏斗优化
    hopper-check: 1
    arrow-despawn-rate: 600        # 加快箭矢消失
```

**bukkit.yml 优化：**
```yaml
spawn-limits:
  monsters: 50                     # 降低生成上限
  animals: 8
  water-animals: 3
  water-ambient: 5
  ambient: 1

ticks-per:
  monster-spawns: 2                # 增加生成间隔
  animal-spawns: 400
  autosave: 12000                  # 减少保存频率（10分钟）

chunk-gc:
  period-in-ticks: 400             # 增加GC频率
```

## 🐛 常见问题与解决方案

{% folding red::启动和安装问题 %}

**问题1：无法启动 - 找不到主类**
```
Error: Could not find or load main class
```
解决方案：
1. 确认 Java 版本（MC 1.17+ 需要 Java 17+）
2. 检查 jar 文件完整性，重新下载
3. 使用正确的启动命令

**问题2：依赖库下载失败**
```
Failed to download libraries
```
解决方案：
1. 检查网络连接
2. 设置代理或使用镜像源
3. 手动下载 libraries 文件夹
4. 关闭防火墙重试

**问题3：内存不足**
```
java.lang.OutOfMemoryError: Java heap space
```
解决方案：
1. 增加 -Xmx 参数（如 -Xmx8G）
2. 减少安装的 Mod/插件数量
3. 优化配置文件降低内存占用
4. 升级服务器硬件

**问题4：端口被占用**
```
**** FAILED TO BIND TO PORT!
```
解决方案：
1. 修改 server.properties 的端口
2. 检查端口占用：`netstat -ano | findstr :25565`
3. 关闭占用端口的程序
4. 使用防火墙放行新端口

{% endfolding %}

{% folding yellow::兼容性问题 %}

**Mod 与插件冲突：**

常见冲突组合：
1. **区块加载冲突**
   - 问题：部分 Mod 的区块加载器与 Bukkit 插件冲突
   - 解决：更新到最新版本，或在 mohist.yml 中调整兼容性设置

2. **权限系统冲突**
   - 问题：Mod 的权限系统与 LuckPerms 冲突
   - 解决：在插件配置中禁用 Mod 权限，统一使用 LuckPerms

3. **实体系统冲突**
   - 问题：Mod 添加的实体无法被插件正确识别
   - 解决：安装 MythicMobs 等兼容插件

调试方法：
```bash
# 1. 启用调试模式
在 mohist.yml 中设置 verbose: true

# 2. 查看日志
检查 logs/latest.log 中的错误信息

# 3. 逐个测试
移除一半 Mod/插件，测试是否正常
二分法定位问题模组/插件

# 4. 查看兼容性
访问 Mohist Discord 或 GitHub Issues
查询已知的不兼容 Mod/插件列表
```

**插件无法加载：**

原因分析：
1. 插件版本不匹配（检查支持的 API 版本）
2. 缺少前置插件（如 Vault、ProtocolLib）
3. 配置文件错误
4. 权限不足

解决步骤：
```bash
# 1. 检查控制台错误信息
查看 logs/latest.log

# 2. 确认插件版本
/version 插件名

# 3. 安装依赖
根据插件页面安装所需前置

# 4. 重新加载
删除插件配置文件夹，让插件重新生成配置
```

{% endfolding %}

{% folding cyan::性能问题 %}

**服务器卡顿（TPS 低于 20）：**

诊断流程：
```bash
# 1. 查看 TPS
/tps

# 2. 生成性能报告
/spark profiler --timeout 60
# 或
/timings paste

# 3. 查看实体数量
/minecraft:debug entities

# 4. 查看区块加载
/forge tps
```

常见原因及解决：

**原因1：实体过多**
```bash
# 检查
/minecraft:debug entities

# 解决
- 安装 ClearLag 定期清理
- 使用 FarmControl 限制农场
- 降低 spawn-limits
- 使用 /kill @e[type=!player] 清理实体
```

**原因2：区块加载过多**
```bash
# 解决
- 降低 view-distance 到 6-8
- 降低 simulation-distance 到 4-6
- 使用 Chunky 预生成，避免实时生成
- 限制玩家分散范围
```

**原因3：红石机器卡服**
```bash
# 解决
- 优化红石电路设计
- 使用 FarmControl 限制红石频率
- 在 mohist.yml 启用 optimize_redstone
- 限制红石中继器/比较器数量
```

**原因4：Mod/插件性能问题**
```bash
# 定位
使用 Spark 或 Timings 查看性能占用排行

# 解决
- 更新到最新版本
- 寻找替代品
- 联系作者优化
- 移除该 Mod/插件
```

**内存占用过高：**

解决方案：
1. **定期重启**（建议每天自动重启）
   ```bash
   # Linux crontab 示例
   0 4 * * * /path/to/restart.sh
   ```

2. **优化 GC 参数**
   使用 Aikar's Flags

3. **减少预生成范围**
   只预生成必要区域

4. **清理无用数据**
   ```bash
   /co purge t:30d      # 清理30天前的CoreProtect数据
   ```

5. **监控内存使用**
   ```bash
   /spark heapsummary   # 查看堆内存使用
   /gc                  # 强制垃圾回收
   ```

{% endfolding %}

## 📊 服务器监控与维护

### 使用 Spark 进行性能分析

```bash
# 1. 基础性能分析
/spark profiler                    # 开始分析
/spark profiler stop               # 停止并生成报告

# 2. 指定分析时长
/spark profiler --timeout 60       # 分析60秒

# 3. 指定线程
/spark profiler --thread *         # 所有线程
/spark profiler --thread Server    # 仅主线程

# 4. 查看实时信息
/spark tps                         # TPS信息
/spark ping                        # 玩家延迟
/spark gc                          # GC信息
/spark heapsummary                 # 堆内存摘要

# 5. Tick 监控
/spark tickmonitoring              # 监控 tick 时间
```

### 日常维护命令

```bash
# ========== 每日维护 ==========
/save-all flush                    # 保存并刷新到磁盘
/lagg clear                        # 清理实体
/co purge t:7d                     # 清理7天前的记录

# ========== 每周维护 ==========
/spark profiler --timeout 300      # 5分钟性能分析
检查分析报告，优化性能瓶颈
备份服务器数据

# ========== 每月维护 ==========
更新 Mohist 和插件到最新稳定版
清理无用的世界区块
优化数据库（如果使用MySQL）
```

### 自动化脚本

**重启脚本（restart.sh）：**

```bash
#!/bin/bash

# 发送警告
screen -S minecraft -X stuff "/say 服务器将在5分钟后重启\n"
sleep 240

screen -S minecraft -X stuff "/say 服务器将在1分钟后重启\n"
sleep 30

screen -S minecraft -X stuff "/say 服务器将在30秒后重启\n"
sleep 20

screen -S minecraft -X stuff "/say 服务器将在10秒后重启\n"
sleep 10

# 保存并停止
screen -S minecraft -X stuff "/save-all\n"
sleep 3
screen -S minecraft -X stuff "/stop\n"

# 等待停止
sleep 10

# 备份（可选）
# cp -r world world_backup_$(date +%Y%m%d_%H%M%S)

# 重新启动
cd /path/to/server
screen -dmS minecraft java -Xms8G -Xmx8G [其他参数] -jar mohist-xxx.jar nogui
```

## 🎯 最佳实践建议

**服主经验总结：**

**1. 备份策略**
   - 每天自动备份（使用脚本或插件）
   - 保留 7 天内的每日备份
   - 保留 4 周内的每周备份
   - 重大更新前手动备份
   - 测试备份的可用性

**2. 更新策略**
   - 关注 Mohist 更新日志
   - 在测试服先测试新版本
   - 更新前通知玩家并备份
   - 保留旧版本文件以便回滚
   - 优先更新安全补丁

**3. 安全建议**
   - 使用白名单或登录插件
   - 安装防作弊插件（如 Matrix）
   - 限制 OP 权限，使用权限插件
   - 定期检查异常登录
   - 使用防火墙限制访问
   - 不要在公开渠道泄露IP

**4. 性能维护**
   - 每周生成性能报告
   - 监控 TPS 和内存使用
   - 定期清理实体和掉落物
   - 限制红石机器和刷怪塔
   - 使用区块预生成
   - 定期重启服务器

**5. 玩家体验**
   - 保持 TPS 在 19.5+ 以上
   - 合理设置游戏规则
   - 建立清晰的服务器规则
   - 及时处理玩家反馈
   - 定期举办活动
   - 营造良好的社区氛围

**6. Mod/插件管理**
   - 测试新插件的兼容性
   - 定期更新到稳定版本
   - 移除不再使用的插件
   - 注意插件权限设置
   - 查看性能占用，移除卡服插件

## 📚 相关资源

- [Mohist 官网](https://mohistmc.com/)
- [Mohist GitHub](https://github.com/MohistMC/Mohist)
- [Mohist Discord](https://discord.gg/mohistmc)
- [Mohist 文档](https://docs.mohistmc.com/)
- [SpigotMC 插件站](https://www.spigotmc.org/resources/)
- [Bukkit 插件站](https://dev.bukkit.org/)
- [CurseForge Mod站](https://www.curseforge.com/minecraft/mc-mods)
- [MC百科](https://www.mcmod.cn/)
- [我的世界整合包服务器搭建教程](/2025/08/08/00/)
- [Arclight 服务端配置指南](/2025/10/17/15/)

## 总结

Mohist 是一个成熟稳定的混合服务端，通过合理的配置和优化，可以获得出色的性能和兼容性。

**核心要点：**

- ✅ 使用合适的 JVM 参数（Aikar's Flags）
- ✅ 合理配置服务器参数（视距、实体限制）
- ✅ 定期监控服务器性能（Spark/Timings）
- ✅ 及时备份重要数据（每天自动备份）
- ✅ 保持软件更新（安全补丁优先）
- ✅ 平衡性能与体验（TPS > 19.5）
- ✅ 建立良好的社区（规则、活动、反馈）

{% note success::祝你的 Mohist 服务器运行顺利，玩家爆满！ %}

---

#### 有问题可以联系我
我的邮箱：boke@shimoxi.dpdns.org

> 本文章由 AI 辅助生成，内容经过验证和补充，如有错误欢迎指正。
