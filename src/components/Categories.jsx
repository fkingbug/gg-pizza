import React, { useState } from 'react'

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  const onClickCategory = (index) => {
    setActiveIndex(index)
  }
  return (
    <div className='categories'>
      <ul>
        {categories.map((e, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
