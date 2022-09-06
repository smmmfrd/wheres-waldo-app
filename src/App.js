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
      Boo: "http://retrogamestore.be/____impro/1/onewebmedia/Boo!.png?etag=%22W%2F%22%20%2219db6-52274596%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=198%2B168&extract=0%2B0%2B198%2B168",
      Mario: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpaper-games-maker.com%2Fimages%2Fmini%2F150%2Fsuper-mario-sunshine%2Fsuper_mario_sunshine_render_by_nickanater1-d7fvp6v.png&f=1&nofb=1",
      Toad: "http://vignette1.wikia.nocookie.net/fantendo/images/5/54/Toad3DLand.png/revision/latest/scale-to-width-down/140?cb=20111015175222"
    }
  },
  {
    levelName: 'n64',
    img: n64,
    difficulty: 4,
    characterImages: {
      Brian: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsmashboards.com%2Fattachments%2Fbrian4-png.285994%2F&f=1&nofb=1",
      Conker: "http://vgboxart.com/resources/render/13702_conker-bad-fur-day-prev.png",
      Goemon: "https://vignette.wikia.nocookie.net/vsbattles/images/7/76/GoemonKonami.png/revision/latest?cb=20190114130900",
      Goomba: "http://bleedingedge.pynchonwiki.com/wiki/images/c/ce/Goomba.PNG"
    }
  },
  {
    levelName: 'wii',
    img: wii,
    difficulty: 5,
    characterImages: {
      Ike: "https://www.serebii.net/ssbb/characters/ike.png",
      Kirby: "https://vignette.wikia.nocookie.net/supersmashbrosfanon/images/6/6f/KirbySSBU.png/revision/latest?cb=20120525053101",
      Link: "http://vignette1.wikia.nocookie.net/vsbattles/images/7/74/Link(Twilight_Princess).png/revision/latest?cb=20151115062026",
      Travis: "https://gamepedia.cursecdn.com/gamia_gamepedia_en/thumb/7/7c/TravisTouchdown.png/220px-TravisTouchdown.png?version=6c2875d79895ac46df552f4e530c0557",
      Waluigi: "https://upload.wikimedia.org/wikipedia/en/4/46/Waluigi.png"
    }
  }
]

export default function App() {
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
  
  return (
    <div className="App">
      {selectedLevel.levelName === undefined ? 
        <div className="level-select">
          <h1>Choose A Level</h1>
          <div className="level-card--container">
            {levelElements}
          </div>
        </div>
      :
        <Game 
          docName={selectedLevel.levelName}
          img={selectedLevel.img}
          maxScore={selectedLevel.difficulty}
          characterImages={selectedLevel.characterImages}
          returnToHome={returnToHome}
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