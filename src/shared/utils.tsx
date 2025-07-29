import { Layout, Shape, Txt, View2D } from "@motion-canvas/2d";
import { createRef, ThreadGenerator } from "@motion-canvas/core";
import { all, waitFor } from "@motion-canvas/core/lib/flow";
export function* appear(object: Shape, duration = 1): ThreadGenerator {
  let scale = object.scale();

  yield* all(
    object.scale(0).scale(scale, duration),
    object.opacity(0).opacity(1, duration)
  );
}
export function* renderLines(
  view: View2D,
  {
    lines,
    y,
  }: {
    lines: string[];
    y: number;
  }
): ThreadGenerator {
  const linesRef = lines.map(() => createRef<Txt>());
  view.add(
    <Layout y={y} x={-700} height={100} layout direction="column" rowGap={10}>
      {lines.map((_, i) => (
        <Txt ref={linesRef[i]} fill="#ffffff" fontSize={40} width={100} />
      ))}
    </Layout>
  );
  for (let i = 0; i < lines.length; i++) {
    yield* linesRef[i]().text(
      addLineBreaks(lines[i], 40),
      getDuration(lines[i])
    );
    yield* waitFor(2);
  }
}

const getDuration = (str: string) => {
  const charactersPerSecond = 50;
  return str.length / charactersPerSecond;
};
const addLineBreaks = (str: string, fontSize: 30 | 40) => {
  if (fontSize === 30) {
    return wrapTextToWidth(str, 115);
  } else if (fontSize === 40) {
    return wrapTextToWidth(str, 85);
  }
};

export function wrapTextToWidth(text: string, maxWidth: number): string {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= maxWidth) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);

  return lines.join("\n");
}
