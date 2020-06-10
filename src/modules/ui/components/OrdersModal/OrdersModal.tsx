import React from 'react';
import { makeStyles, DialogProps, Dialog } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

interface OrdersModalProps extends DialogProps {}

export const OrdersModal: React.FC<OrdersModalProps> = React.memo(({ ...props }) => {
  const classes = useStyles();

  return <Dialog {...props}></Dialog>;
});
