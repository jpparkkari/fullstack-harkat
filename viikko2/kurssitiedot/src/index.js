import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  const courses = [{
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

  // Course
  // |-> Header
  // |-> Content
  // |   |-> Part
  // |   |-> Part
  // |   ...
  // |  
  // |-> Total

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

  return (
    //courses.map tähän
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course,i) => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
