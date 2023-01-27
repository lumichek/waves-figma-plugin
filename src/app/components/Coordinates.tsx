import * as React from "react";
import {InputLabel} from "figma-react-ui-kit";
import Slider from './Slider';
import {Borders, Values} from '../../../types';
import '../styles/index.css';

type Labels = {
  circle: string;
  x: string;
  y: string;
}

type Props = {
  labels: Labels;
  borders: Borders;
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>
}

const Coordinates = ({labels, borders, values, setValues}: Props) => {
  console.log(values, labels, values[labels.circle][labels.x])
  return (
    <div className="block">
      <div className="inputBlock">
        <InputLabel>{borders?.xMin}</InputLabel>
        <Slider
          axis="x"
          x={values[labels.circle][labels.x]}
          onChange={({x}) => {
            setValues({...values, [labels.circle]: {...values[labels.circle], [labels.x]: x}});
          }}
          xmin={borders?.xMin}
          xmax={borders?.xMax}
          size={'small'}
        />
        <InputLabel>{borders?.xMax}</InputLabel>
        <div className="valueBlock">
          <InputLabel>{'X: '}</InputLabel>
          <InputLabel>{values[labels.circle][labels.x]}</InputLabel>
        </div>
      </div>
      <div className="inputBlock">
        <InputLabel>{borders?.yMin}</InputLabel>
        <Slider
          axis="x"
          x={values[labels.circle][labels.y]}
          onChange={({x}) => {
            setValues({...values, [labels.circle]: {...values[labels.circle], [labels.y]: x}});
          }}
          xmin={borders?.yMin}
          xmax={borders?.yMax}
          size={'small'}
        />
        <InputLabel>{borders?.yMax}</InputLabel>
        <div className="valueBlock">
          <InputLabel>{'Y: '}</InputLabel>
          <InputLabel>{values[labels.circle][labels.y]}</InputLabel>
        </div>
      </div>
    </div>
  );
}

export default Coordinates;