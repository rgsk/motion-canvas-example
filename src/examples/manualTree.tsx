import { Circle, Line, makeScene2D, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const circle1 = createRef<Circle>();
  const circle2 = createRef<Circle>();
  const circle3 = createRef<Circle>();
  view.add(
    <>
      <Circle size={100} stroke="white" lineWidth={2} ref={circle1}>
        <Txt text="6" fill="white" fontSize={40} />
      </Circle>
      <Circle
        size={100}
        stroke="white"
        lineWidth={2}
        x={200}
        y={100}
        ref={circle2}
      >
        <Txt text="9" fill="white" fontSize={40} />
      </Circle>
      <Circle
        ref={circle3}
        size={100}
        stroke="white"
        lineWidth={2}
        x={-200}
        y={100}
      >
        <Txt text="2" fill="white" fontSize={40} />
      </Circle>
    </>
  );
  view.add(
    <>
      <Line
        points={[circle1().position(), circle2().position()]}
        lineWidth={3}
        stroke={"white"}
        startOffset={50}
        endOffset={50}
      />
      <Line
        points={[circle1().position(), circle3().position()]}
        lineWidth={3}
        stroke={"white"}
        startOffset={50}
        endOffset={50}
      />
    </>
  );
  yield;
});
