import { useState } from 'react';


const Header = ({text}) => {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{`${text}: `}</td>
      <td>{value}</td>
    </tr>
    
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, all, average, positive} = props.values;
  if(all === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='Good' value={good} />
        <StatisticLine text='Neutral' value={neutral} />
        <StatisticLine text='Bad' value={bad} />
        <StatisticLine text='All' value={all} />
        <StatisticLine text='Average' value={average} />
        <StatisticLine text='Positive' value={positive+' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good+1);
  const handleNeutral = () => setNeutral(neutral+1);
  const handleBad = () => setBad(bad+1);

  let all = good + neutral + bad;
  let average = (good-bad)/(all) || 0;
  let positive = good/all*100 || 0;

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive,
  }

  return (
    <div>
      <Header text='Give feedback'/>
      <Button text='good' handleClick={handleGood} />
      <Button text='neutral' handleClick={handleNeutral} />
      <Button text='bad' handleClick={handleBad} />

      <Header text='Statistics'/>
      <Statistics values={statistics}/>      
    </div>
  )
}

export default App
