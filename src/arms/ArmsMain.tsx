import { useStyletron } from 'baseui';
import { Card, StyledBody } from 'baseui/card';
import { Tabs, Tab } from 'baseui/tabs-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { getArmsData } from './data';

import AddInfo from '../assets/add_info.svg';
import { ParagraphMedium } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Armament, ArmSet, calculateArmsPower } from '../utils';

type ArmsData = {
  arms: Armament[];
  armSets: ArmSet[];
};

export default function ArmsMain() {
  const [css, theme] = useStyletron();

  const [activeView, setActiveView] = useState<React.Key>('0');
  const [armData, setArmData] = useState<ArmsData>({ arms: [], armSets: [] });

  const armsPower = useMemo(() => {
    return calculateArmsPower(armData.arms);
  }, armData.arms);

  useEffect(() => {
    getArmsData().then(setArmData);
  }, []);

  const contentCls = css({
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    padding: theme.sizing.scale600
  });

  return (
    <StyledBody className={contentCls}>
      {armData.arms.length ? (
        <Tabs
          activeKey={activeView}
          onChange={({ activeKey }) => {
            setActiveView(activeKey);
          }}
        >
          <Tab title="Armaments">Content 1</Tab>
          <Tab title="ArmSets">Content 2</Tab>
        </Tabs>
      ) : (
        <Card
          headerImage={AddInfo}
          overrides={{
            HeaderImage: {
              style: {
                backgroundColor: theme.colors.backgroundOverlayLight,
                padding: theme.sizing.scale400,
                width: '100%'
              }
            }
          }}
        >
          <StyledBody>
            <ParagraphMedium className={css({ marginBottom: theme.sizing.scale400 })}>
              Start adding armaments to make use of this tool
            </ParagraphMedium>
            <Button size="compact">Add Armaments</Button>
          </StyledBody>
        </Card>
      )}
    </StyledBody>
  );
}
