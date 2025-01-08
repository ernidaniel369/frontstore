import energy from '../assets/energy.jpg';
import { Helmet } from "react-helmet";




function Home() {
    return (
        <div className="card mt-5 shadow-lg" style={{ backgroundColor: '#004d40', color: '#e0f2f1' }}>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Descubre los beneficios de las energías renovables y cómo cada compra ayuda al medio ambiente." />
            </Helmet>
            <div className="row g-0">
                <div className="col-4">
                    <img src={energy} className="img-fluid rounded m-4 ms-5" alt="Energía renovable" />
                </div>
                <div className="col-1"></div>
                <div className="col-6 ms-3 d-flex flex-column">
                    <div className="card-body text-center">
                        <h1 className="card-title my-4" style={{ color: '#80cbc4' }}>
                            Bienvenido a un futuro sostenible
                        </h1>
                        <h5 className="card-text mt-3 mb-4">
                            Energías Renovables para un Mundo Mejor
                        </h5>
                        <p className="card-text">
                            <small>
                                En nuestra tienda, creemos en el poder de la energía renovable. Desde celdas solares hasta productos ecológicos, cada compra que realizas no solo mejora tu vida, sino que también ayuda a proteger el planeta.  
                                <br /><br />
                                🌱 <strong>El 10% de cada venta</strong> se destina a proyectos ambientales para preservar nuestros recursos naturales.  
                                <br /><br />
                                🌞 <strong>Beneficios de la energía renovable:</strong>  
                                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                    <li>✔ Reduce la huella de carbono</li>
                                    <li>✔ Disminuye el costo energético</li>
                                    <li>✔ Protege el medio ambiente</li>
                                    <li>✔ Contribuye a un futuro sostenible</li>
                                </ul>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
