import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Loading from '../components/Loading'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import ClickNHold from 'react-click-n-hold';
import useWindowDimensions from '../helpers/getCurrentWindow'
import Sketch from "react-p5";
import Word from '../helpers/randomText'
import image from '../assets/bomb.gif'
import API from '../api'
import Explode from '../helpers/exploded/explode'
import bomb from '../assets/Effect_more_red.png'
import explodeJson from '../helpers/exploded/explode.json'
import Speechless from '../components/testSpech' 
import { useAuth } from '../context/auth'
import duar from '../assets/duar.mp3'
import useSound from 'use-sound';
import rumbleSong from '../assets/bensound-rumble.mp3'
import challenge from '../assets/challenge.mp3'
let bombImage

function Play() {
  const { setAuthTokens } = useAuth()
  const { state } = useLocation();
  const [ loading, setLoading ] = useState()
  const [ isExplode, setExplode ] = useState(false)
  const [ word, setWord ] = useState("")
  const [ words, setWords ] = useState([])
  const { transcript } = useSpeechRecognition()
  const { height, width } = useWindowDimensions();
  const [ isFinish, setIsFinish ] = useState(false)
  const [ moving, setMoving ] = useState([])
  const [ score, setScore ] = useState(0)
  const [ speechLang ] = useState(state.lang === 'English' ? 'en-US' : state.lang === 'French' ? 'fr-FR' : state.lang === 'Italian' ? 'it-IT' : 'es-ES')
  const history = useHistory()
  const [timeLeft, setTimeLeft] = useState(state.timer);
  const [playEffect] = useSound(duar, { volume: 0.15 })
  const [playChallenge] = useSound(challenge, { volume: 0.15 })
  const [playBGM, {stop}] = useSound(rumbleSong, { volume: 0.01 })

  useEffect(() => {
    if (state) {
      playChallenge()
      playBGM()
    }
  }, [state, playBGM, playChallenge])

  useEffect(() => { //timeleft
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // ? Speech Recognition
  function start(){
    return SpeechRecognition.startListening({ language: speechLang })
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
      let inputs = word.split(' ') // dari mic
      if (words.includes(inputs[inputs.length - 1])) {
        setExplode(true)
        playEffect()
        setTimeout(() => {
          const filtered = words.filter(word => word !== inputs[inputs.length - 1])
          const filteredMoving = moving.filter(move => move.text !== inputs[inputs.length - 1])
          setExplode(false)
          setWords(filtered)
          setMoving(filteredMoving)
          setScore(score + 10)
        }, 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, word, words, moving ])

  // ? fetch awal masuk
  useEffect(() => {
    setLoading(true)
      API.fetchWords(state.diff, state.appear, state.lang)
        .then((res) => {
          setWords(res)
          setLoading(false)
          // setIsFinish(false)
        })
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getLastIndex = (input) => {
    let arr = input.split(' ')
    return arr[arr.length - 1] === '' ? '...' : arr[arr.length - 1]
  }

  // ? kondisional untuk post ke server
  useEffect(() => {
    if (timeLeft === 0 || isFinish) {
      stop()
      end()
      if (score === 0) {
        history.replace('/leaderboard', { name: state.name, score, difficulty: state.diff, language: state.lang })
        setAuthTokens(false)
      } else {
        API.postLeaderBoard({name: state.name, score, difficulty: state.diff, language: state.lang})
        .then((res) => {
          history.replace('/leaderboard', { name: state.name, score, difficulty: state.diff, language: state.lang })
          setAuthTokens(false)
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
      p5.createCanvas(width / 1.5, height / 1.4).parent(canvasParentRef);
      for(let i = 0; i < words.length; i++) {
        moving[i] = new Word(p5.random(40, (width / 2) - 100), p5.random(40, (height / 1.4) - 100), p5.random(-3, 3), p5.random(-3, 3), words[i], width, height, p5.loadImage(image));
      }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(width / 1.5, height / 1.4)
    for(let i = 0; i < words.length; i++) {
      moving[i] = new Word(p5.random(40, (width / 2) - 100), p5.random(40, (height / 1.4) - 100), p5.random(-3, 3), p5.random(-3, 3), words[i], width, height, p5.loadImage(image));
    }
  }

  const draw = (p5) => {
    p5.background('#48426D');

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
      p5.noLoop()
      setIsFinish(true)
    }
      // NOTE: Do not use setState in the draw function or in functions that are executed
      // in the draw function...
      // please use normal variables or class properties for these purposes

    p5.fill("orange");
    p5.textSize((3/100) * height);

    if ( timeLeft > 9 ) {
      p5.text("00 : " + timeLeft + " : " + p5.millis().toString().slice(2, 4) , 20, 50)
    } else if ( timeLeft < 10 ) {
      p5.text("00 : 0" + timeLeft + " : " + p5.millis().toString().slice(2, 4) , 20, 50)
    }
  };

  if (loading) {
    return <Loading />
  }
  return (
    <div className="background py-3 px-1">
      <h1 className="sm:text-3xl text-center text-1xl sm:py-3">Good Luck! Score: {score}</h1>
      <div className="flex w-full justify-center sm:items-end items-center flex-col sm:flex-row landscape:flex-row">
        <Sketch setup={setup} draw={draw} windowResized={windowResized} className=" order-1"/>
        <div className="order-2 flex flex-col justify-around mx-2">
          <div className="sm:order-1 order-last outline-yellow">
            <p className=" text-base text-center border-b-2 border-yellow-200">Need to hear the word?</p>
            <div className="flex flex-wrap justify-center">
              {
                words.map( (word, idx) => ( 
                  <Speechless word={ word } key={ idx } lang={ speechLang } />
                ))
              }
            </div>
          </div>
          <p className=" my-3 text-center outline-yellow py-2 order-1 text-xs">{state.name} said: {getLastIndex(word)}</p>
          <div className=" sm:order-4 text-center">
            <ClickNHold
              className="button p-2 mt-2 mb-0"
              time={1} // Time to keep pressing. Default is 2
              onStart={start} // Start callback
              onClickNHold={Hold} //Timeout callback
              onEnd={end}
              >
              <button>Press & Hold</button>
            </ClickNHold>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Play;
