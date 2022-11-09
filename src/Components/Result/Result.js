import React from 'react'
import './Result.css'

function Result(props) {
  
  return (
    <div className='result'>
        <div className='sub_result'>
        <p>{props.expression}</p>
        </div>
        <div className="main_result">
          <p>{props.result}</p>
        </div>
    </div>
  )
}

export default Result