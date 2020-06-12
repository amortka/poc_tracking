import React, { useMemo } from 'react';
import {
  makeStyles,
  DialogProps,
  Dialog,
  Typography,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { OrdersSelectors } from '../../../../store/orders/orders.selectors';
import { useSelector } from 'react-redux';
import { ObjectsSelectors } from '../../../../store/objects/objects.selectors';

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiPaper-root': {
      width: theme.spacing(97),
      maxWidth: theme.spacing(97),
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(5),
      boxSizing: 'border-box',
    },
  },
  modalHeader: {
    display: 'flex',
    marginBottom: theme.spacing(5),
  },
  stationIndicatorWrapper: {
    marginRight: theme.spacing(3),
    width: theme.spacing(5),
  },
  stationSquare: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4px',
  },
  closeIcon: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  stationName: {
    lineHeight: 'normal',
  },
  ordersTitle: {
    marginBottom: theme.spacing(3),
  },
  // TODO: refactor table into separate component
  tableCell: {
    border: 'none',
  },
  tableHeadCell: {
    color: '#98A0A9',
    fontSize: '12px',
    fontWeight: 'normal',
    padding: `0 ${theme.spacing(2)}px`,
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
  resourceIndicator: {
    height: '4px',
    width: '100%',
    backgroundColor: theme.palette.primary.dark,

    '& > div': {
      height: '4px',
    },
  },
}));

const tableHeaders = ['Id', 'Product', 'Amount', 'Resource status'];

interface OrdersModalProps extends DialogProps {
  selectedStation: { id: string; name: string };
  handleClose: Function;
}
const indicatorColors = {
  indicatorBackground: '#2c323a',
  indicatorMaxColor: '#11b572',
  indicatorMinColor: '#eb2e2f',
  indicatorMidColor: '#e9a72c',
};

const getIndicatorColor = (value) => {
  if (value > 0.7) {
    return indicatorColors.indicatorMaxColor;
  } else if (value > 0.3) {
    return indicatorColors.indicatorMidColor;
  } else {
    return indicatorColors.indicatorMinColor;
  }
};

export const OrdersModal: React.FC<OrdersModalProps> = React.memo(({ handleClose, selectedStation, ...props }) => {
  const classes = useStyles();
  const orders = useSelector(OrdersSelectors.getOrdersForStation(selectedStation?.id));
  const station = useSelector(ObjectsSelectors.getObject(selectedStation?.id));

  return (
    <Dialog {...props} className={classes.dialog} PaperProps={{ square: true }} onClose={handleClose as any}>
      <div className={classes.modalHeader}>
        <div className={classes.stationIndicatorWrapper}>
          <div className={classes.stationSquare} style={{ backgroundColor: station?.color as string }}>
            <Typography variant="body2">{selectedStation?.name}</Typography>
          </div>
          <div className={classes.resourceIndicator}>
            <div
              style={{
                width: `${station?.resourceIndicator * 100}%`,
                backgroundColor: getIndicatorColor(station?.resourceIndicator),
              }}></div>
          </div>
        </div>
        <div>
          <Typography variant="subtitle2">Pick-up point</Typography>
          <Typography variant="h6" className={classes.stationName}>
            {selectedStation?.name}
          </Typography>
        </div>
        <Close className={classes.closeIcon} onClick={handleClose as any} />
      </div>
      <Typography className={classes.ordersTitle}>Orders</Typography>
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
            {Object.entries(orders).map(([orderId, order]) => (
              <TableRow key={orderId} className={classes.tableBodyRow}>
                <TableCell className={`${classes.tableBodyCell} ${classes.tableCell}`}>{orderId}</TableCell>
                <TableCell className={`${classes.tableBodyCell} ${classes.tableCell}`}>{order.productName}</TableCell>
                <TableCell className={`${classes.tableBodyCell} ${classes.tableCell}`}>
                  {(order as any)?.amount || 0}
                </TableCell>
                <TableCell className={`${classes.tableBodyCell} ${classes.tableCell}`}>
                  <LinearProgress color="secondary" variant="determinate" value={70} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
});
