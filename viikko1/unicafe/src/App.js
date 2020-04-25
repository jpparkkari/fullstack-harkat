import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const total = props.good+props.neutral+props.bad
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
        good {props.good} <br />
        neutral {props.neutral} <br />
        bad {props.bad} <br />
        average {(props.good-props.bad)/total} <br />
        positive {props.good/total*100} %
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>give feedback</h3>
      <button onClick={()=>setGood(good + 1)} >good</button>
      <button onClick={()=>setNeutral(neutral + 1)} >neutral</button>
      <button onClick={()=>setBad(bad + 1)} >bad</button>
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

//napit good neutral bad
//statistics (summat jokaisesta)

ReactDOM.render(<App />, 
  document.getElementById('root')
)


export default App;
