import { useState } from "react";
import axios from "../api/api_connection";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const retrievePass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "/forgot-password/",
        JSON.stringify({ email })
      );
      console.log(res);
      if (res.status === 200) {
        alert("Password reset was sent to your gmail");
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
        <h1 className="fw-bold mb-4">Retrieve Password</h1>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header cs-bg-primary bg-gradient fw-bold text-white">
              Enter your valid email
            </div>
            <div className="card-body">
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={retrievePass}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
