import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import ClickNHold from 'react-click-n-hold';
import useWindowDimensions from '../helpers/getCurrentWindow'
import Sketch from "react-p5";
import Word from '../helpers/randomText'
import image from '../assets/Game_-_Logo.png'
import API from '../api'
import Explode from '../helpers/exploded/explode'
import bomb from '../assets/Effect_more_red.png'
import explodeJson from '../helpers/exploded/explode.json'
let bombImage

function Play() {
  const { state } = useLocation();
  const [ loading, setLoading ] = useState()
  const [ isExplode, setExplode ] = useState(false)
  const [ word, setWord ] = useState("says now")
  const [ words, setWords ] = useState([])
  const { transcript } = useSpeechRecognition()
  const { height, width } = useWindowDimensions();
  const [ isFinish, setIsFinish ] = useState(false)
  const [ moving, setMoving ] = useState([])
  const [ score, setScore ] = useState(0)
  const history = useHistory()
  //===================================================
  const [timeLeft, setTimeLeft] = useState(10);
  let cSize = 10
  let yPos = 400
  let cTrans = 255
  //===================================================

  useEffect(() => { //timeleft
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // ? Speech Recognition
  function start(){
    return SpeechRecognition.startListening({ language: 'en-US' })
	} 
    
	function end(){
    return SpeechRecognition.stopListening()
	}
    
	function Hold(){
		return SpeechRecognition.startListening({continuous: true}) 
  }

  // ? memfilter kata2
  useEffect(()=> {
    if (words) {
      setWord(transcript.toLocaleLowerCase())
      let inputs = word.split(' ')
      if (words.includes(inputs[inputs.length - 1])) {
        setExplode(true)
        setTimeout(() => {
          const filtered = words.filter(word => word !== inputs[inputs.length - 1])
          const filteredMoving = moving.filter(move => move.text !== inputs[inputs.length - 1])
          setExplode(false)
          setWords(filtered)
          setMoving(filteredMoving)
          setScore(score + 1)
        }, 200);
      }
      // console.log('hit use Effect')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, word, words, moving ])

  // ? kalau kata2 sudah dijawab semua, otomatis fetch lagi
  useEffect(() => {
    if (isFinish === true) {
      console.log('hit API');
      setLoading(true)
      API.fetchWords(state.diff, state.appear)
        .then((res) => {
          setWords(res)
          setLoading(false)
          setIsFinish(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinish])
  

  // ? kondisional untuk post ke server
  useEffect(() => {
    if (timeLeft === 0) {
      if (score === 0) {
        end()
        history.replace('/leaderboard')
      } else {
        API.postLeaderBoard({name: state.name, score, difficulty: state.diff})
        .then((res) => {
          end()
          history.replace('/leaderboard')
        })
        .catch((err) => console.log(err))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, timeLeft])
  
  // ? P5JS
  const setup = (p5, canvasParentRef) => {
      // use parent to render the canvas in this ref
      // (without that p5 will render the canvas outside of your component)
      bombImage = p5.loadImage(bomb)

      p5.createCanvas(width / 2, height / 1.5).parent(canvasParentRef);
      for(let i = 0; i < words.length; i++) {
        moving[i] = new Word(p5.random(40, (width / 2) - 40), p5.random(40, (height / 1.5) - 40), p5.random(-3, 3), p5.random(-3, 3), words[i], width, height, p5.loadImage(image));
      }
  };

  const draw = (p5) => {
    p5.background(50);

    if (isExplode === true) {
      let frames = explodeJson.frames
      let animations = []
      for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position
        // p5.image(this.image, 0,  0)
        let img = bombImage.get(pos.x, pos.y, pos.w, pos.h)
        animations.push(img)
      }

      let inputs = word.split(' ')
      setMoving(moving.map(e => {
        if (e.text === inputs[inputs.length - 1]){
          return new Explode(e.x, e.y, e.xSpeed, e.ySpeed, e.text, e.width, e.height, animations)
        } else {
          return e
        }
      }))
    }

    for(let i = 0; i < moving.length; i++) {
      moving[i].move();
      moving[i].display(p5);
    }
    if (moving.length === 0) {
      console.log('here');
      p5.noLoop()
      setIsFinish(true)
    }
      // NOTE: Do not use setState in the draw function or in functions that are executed
      // in the draw function...
      // please use normal variables or class properties for these purposes

    p5.fill("orange");
    p5.textSize(30);
    
    if (timeLeft === 0) {
      p5.fill(255, 0, 255, cTrans)
      p5.ellipse(450, yPos, cSize)
      yPos -= 10
      cSize += 3
      cTrans -= 3
    }

    if ( timeLeft > 9 ) {
      p5.text("00 : " + timeLeft + " : " + p5.millis().toString().slice(2, 4) , p5.width/2.35, p5.height/20)
    } else if ( timeLeft < 10 ) {
      p5.text("00 : 0" + timeLeft + " : " + p5.millis().toString().slice(2, 4) , p5.width/2.35, p5.height/20)
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="max-h-screen">
      <div className="h-screen flex items-center justify-center">
        <div className="bg-containerMain bg-cover p-24 rounded-3xl shadow-2xl">
          <div className="flex justify-around">
            <ClickNHold 
              className=" bg-green-400 px-4 py-3 hover:bg-green-700 border border-black rounded-lg"
              time={1} // Time to keep pressing. Default is 2
              onStart={start} // Start callback
              onClickNHold={Hold} //Timeout callback
              onEnd={end}
              >
              <button>Press & Hold</button>
            </ClickNHold>
            <p className=" font-press-start2p">Name : {state.name}</p>
            <p className=" font-press-start2p">Score : {score}</p>
          </div>
          <p className="w-11/12 border font-press-start2p break-words">What you said : {word}</p>
          <div className="flex justify-center flex-row">
            <Sketch setup={setup} draw={draw} className="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Play;
