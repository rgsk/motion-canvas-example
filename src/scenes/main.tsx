import { Circle, makeScene2D } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

import { ThreadGenerator } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const circle = createRef<Circle>();
  view.add(<Circle ref={circle} width={100} height={100} />);

  yield* flicker(circle());
});

function* flicker(circle: Circle): ThreadGenerator {
  circle.fill("red");
  yield;
  circle.fill("blue");
  yield;
  circle.fill("red");
  yield;
}
