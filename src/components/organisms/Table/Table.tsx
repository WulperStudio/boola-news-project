import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import TablePagination from "@material-ui/core/TablePagination"
import Paper from "@material-ui/core/Paper"
import useStyles from "./Table.styles"
import { DataRow, Order, TableProps, getComparator, stableSort } from "./Table.utils"
import TableHead from "../../molecules/TableHead/TableHead"
import TableRow from "../../molecules/TableRow/TableRow"

export default function EnhancedTable({ headCells, dataRows, formatRows }: TableProps) {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>("asc")
  const [orderBy, setOrderBy] = React.useState("calories")
  const [selected, setSelected] = React.useState<any>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleRequestSort = (event: Event, property: string) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = dataRows.map((n: any) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {

    const selectedIndex = selected.indexOf(name)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    console.log(">>>handleClick", newSelected)
    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataRows.length - page * rowsPerPage)

  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >

          <TableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            // @ts-ignore TODO: The expected type comes from property 'onRequestSort' which is declared here on type 'IntrinsicAttributes & TableHeadProps'
            onRequestSort={handleRequestSort}
            rowCount={dataRows.length}
            headCells={headCells}
          />

          <TableBody>
            {stableSort(dataRows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => {
                // @ts-ignore
                const dataRowKey = row[formatRows[0].key]
                return <TableRow
                  key={index.toString()}
                  isItemSelected={isSelected(dataRowKey)}
                  index={index}
                  formatRows={formatRows}
                  dataRow={row}
                  isCheckbox={true}
                  dataRowKey={dataRowKey}
                  handleClick={handleClick}
                />
              })}
            {/*emptyRows > 0 && <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6}/>
            </TableRow>*/}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

    </Paper>
  </div>
}
