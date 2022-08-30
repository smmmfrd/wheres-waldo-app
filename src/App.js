import { useState, useRef } from "react"
import data from "./data"

import Selector from "./components/Selector"

import gc from "./assets/wheres-waldo-gc.png"
// import n64 from "./assets/wheres-waldo-n64.png"
// import wii from "./assets/wheres-waldo-wii.png"

function App() {
  const currentImg = useRef()
  const [selectorPos, setSelectorPos] = useState({
    enabled: true,
    x: 0,
    y: 0
  })

  const handleMouseDown = (event) => {
    const inputX = event.pageX > (currentImg.current.clientWidth - 150) ? (currentImg.current.clientWidth - 150) : event.pageX;

    const inputY = event.pageY > (currentImg.current.clientHeight - 63) ? (currentImg.current.clientHeight - 63) : event.pageY;
    
    setSelectorPos(prevPos => ({
      ...prevPos,
      x: event.pageX,
      y: event.pageY,
      displayX: inputX,
      displayY: inputY
    }))
  }

  function checkInput(){
    const inputX = Math.round((selectorPos.x / currentImg.current.clientWidth) * 100)
    const inputY = Math.round((selectorPos.y / currentImg.current.clientHeight) * 100)

    const point = data.find((item) => {
      return (inputX >= item.x && inputX <= item.w) && (inputY >= item.y && inputY <= item.h)
    })

    console.log(point ? point.character : "Nothing Found")
  }

  return (
    <div className="App">
      <img ref={currentImg} onClick={handleMouseDown} src={gc} alt="A where's waldo featuring characters from GameCube games."/>
      <Selector style={ { 
        display: `${selectorPos.enabled ? 'block': 'none'}`,
        top: `${selectorPos.displayY}px`,
        left: `${selectorPos.displayX}px` } }/>
    </div>
  );
}

export default App;
