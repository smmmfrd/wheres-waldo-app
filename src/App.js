import { useEffect } from "react";
import gc from "./assets/wheres-waldo-gc.png"
import n64 from "./assets/wheres-waldo-n64.png"
import wii from "./assets/wheres-waldo-wii.png"

function App() {
  const handleMouseDown = (event) =>{
    console.log(`Mouse Location: (${event.clientX}, ${event.clientY})`);
  }
  
  useEffect(() => {
    window.addEventListener('click', handleMouseDown)
    
    return () => {
      window.removeEventListener('click', handleMouseDown)
    }
  },[])

  return (
    <div className="App">
      <img src={gc} alt="A where's waldo featuring characters from GameCube games." width="100%"/>
    </div>
  );
}

export default App;
