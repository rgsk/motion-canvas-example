import { Code, makeScene2D } from "@motion-canvas/2d";
import { all, createSignal, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const message = createSignal(`Hello, world!`);
  const body = createSignal(() => `console.log('${message()}');`);

  view.add(
    <Code
      fontSize={28}
      offsetX={-1}
      x={-400}
      code={() => `\
function hello() {
  ${body()}
}`}
    />
  );

  yield* waitFor(0.3);
  yield* all(message("Goodbye, world!", 0.6));
  yield* waitFor(0.3);
});
