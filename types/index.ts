export type Borders = {
  rMin: number;
  rMax: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export type Values = {
  innerCircle: {
    innerCircleX: number;
    innerCircleY: number;
    innerCircleRadius: number;
  },
  outerCircle: {
    outerCircleX: number;
    outerCircleY: number;
    outerCircleRadius: number;
  }
}