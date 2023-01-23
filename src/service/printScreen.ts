import { screen, mouse, Region } from "@nut-tree/nut-js";
import Jimp from "jimp";
import { WSStream } from "../interface";

export const printScreen = async (ws: WSStream) => {
  try {
    const mousePosition = await mouse.getPosition();
    const region = await new Region(mousePosition.x - 100, mousePosition.y - 100, 200, 200);
    const image = await (await screen.grabRegion(region)).toRGB();
    const jimp = await Jimp.read(await new Jimp(image));
    const buffer = await jimp.getBase64Async(jimp.getMIME());
    ws.write(`prnt_scrn ${buffer.split('data:image/png;base64,').join('')}`);
  } catch (e) {
    console.log(`Error: ${e}`)
  }
}
