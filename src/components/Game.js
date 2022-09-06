import React, { useState, useRef, useEffect } from "react"

import { firestore } from "../firebase"

import Selector from "./Selector"

export default function Game(props){
    const {docName, img, maxScore} = props
    const currentImg = useRef()
    const endingModal = useRef()
    const characterModal = useRef()

    const [score, setScore] = useState(0)
    // Character Names
    const [characters, setCharacters] = useState([])
  
    // Firestore Data retrieve
    async function getData(){
        const doc = await firestore.collection('data').doc(docName).get()
        const data = doc.data()
        return data
    }
    
    // Set up
    useEffect(() => {
        getData().then(data => {
            setCharacters(() => {
                let arr = []
                for(let key in data){
                    arr.push(key)
                }
                return arr.sort()
            })
        })
    }, [])

    // Open character modal on start
    useEffect(() => {
        characterModal.current.removeAttribute('open')
        characterModal.current.showModal()
    }, [characterModal])

    // x & y are the real positions for checking mouse click, display values are buffered locations to prevent overflow
    const [selectorPos, setSelectorPos] = useState({
        enabled: false,
        x: 0,
        y: 0,
        displayX: 0,
        displayY: 0
    })

    // Game Finished Check
    useEffect(() => {
        if(score === maxScore){
            endingModal.current.showModal()
        }
    }, [score])

    // Input to Set Selector Position
    const handleMouseDown = (event) => {
        event.stopPropagation();
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
    async function checkInput(characterName){
        const inputX = Math.round((selectorPos.x / currentImg.current.clientWidth) * 100)
        const inputY = Math.round((selectorPos.y / currentImg.current.clientHeight) * 100)

        const point = (item) => {
            return (inputX >= item.x && inputX <= item.w) && (inputY >= item.y && inputY <= item.h)
        }

        var unsortedcharData = await getData()
        // Sorts the object's keys then reduces all keys with their values to a new object, sorting their values predictably
        var charData = Object.keys(unsortedcharData).sort().reduce(
            (obj, key) => {
                obj[key] = unsortedcharData[key];
                return obj;
            }, 
            {}
        )
        
        if(characterName in charData && point(charData[characterName])){
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

    return(
        <div className="game">
            <dialog ref={endingModal}>
                <h1>All Characters Found!</h1>
                <button onClick={props.returnToHome}>Return To Home</button>
                <button onClick={resetButton}>Reset</button>
            </dialog>

            <dialog ref={characterModal} className="char-display--modal">
                <h1>Remaining Characters</h1>
                <div className="char-display--container">
                    {characters.map((char) => (
                            props.characterImages[char] !== undefined && 
                                <CharDisplay 
                                    key={char}
                                    charName={char}
                                    img={props.characterImages[char]}
                                />
                        )
                    )}
                </div>
                <button onClick={() => characterModal.current.close()}>Close</button>
            </dialog>

            <header className="score-display">
                <button onClick={props.returnToHome}className="score-display--button">Return Home</button>
                <h1 className="score-display--score">Score: {score}</h1>
                <button onClick={() => characterModal.current.showModal()} className="score-display--button">Show Characters</button>
            </header>

            <img className="game-img" ref={currentImg} onClick={handleMouseDown} src={img} alt={`A where's waldo featuring characters from ${docName} games.`}/>

            <Selector 
                style={ { 
                    display: `${selectorPos.enabled ? 'block': 'none'}`,
                    top: `${selectorPos.displayY}px`,
                    left: `${selectorPos.displayX}px` } }
                handleInput={checkInput}
                characters={characters}
            />
        </div>
    )
}

function CharDisplay(props) {
    const {charName, img} = props
    return(
        <div className="char-display">
            <h2>{charName}</h2>
            <img src={img} alt={`${charName}`} className="char-display--img"/>
        </div>
    )
}