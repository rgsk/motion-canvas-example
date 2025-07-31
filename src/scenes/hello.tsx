import { makeScene2D, Txt } from "@motion-canvas/2d";

export default makeScene2D(function* (view) {
  view.add(
    <>
      <Txt fill="white">Hello World!</Txt>
    </>
  );
  yield;
});
