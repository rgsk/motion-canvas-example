import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  createSignal,
  makeRef,
  range,
  useRandom,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const rects: Rect[] = [];
  const txts: Txt[] = [];
  const random = useRandom();

  let map: Map<number, number> = new Map();

  view.fill("#141414");

  const array = [5, 4, 1, 2, 9];
  const signals = range(array.length).map((i) => createSignal(array[i]));

  for (let i = 0; i < signals.length; i++) {
    map.set(i, i);
  }

  let space_x = 185;

  view.add(
    range(signals.length).map((i) => (
      <Rect
        ref={makeRef(rects, i)}
        width={150}
        height={150}
        x={(-space_x * (signals.length - 1)) / 2 + space_x * i}
        fill="#e3242b"
        radius={10}
        y={-225}
      />
    ))
  );

  yield view.add(
    range(signals.length).map((i) => (
      <Txt
        ref={makeRef(txts, i)}
        fontSize={75}
        fontFamily={"JetBrains Mono"}
        text={signals[i]().toString()}
        x={rects[i].x()}
        y={-225}
        fill={"#f0f0f0"}
      />
    ))
  );

  const jump = 175;

  for (let i = 1; i < signals.length; i++) {
    let key = signals[map.get(i)]();
    let j = i - 1;
    yield* all(
      rects[map.get(i)].fill("#e6a700", 0.1),
      rects[map.get(i)].y(rects[map.get(i)].y() - jump, 0.2),
      txts[map.get(i)].y(txts[map.get(i)].y() - jump, 0.2)
    );
    let steps = 0;
    while (j >= 0 && signals[map.get(j)]() > key) {
      steps += 1;
      yield* all(
        rects[map.get(j)].x(rects[map.get(j)].x() + space_x, 0.2),
        txts[map.get(j)].x(txts[map.get(j)].x() + space_x, 0.2)
      );
      let temp = map.get(j + 1);
      map.set(j + 1, map.get(j));
      map.set(j, temp);
      j -= 1;
    }
    yield* all(
      rects[map.get(j + 1)].x(rects[map.get(j + 1)].x() - steps * space_x, 0.2),
      txts[map.get(j + 1)].x(txts[map.get(j + 1)].x() - steps * space_x, 0.2)
    );
    yield* all(
      rects[map.get(j + 1)].fill("#e3242b", 0.2),
      rects[map.get(j + 1)].y(rects[map.get(j + 1)].y() + jump, 0.2),
      txts[map.get(j + 1)].y(txts[map.get(j + 1)].y() + jump, 0.2)
    );
  }
  for (let i = 0; i < signals.length; i++) {
    yield* rects[map.get(i)].fill("#2be324", 0.15);
  }
});
