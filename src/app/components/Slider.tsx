import * as React from "react";
import Slider from 'react-input-slider';

type SliderSize = 'small' | 'medium';
type SliderAxis = 'x' | 'y' | 'xy';

type Props = {
  x: number;
  xmin: number;
  xmax: number;
  axis: SliderAxis;
  size?: SliderSize;
  onChange: ({x}: {x: number}) => void
}

const StyledSlider = ({x, onChange, xmin, xmax, axis, size = 'medium'}: Props) => {
  return (
    <Slider
      axis={axis}
      x={x}
      onChange={onChange}
      xmin={xmin}
      xmax={xmax}
      styles={{
        track: {
          backgroundColor: '#dadada',
          width: size === 'medium' ? 512 : 206,
        },
        active: {
          backgroundColor: '#18a0fb'
        },
        thumb: {
          width: 15,
          height: 15
        }
      }}
    />
  );

}

export default StyledSlider;