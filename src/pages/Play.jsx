import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import ClickNHold from 'react-click-n-hold';
import useWindowDimensions from '../helpers/getCurrentWindow'
import Sketch from "react-p5";
import Word from '../helpers/randomText'
import image from '../assets/Game_-_Logo.png'
import API from '../api'

function Play() {
  const { state } = useLocation();
  const [ loading, setLoading ] = useState()
  // const { data: data_server, loading, error } = useFetchWords(state.diff)
  const [ word, setWord ] = useState("says now")
  const [ words, setWords ] = useState([])
  const { transcript } = useSpeechRecognition()
  const { height, width } = useWindowDimensions();
  const [ isFinish, setIsFinish ] = useState(true)
  const [ moving, setMoving ] = useState([])
  const [ score, setScore ] = useState(0)
  const history = useHistory()

  // ? Speech Recognition
  function start(){
    return SpeechRecognition.startListening({ language: 'en-GB' })
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
      const filtered = words.filter(word => word !== inputs[inputs.length - 1])
      setWords(filtered)
      const filteredMoving = moving.filter(move => move.text !== inputs[inputs.length - 1])
      setMoving(filteredMoving)
      setScore(score + 1)
    }
    console.log('hit use Effect')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, word, words, moving ])

  // ? kalau kata2 sudah dijawab semua, otomatis fetch lagi
  useEffect(() => {
    if (isFinish) {
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
    if (score === 5) {
      API.postLeaderBoard({name: state.name, score, difficulty: state.diff})
        .then((res) => {
          end()
          history.replace('/leaderboard')
        })
        .catch((err) => console.log(err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score])
  
  // ? P5JS
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
    }
    if (moving.length === 0) {
      p5.noLoop()
      setIsFinish(true)
    }
      // NOTE: Do not use setState in the draw function or in functions that are executed
      // in the draw function...
      // please use normal variables or class properties for these purposes
  };

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      asd
    </div>
    // <div className="container text-center mt-5 bg-warning p-3">
    //   <ClickNHold 
    //     className=" w-1/12"
		// 		time={1} // Time to keep pressing. Default is 2
		// 		onStart={start} // Start callback
		// 		onClickNHold={Hold} //Timeout callback
		// 		onEnd={end} > 
    //     <button className="bg-green-400 px-4 py-3 hover:bg-green-700 border border-black rounded-lg">pres & hold</button>`
		// 	</ClickNHold>

    //   <p>result: {word}</p>
    //   <p>Name : {JSON.stringify(state.name)}</p>
    //   <p className=" font-press-start2p">Score : {score}</p>
      
    //   <div>
    //     <Sketch setup={setup} draw={draw} className="" />
    //   </div>
    // </div>
  );
}

export default Play;
