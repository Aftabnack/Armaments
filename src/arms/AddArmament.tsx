import { Drawer, SIZE } from 'baseui/drawer';
import { HeadingMedium, HeadingXSmall } from 'baseui/typography';
import { StyledDivider } from 'baseui/divider';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Select, Value } from 'baseui/select';
import {
  Armament,
  ArmType,
  Formations,
  labelMap,
  OnlyStatKeys,
  statGrouping
} from '../utils';
import { useStyletron } from 'baseui';
import { StatefulInput } from 'baseui/input';
import { Button } from 'baseui/button';
import { useState } from 'react';

type CompProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const formationOptions: { val: Formations; label: string }[] = [
  { label: 'Wedge', val: 'wedge' },
  { label: 'Arch', val: 'arch' },
  { label: 'Echelon', val: 'echelon' },
  { label: 'Hollow Square', val: 'hollow square' },
  { label: 'Line', val: 'line' },
  { label: 'Triple Line', val: 'triple line' },
  { label: 'V', val: 'v' }
];

const armType: { val: ArmType; label: string }[] = [
  { label: 'Instrument', val: 'instrument' },
  { label: 'Emblem', val: 'emblem' },
  { label: 'Flag', val: 'flag' },
  { label: 'Scroll', val: 'scroll' }
];

const formElements = {
  all: statGrouping.all.map((item) => ({ name: item, label: labelMap[item] })),
  cav: statGrouping.cav.map((item) => ({ name: item, label: labelMap[item] })),
  inf: statGrouping.inf.map((item) => ({ name: item, label: labelMap[item] })),
  arc: statGrouping.arc.map((item) => ({ name: item, label: labelMap[item] }))
};

export default function AddArmament(props: CompProps) {
  const { isOpen, setIsOpen } = props;
  const [css, theme] = useStyletron();

  const [formation, setFormation] = useState<Value>([formationOptions[0]]);
  const [type, setType] = useState<Value>([armType[0]]);

  const submitHandler = () => {
    //@ts-ignore
    const data = new FormData(document.forms.add_armament);
    let hasData = false;
    const armament: Armament = {
      formation: formation[0].val,
      type: type[0].val
    };
    data.forEach((value, key) => {
      //@ts-ignore
      const val = parseInt(value, 10);
      if (val > 0) {
        //@ts-ignore
        armament[key] = val;
        hasData = true;
      }
    });
    if (!hasData) {
      //Show toast
    } else {
      //Add Armament
    }
  };

  return (
    <Drawer isOpen={isOpen} animate onClose={() => setIsOpen(false)} size={SIZE.full}>
      <HeadingMedium>Add Armament</HeadingMedium>
      <StyledDivider className={css({ marginBottom: theme.sizing.scale400 })} />
      {/* <Banner kind="info">
        Add in values according to the stats you have on the armament. And don't forget to
        save.
      </Banner> */}
      <form id="add_armament">
        <FormControl label="Select Formation">
          <Select
            options={formationOptions}
            //@ts-ignore
            value={formation}
            onChange={({ value }) => setFormation(value)}
            searchable={false}
            clearable={false}
          />
        </FormControl>
        <FormControl label="Select Armament Type">
          <Select
            options={armType}
            //@ts-ignore
            value={type}
            onChange={({ value }) => setType(value)}
            searchable={false}
            clearable={false}
          />
        </FormControl>
        <HeadingXSmall>All Stats</HeadingXSmall>
        <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale400">
          {formElements.all.map((item) => (
            <FlexGridItem>
              <FormControl label={item.label}>
                <StatefulInput
                  name={item.name}
                  placeholder="0"
                  endEnhancer="%"
                  type="number"
                />
              </FormControl>
            </FlexGridItem>
          ))}
        </FlexGrid>
        <HeadingXSmall>Cavalry Stats</HeadingXSmall>
        <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale400">
          {formElements.cav.map((item) => (
            <FlexGridItem>
              <FormControl label={item.label}>
                <StatefulInput
                  name={item.name}
                  placeholder="0"
                  endEnhancer="%"
                  type="number"
                />
              </FormControl>
            </FlexGridItem>
          ))}
        </FlexGrid>
        <HeadingXSmall>Infantry Stats</HeadingXSmall>
        <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale400">
          {formElements.inf.map((item) => (
            <FlexGridItem>
              <FormControl label={item.label}>
                <StatefulInput
                  name={item.name}
                  placeholder="0"
                  endEnhancer="%"
                  type="number"
                />
              </FormControl>
            </FlexGridItem>
          ))}
        </FlexGrid>
        <HeadingXSmall>Archers Stats</HeadingXSmall>
        <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale400">
          {formElements.arc.map((item) => (
            <FlexGridItem>
              <FormControl label={item.label}>
                <StatefulInput
                  name={item.name}
                  placeholder="0"
                  endEnhancer="%"
                  type="number"
                />
              </FormControl>
            </FlexGridItem>
          ))}
        </FlexGrid>
      </form>
      <Button className={css({ marginTop: theme.sizing.scale800, width: '100%' })}>
        Submit Information
      </Button>
    </Drawer>
  );
}
