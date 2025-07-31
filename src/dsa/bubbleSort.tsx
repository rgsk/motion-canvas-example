import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  createSignal,
  makeRef,
  range,
  useRandom,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const random = useRandom();

  const randomArray = range(7).map((i) => random.nextInt(1, 70));
  const array = [5, 4, 1, 2, 9];
  const signals = range(array.length).map((i) => createSignal(array[i]));
  let map: Map<number, number> = new Map();
  for (let i = 0; i < signals.length; i++) {
    map.set(i, i);
  }
  const rects: Rect[] = [];
  const txts: Txt[] = [];
  view.add(
    range(signals.length).map((i) => (
      <Rect
        ref={makeRef(rects, i)}
        width={150}
        height={150}
        x={(-185 * (signals.length - 1)) / 2 + 185 * i}
        fill="#e3242b"
        radius={10}
        y={-275}
      />
    ))
  );

  yield view.add(
    range(signals.length).map((i) => (
      <Txt
        ref={makeRef(txts, i)}
        fontSize={75}
        text={signals[i]().toString()}
        x={rects[i].x()}
        y={-275}
        fill={"#f0f0f0"}
      />
    ))
  );

  let jump = 90;

  for (let i = 0; i < signals.length - 1; i++) {
    for (let j = 0; j < signals.length - i - 1; j++) {
      yield* all(
        rects[map.get(j)].fill("#e6a700", 0.2),
        rects[map.get(j + 1)].fill("#e6a700", 0.2)
      );
      if (signals[map.get(j)]() > signals[map.get(j + 1)]()) {
        yield* all(
          rects[map.get(j)].y(rects[map.get(j)].y() - jump, 0.1),
          rects[map.get(j + 1)].y(rects[map.get(j + 1)].y() + jump, 0.1),
          txts[map.get(j)].y(txts[map.get(j)].y() - jump, 0.1),
          txts[map.get(j + 1)].y(txts[map.get(j + 1)].y() + jump, 0.1)
        );
        yield* all(
          rects[map.get(j)].x(rects[map.get(j)].x() + 185, 0.2),
          rects[map.get(j + 1)].x(rects[map.get(j + 1)].x() - 185, 0.2),
          txts[map.get(j)].x(txts[map.get(j)].x() + 185, 0.2),
          txts[map.get(j + 1)].x(txts[map.get(j + 1)].x() - 185, 0.2)
        );
        yield* all(
          rects[map.get(j)].y(rects[map.get(j)].y() + jump, 0.1),
          rects[map.get(j + 1)].y(rects[map.get(j + 1)].y() - jump, 0.1),
          txts[map.get(j)].y(txts[map.get(j)].y() + jump, 0.1),
          txts[map.get(j + 1)].y(txts[map.get(j + 1)].y() - jump, 0.1)
        );

        let temp2 = map.get(j);
        map.set(j, map.get(j + 1));
        map.set(j + 1, temp2);
      }
      yield* all(
        rects[map.get(j)].fill(
          i === signals.length - 2 ? "#2832c2" : "#e3242b",
          0.2
        ),
        rects[map.get(j + 1)].fill(
          j + 1 == signals.length - i - 1 ? "#2832c2" : "#e3242b",
          0.2
        )
      );
    }
  }
});
