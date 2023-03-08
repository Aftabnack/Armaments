import { useMemo } from 'react';
import { Armament, ArmsPower, labelMap } from '../utils';
import {
  StyledTableBodyCell,
  TableBuilder,
  TableBuilderColumn
} from 'baseui/table-semantic';

type CompProps = {
  arms: Armament[];
  armsPower: ArmsPower;
};

function getStatsDisplay(arm: Armament) {
  return (
    <StyledTableBodyCell>
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
    </StyledTableBodyCell>
  );
}

export default function ArmsTable(props: CompProps) {
  const { arms, armsPower } = props;
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
    <TableBuilder data={powerSorted}>
      <TableBuilderColumn header="Formation">
        {(row: Armament) => row.formation}
      </TableBuilderColumn>
      <TableBuilderColumn header="Type" numeric>
        {(row: Armament) => row.type}
      </TableBuilderColumn>
      <TableBuilderColumn header="Stats">
        {(row: Armament) => getStatsDisplay(row)}
      </TableBuilderColumn>
    </TableBuilder>
  );
}
