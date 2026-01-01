import React from 'react'

const Spinner = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '30vh' }}>
      <div className="spinner-border" role="status" aria-label="Loading"></div>
      <div className="text-body-secondary small mt-2">Loading news…</div>
    </div>
  );
};

export default Spinner;