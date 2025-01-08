/* global paypal */
import React, { useState, useEffect, useCallback } from 'react';
import { Container, ListGroup, Button, Alert, Form } from 'react-bootstrap';
import { Product } from '../../services/cartServices';
import AuthUser from "../AuthUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import endpoint from '../../services/config';


const endpointP = `${endpoint}/purchaseOrder`;

const ProductCart = () => {
  const [products, setProducts] = useState([]);
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const fetchUserDetail = useCallback(() => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  }, [http]);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  const userEmail = userdetail.email;

  useEffect(() => {
    setProducts(Product.getAllProducts(userEmail));
  }, [userEmail]);

  const updateTotalAmount = useCallback(() => {
    const newTotalAmount = products.reduce((total, product) => {
      const productPrice = parseFloat(product.price);
      return !isNaN(productPrice) ? total + productPrice * (product.quantity || 1) : total;
    }, 0);
    setTotalAmount(newTotalAmount);
  }, [products]);

  useEffect(() => {
    updateTotalAmount();
  }, [updateTotalAmount]);

  const suprProduct = (id) => {
    Product.deleteProduct(id, userEmail);
    setProducts(products.filter(product => product.id !== id));
  };

  const handleQuantityChange = (id, type) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const newQuantity = type === 'increment' 
          ? Math.min(product.quantity + 1, product.stock)
          : Math.max(product.quantity - 1, 1);
        return { ...product, quantity: newQuantity };
      }
      return product;
    }));
  };

  const handleBuyClick = useCallback(() => {
    const updatePromises = products.map(product =>
      axios.put(`${endpoint}/updateProduct/${product.id}`, {
        stock: product.stock - product.quantity,
      })
    );

    const orderPromises = products.map(product =>
      axios.post(`${endpoint}/createOrder`, {
        name: product.name,
        price: product.price * product.quantity,
        amount: product.quantity,
        email: userEmail,
      })
    );

    Promise.all([...updatePromises, ...orderPromises])
      .then(() => {
        setPurchaseSuccess(true);
        Product.checkout(userEmail); 
        setProducts([]); 
        setTimeout(() => navigate("/"), 2000); 
      })
      .catch(error => console.log('Error en las solicitudes:', error));
  }, [products, userEmail, navigate]);

  useEffect(() => {
    const scriptId = "paypal-sdk-script";
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://www.paypal.com/sdk/js?client-id=AaF5giuuw8Gpy6TFn6zC-8acIgTkrHAft2sgolRG87vJTLZgjS4seVMyVbQ6EPEcXJAsvAqb34VGei0s&currency=USD";
    script.addEventListener("load", () => {
      if (totalAmount > 0) {
        paypal.Buttons({
          createOrder: (data, actions) => actions.order.create({
            purchase_units: [{ amount: { value: totalAmount } }]
          }),
          onApprove: (data, actions) => actions.order.capture().then((details) => {
            fetch(endpointP, {
              method: 'post',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ data, details })
            })
            .then(() => handleBuyClick());
          }),
          onCancel: (data) => alert("Pago cancelado")
        }).render("#paypal-button-container");
      }
    });

    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, [totalAmount, handleBuyClick]);

  return (
    <Container className="py-5" style={{ backgroundColor: "#004d40", minHeight: "100vh" }}>
      <h2 className="text-center text-light mb-4">
        <FontAwesomeIcon icon={faShoppingCart} /> 🛒 Carrito de Compras
      </h2>

      {purchaseSuccess && <Alert variant="success" className="text-center">¡Compra realizada con éxito! 🌿</Alert>}

      <ListGroup className="mb-4">
        {products.length === 0 ? (
          <Alert variant="warning" className="text-center">🛒 Tu carrito está vacío</Alert>
        ) : (
          products.map(product => (
            <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: "#00695c", color: "white" }}>
              <div>
                <h5 className="fw-bold">{product.name}</h5>
                <p className="mb-1">Stock disponible: {product.stock}</p>
                <p className="mb-1 fw-bold text-warning">Precio: ${product.price * (product.quantity || 1)}</p>
              </div>
              
              <div className="d-flex align-items-center">
                <Button variant="light" className="me-2" onClick={() => handleQuantityChange(product.id, 'decrement')}>
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <Form.Control 
                  type="number" 
                  value={product.quantity} 
                  readOnly 
                  className="text-center"
                  style={{ width: "50px" }}
                />
                <Button variant="light" className="ms-2" onClick={() => handleQuantityChange(product.id, 'increment')}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>

              <Button variant="danger" onClick={() => suprProduct(product.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>

      {totalAmount > 0 && (
        <>
          <h3 className="text-light text-center">💰 Total: ${totalAmount}</h3>
          <div className="d-flex justify-content-center">
            <div id="paypal-button-container"></div>
          </div>
        </>
      )}
    </Container>
  );
}

export default ProductCart;
