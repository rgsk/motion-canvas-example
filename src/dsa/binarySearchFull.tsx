import { makeScene2D, Txt } from "@motion-canvas/2d";
import { waitFor } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const message = (
    <Txt text="Binary Search" fontSize={80} fill="#ffffff" opacity={0} />
  );
  view.add(message);

  // Fade in and out
  yield* message.opacity(1, 2); // Fade in over 2 seconds
  yield* message.opacity(0, 1); // Fade out over 1 second
  yield* waitFor(1); // Wait for 1 second

  const heading = (
    <Txt
      text={`We are given an array of numbers, and we want to know if a certain number "target" exists in it or not.`}
      fontSize={30}
      fill="#ffffff"
      opacity={0}
      y={100} // Move it a bit lower
    />
  );
  view.add(heading);

  yield* heading.opacity(1, 1); // Fade in heading over 1s
  yield* waitFor(10); // Hold for 10 seconds
});
