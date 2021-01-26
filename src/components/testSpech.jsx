// import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

function Speechless (props) {
  const { word } = props
  const { speak, voices  } = useSpeechSynthesis();
 
  return (
    <div>
        <p>=============={voices.length}</p>
      <button 
        onClick={() => speak({ text: word , voice: voices[4] })} >{word} 
      </button>
    </div>
  );
}

// voices[ "masukan indexnya" ]
// 4 en-GB - Google UK English Female
// 1 en-US - Microsoft Zira Desktop - English (United States)
// 6 es-ES - Google español
// 8 fr-FR - Google français
// 11 it-IT - Google italiano

export default Speechless