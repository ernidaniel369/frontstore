import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../../services/cartServices';
import AuthUser from "../AuthUser";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import endpoint from '../../services/config';


const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const { http } = AuthUser();
    const [userdetail, setUserdetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserDetail();
    }, []);

    useEffect(() => {
        if (id) {
            getProductDetails(id);
        }
    }, [id]);

    const fetchUserDetail = async () => {
        try {
            const res = await http.post("/me");
            setUserdetail(res.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const getProductDetails = async (id) => {
        try {
            const response = await axios.get(`${endpoint}/product/${id}`);
            setProduct(response.data.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (!userdetail || !userdetail.email) {
            alert("Debe iniciar sesión para agregar productos al carrito.");
            return;
        }
        Product.addNewProduct(product.id, product.name, product.price, product.stock, userdetail.email);
        alert("Producto agregado al carrito.");
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Cargando producto...</p>
            </Container>
        );
    }

    if (!product) {
        return <Container className="text-center mt-5"><p>Producto no encontrado.</p></Container>;
    }

    return (
        <Container className="product-detail-container mt-4" style={{ maxWidth: '1200px' }}>
            <Row className="justify-content-center">
                
                <Col md={6}>
                    <Card className='my-3 p-3 shadow-sm rounded'>
                        <Card.Body className="text-center">
                            <Card.Title as='h4' className="text-primary mb-3">
                                <strong>{product.name}</strong>
                            </Card.Title>
                            {product.image ? (
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="d-block mx-auto img-fluid rounded shadow" 
                                    style={{ maxHeight: "500px", width: "100%", objectFit: "cover", borderRadius: "15px" }} 
                                    onError={(e) => { 
                                        e.target.src = '/image-not-found.png'; 
                                    }} 
                                />
                            ) : (
                                <p>No hay imagen disponible</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
    
                
                <Col md={6}>
                    <Card className="shadow-sm rounded">
                        <Card.Body>
                            <Card.Title as="h3" className="text-dark">{product.name}</Card.Title>
                            <Card.Text className="text-muted">
                                {product.description || "Sin descripción disponible."}
                            </Card.Text>
                            <Card.Text>
                                <strong>Stock disponible:</strong> {product.stock}
                            </Card.Text>
                            <Card.Text className="price" style={{ fontSize: '1.5rem', color: '#28a745', fontWeight: 'bold' }}>
                                ${product.price}
                            </Card.Text>
                            <Button 
                                variant="success" 
                                className="w-100 mt-3" 
                                onClick={handleAddToCart} 
                                style={{ fontSize: '1.2rem' }}
                            >
                                Agregar al carrito
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
