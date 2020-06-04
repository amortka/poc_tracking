import React from 'react';
import {
  makeStyles,
  Box,
  Typography,
  ClickAwayListener,
  FadeProps,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { DriveEta, DoubleArrow, Waves, Opacity, AcUnit, Speed, CheckCircle } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { RoutesSelectors } from '../../../../store/routes/routes.selectors';
import { GridBoxes } from '../GridBoxes/GridBoxes';
import { ordersMock } from '../../../../mocks/ui.mock';
import { RouteWrapper } from './RouteWrapper';

const useStyles = makeStyles((theme) => ({
  box: {
    width: theme.spacing(58),
    height: '100%',
    backgroundColor: theme.palette.primary.light,
    marginLeft: 'auto',
    padding: theme.spacing(3),
    boxShadow: '-7px 0 20px 1px #14191F',
    boxSizing: 'border-box',
  },
  doubleArrowIcon: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  list: {
    '& > li:nth-child(odd)': {
      backgroundColor: 'rgba(24, 29, 36, 0.1)',
    },
    '& > li:nth-child(even)': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
  listItem: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  backgroundShadow: {
    width: `calc(100% - ${theme.spacing(10)}px - ${theme.spacing(50)}px)`,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(50),
    position: 'absolute',
    height: '100%',
    zIndex: 100,
  },
  CartDetailsHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),

    '&:first-of-type': {
      marginTop: 0,
    },
  },
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

const cartDetailsConfig = [
  {
    name: 'Ambient Pressure',
    icon: <Waves />,
    value: null,
  },
  {
    name: 'Humidity',
    icon: <Opacity />,
    value: null,
  },
  {
    name: 'Temperature',
    icon: <AcUnit />,
    value: null,
  },
  {
    name: 'Velocity',
    icon: <Speed />,
    value: null,
  },
];

export interface CartDetailsProps extends FadeProps {
  setIsCartDetailsVisible: Function;
}

export const CartDetails: React.FC<CartDetailsProps> = ({ setIsCartDetailsVisible, ...props }) => {
  const classes = useStyles();
  const selectedRouteEntry = useSelector(RoutesSelectors.getFirstSelectedRouteEntry);
  const { ambientPressure, humidity, velocity, temperature } = selectedRouteEntry[1].vehicle;
  const stats = [ambientPressure, humidity, temperature, velocity];
  const cartDetails = cartDetailsConfig.map((item, i) => ({ ...item, value: stats[i] }));

  const tableHeaders = ['Id', 'Product', 'Pick-up point', 'Status'];

  return (
    <div className={classes.backgroundShadow} {...(props as any)}>
      <ClickAwayListener onClickAway={() => setIsCartDetailsVisible(false)}>
        <Box color="text.primary" className={classes.box} onClick={(e) => e.stopPropagation()}>
          <div className={classes.CartDetailsHeaderContainer}>
            <Typography variant="body1" className={classes.title}>
              Route
            </Typography>
            <DoubleArrow onClick={() => setIsCartDetailsVisible(false)} className={classes.doubleArrowIcon} />
          </div>
          <RouteWrapper />

          <Typography variant="body1" className={classes.title}>
            Cart details
          </Typography>
          <GridBoxes items={cartDetails} dark={true} />

          <Typography variant="body1" className={classes.title}>
            Orders
          </Typography>
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
                    <TableCell className={`${classes.tableBodyCell} ${classes.tableCell}`}>
                      {order.pickUpPoint}
                    </TableCell>
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
        </Box>
      </ClickAwayListener>
    </div>
  );
};
