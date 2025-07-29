import {
  Latex,
  Layout,
  makeScene2D,
  Rect,
  Txt,
  View2D,
} from "@motion-canvas/2d";
import { createRef, sequence, waitFor } from "@motion-canvas/core";
import { appear, renderLines } from "../shared/utils";

export default makeScene2D(function* (view) {
  const textRef = createRef<Txt>();
  view.add(
    <>
      <Txt ref={textRef} fill="#ffffff" />
    </>
  );
  yield* textRef().text("Insertion Sort", 1);
  yield* waitFor(2);
  view.removeChildren();
  yield* renderLines(view, {
    lines: [
      "Sorting Algorithm like Insertion Sort, sorts the array, implying given an array, in which elements are present in random order, the goal of the algorithm is to ensure elements are present in increasing order, smallest on the left and largest on the right.",
    ],
    y: -300,
  });
  const values = [5, 4, 3, 2, 1];
  const sortedValues = [...values].sort();
  yield* renderArray(view, { y: 0, values: values, leftText: "Array" });
  yield* renderArray(view, {
    y: 200,
    values: sortedValues,
    leftText: "Sorted Array",
  });
});

function* renderArray(
  view: View2D,
  { y, values, leftText }: { y: number; values: number[]; leftText: string }
) {
  const n = values.length;
  const rectangles = Array.from({ length: n }, () => createRef<Rect>());
  const layout = createRef<Layout>();
  view.add(
    <Layout layout ref={layout} gap={20} y={y}>
      {rectangles.map((ref, i) => (
        <Rect
          ref={ref}
          grow={1}
          size={80}
          stroke={"white"}
          lineWidth={4}
          opacity={0}
        >
          <Latex tex={`${values[i]}`} fill={"white"} layout={false} scale={1} />
        </Rect>
      ))}
    </Layout>
  );
  const leftTextRef = createRef<Txt>();
  view.add(
    <>
      <Txt fill={"white"} ref={leftTextRef} />
    </>
  );
  // showing the rectangles
  yield* sequence(
    0.025,
    leftTextRef().text(leftText, 1),
    leftTextRef().position(
      [rectangles[0]().left().x - leftTextRef().width(), y],
      1
    ),
    ...rectangles.map((ref) => appear(ref(), 1))
  );
}
