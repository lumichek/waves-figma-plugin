import * as React from "react";
import {InputLabel} from "figma-react-ui-kit";
import Slider from './Slider';
import {Borders, Values} from '../../../types';
import '../styles/index.css';

type Labels = {
  circle: string;
  radius: string;
}

type Props = {
  labels: Labels;
  borders: Borders;
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>
}

const Radius = ({labels, borders, values, setValues}: Props) => {
  return (
    <div className="inputBlock">
      <InputLabel>{borders?.rMin}</InputLabel>
      <Slider
        axis="x"
        x={values[labels.circle][labels.radius]}
        onChange={({x}) => {
          setValues({...values, [labels.circle]: {...values[labels.circle], [labels.radius]: x}});
        }}
        xmin={borders?.rMin}
        xmax={borders?.rMax}
      />
      <InputLabel>{borders?.rMax}</InputLabel>
      <div className="valueBlock">
        <InputLabel>{values[labels.circle][labels.radius]}</InputLabel>
      </div>
    </div>
  );
}

export default Radius;