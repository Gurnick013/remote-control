import { httpServer } from "./http_server";
import { createWebSocketStream, WebSocketServer } from "ws";
import { events } from "./service/events";

const HTTP_PORT = 8181;
const WSS_PORT = 8080;

const server = httpServer;
const wss = new WebSocketServer({ port: WSS_PORT });

wss.on('connection', (ws) => {
  console.log('Connected')
  const stream = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false })
  stream.on('data', async (chunk) => {
    await events(chunk);
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
