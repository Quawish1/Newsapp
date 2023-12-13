import React, { Component } from 'react'
import loader from '../loader.gif'

const Spinner = () => {
    return (
      <div>
        <div className="text-center" ></div>
        <img src={loader} alt="loader" style={{width:"30px", height: "30px"}}/>
      </div>
    )
  }
 
export default Spinner
