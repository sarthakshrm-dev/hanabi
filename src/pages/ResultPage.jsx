import React from 'react';
import { Link } from 'react-router-dom';

const ResultPage = () => {
  return (
    <div className="container h-100vh">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Congratulations!</h2>
              <p>Your form has been submitted successfully.</p>
              <Link to="/" className="btn btn-primary">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
