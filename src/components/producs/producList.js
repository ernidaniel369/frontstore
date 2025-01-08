import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const endpoint = 'https://api-app-e2241cc691d2.herokuapp.com/api';

const ProducList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${endpoint}/products`);
        
        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data); 
        } else {
          setError("No se encontraron productos.");
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="py-5" style={{ backgroundColor: "#004d40", minHeight: "100vh" }}>
      <h2 className="text-center text-light mb-4">🌱 Descubre Nuestros Productos 🌎</h2>

      <Form className="mb-4 d-flex justify-content-center">
        <Form.Control 
          type="text" 
          placeholder="🔍 Buscar productos..." 
          value={searchTerm} 
          onChange={handleSearch} 
          className="w-50 text-center p-2"
          style={{ borderRadius: "10px" }}
        />
      </Form>

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} md={4} lg={3} className="mb-4">
              <Card className="shadow-lg text-light text-center" style={{ backgroundColor: "#00695c", borderRadius: "12px" }}>
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  alt={product.name} 
                  className="img-fluid p-3"
                  style={{ maxHeight: "200px", objectFit: "contain" }} 
                />
                <Card.Body>
                  <Card.Title className="fw-bold">{product.name}</Card.Title>
                  <Card.Text className="text-warning fw-bold fs-5">${product.price}</Card.Text>
                  <Card.Text className="text-light">Stock: {product.stock}</Card.Text>
                  <Link to={`/product/${product.id}`}>
                    <Button variant="success" className="w-100">
                      <FontAwesomeIcon icon={faInfoCircle} /> Ver Detalles
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProducList;
