import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


const endpoint = 'http://localhost:8000/api';

const ProducList = () => {
  const [ products, setProducts ] = useState( [] );
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ error, setError ] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${endpoint}/products`);
        setProducts(response.data.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products."); 
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
    <Container>
      {error && <div className="alert alert-danger">{error}</div>} 
      {products.length === 0 && <div>Loading products...</div>} 
            <Form>
                <Form.Group>
                    <Form.Label>Buscar Productos</Form.Label>
                    <Form.Control type="text" placeholder="Buscar..." value={searchTerm} onChange={handleSearch} />
                </Form.Group>
            </Form>
            <Row>
                {filteredProducts.map((product) => (
                    <Col key={product.id}>
                        <Card className='my-3 p-3 rounded'>
                            <Card.Body>
                                <Card.Title as='div'>
                                    <strong>{product.name}</strong>
                                </Card.Title>
                                <img src={product.image} alt={product.name} className="img-thumbnail" style={{maxHeight: "200px", maxWidth: "250px"}} />
                                <Card.Text as='div'>{product.stock}</Card.Text>
                                <Card.Text as='h3'>${product.price}</Card.Text>
                                <Link to={`/product/${product.id}`}>
                                  <Button variant='primary'>Product Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProducList;