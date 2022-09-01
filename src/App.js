
import Game from "./components/Game"

import gc from "./assets/wheres-waldo-gc.png"
// import n64 from "./assets/wheres-waldo-n64.png"
// import wii from "./assets/wheres-waldo-wii.png"

export default function App() {

  return (
    <div className="App">
      <Game 
        img={gc}
        docName={'gc'}
      />
      
    </div>
  );
}