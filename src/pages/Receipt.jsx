import React from 'react';
import { useLocation } from 'react-router-dom';

const Receipt = () => {
  // Using useLocation to get the state passed via navigation
  const location = useLocation();
  const { amount, filmTitle, seanceDetails, reservationDate } = location.state || {};

  // Check if state is available, otherwise show a message
  if (!amount || !filmTitle || !seanceDetails || !reservationDate) {
    return <div>Error: No reservation data available.</div>;
  }

  return (
    <div className="receipt-container">
      <header className="header">
        <h1 className="receipt-title">Reservation Confirmation</h1>
      </header>
      <section className="receipt-details">
        <h2>Reservation Details</h2>
        <ul>
          <li><strong>Film:</strong> {filmTitle}</li>
          <li><strong>Seance Time:</strong> {seanceDetails.heureDebut} - {seanceDetails.heureFin}</li>
          <li><strong>Hall:</strong> {seanceDetails.salle.numeroSalle}</li>
          <li><strong>Reservation Date:</strong> {reservationDate}</li>
          <li><strong>Price:</strong> {amount} MAD</li>
        </ul>
      </section>

      <footer className="footer">
        <p>Thank you for your reservation at CINAZONE! Enjoy the movie!</p>
      </footer>
    </div>
  );
};

export default Receipt;
