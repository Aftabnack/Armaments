import { useMemo } from 'react';
import { Armament, ArmsPower, labelMap } from '../utils';
import { Card, StyledBody, StyledTitle } from 'baseui/card';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Badge, COLOR } from 'baseui/badge';
import { ParagraphXSmall } from 'baseui/typography';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';

type CompProps = {
  arms: Armament[];
  armsPower: ArmsPower;
};

function getStatsDisplay(arm: Armament) {
  return (
    <div>
      {(Object.keys(arm) as Array<keyof Armament>).map((key) => {
        if (key === 'formation' || key === 'type' || key === 'id') {
          return null;
        }
        return (
          <div>
            {labelMap[key]}: {arm[key]}%
          </div>
        );
      })}
    </div>
  );
}

export default function ArmsList(props: CompProps) {
  const { arms, armsPower } = props;

  const [css, theme] = useStyletron();

  const powerSorted = useMemo(() => {
    return arms.sort((a, b) => {
      const aMaxPow = Math.max(
        armsPower[a.id].archers.field,
        armsPower[a.id].cavalry.field,
        armsPower[a.id].infantry.field
      );
      const bMaxPow = Math.max(
        armsPower[b.id].archers.field,
        armsPower[b.id].cavalry.field,
        armsPower[b.id].infantry.field
      );
      return bMaxPow - aMaxPow;
    });
  }, [arms, armsPower]);

  return (
    <>
      {powerSorted.map((item) => (
        <Card overrides={{ Root: { style: { marginBottom: theme.sizing.scale300 } } }}>
          <StyledBody>
            <FlexGrid flexGridColumnCount={2}>
              <FlexGridItem flex={1}>
                <ParagraphXSmall>Formation</ParagraphXSmall>
                <Badge
                  content={item.formation}
                  color={COLOR.positive}
                  shape="pill"
                  overrides={{ Badge: { style: { textTransform: 'capitalize' } } }}
                />
                <ParagraphXSmall className={css({ marginTop: theme.sizing.scale300 })}>
                  Type
                </ParagraphXSmall>
                <Badge
                  content={item.type}
                  color={COLOR.accent}
                  shape="pill"
                  overrides={{ Badge: { style: { textTransform: 'capitalize' } } }}
                />
              </FlexGridItem>
              <FlexGridItem
                flex={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {getStatsDisplay(item)}
              </FlexGridItem>
            </FlexGrid>
          </StyledBody>
        </Card>
      ))}
    </>
  );
}
