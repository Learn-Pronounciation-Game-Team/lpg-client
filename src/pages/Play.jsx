import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import ClickNHold from 'react-click-n-hold';
import useWindowDimensions from '../helpers/getCurrentWindow'
import Sketch from "react-p5";
import Word from '../helpers/randomText'
import image from '../assets/Game_-_Logo.png'
import useFetchWords from '../hooks/useFetchWords'

function Play() {
  const [ word, setWord ] = useState("says now")
  const { data: data_server, loading, error } = useFetchWords()
  const [ words, setWords ] = useState([])
  const { transcript } = useSpeechRecognition()
  const { height, width } = useWindowDimensions();
  const [ isFinish, setIsFinish ] = useState(false)
  const [ moving, setMoving ] = useState([])
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
  useEffect(()=> {
    if (words) {
      setWord(transcript)
    let inputs = word.split(' ')
    if (words.includes(inputs[inputs.length - 1])) {
      const filtered = words.filter(word => word !== inputs[inputs.length - 1])
      setWords(filtered)
      const filteredMoving = moving.filter(move => move.text !== inputs[inputs.length - 1])
      setMoving(filteredMoving)
    }
    // console.log(inputs[inputs.length - 1], "cek lagi")
    console.log('hit use Effect')
    }
  }, [transcript, word, words, moving ])

  useEffect(() => {
    if (data_server) {
      setWords(data_server)
    }
  }, [data_server])
  
  

  function start(){
    return SpeechRecognition.startListening({ language: 'en-US' })
	} 
    
	function end(){
    return SpeechRecognition.stopListening()         
	} 
    
	function Hold(){
		return SpeechRecognition.startListening({continuous: true}) 
  }
  
  // ? P5JS

  useEffect(() => {
    if (isFinish) {
      history.push('/leaderboard')
    }
  }, [isFinish, history])

  const setup = (p5, canvasParentRef) => {
      // use parent to render the canvas in this ref
      // (without that p5 will render the canvas outside of your component)
      p5.createCanvas(width / 2, height / 1.5).parent(canvasParentRef);
      for(let i = 0; i < words.length; i++) {
        moving[i] = new Word(p5.random(40, (width / 2) - 40), p5.random(40, (height / 1.5) - 40), p5.random(-3, 3), p5.random(-3, 3), words[i], width, height, p5.loadImage(image));
      }
  };

  const draw = (p5) => {
    p5.background(50);

    for(let i = 0; i < moving.length; i++) {
      moving[i].move();
      moving[i].display(p5);
      // console.log(moving[i].y , i)
    }
    if (moving.length === 0) {
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
    <div className="container text-center mt-5 bg-warning p-3">
      <ClickNHold 
        className=" w-1/12"
				time={0} // Time to keep pressing. Default is 2
				onStart={start} // Start callback
				onClickNHold={Hold} //Timeout callback
				onEnd={end} > 
        <button className="bg-green-400 px-4 py-3 hover:bg-green-700 border border-black rounded-lg">pres & hold</button>
			</ClickNHold>

      <p>result: {word}</p>
      {words}
      <p>Window Width {width}</p>
      <p>Window Height {height}</p>
      <p>{JSON.stringify(data_server)}</p>
      
      <div>
        <Sketch setup={setup} draw={draw} className="" />
        <div className="text-blue-500">
          selesai= {JSON.stringify(isFinish)}
        </div>
      </div>
    </div>
  );
}

export default Play;
