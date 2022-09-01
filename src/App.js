import { useState, useRef, useEffect } from "react"
import { firestore } from "./firebase"

import Selector from "./components/Selector"
import ScoreDisplay from "./components/ScoreDisplay"

import gc from "./assets/wheres-waldo-gc.png"
// import n64 from "./assets/wheres-waldo-n64.png"
// import wii from "./assets/wheres-waldo-wii.png"


async function getData(){
  const doc = await firestore.collection('data').doc('gc').get()
  const data = doc.data()
  return data
}

export default function App() {
  const currentImg = useRef()
  const endingModal = useRef()
  var charData = useRef({});

  const [score, setScore] = useState(0)
  // Character Names
  const [characters, setCharacters] = useState([])
  
  // Set up
  useEffect(() => {
    getData().then(data => {
      charData.current = data;
      setCharacters(() => {
        let arr = []
        for(let key in data){
          arr.push(key)
        }
        return arr
      })
    })
  }, [])

  // x & y are the real positions for checking mouse click, display values are buffered locations to prevent overflow
  const [selectorPos, setSelectorPos] = useState({
    enabled: false,
    x: 0,
    y: 0,
    displayX: 0,
    displayY: 0
  })

  // Ending
  useEffect(() => {
    if(score === 3){
      endingModal.current.showModal()
    }
  }, [score])

  // Input to Set Selector Position
  const handleMouseDown = (event) => {
    const inputX = event.pageX > (currentImg.current.clientWidth - 150) ? (currentImg.current.clientWidth - 150) : event.pageX;

    var yOffset = characters.length * 20;
    const inputY = event.pageY > (currentImg.current.clientHeight - yOffset) ? (currentImg.current.clientHeight - yOffset) : event.pageY;

    setSelectorPos({
      enabled: true,
      x: event.pageX,
      y: event.pageY,
      displayX: inputX,
      displayY: inputY
    })
  }

  // To get the positions of the characters
  /*
  const debugMouseDown = (event) => {
    const inputX = Math.round((event.pageX / currentImg.current.clientWidth) * 100)
    const inputY = Math.round((event.pageY / currentImg.current.clientHeight) * 100)

    console.log(`Clicked at: (${inputX}, ${inputY})`)
  }
  */

  // Check if Input is Correct (Button Click)
  function checkInput(characterName){
    const inputX = Math.round((selectorPos.x / currentImg.current.clientWidth) * 100)
    const inputY = Math.round((selectorPos.y / currentImg.current.clientHeight) * 100)

    const point = (item) => {
      return (inputX >= item.x && inputX <= item.w) && (inputY >= item.y && inputY <= item.h)
    }

    if(characterName in charData.current && point(charData.current[characterName])){
      setCharacters(prevChars => prevChars.filter(char => char !== characterName))

      setScore(score + 1)
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
      <ScoreDisplay score={score}/>
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