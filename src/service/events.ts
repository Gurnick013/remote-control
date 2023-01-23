import { mouse, left, right, up, down } from '@nut-tree/nut-js'

export const events = async (chunk: string) => {
  const [command, width, height] = chunk.toString().split(' ');
  if (command === 'mouse_left') {
     return  await mouse.move(left(+width))
    }
  if (command === 'mouse_right') {
    return await mouse.move(right(+width))
    }
  if (command === 'mouse_up') {
    return await mouse.move(up(+width))
  }
  if (command === 'mouse_down') {
    return await mouse.move(down(+width))
  }
}
