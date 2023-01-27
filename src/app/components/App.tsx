import * as React from 'react';
import {Button, ControlSizes, ButtonTypes, Section, SectionTitle, SectionBlock} from 'figma-react-ui-kit';
import {Borders, Values} from '../../../types';
import Coordinates from './Coordinates';
import Radius from './Radius';
import '../../../node_modules/figma-react-ui-kit/lib/index.css';
import '../styles/index.css';

const App = ({}) => {
  const [values, setValues] = React.useState<Values>(null);

  const [isSelected, setIsSelecetd] = React.useState(false);

  const [borders, setBorders] = React.useState<Borders>(null);
  const prevValues = React.useRef(null);

  const onGenerateRandom = () => {
    parent.postMessage({pluginMessage: {type: 'generate-random'}}, '*');
  };

  React.useEffect(() => {
    if (JSON.stringify(prevValues.current) === JSON.stringify(values)) {
      return;
    }

    parent.postMessage({pluginMessage: {
      type: 'generate',
      data: values
    }}, '*');
  }, [values]);

  React.useEffect(() => {
    window.onmessage = (event) => {
      const {type, data} = event.data.pluginMessage;

      if (type === 'item-not-selected') {
        setIsSelecetd(false);
      }
      if (type === 'item-selected') {
        setIsSelecetd(true);
      }
      if (type === 'generated') {
        const {
          innerCircle,
          outerCircle,
        } = data;
        setBorders(data.borders);
        setValues({innerCircle, outerCircle});
      }
    };
  }, []);

  return (
    <div className="main">
      {isSelected && (
        <>
          {/* OUTER */}
          {
            values?.outerCircle.outerCircleRadius !== undefined && (
              <Section>
                <SectionTitle>{'Outer Radius'}</SectionTitle>
                <Radius
                  borders={borders}
                  values={values}
                  setValues={setValues}
                  labels={{circle: 'outerCircle', radius: 'outerCircleRadius'}}
                />
              </Section>
            )
          }
          {
            values?.outerCircle.outerCircleX !== undefined &&
            values?.outerCircle.outerCircleY !== undefined && (
              <Section>
              <SectionTitle>{'Outer coordinates'}</SectionTitle>
              <Coordinates
                borders={borders}
                values={values}
                setValues={setValues}
                labels={{circle: 'outerCircle', x: 'outerCircleX', y: 'outerCircleY'}}
              />
              </Section>
            )
          }
          {/* INNER */}
          {
            values?.innerCircle.innerCircleRadius !== undefined && (
              <Section>
                <SectionTitle>{'Inner Radius'}</SectionTitle>
                <Radius
                  borders={borders}
                  values={values}
                  setValues={setValues}
                  labels={{circle: 'innerCircle', radius: 'innerCircleRadius'}}
                />
              </Section>
            )
          }
          {
            values?.innerCircle.innerCircleX !== undefined &&
            values?.innerCircle.innerCircleY !== undefined && (
              <Section>
              <SectionTitle>{'Inner coordinates'}</SectionTitle>
              <Coordinates
                borders={borders}
                values={values}
                setValues={setValues}
                labels={{circle: 'innerCircle', x: 'innerCircleX', y: 'innerCircleY'}}
              />
              </Section>
            )
          }
          <div className="block">
            <Button buttonSize={ControlSizes.M} buttonType={ButtonTypes.PRIMARY} onClick={onGenerateRandom}>
              {'Generate random'}
            </Button>
          </div>
        </>
      )}
      {!isSelected && (
        <Section>
          <SectionBlock>{'Select a frame'}</SectionBlock>
        </Section>
      )}
    </div>
  );
};

export default App;
