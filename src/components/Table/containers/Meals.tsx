import * as React from 'react'

const MealsContainer = (meals: any) => {
  return (
    <div className="meals card">
      <div className="card-header">
        <h1>Meals at the Table</h1>
      </div>
      <div className="card-content">
        {meals.map((meal: any) => {
          return (
            <div className="meal-li">
              {meal.name}
              <span>{String(new Date(meal.dueDate).toLocaleDateString())} at {String(new Date(meal.dueDate).toLocaleTimeString())}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MealsContainer