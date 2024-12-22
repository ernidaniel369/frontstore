import AuthUser from "./AuthUser";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

export const Dahsboard = () => {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  function renderElement() {
    if (userdetail) {
      return (
        <div className="d-flex justify-content-center">
          <div className="card m-5 bg-dark w-50">
            <div className="card-body ">
              <h4 className="text-light fst-italic">Username</h4>
              <p className="text-light ps-3">• {userdetail.name}</p>
              <h4 className="text-light fst-italic">Email</h4>
              <p className="text-light ps-3">• {userdetail.email}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="card m-5 bg-dark w-50">
            <div className="card-body ">
              <h4 className="text-light fst-italic">Username</h4>
              <h4 className="text-light fst-italic">Email</h4>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {renderElement()}
    </div>
  );
};

export default Dahsboard;

