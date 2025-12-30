import React from 'react'
import loading from '../loading.gif'

const Spinner =()=>{
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
  <img src={loading} alt="loading..." style={{ width: "110px", height: "110px" }} />
</div>
    )

}
export default Spinner;