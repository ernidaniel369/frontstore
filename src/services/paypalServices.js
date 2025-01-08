/* global paypal */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "./Product";
import endpoint from "./config"; 


function PayPalButton({ email }) {
  const navigate = useNavigate(); 

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AaF5giuuw8Gpy6TFn6zC-8acIgTkrHAft2sgolRG87vJTLZgjS4seVMyVbQ6EPEcXJAsvAqb34VGei0s&currency=USD";
    
    script.addEventListener("load", () => {
      paypal.Buttons({
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: { value: 150 }
            }]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(async function (details) {
            console.log("Pago aprobado:", details);

            try {
              const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data, details })
              });

              if (!response.ok) throw new Error("Error al procesar el pago en el backend");

              alert("¡Compra realizada con éxito! Gracias por tu compra.");
                            
              Product.checkout(email);

              navigate("/");
              
            } catch (error) {
              console.error("Error en el procesamiento del pago:", error);
              alert("Hubo un problema con el pago. Inténtalo de nuevo.");
            }
          });
        },
        onCancel: function(data) {
          alert("Pago cancelado");
          console.log("Pago cancelado:", data);
        }
      }).render("#paypal-button-container");
    });

    document.body.appendChild(script);
  }, [navigate, email]); 

  return <div id="paypal-button-container"></div>;
}

export default PayPalButton;
