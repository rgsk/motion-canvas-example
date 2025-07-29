import { Circle, makeScene2D } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const myCircle = createRef<Circle>();

  view.add(
    <Circle
      ref={myCircle}
      // try changing these properties:
      x={-300}
      width={140}
      height={140}
      fill="#e13238"
    />
  );

  yield* myCircle().fill("#e6a700", 1).to("#e13238", 1);
  yield* myCircle().position.x(300, 1).to(-300, 1);
});
