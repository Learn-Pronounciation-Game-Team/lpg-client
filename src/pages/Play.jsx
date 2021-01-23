import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import ClickNHold from 'react-click-n-hold';
import useWindowDimensions from '../helpers/getCurrentWindow'
import Sketch from "react-p5";
import Word from '../helpers/randomText'

function Play() {
  const [ word, setWord ] = useState("")
  const [ words, setWords ] = useState(['hello', 'world', 'come', 'on'])
  const { transcript } = useSpeechRecognition()
  const { height, width } = useWindowDimensions();
  const [ isFinish, setIsFinish ] = useState(false)
  const [ moving, setMoving ] = useState([])

  // ? Speech Recognition
  useEffect(()=> {
    setWord(transcript)
    let inputs = word.split(' ')
    if (words.includes(inputs[inputs.length - 1])) {
      const filtered = words.filter(word => word !== inputs[inputs.length - 1])
      setWords(filtered)
      const filteredMoving = moving.filter(move => move.text !== inputs[inputs.length - 1])
      setMoving(filteredMoving)
    }
  }, [transcript])
  
  function start(){
    return SpeechRecognition.startListening()
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
      console.log('hore')
    }
  }, [isFinish])

  const setup = (p5, canvasParentRef) => {
      // use parent to render the canvas in this ref
      // (without that p5 will render the canvas outside of your component)
      p5.createCanvas(width / 2, height / 2).parent(canvasParentRef);
      for(let i = 0; i < words.length; i++) {
        moving[i] = new Word(p5.random(40, (width / 2) - 40), p5.random(40, (height / 2) - 40), p5.random(-3, 3), p5.random(-3, 3), words[i], width, height);
      }
  };

  // const arrayMinus = (text) => {
  //   let filtered = moving.filter(e => e.text !== text)
  //   setMoving(filtered)
  // }

  const draw = (p5) => {
    p5.background(50);

    for(let i = 0; i < moving.length; i++) {
      moving[i].move();
      moving[i].display(p5);
      console.log(moving[i].y , i)
      // if (Number(moving[i].y) > height / 2 - 5) {
      //   arrayMinus(moving[i].text)
      // }
    }
    if (moving.length === 0) {
      p5.noLoop()
      setIsFinish(true)
    }
      // NOTE: Do not use setState in the draw function or in functions that are executed
      // in the draw function...
      // please use normal variables or class properties for these purposes
};

  return (
    <div className="container text-center mt-5 bg-warning">
      <ClickNHold 
        className=" w-1/12"
				time={2} // Time to keep pressing. Default is 2
				onStart={start} // Start callback
				onClickNHold={Hold} //Timeout callback
				onEnd={end} > 
        <button className="bg-green-400 px-4 py-3 hover:bg-green-700 border border-black rounded-lg">pres & hold</button>
			</ClickNHold>

      <p>result: {word}</p>
      {words}
      <p>{width}</p>
      <p>{height}</p>

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
