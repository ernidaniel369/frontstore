/* global paypal */
import React, { useEffect } from "react";

const endpoint = 'http://localhost:8000/api/purchaseOrder';

function PayPalButton() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AaF5giuuw8Gpy6TFn6zC-8acIgTkrHAft2sgolRG87vJTLZgjS4seVMyVbQ6EPEcXJAsvAqb34VGei0s&currency=USD";
    script.addEventListener("load", () => {
      paypal.Buttons({
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount:{
                value: 150
              }
            }]
          });
        },
        onApprove: function(data, actions){
            return actions.order.capture().then(function (details){
                console.log(details);
                fetch(endpoint, {
                  method: 'post',
                  headers:{
                    'content-type': 'application/json'
                  },body: JSON.stringify({
                    data: data,
                    details: details
                  })
                })
                
            });
        },
        onCancel: function(data){
            return (alert("pago cancelado"),
            console.log(data))
        }
      }).render("#paypal-button-container");
    });
    document.body.appendChild(script);
  }, []);

  return <div id="paypal-button-container"></div>;
}

export default PayPalButton;

