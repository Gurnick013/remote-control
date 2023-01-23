import { httpServer } from "./http_server";
import { createWebSocketStream, WebSocketServer } from "ws";
import { events } from "./service/events";
import { mouse } from "@nut-tree/nut-js";
import { printScreen } from "./service/printScreen";

const HTTP_PORT = 8181;
const WSS_PORT = 8080;

const server = httpServer;
const wss = new WebSocketServer({ port: WSS_PORT });

wss.on('connection', (ws) => {
  console.log('Connected')
  const stream = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false })
  stream.on('data', async (chunk) => {
    await events(chunk);
    if (chunk.toString() === 'mouse_position') {
      const pos = await mouse.getPosition()
      stream.write(`mouse_position ${pos.x},${pos.y}`)
    } else if (chunk.toString() === 'prnt_scrn') {
      await printScreen(stream);
    } else {
      stream.write(chunk.toString().replace(/ /g,"_"))
    }
    console.log(`Last Command: ${chunk}`)
  })
})

server.listen(HTTP_PORT);
console.log(`Start server on the ${HTTP_PORT} port!`);

process.on('SIGINT', () => {
  server.listen(HTTP_PORT).close()
  wss.close()
})

wss.on('close', () => console.log('Connection is closed'));
wss.on('error', (e) => console.log(`Error: ${e.message}`))
