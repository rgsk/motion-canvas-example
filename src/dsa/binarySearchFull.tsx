import {
  Latex,
  Layout,
  makeScene2D,
  Rect,
  Txt,
  View2D,
} from "@motion-canvas/2d";
import { createRef, ThreadGenerator } from "@motion-canvas/core";
import { sequence, waitFor } from "@motion-canvas/core/lib/flow";
import { appear, renderLines } from "../shared/utils";

function* intro(view: View2D): ThreadGenerator {
  const message = createRef<Txt>();

  view.add(<Txt text="" ref={message} fontSize={80} fill="#ffffff" />);

  // Fade in and out
  yield* message().text("Binary Search", 1);
  yield* waitFor(1); // Wait for 1 second
}

function* searchForTargetSmallArray(view: View2D) {
  yield* renderLines(view, {
    lines: [
      `We are given an array of numbers, and we want to know if a certain number "target" exists in it or not.`,
    ],
    y: -400,
  });
  const values = [5, 4, 2, 1, 3];
  const n = values.length;
  const rectangles = Array.from({ length: n }, () => createRef<Rect>());
  const layout = createRef<Layout>();
  view.add(
    <Layout layout ref={layout} gap={20} y={-200}>
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
  // showing the rectangles
  yield* sequence(0.025, ...rectangles.map((ref) => appear(ref(), 1)));

  yield* renderLines(view, {
    lines: [
      `Can you tell, if 2 exists or not?`,
      `Pretty easy right, can you tell if 3 exists or not, and what about 9?`,
      "How are we coming to the conclusion that 9 doesn't exists?",
      "Answer: By checking each element from the beginning of the array to the end.",
    ],
    y: -50,
  });
}

function* linearSearch(view: View2D) {
  yield* renderLines(view, {
    lines: [`Linear Search`],
    y: -400,
  });
  const values = [5, 4, 2, 1, 3];
  const n = values.length;
  const rectangles = Array.from({ length: n }, () => createRef<Rect>());
  const layout = createRef<Layout>();
  view.add(
    <Layout layout ref={layout} gap={20} y={-200}>
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
  // showing the rectangles
  yield* sequence(0.025, ...rectangles.map((ref) => appear(ref(), 1)));
}

export default makeScene2D(function* (view) {
  yield* intro(view);
  view.removeChildren();

  yield* searchForTargetSmallArray(view);
  view.removeChildren();

  yield* linearSearch(view);
  view.removeChildren();
});
