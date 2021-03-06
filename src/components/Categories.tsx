import React, { FC, memo } from 'react'
// import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'
type CategoriesProps = {
  value: number
  onChangeCategory: (idx: number) => void
}
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  // useWhyDidYouUpdate('Categories', { value, onChangeCategory })

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
})
