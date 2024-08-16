// req: observe          rsp: player state
// req: create npc 
// req: move
// req: move to
// req: bubble 
// req: animation

const dgram = require('dgram');
const { ToGame, FromGame } = require('./TCProto_pb2.cjs');

// web
const WebSocket = require('ws');
const express = require('express');
const http = require('http');


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
// web 

class AIClient {
    constructor(addr) {
        this.addr = addr;
        this.sock = dgram.createSocket('udp4');
        // notify server
        const msg = new FromGame();
        msg.setSolarTime(1000);
        const data = msg.serializeBinary();
        this.sock.bind(40007, 'localhost');

        this.sock.send(data, 0, data.length, this.addr[1], this.addr[0], (err) => {
            if (err) throw err;
        });
    }

    getMsg() {
        this.sock.on('message', (data) => {
            const msg = ToGame.deserializeBinary(new Uint8Array(data));
            console.log(msg.toObject());

            // web 
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    // client.send(JSON.stringify(msg));
                    client.send(JSON.stringify(msg.toObject()));
                }
            });
            // web
        });
    }

    replyMsg(msg) {
        // fake message
        // const fakeMsg = new FromGame();
        // fakeMsg.setSolarTime(1000);
        // const data = msg.serializeBinary();

        this.sock.send(msg, 0, msg.length, this.addr[1], this.addr[0], (err) => {
            if (err) throw err;
        });
    }
}

const addr = ['localhost', 40008]; // ai服务器地址
const aiClient = new AIClient(addr);

aiClient.getMsg();
aiClient.replyMsg('');
aiClient.replyMsg('Send Msg Test');




// web 
app.use(express.static('public'));  // 提供静态文件

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (webMsg) => {
        aiClient.replyMsg(webMsg);
        const msg = FromGame.deserializeBinary(new Uint8Array(webMsg));
        console.log("Msg From Web", msg.toObject());
    });
    ws.on('close', () => console.log('Client disconnected'));
});

server.listen(8080, () => {
    console.log('Web and WebSocket server listening on port 8080');
});
// web 

