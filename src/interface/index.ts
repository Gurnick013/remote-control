import { createWebSocketStream } from "ws";

export type WSStream = ReturnType<typeof createWebSocketStream>;
