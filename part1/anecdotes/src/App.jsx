import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return(
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const MostVoted = ({anecdotes,points,mostVotes}) => {
  if (points[mostVotes] === 0){
    return (
      <p>-- No anecdote has been voted on yet --</p>
    )
  }
  return (
    <>
      <p><q>{anecdotes[mostVotes]}</q></p>
      <p>has {points[mostVotes]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const pointsArray = Array(anecdotes.length).fill(0)
  const [points, setPoints] = useState(pointsArray)
  const [selected, setSelected] = useState(0)

  const handleAnecdote = () => {
    const randomIndex = Math.floor(Math.random()*anecdotes.length);
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  }

  let mostVotes = 0;
  //Asign the Index of Anecdote with most votes in [mostVotes]
  points.reduce((p,c,i)=>{
    if(c>p){
      mostVotes = i;
      return c
    }
    return p
  })
  
  //console.log('points: ', points);
  //console.log('selected: ', selected);
  //console.log('mostVotes: ', mostVotes);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p><q>{anecdotes[selected]}</q></p>
      <Button text='Random Anecdote' handleClick={handleAnecdote}/>
      <Button text='Vote' handleClick={handleVote} />

      <h2>Anecdote with most votes</h2>
      <MostVoted anecdotes={anecdotes} points={points} mostVotes={mostVotes}/>
    </div>
  )
}

export default App