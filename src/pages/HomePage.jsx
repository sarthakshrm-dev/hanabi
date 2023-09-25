import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);

  const handleSubmit = () => {
    navigate(`/form/${username}`);
  };

  return (
    <div className="container h-100vh">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Welcome to our App</h2>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    let value = e.target.value;
                    setUsername(value);
                    setDisabled(!value);
                  }}
                />
              </div>
              <button className="btn btn-primary mt-3" disabled={disabled} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
