import { Drawer, SIZE } from 'baseui/drawer';
import { HeadingMedium, HeadingXSmall } from 'baseui/typography';
import { StyledDivider } from 'baseui/divider';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Select, Value } from 'baseui/select';
import { Armament, ArmType, Formations, labelMap, statGrouping } from '../utils';
import { useStyletron } from 'baseui';
import { StatefulInput } from 'baseui/input';
import { useState } from 'react';
import { ModalButton, ModalFooter } from 'baseui/modal';
import { toaster, ToasterContainer } from 'baseui/toast';

type CompProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNewArmament: (arm: Armament) => void;
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
  const { isOpen, setIsOpen, addNewArmament } = props;
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
      toaster.negative('Please fill in atleast 1 stat', { autoHideDuration: 2000 });
    } else {
      addNewArmament(armament);
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
            value={formation}
            valueKey="val"
            onChange={({ value }) => setFormation(value)}
            searchable={false}
            clearable={false}
          />
        </FormControl>
        <FormControl label="Select Armament Type">
          <Select
            options={armType}
            value={type}
            valueKey="val"
            onChange={({ value }) => setType(value)}
            searchable={false}
            clearable={false}
          />
        </FormControl>
        <HeadingXSmall>All Stats</HeadingXSmall>
        <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale400">
          {formElements.all.map((item) => (
            <FlexGridItem key={item.name}>
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
            <FlexGridItem key={item.name}>
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
            <FlexGridItem key={item.name}>
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
            <FlexGridItem key={item.name}>
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
      <ToasterContainer />
      <ModalFooter>
        <ModalButton onClick={submitHandler}>Submit Information</ModalButton>
      </ModalFooter>
    </Drawer>
  );
}
