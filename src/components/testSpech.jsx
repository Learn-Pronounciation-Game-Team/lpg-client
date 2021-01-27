import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

function Speechless ({ word, lang }) {
  const { speak, voices  } = useSpeechSynthesis();
  const [ language, setLanguage ] = useState(4)

  useEffect(() => {
    let code
    if (lang === 'en-US') {
      code = 2
    } else if (lang === 'fr-FR') {
      code = 6
    } else if (lang === 'it-IT') {
      code = 9
    } else {
      code = 4
    }
    setLanguage(code)

    return () => setLanguage(4)
  },[lang])
 
  return (
    <div>
      <button
        className="text-xs px-2 py-1 hover:text-yellow-400"
        onClick={() => speak({ text: word , voice: voices[language] })} >{word} 
      </button>
    </div>
  );
}

export default Speechless