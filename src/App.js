import { useState, useRef, useEffect } from "react"
import { firestore } from "./firebase"
import data from "./data"

import Selector from "./components/Selector"

import gc from "./assets/wheres-waldo-gc.png"
import ScoreDisplay from "./components/ScoreDisplay"
// import n64 from "./assets/wheres-waldo-n64.png"
// import wii from "./assets/wheres-waldo-wii.png"

export default function App() {
  const currentImg = useRef()
  const endingModal = useRef()

  const [characters, setCharacters] = useState(() => data.map(item => item.character))
  
  const [selectorPos, setSelectorPos] = useState({
    enabled: false,
    x: 0,
    y: 0,
    displayX: 0,
    displayY: 0
  })

  useEffect(() => {
    if(characters.length === 0){
      endingModal.current.showModal()
    }
  }, [characters])

  async function getData(){
    const doc = await firestore.collection('data').doc('gc').get()
    console.log(doc.data())
  }
  getData();

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
      setCharacters(prevChars => prevChars.filter(char => char !== characterName))
    }

    setSelectorPos(prevPos => ({
      ...prevPos,
      enabled: false
    }))
  }

  function resetButton(){
    window.location.reload()
  }

  return (
    <div className="App">
      <dialog ref={endingModal}>
        <h1>All Characters Found!</h1>
        <button onClick={resetButton}>Reset</button>
      </dialog>
      <ScoreDisplay score={3 - characters.length}/>
      <img ref={currentImg} onClick={handleMouseDown} src={gc} alt="A where's waldo featuring characters from GameCube games."/>
      <Selector 
        style={ { 
          display: `${selectorPos.enabled ? 'block': 'none'}`,
          top: `${selectorPos.displayY}px`,
          left: `${selectorPos.displayX}px` } }
        handleInput={checkInput}
        characters={characters}
      />
    </div>
  );
}