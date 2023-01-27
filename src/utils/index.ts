import {Borders, Values} from "../../types";

type Color = {
  r: number;
  g: number;
  b: number;
}

const BACKGROUND_COLOR: Color = {r: 0.77, g: 0.95, b: 1};
const WAVE_COLOR: Color = {r: 0.07, g: 0.54, b: 0.69};

export const randomBoolean = () => !Math.round(Math.random());

export const generateRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

export const generate = (containerWidth: number, containerHeight: number): Values & {borders: Borders} => {
  const RADIUS_MIN_INNER = containerHeight;
  const RADIUS_MIN_OUTER = containerHeight * 1.5;
  const RADIUS_MAX_OUTER = containerHeight * 4;
  const X_MIN = 0;
  const X_MAX = containerWidth;
  const Y_MIN = 0;
  const Y_MAX = containerHeight;
  const STEP_SIZE_X = 5;
  const STEP_SIZE_Y = 10;
  const STEP_X = Math.round(containerWidth / STEP_SIZE_X);
  const STEP_Y = Math.round(containerHeight / STEP_SIZE_Y);

  const onTop = randomBoolean();
  const onLeft = randomBoolean();

  let outerCircleX, outerCircleY, outerCircleRadius;
  let innerCircleX, innerCircleY, innerCircleRadius;

  outerCircleRadius = generateRandomNumber(RADIUS_MIN_OUTER, RADIUS_MAX_OUTER);
  innerCircleRadius = generateRandomNumber(RADIUS_MIN_INNER, outerCircleRadius);

  if (onTop) {
    outerCircleY = generateRandomNumber(Y_MIN + Math.round(containerHeight / 4), Y_MIN + Math.round(containerHeight / 2));
  } else {
    outerCircleY = generateRandomNumber(Y_MAX - Math.round(containerHeight / 2), Y_MAX - STEP_Y);
  }

  outerCircleX = generateRandomNumber(X_MIN + STEP_X, X_MAX - STEP_X);

  innerCircleY = generateRandomNumber(Y_MIN + STEP_Y, outerCircleY - STEP_Y);

  if (onLeft) {
    innerCircleX = generateRandomNumber(
      Math.max(X_MIN - STEP_X, outerCircleX - outerCircleRadius),
      Math.min(Math.round(containerWidth / 2), outerCircleX)
    );
  } else {
    innerCircleX = generateRandomNumber(
      Math.min(Math.round(containerWidth / 2), outerCircleX),
      Math.min(X_MAX + STEP_X, outerCircleX + outerCircleRadius)
    );
  }

  return {
    innerCircle: {
      innerCircleX,
      innerCircleY,
      innerCircleRadius
    },
    outerCircle: {
      outerCircleX,
      outerCircleY,
      outerCircleRadius
    },
    borders: {
      rMin: RADIUS_MIN_INNER,
      rMax: RADIUS_MAX_OUTER,
      xMin: -containerWidth,
      xMax: containerWidth * 2,
      yMin: -containerHeight,
      yMax: containerHeight
    }
  };
};

export const createCircle = (x: number, y: number, r: number, color: Color): SceneNode => {
  const size = r * 2;
  const circle = figma.createEllipse();
  circle.x = x - r;
  circle.y = y - size;
  circle.resize(size, size);
  circle.fills = [{type: 'SOLID', color}];

  return circle as SceneNode;
};

export const appendCircles = (frameNode: FrameNode, circlesData: Values) => {
  const {
    children
  } = frameNode;

  const {
    innerCircle: {
      innerCircleX,
      innerCircleY,
      innerCircleRadius
    },
    outerCircle: {
      outerCircleX,
      outerCircleY,
      outerCircleRadius
    }
  } = circlesData;

  children.forEach((node) => node.remove());

  const outerCircle: SceneNode = createCircle(outerCircleX, outerCircleY, outerCircleRadius, WAVE_COLOR);
  const innerCircle: SceneNode = createCircle(innerCircleX, innerCircleY, innerCircleRadius, BACKGROUND_COLOR);

  frameNode.fills = [{type: 'SOLID', color: BACKGROUND_COLOR}];
  frameNode.appendChild(outerCircle);
  frameNode.appendChild(innerCircle);
};
