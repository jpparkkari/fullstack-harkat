import React from 'react'

const Course = ( {course } ) => {
   
    const Header = ( {name} ) => {
      
      return (
        <div>
            <h2>{name}</h2>
        </div>
      )
    }
  
    const Content = ( {parts} ) => {
      
  
      const Part = ( {part} ) => {
        
        return (
        <>
          <p>
            {part.name} {part.exercises}
          </p>
        </>
        )
      }
  
     /* return (
        <>
          <Part part={parts[0]}  />
          <Part part={parts[1]}  />
          <Part part={parts[2]}  />
        </>
      )*/
      return (
        <>
        {parts.map((part,i) => 
          <Part key={part.id} part={part}/>
        )}
        </>
      )
    }
    
  
    const Total = ( {parts} ) => {
      //console.log(parts)
  
  
  
      const total = 
        parts.reduce( (s, p) => s+p.exercises,0 )
  
      return (
        <>
          <p>
            <b> total of {total} exercises </b>
           </p>
        </>
      )
    }
  
    // Course-komponentin palautus
    return (
    
      <div>
        <Header name = {course.name} />
        <Content parts = {course.parts}/>
        <Total parts = {course.parts} />
     
      </div>
      
     
    ) 
    
  }

  export default Course