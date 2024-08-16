

## 简介

根据对话生成剧情，并在3D场景中进行演绎

## 启动

```bash
npm install
npm run dev
```

## 项目架构


### 服务器端

- 功能：接收 AI server 传来的指令，并与web端建立通信
- 环境：`Node.js`
- 项目文件：`client.cjs`
- 相关依赖：`dgram`、`express`、`google-protobuf`、`protobufjs`、`ws`


### Web端

- 功能：对话 + 3D场景生成
- 技术栈及相关依赖
    - `React + TypeScript + Vite`
    - UI库：`Material UI`
    - 样式：`TailwindCSS`
    - 状态管理：`Zustand`
    - 通信：`WebSocket`
    - 3D ：`R3F`
    - 寻路和人物控制：`Yuka.js`
- 控制逻辑
  <ol type="1">
    <li>接收并存储指令</li>
    <li>通过参数传递给人物组件</li>
    <li>
      根据不同指令进行控制:
      <ul>
        <li>移动：使用 Yuka + NavMesh</li>
        <li>气泡框：THREE.Sprite</li>
        <li>动画：THREE.AnimationAction</li>
      </ul>
    </li>
  </ol>
      


### 重要文件所在目录

```
chat_scene/
│
├── src/   
│   ├── hooks/  
│   │   └── useWebSocket.ts                 # 数据通信、指令状态存储
│   │     
│   └── pages/            
│       └── chat/
│           ├── message-box/                # 对话框相关
│           └── threejs-area/               # threejs相关
│               ├── controlByMessage.tsx      # 人物控制
│               └── scene.tsx                 # 场景切换
│
│
└── client.cjs   # 服务器端入口文件
```

## 未完成部分

- LLM 接口
- 人物模型的动作问题
- 相机跟随相关逻辑
