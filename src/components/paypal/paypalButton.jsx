import React from 'react';
import ReactDOM from "react-dom";

const PaypalButton = ({precio, setPaid}) => {
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: precio
            },
          },
        ],
      });
    };
    const onApprove = (data, actions) => {
      return actions.order.capture(handlePay());
    };
    function handlePay() {
      console.log("pagado");
      setPaid(true);
    }
    return (
      <div>
        <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        /> 
      </div> 
    );
}  

export default PaypalButton;

/* export function PaypalButton({precio}) {
   console.log("hola" + precio);
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: precio,
            },
          },
        ],
      });
    };
    const onApprove = (data, actions) => {
      return actions.order.capture();
    };
    return (
  
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    );
  } */