import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    username: username,
    phoneNumber: '',
    email: '',
    name: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/forms/${username}`).then(res => {
      console.log(res.data.status);
      if (res.data.status === true) {
        const convertedDateOfBirth = new Date(res.data.formData.dateOfBirth);
        setFormData(pValue => {
          return {
            ...pValue,
            phoneNumber: res.data.formData.phoneNumber,
            email: res.data.formData.email,
            name: res.data.formData.name,
            dateOfBirth: convertedDateOfBirth,
          }
        });
      }
    })
  }, [username]);

  useEffect(() => {
    const isFilled =
      formData.phoneNumber &&
      formData.email &&
      formData.name &&
      formData.dateOfBirth;

    setDisabled(!isFilled);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/forms/${username}`, formData).then((res) => {
      navigate('/result');
    });
  };

  return (
    <div className="container h-100vh">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">User Information</h2>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <DatePicker
                    selected={formData.dateOfBirth}
                    onChange={(date) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        dateOfBirth: date,
                      }))
                    }
                    name="dateOfBirth"
                    className="form-control"
                    placeholderText="Date of Birth"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div className='mt-3'>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={disabled}
                >
                  Submit
                </button>
                <button className="btn btn-secondary ms-2" onClick={() => navigate('/')}>
                  Cancel
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
