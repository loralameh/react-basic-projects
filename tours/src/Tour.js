import React, { useState } from 'react'

const Tour = (props) => {
  const { id, image, info, name, price } = props.tour
  const removeTour = props.removeTour
  const [readMore, setReadMore] = useState(false)
  return (
    <article className='single-tour'>
      <img src={image} alt={name}></img>
      <footer>
        <div classname='tour-info'>
          <h4> {name}</h4>
        </div>
        <div classname='tour-price'>${price}</div>
        <p>{readMore ? info : `${info.substring(0, 200)}...`}</p>
        <button onClick={() => setReadMore(!readMore)}>
          {readMore ? 'read Less' : 'read More'}
        </button>
        <button className='delete-btn' onClick={() => removeTour(id)}>
          Not Interested
        </button>
      </footer>
    </article>
  )
}

export default Tour
