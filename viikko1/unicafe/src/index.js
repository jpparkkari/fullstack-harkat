import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>
        <h3>statistics</h3>
        No feedback given
      </div>
    )
  }
  return (
    <div>
        <h3>statistics</h3>
        <table>
          <tbody>
            <StatisticLine text="good" value = {good} />
            <StatisticLine text="neutral" value = {neutral} />
            <StatisticLine text="bad" value = {bad} />
            <StatisticLine text="average" value = {(good-bad)/total} />
            <StatisticLine text="positive" value = {good/total*100 + ' %'} />
          </tbody>
        </table>
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
      <Button onClick={()=>setGood(good + 1)} text = "good" />
      <Button onClick={()=>setNeutral(neutral + 1)} text = "neutral" />
      <Button onClick={()=>setBad(bad + 1)} text = "bad" />
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

//napit good neutral bad
//statistics (summat jokaisesta)

ReactDOM.render(<App />, 
  document.getElementById('root')
)


//export default App;
