import React from 'react'

const badge = ({tags}) => {
  return (
    <div className={`badge`} >
      <span>{ tags }</span>
    </div>
  )
}

export default badge
