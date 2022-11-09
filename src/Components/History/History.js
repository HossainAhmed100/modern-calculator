import React from 'react'
import './History.css'
import { RiDeleteBin6Line } from 'react-icons/ri'

function History(props) {

  return (
    <div className={`history ${props.historyShow ? ' showHistory' : ''}`}>

    <div className={`history_container custom-scroll`}>
      <div>
       {props.history ?  (
        props.history.map((item, index) => <p key={index}>{item}</p>)
       ) : ("There's no History yet")}
      </div>

    </div>
    <div onClick={() => props.historryClean()} className='history_clean'>
      <RiDeleteBin6Line className='history_clean_icon'/>
       <span>Clean History</span>
    </div>
    </div>
  )
}

export default History