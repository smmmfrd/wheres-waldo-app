import { useState } from "react";
import Game from "./components/Game"

import gc from "./assets/wheres-waldo-gc.png"
import n64 from "./assets/wheres-waldo-n64.png"
import wii from "./assets/wheres-waldo-wii.png"

const levels = [
  {
    levelName: 'gc',
    img: gc,
    difficulty: 3,
    characterImages: {
      Boo: "./characters/gc/boo.png",
      Mario: "./characters/gc/mario.png",
      Toad: "./characters/gc/toad.webp"
    }
  },
  {
    levelName: 'n64',
    img: n64,
    difficulty: 4,
    characterImages: {
      Brian: "./characters/n64/brian.png",
      Conker: "./characters/n64/conker.png",
      Goemon: "./characters/n64/goemon.webp",
      Goomba: "./characters/n64/goomba.png"
    }
  },
  {
    levelName: 'wii',
    img: wii,
    difficulty: 5,
    characterImages: {
      Ike: "./characters/wii/ike.png",
      Kirby: "./characters/wii/kirby.webp",
      Link: "./characters/wii/link.webp",
      Travis: "./characters/wii/travis.png",
      Waluigi: "./characters/wii/waluigi.png"
    }
  }
]

export default function App() {
  const [reset, setReset] = useState(0)
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

  function resetGame(){
    console.log('resetting');
    setReset(prevReset => prevReset === 0 ? 1 : 0);
  }
  
  return (
    <div className="App">
      {selectedLevel.levelName === undefined ? 
        <div className="level-select">
          <h1 className="level-select--header">Choose A Level</h1>
          <div className="level-card--container">
            {levelElements}
          </div>
        </div>
      :
        <Game 
          key={reset}
          docName={selectedLevel.levelName}
          img={selectedLevel.img}
          maxScore={selectedLevel.difficulty}
          characterImages={selectedLevel.characterImages}
          returnToHome={returnToHome}
          reset={resetGame}
        />
      }
    </div>
  );
}

function LevelCard(props){
  const {levelName, difficulty, img} = props;
  return (
    <div className="level-card" onClick={props.handleClick}style={{backgroundImage: `url(${img})`}}>
      <h2>{levelName.toUpperCase()}</h2>
      <h3>Difficulty: {difficulty} / 5</h3>
    </div>
  )
}