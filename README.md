

## Introduction

This project generates storylines based on dialogues and enacts them within a 3D scene.

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure


### Server Side

- Functionality：Receives instructions from the AI server and establishes communication with the web client.
- Environment：`Node.js`
- Main File：`client.cjs`
- Dependencies：`dgram`、`express`、`google-protobuf`、`protobufjs`、`ws`


### Web Client

- Functionality：Dialogue + 3D scene generation
- Tech Stack and Dependencies
    - `React + TypeScript + Vite`
    - UI Library：`Material UI`
    - Styling：`TailwindCSS`
    - State Management：`Zustand`
    - Communication：`WebSocket`
    - 3D Rendering ：`R3F (React Three Fiber)`
    - Navigation and Character Control：`Yuka.js`
- Control Logic
  <ol type="1">
    <li>Receive and store instructions</li>
    <li>Pass them as parameters to character components</li>
    <li>
      Control actions based on different instructions:
      <ul>
        <li>Movement：Uses <code>Yuka.js</code> + <code>NavMesh</code></li>
        <li>Speech Bubbles：<code>THREE.Sprite</code></li>
        <li>Animations：<code>THREE.AnimationAction</code></li>
      </ul>
    </li>
  </ol>
      


### Key Directories

```
chat_scene/
│
├── src/   
│   ├── hooks/  
│   │   └── useWebSocket.ts                 # Data communication and instruction state storage
│   │     
│   └── pages/            
│       └── chat/
│           ├── message-box/                # Dialogue box components
│           └── threejs-area/               # Three.js components
│               ├── controlByMessage.tsx      # Character control logic
│               └── scene.tsx                 # Scene switching logic
│
│
└── client.cjs   # Server entry file
```

## Incomplete Parts

- LLM interface
- Problems in animation
- Camera-following logic
