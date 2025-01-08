import AuthUser from "./AuthUser";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

export const Dashboard = () => {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState(null); 

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#004d40" }}>
      <Helmet>
        <title>Perfil</title>
        <meta name="description" content="Perfil de usuario" />
      </Helmet>

      <div className="card text-light shadow-lg p-4" style={{ width: "400px", backgroundColor: "#00695c", borderRadius: "12px" }}>
        <div className="card-body text-center">
          <h2 className="mb-4">Perfil de Usuario</h2>

          {userdetail ? (
            <>
              <h4 className="fw-bold">Nombre</h4>
              <p className="fs-5">{userdetail.name}</p>
              <h4 className="fw-bold">Correo Electrónico</h4>
              <p className="fs-5">{userdetail.email}</p>
            </>
          ) : (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
