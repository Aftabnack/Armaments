import { Drawer, SIZE } from 'baseui/drawer';
import { HeadingMedium, HeadingXSmall } from 'baseui/typography';
import { StyledDivider } from 'baseui/divider';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { StatefulSelect } from 'baseui/select';
import { ArmType, Formations, labelMap, statGrouping } from '../utils';
import { useStyletron } from 'baseui';
import { StatefulInput } from 'baseui/input';

type CompProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const formationOptions: { id: Formations; label: string }[] = [
  { label: 'Wedge', id: 'wedge' },
  { label: 'Arch', id: 'arch' },
  { label: 'Echelon', id: 'echelon' },
  { label: 'Hollow Square', id: 'hollow square' },
  { label: 'Line', id: 'line' },
  { label: 'Triple Line', id: 'triple line' },
  { label: 'V', id: 'v' }
];

const armType: { id: ArmType; label: string }[] = [
  { label: 'Instrument', id: 'instrument' },
  { label: 'Emblem', id: 'emblem' },
  { label: 'Flag', id: 'flag' },
  { label: 'Scroll', id: 'scroll' }
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
          <StatefulSelect
            name="formation"
            options={formationOptions}
            placeholder=""
            //@ts-ignore
            initialState={{ value: formationOptions[0] }}
            searchable={false}
            clearable={false}
          ></StatefulSelect>
        </FormControl>
        <FormControl label="Select Armament Type">
          <StatefulSelect
            name="type"
            options={armType}
            placeholder=""
            //@ts-ignore
            initialState={{ value: armType[0] }}
            searchable={false}
            clearable={false}
          ></StatefulSelect>
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
    </Drawer>
  );
}
