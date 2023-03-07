import { useStyletron } from 'baseui';
import { Card, StyledBody } from 'baseui/card';
import { useEffect, useState } from 'react';
import { getArmSets } from './data';

import AddInfo from '../assets/add_info.svg';
import { ParagraphMedium } from 'baseui/typography';
import { Button } from 'baseui/button';

export default function ArmsMain() {
  const [css, theme] = useStyletron();
  const [armSets, setArmSets] = useState([]);

  useEffect(() => {
    getArmSets().then(setArmSets);
  }, []);

  const contentCls = css({
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    padding: theme.sizing.scale600
  });

  return (
    <StyledBody className={contentCls}>
      {armSets.length ? (
        'data ' + armSets.length
      ) : (
        <Card
          headerImage={AddInfo}
          overrides={{
            HeaderImage: {
              style: {
                backgroundColor: theme.colors.backgroundOverlayLight,
                padding: theme.sizing.scale400
              }
            }
          }}
        >
          <StyledBody>
            <ParagraphMedium>Create your first Armament Set</ParagraphMedium>
            <Button size="compact">Create Set</Button>
          </StyledBody>
        </Card>
      )}
    </StyledBody>
  );
}
