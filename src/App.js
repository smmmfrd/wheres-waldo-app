import { useState } from "react";
import Game from "./components/Game"

import gc from "./assets/wheres-waldo-gc.png"
import n64 from "./assets/wheres-waldo-n64.png"
import wii from "./assets/wheres-waldo-wii.png"

const levels = [
  {
    levelName: 'gc',
    img: gc,
    difficulty: 3
  },
  {
    levelName: 'n64',
    img: n64,
    difficulty: 4
  },
  {
    levelName: 'wii',
    img: wii,
    difficulty: 5
  }
]

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState({})

  const levelElements = levels.map(level => (
    <LevelCard
      key={level.levelName}
      levelName={level.levelName}
      difficulty={level.difficulty}
      img={level.img}
      handleClick={() => handleClick(level)}
    />
  ))

  function handleClick(level){
    setSelectedLevel(level);
  }

  function returnToHome(){
    setSelectedLevel({});
  }
  
  return (
    <div className="App">
      {selectedLevel.levelName === undefined ? 
        <div className="level-select">
          <h1>Choose A Level</h1>
          <div className="level-card--container">
            {levelElements}
          </div>
        </div>
      :
        <Game 
          docName={selectedLevel.levelName}
          img={selectedLevel.img}
          maxScore={selectedLevel.difficulty}
          returnToHome={returnToHome}
        />
      }
      <img src="https://upload.wikimedia.org/wikipedia/en/4/46/Waluigi.png" />
    </div>
  );
}

function LevelCard(props){
  const {levelName, difficulty, img} = props;
  return (
    <div className="level-card" onClick={props.handleClick}>
      <h2>{levelName.toUpperCase()}</h2>
      <img className="level-card--img" src={img} alt={`${levelName}'s where waldo`}/>
      <h3>Difficulty: {difficulty} / 5</h3>
    </div>
  )
}