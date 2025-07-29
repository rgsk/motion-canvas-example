import { Circle, makeScene2D, Rect } from "@motion-canvas/2d";
import { all, createRef } from "@motion-canvas/core";
import { appear } from "../shared/utils";

export default makeScene2D(function* (view) {
  const rect = createRef<Rect>();
  view.add(
    <Rect ref={rect} size={320} stroke={"red"} lineWidth={10} x={-300} />
  );

  const circle = createRef<Circle>();
  view.add(
    <Circle ref={circle} size={320} stroke={"blue"} lineWidth={10} x={300} />
  );

  yield* all(appear(rect()), appear(circle()));

  // moving objects
  yield* all(
    rect().position.y(rect().position.y() - rect().height() / 4, 1),
    circle().position.y(circle().position.y() + circle().height() / 4, 1)
  );

  // rotating and filling the square (opacity 80%)
  // scaling and filling the circle (opacity 80%)
  yield* all(
    rect().rotation(-90, 1),
    rect().fill("rgba(255, 0, 0, 0.8)", 1),

    circle().scale(2, 1),
    circle().fill("rgba(0, 0, 255, 0.8)", 1)
  );

  // change color
  yield* all(
    rect().fill("rgba(0, 255, 0, 0.8)", 1),
    rect().stroke("rgb(0, 255, 0)", 1),

    circle().fill("rgba(255, 165, 0, 0.8)", 1),
    circle().stroke("rgb(255, 165, 0)", 1)
  );

  yield* all(rect().opacity(0, 1), circle().opacity(0, 1));
});
