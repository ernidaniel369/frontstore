/* global paypal */
import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { Product } from '../../services/cartServices';
import AuthUser from "../AuthUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';



const endpointP = 'http://localhost:8000/api/purchaseOrder';
const endpoint = 'http://localhost:8000/api';

const ProductCart = () => {
  const [products, setProducts] = useState([]);
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  const userEmail = userdetail.email;

  useEffect(() => {
    setProducts(Product.getAllProducts(userEmail));
  }, [userEmail]);

  const suprProduct = (id) => {
    Product.deleteProduct(id, userEmail);
    setProducts(products.filter(product => product.id !== id));
  };

  const handleQuantityChange = (id, event) => {
    const quantity = event.target.value;
    setProducts(products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          quantity: quantity
        };
      } else {
        return product;
      }
    }));
  };

  const handleBuyClick = () => {
    console.log(products);
  
    // Realiza la solicitud para actualizar el stock de los productos
    const updatePromises = products.map(product => {
      return axios.put(`${endpoint}/updateProduct/${product.id}`, {
        stock: product.stock - product.quantity,
      });
    });

    // Realiza la solicitud para crear la orden
    const orderPromises = products.map(product => {
      return axios.post(`${endpoint}/createOrder`, {
        name: product.name,
        price: product.price * product.quantity,
        amount: product.quantity,
        email: userEmail,
      });
    });

    Promise.all([...updatePromises, ...orderPromises])
      .then(() => {
        console.log('Todas las solicitudes completadas exitosamente');
        setPurchaseSuccess(true);
      })
      .catch(error => {
        console.log('Error en las solicitudes:', error);
      });
  };

  const updateTotalAmount = () => {
    const newTotalAmount = products.reduce((total, product) => {
      const productPrice = parseFloat(product.price);
      if (!isNaN(productPrice)) {
        return total + productPrice * (product.quantity || 1);
      } else {
        return total;
      }
    }, 0);
    setTotalAmount(newTotalAmount);
  };

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    updateTotalAmount();
  }, [products]);
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AaF5giuuw8Gpy6TFn6zC-8acIgTkrHAft2sgolRG87vJTLZgjS4seVMyVbQ6EPEcXJAsvAqb34VGei0s&currency=USD";
    script.addEventListener("load", () => {
      if (totalAmount > 0) {
        paypal.Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: totalAmount
                }
              }]
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              console.log(details);
              fetch(endpointP, {
                method: 'post',
                headers: {
                  'content-type': 'application/json'
                }, 
                body: JSON.stringify({
                  data: data,
                  details: details
                })
              }).then(() => {
                handleBuyClick();
              });
            });
          },
          onCancel: function (data) {
            return (alert("pago cancelado"),
              console.log(data))
          }
        }).render("#paypal-button-container");
      }
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [totalAmount]);

  const compraExitosa = () => {
    if (purchaseSuccess) {
      alert ("Compra exitosa");
      Product.muestraCookies();
      window.location.href = '/';
    }
  };

  

  return (
    <Container>
      <h1>All Products</h1>
      <ListGroup>
        {products.map(product => (
          <ListGroup.Item key={product.id}>
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <p>Stock actual: {product.stock}</p>
            <div>
              <label>
                Quantity:
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(event) => {
                    handleQuantityChange(product.id, event);
                    updateTotalAmount();
                  }}
                  min="1"
                  max={product.stock}
                />
              </label>
            </div>
            <p>Price: ${product.price * (product.quantity || 1)}</p>
            <Button variant='danger' onClick={() => suprProduct(product.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {totalAmount === 0 && (
        <p>Carro vacío</p>
      )}
      {totalAmount > 0 && (
        <>
          <h2>Precio total: ${totalAmount}</h2>
          <h2>Paypal</h2>
          <div>
            <div id="paypal-button-container"></div>
          </div>
        </>
      )}
      {compraExitosa()}
    </Container>
  );
}

export default ProductCart;
