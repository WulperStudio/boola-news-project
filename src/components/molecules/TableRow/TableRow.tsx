import React from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Checkbox from "@material-ui/core/Checkbox"
import Chip from "@material-ui/core/Chip"
import Avatar from "@material-ui/core/Avatar"
import { FormatRow } from "../../organisms/Table/Table.utils"

type Props = {
  isItemSelected: boolean,
  index: number,
  formatRows: FormatRow[],
  isCheckbox: boolean,
  dataRowKey: string,
  dataRow: any,
  key: string,
  handleClick(event: React.MouseEvent<unknown>, name: string): any
}

export default function EnhancedTableRow({ isItemSelected, index, formatRows, isCheckbox, dataRowKey, handleClick, dataRow }: Props) {
  const labelId = `enhanced-table-checkbox-${index}`
  return (
    <TableRow
      hover // @ts-ignore
      onClick={(event) => handleClick(event, dataRowKey)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={dataRowKey}
      selected={isItemSelected}
      style={{width:'100%'}}
    >

      {isCheckbox && (
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </TableCell>
      )}

      {formatRows.map(({ key, image, chip, align },i:number) => {
        // @ts-ignore
        const data = dataRow[key]
        return (
          <TableCell
            key={i}
            align={align}>

            {image !== undefined && (
              <Chip label={data} avatar={<Avatar alt={data} src={image}/>}/>
            )}

            {(chip && image === undefined) && (
              <Chip label={data} color="secondary" size="small"
              />
            )}

            {(!image && !chip) && data}

          </TableCell>
        )
      })}
    </TableRow>
  )
}
