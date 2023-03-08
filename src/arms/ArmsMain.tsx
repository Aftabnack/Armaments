import { useStyletron } from 'baseui';
import { Card, StyledBody } from 'baseui/card';
import { Tabs, Tab } from 'baseui/tabs-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { addArmament, getArmsData } from './data';

import AddInfo from '../assets/add_info.svg';
import { ParagraphMedium } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Armament, ArmSet, calculateArmsPower } from '../utils';
import AddArmament from './AddArmament';
import ArmsList from './ArmsList';

type ArmsData = {
  arms: Armament[];
  armSets: ArmSet[];
};

export default function ArmsMain() {
  const [css, theme] = useStyletron();

  const [showAddArmament, setShowAddArmament] = useState(false);
  const [activeView, setActiveView] = useState<React.Key>('0');
  const [armData, setArmData] = useState<ArmsData>({ arms: [], armSets: [] });

  const armsPower = useMemo(() => {
    return calculateArmsPower(armData.arms);
  }, [armData.arms]);

  const addNewArmament = (arm: Armament) => {
    addArmament(arm).then((newId) => {
      setArmData((old) => {
        old.arms = old.arms.concat([{ ...arm, id: newId }]);
        return old;
      });
    });
  };

  useEffect(() => {
    getArmsData().then(setArmData);
  }, []);

  const contentCls = css({
    position: 'relative',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    padding: theme.sizing.scale600
  });

  const renderAddCard = (isSet: boolean) => {
    return (
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
            {isSet
              ? 'Create new Armament set'
              : 'Start adding armaments to make use of this tool'}
          </ParagraphMedium>
          <Button
            size="compact"
            onClick={() => {
              setShowAddArmament(true);
            }}
          >
            {isSet ? 'Create new set' : 'Add Armaments'}
          </Button>
        </StyledBody>
      </Card>
    );
  };

  return (
    <StyledBody className={contentCls}>
      <Tabs
        activeKey={activeView}
        onChange={({ activeKey }) => {
          setActiveView(activeKey);
        }}
      >
        <Tab title="List">
          {armData.arms.length ? (
            <ArmsList arms={armData.arms} armsPower={armsPower} />
          ) : (
            renderAddCard(false)
          )}
        </Tab>
        {/* <Tab title="ArmSets">
          {armData.arms.length ? (
            armData.armSets.length ? (
              <div>Show the sets</div>
            ) : (
              renderAddCard(true)
            )
          ) : (
            renderAddCard(false)
          )}
        </Tab> */}
      </Tabs>
      <AddArmament
        isOpen={showAddArmament}
        setIsOpen={setShowAddArmament}
        addNewArmament={addNewArmament}
      />

      <Button
        shape="pill"
        onClick={() => setShowAddArmament(true)}
        size="compact"
        className={css({ position: 'absolute', top: '22px', right: '16px' })}
      >
        Add Armament
      </Button>
    </StyledBody>
  );
}
