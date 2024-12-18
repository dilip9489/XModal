import React, { useState } from "react";
import "./XModal.css";

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      validationErrors.email = "Invalid email.";
    }

    if (!formData.phone.match(/^\d{10}$/)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      validationErrors.phone = "Invalid phone number.";
    }

    if (new Date(formData.dob) > new Date()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      validationErrors.dob = "Invalid date of birth.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Form submitted successfully!");
      setFormData({ username: "", email: "", dob: "", phone: "" });
      //closeModal();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === "backdrop") {
      closeModal(); // Close the modal when clicking on the backdrop
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>User Details Modal</h1>
      <button onClick={openModal} className="open-button">
        Open Form
      </button>

      {isOpen && (
        <>
          <div className="backdrop" onClick={handleBackdropClick}></div>
          <div className="modal">
            <div className="modal-content">
              <h2>Fill Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                  {errors.phone && <p className="error">{errors.phone}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                  {errors.dob && <p className="error">{errors.dob}</p>}
                </div>

                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default XModal;
