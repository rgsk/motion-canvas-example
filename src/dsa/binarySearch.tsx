import {
  Curve,
  Latex,
  Layout,
  Line,
  makeScene2D,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefMap,
  delay,
  Reference,
  sequence,
  Vector2,
} from "@motion-canvas/core";
import { appear } from "../shared/utils";
function under(object: Curve): Vector2 {
  return object.bottom().addY(20);
}
/**
 * An animation of an arrow appearing.
 */
function* showArrow(ref: Line) {
  let lineWidth = ref.lineWidth();
  let arrowSize = ref.arrowSize();

  ref.opacity(0);
  ref.end(0);
  ref.lineWidth(0);
  ref.arrowSize(0);

  yield* all(
    ref.lineWidth(lineWidth, 1),
    ref.arrowSize(arrowSize, 1),
    ref.opacity(1, 1),
    ref.end(1, 1)
  );
}
function getArrow(ref: Reference<Line>, color: string, object: Curve) {
  return (
    <Line
      ref={ref}
      points={[
        [0, 0],
        [0, 100],
      ]}
      stroke={color}
      arrowSize={25}
      lineWidth={10}
      position={under(object)}
      startArrow
    />
  );
}

export default makeScene2D(function* (view) {
  const values = [1, 2, 3, 3, 3, 4, 4, 5];
  const n = values.length;
  const rectangles = Array.from({ length: n }, () => createRef<Rect>());
  const layout = createRef<Layout>();
  view.add(
    <Layout layout ref={layout} gap={40}>
      {rectangles.map((ref, i) => (
        <Rect
          ref={ref}
          grow={1}
          size={120}
          stroke={"white"}
          lineWidth={8}
          opacity={0}
        >
          <Latex
            tex={`${values[i]}`}
            fill={"white"}
            layout={false}
            scale={1.5}
          />
        </Rect>
      ))}
    </Layout>
  );
  // showing the rectangles
  yield* sequence(0.025, ...rectangles.map((ref) => appear(ref(), 1)));

  // target number stuff
  const text = createRef<Txt>();
  const target = createRef<Txt>();
  view.add(
    <Layout layout y={-200} scale={2} gap={10}>
      <Txt ref={text} fill={"white"} />
      <Txt ref={target} fill={"white"} fontWeight={900} />
    </Layout>
  );

  //   let targetNumber = values[random.nextInt(0, values.length - 1)];
  const targetNumber = 4;
  const indexesOfTarget = values
    .map((v, i) => (v == 4 ? i : -1))
    .filter((v) => v != -1);

  // display the target number
  yield* sequence(
    0.25,
    text().text(`Target: `, 1),
    target().text(`${targetNumber}`, 1),
    delay(
      0.5,
      all(
        target().scale(1.5, 0.5).to(1, 0.5),
        ...indexesOfTarget
          .map((index) => {
            return [
              rectangles[index]()
                .fill("rgba(255, 255, 255, 0.25)", 0.5)
                .to("rgba(255, 255, 255, 0.0)", 0.5),
              rectangles[index]().lineWidth(15, 0.5).to(8, 0.5),
              rectangles[index]().scale(1.1, 0.5).to(1, 0.5),
            ];
          })
          .flat()
      )
    )
  );
  // createRefMap for organizing multiple refs in a nicer way
  const searchArrows = createRefMap<Line>();

  // left/right arrows
  view.add(
    <>
      {getArrow(searchArrows.left, "white", rectangles[0]())}
      {getArrow(
        searchArrows.right,
        "white",
        rectangles[rectangles.length - 1]()
      )}
    </>
  );
  yield* all(...searchArrows.mapRefs((ref) => showArrow(ref)));

  let left = 0;
  let right = values.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    view.add(getArrow(searchArrows.mid, "orange", rectangles[mid]()));

    yield* showArrow(searchArrows.mid());

    if (values[mid] === targetNumber) {
      // move arrows to the found element and highlight it
      yield* all(
        searchArrows.left().opacity(0, 1),
        searchArrows.left().position(searchArrows.mid().position, 1),
        searchArrows.right().opacity(0, 1),
        searchArrows.right().position(searchArrows.mid().position, 1),
        searchArrows.mid().stroke("lightgreen", 1),
        rectangles[mid]().stroke("lightgreen", 1),
        rectangles[mid]().fill("rgba(0, 255, 0, 0.2)", 1),
        sequence(
          0.1,
          ...rectangles
            .slice(left - 1, mid)
            .map((ref) => ref().opacity(0.25, 1))
        ),
        sequence(
          0.1,
          ...rectangles
            .slice(mid + 1, right + 2)
            .reverse()
            .map((ref) => ref().opacity(0.25, 1))
        )
      );

      break;
    }

    if (values[mid] < targetNumber) {
      // left to middle
      yield* all(
        searchArrows.left().position(under(rectangles[mid + 1]()), 1),
        searchArrows.mid().opacity(0, 1),
        // slice shenanigans so the fading looks smooth
        sequence(
          0.1,
          ...rectangles
            .slice(left, mid + 1)
            .map((ref) => ref().opacity(0.25, 1))
        )
      );

      left = mid + 1;
    } else {
      // right to middle
      yield* all(
        searchArrows.right().position(under(rectangles[mid - 1]()), 1),
        searchArrows.mid().opacity(0, 1),
        // slice shenanigans so the fading looks smooth (reverse so its right-to-left)
        sequence(
          0.1,
          ...rectangles
            .slice(mid, right + 1)
            .reverse()
            .map((ref) => ref().opacity(0.25, 1))
        )
      );

      right = mid - 1;
    }

    searchArrows.mid().remove();
  }
});
