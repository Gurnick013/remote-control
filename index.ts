import { httpServer } from "./src/http_server";
import { WebSocketServer } from "ws";

const HTTP_PORT = 8181;

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Connect')
  ws.on('message', async (data) => {
    console.log(data);
  })
})

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
