import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import axios from 'axios';
import { Product } from '../../services/cartServices';
import AuthUser from "../AuthUser";


const endpoint = 'http://localhost:8000/api';

const ProductDetail = () => {

    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const { http } = AuthUser();
    const [userdetail, setUserdetail] = useState("");

    useEffect(() => {
        fetchUserDetail();
        getProductDetails(id); 
    }, [id]); // Only re-fetch product details when 'id' changes

    const fetchUserDetail = () => {
        http.post("/me").then((res) => {
            setUserdetail(res.data);
        });
    };

    const getProductDetails = async (id) => {
        try {
            const response = await axios.get(`${endpoint}/product/${id}`);
            setProduct(response.data.data); // Access the 'data' property
        } catch (error) {
            console.error("Error fetching product:", error);
            // Handle the error, e.g., display an error message to the user
        }
    };

    if (!product) {
        return <div>Loading...</div>
    }

    function Agregar() {
        if (userdetail.email) {
            Product.addNewProduct(product.id, product.name, product.price, product.stock, userdetail.email);
            alert("Producto agregado al carrito.");
        } else {
            alert("Debe iniciar sesión para agregar productos al carrito.");
        }
    }
    return (
        <Container style={{ maxWidth: '800px' }} className="align-items-center">
        <Row>
            <Col>
                <Card className='my-3 p-3 rounded'>
                    <Card.Body>
                        <Card.Title as='div'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                        <Carousel prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
                            {product.image ? ( 
                                <Carousel.Item> 
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="d-block mx-auto img-fluid" 
                                        style={{ maxHeight: "500px", maxWidth: "100%" }} 
                                        onError={(e) => { 
                                            e.target.src = '/image-not-found.png'; 
                                        }} 
                                    />
                                </Carousel.Item>
                            ) : (
                                <p>No hay imágenes disponibles</p>
                            )}
                        </Carousel>
                    </Card.Body>
                </Card>
            </Col>
                <Col>
                    <Card className='my-3 p-3 rounded'>
                        <Card.Body>
                            <Card.Text as='div'>Description: {product.description}</Card.Text>
                            <Card.Text as='div'>Stock: {product.stock}</Card.Text>
                            <Card.Text as='h3'>Price: ${product.price}</Card.Text>
                            <Button variant='primary' onClick={Agregar}>Add Card</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
