import { mouse, left, right, up, down, Point, Button, straightTo } from '@nut-tree/nut-js'

export const events = async (chunk: string) => {
  const [command, width, height] = chunk.toString().split(' ');
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
    mouse.config.mouseSpeed = 300
    await mouse.pressButton(Button.LEFT)

    for (let angle = 0; angle < 360; angle += 1) {
      const x = center.x - radius * Math.cos((angle * Math.PI) / 180) + radius;
      const y = center.y - radius * Math.sin((angle * Math.PI) / 180);
      await mouse.move(straightTo(new Point(x, y)));
    }

    await mouse.releaseButton(Button.LEFT)
    return
  }
}
