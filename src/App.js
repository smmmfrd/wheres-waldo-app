import { useState, useRef } from "react"
import data from "./data"

import Selector from "./components/Selector"

import gc from "./assets/wheres-waldo-gc.png"
import ScoreDisplay from "./components/ScoreDisplay"
// import n64 from "./assets/wheres-waldo-n64.png"
// import wii from "./assets/wheres-waldo-wii.png"

function App() {
  const currentImg = useRef()

  const [score, setScore] = useState(0)
  const [selectorPos, setSelectorPos] = useState({
    enabled: false,
    x: 0,
    y: 0,
    displayX: 0,
    displayY: 0
  })

  const handleMouseDown = (event) => {
    const inputX = event.pageX > (currentImg.current.clientWidth - 150) ? (currentImg.current.clientWidth - 150) : event.pageX;

    const inputY = event.pageY > (currentImg.current.clientHeight - 63) ? (currentImg.current.clientHeight - 63) : event.pageY;

    setSelectorPos({
      enabled: true,
      x: event.pageX,
      y: event.pageY,
      displayX: inputX,
      displayY: inputY
    })
  }

  function checkInput(characterName){
    const inputX = Math.round((selectorPos.x / currentImg.current.clientWidth) * 100)
    const inputY = Math.round((selectorPos.y / currentImg.current.clientHeight) * 100)

    const point = data.find((item) => {
      return (inputX >= item.x && inputX <= item.w) && (inputY >= item.y && inputY <= item.h)
    })

    if(point && point.character === characterName){
      setScore(score + 1)
    }
    setSelectorPos(prevPos => ({
      ...prevPos,
      enabled: false
    }))
  }

  return (
    <div className="App">
      <ScoreDisplay score={score}/>
      <img ref={currentImg} onClick={handleMouseDown} src={gc} alt="A where's waldo featuring characters from GameCube games."/>
      <Selector 
        style={ { 
          display: `${selectorPos.enabled ? 'block': 'none'}`,
          top: `${selectorPos.displayY}px`,
          left: `${selectorPos.displayX}px` } }
        handleInput={checkInput}
        characters={data.map(item => item.character)}
      />
    </div>
  );
}

export default App;
