import { parser } from "@lezer/javascript";
import { Code, LezerHighlighter } from "@motion-canvas/2d";
import { makeProject } from "@motion-canvas/core";
import countSort from "./external/countSort?scene";

Code.defaultHighlighter = new LezerHighlighter(parser);
export default makeProject({
  scenes: [countSort],
});
