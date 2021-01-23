import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import ClickNHold from 'react-click-n-hold';

function MainPage() {
  const [ word, setWord ] = useState("")
  const { transcript, resetTranscript } = useSpeechRecognition()

  useEffect(()=> {
    setWord(transcript)
  }, [transcript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <h1>browser not support</h1>
  }
  function rec() {
    return SpeechRecognition.startListening({continuous: true})
  }
  function stop() {
    return SpeechRecognition.stopListening()
  }
  //======================================================== dibawah garis ini function untuk button hold 
  
  function start(){
    console.log('START'); 
    return SpeechRecognition.startListening()
	} 
    
	function end(){
		console.log('END');
    return SpeechRecognition.stopListening()         
	} 
    
	function Hold(){
    console.log('clickNHold');
		return SpeechRecognition.startListening({continuous: true}) 
	} 

  return (
    <div className="container text-center mt-5 bg-warning">
      {
        !word ? <button onClick={rec}>Record</button> : <button onClick={stop}>Stop</button>
      }
      <button onClick={resetTranscript} className="mb-5">Reset</button>
      

      <ClickNHold 
        className="mb-5"
				time={2} // Time to keep pressing. Default is 2
				onStart={start} // Start callback
				onClickNHold={Hold} //Timeout callback
				onEnd={end} > 
        <button type="button" className="btn btn-primary">pres</button>
			</ClickNHold>

      <p>result: {word}</p>
    </div>
  );
}

export default MainPage;
