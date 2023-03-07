import * as React from 'react';
import { styled } from 'styletron-react';
import { addArmament, getArms } from './arms/data';

type CompProps = {
  dbSuccess: boolean;
};

const Centered = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
});

export default function App(props: CompProps) {
  const { dbSuccess } = props;
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getArms().then(setData);
  }, []);

  return (
    <Centered>
      <h1>Armaments!</h1>
      <p>Data load is {dbSuccess ? 'successful' : 'failure'}</p>
      {JSON.stringify(data)}
    </Centered>
  );
}
