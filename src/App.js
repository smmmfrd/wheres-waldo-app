import { useEffect, useRef } from "react";
import gc from "./assets/wheres-waldo-gc.png"
import n64 from "./assets/wheres-waldo-n64.png"
import wii from "./assets/wheres-waldo-wii.png"

function App() {
  const currentImg = useRef();

  const handleMouseDown = (event) =>{
    const x = Math.round((event.pageX / event.target.clientWidth) * 100)
    const y = Math.round((event.pageY/event.target.clientHeight) * 100)
    console.log(`Percentage Location: (${x}%, ${y}%)`);
  }
  
  useEffect(() => {
    window.addEventListener('click', handleMouseDown)
    
    return () => {
      window.removeEventListener('click', handleMouseDown)
    }
  },[])

  return (
    <div className="App">
      <img ref={currentImg} src={gc} alt="A where's waldo featuring characters from GameCube games." width="100%"/>
    </div>
  );
}

export default App;
