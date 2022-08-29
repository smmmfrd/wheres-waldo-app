import data from "./data"

import gc from "./assets/wheres-waldo-gc.png"
// import n64 from "./assets/wheres-waldo-n64.png"
// import wii from "./assets/wheres-waldo-wii.png"

function App() {
  const handleMouseDown = (event) => {
    const inputX = Math.round((event.pageX / event.target.clientWidth) * 100)
    const inputY = Math.round((event.pageY/event.target.clientHeight) * 100)

    const point = data.find((item) => {
      return (inputX >= item.x && inputX <= item.w) && (inputY >= item.y && inputY <= item.h)
    })

    console.log(point ? point.character : "Nothing Found")
  }

  return (
    <div className="App">
      <img onClick={handleMouseDown} src={gc} alt="A where's waldo featuring characters from GameCube games." width="100%"/>
    </div>
  );
}

export default App;
