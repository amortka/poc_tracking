import React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { CheckCircle, DriveEta } from '@material-ui/icons';

import { ordersMock } from '../../../../mocks/ui.mock';

const tableHeaders = ['Id', 'Product', 'Pick-up point', 'Status'];

const useStyles = makeStyles((theme) => ({
  tableCell: {
    border: 'none',
  },
  tableHeadCell: {
    color: '#98A0A9',
    fontSize: '12px',
    fontWeight: 'normal',
    padding: `0 ${theme.spacing(1)}px`,
  },
  tableBodyCell: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    fontWeight: 400,
    fontSize: '14px',
  },
  tableBodyRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(24, 29, 36, 0.1)',
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
  statusIcon: {
    color: '#98A0A9',
  },
  statusIconDelivered: {
    color: theme.palette.secondary.main,
  },
}));

export const CartDetailsOrders: React.FC = React.memo(() => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={header} className={`${classes.tableHeadCell} ${classes.tableCell}`}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersMock.map((order) => (
            <TableRow key={Math.random()} className={classes.tableBodyRow}>
              <TableCell className={`${classes.tableBodyCell} ${classes.tableCell}`}>{order.id}</TableCell>
              <TableCell className={`${classes.tableBodyCell} ${classes.tableCell}`}>{order.product}</TableCell>
              <TableCell className={`${classes.tableBodyCell} ${classes.tableCell}`}>{order.pickUpPoint}</TableCell>
              <TableCell className={`${classes.tableBodyCell} ${classes.tableCell}`}>
                {order.isDelivered ? (
                  <CheckCircle className={classes.statusIconDelivered} />
                ) : (
                  <DriveEta className={classes.statusIcon} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
