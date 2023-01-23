import { mouse, left, right, up, down, Point, Button, straightTo } from '@nut-tree/nut-js'

export const events = async (chunk: string) => {
  try {
    const [command, width, height] = chunk.toString().split(' ');
    mouse.config.mouseSpeed = 200
    if (command === 'mouse_left') {
      return  await mouse.move(left(+width))
    }
    if (command === 'mouse_right') {
      return await mouse.move(right(+width))
    }
    if (command === 'mouse_up') {
      await mouse.move(up(+width));
      return
    }
    if (command === 'mouse_down') {
      await mouse.move(down(+width));
      return;
    }
    if (command === 'draw_circle') {
      const center = await mouse.getPosition()
      const radius = +width;
      mouse.config.mouseSpeed = 500;
      await mouse.pressButton(Button.LEFT)

      for (let angle = 0; angle < 360; angle += 1) {
        const x = center.x - radius * Math.cos((angle * Math.PI) / 180) + radius;
        const y = center.y - radius * Math.sin((angle * Math.PI) / 180);
        await mouse.move(straightTo(new Point(x, y)));
      }

      await mouse.releaseButton(Button.LEFT)
      return;
    }
    if (command === 'draw_square') {
      await mouse.pressButton(Button.LEFT)
      await mouse.move(right(+width))
      await mouse.move(down(+width))
      await mouse.move(left(+width))
      await mouse.move(up(+width))
      await mouse.releaseButton(Button.LEFT)
      return;
    }
    if (command === 'draw_rectangle') {
      await mouse.pressButton(Button.LEFT);
      await mouse.move(down(+height));
      await mouse.move(right(+width));
      await mouse.move(up(+height));
      await mouse.move(left(+width));
      await mouse.releaseButton(Button.LEFT);
      return;
    }
  } catch (e) {
    console.log(`Error: ${(e as Error).message}`)
  }
}

