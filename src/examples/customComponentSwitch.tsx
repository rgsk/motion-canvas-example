import { makeScene2D } from "@motion-canvas/2d";

export default makeScene2D(function* (view) {
  const switchRef = createRef<Switch>();
  view.add(
    <>
      <Switch ref={switchRef} initialState={false} accent={"purple"} />
    </>
  );
  yield* waitFor(2);
  yield* switchRef().toggle(2);
  yield* switchRef().toggle(2);
});

import { Circle, Node, NodeProps, Rect } from "@motion-canvas/2d";
import {
  Color,
  PossibleColor,
  all,
  createRef,
  createSignal,
  easeInOutCubic,
  tween,
  waitFor,
} from "@motion-canvas/core";

export interface SwitchProps extends NodeProps {
  initialState?: boolean;
  accent?: PossibleColor;
}

export class Switch extends Node {
  private isOn: boolean;
  private readonly indicatorPosition = createSignal(0);
  private readonly offColor = new Color("#242424");
  private readonly indicator = createRef<Circle>();
  private readonly container = createRef<Rect>();
  private color: PossibleColor;

  public constructor(props?: SwitchProps) {
    super({
      ...props,
    });

    this.isOn = props.initialState ?? false;
    this.color = props.accent ?? "red";
    this.indicatorPosition(this.isOn ? 50 : -50);

    this.add(
      <Rect
        ref={this.container}
        fill={this.isOn ? this.color : this.offColor}
        size={[200, 100]}
        radius={100}
      >
        <Circle
          x={() => this.indicatorPosition()}
          ref={this.indicator}
          size={[80, 80]}
          fill="#ffffff"
        />
      </Rect>
    );
  }

  public *toggle(duration: number) {
    yield* all(
      tween(duration, (value) => {
        const oldColor = this.isOn ? (this.color as Color) : this.offColor;
        const newColor = this.isOn ? this.offColor : (this.color as Color);

        this.container().fill(
          Color.lerp(oldColor, newColor, easeInOutCubic(value))
        );
      }),

      tween(duration, (value) => {
        const currentPos = this.indicator().position();

        this.indicatorPosition(
          easeInOutCubic(value, currentPos.x, this.isOn ? -50 : 50)
        );
      })
    );
    this.isOn = !this.isOn;
  }
}
