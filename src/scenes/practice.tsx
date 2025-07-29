import { makeScene2D, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";
import { waitFor } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const fullText = "Binary Search is a powerful algorithm.";
  const typed = createRef<Txt>();
  view.add(<Txt ref={typed} text="" fontSize={40} fill="#ffffff" />);

  // Type out the text one character at a time
  for (let i = 1; i <= fullText.length; i++) {
    typed().text(fullText.slice(0, i));
    yield* waitFor(0.05); // Adjust speed here
  }

  yield* waitFor(1); // Pause at the end
});
