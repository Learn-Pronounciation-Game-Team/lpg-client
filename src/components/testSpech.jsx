import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

function Speechless ({ word, lang }) {
  const { speak, voices  } = useSpeechSynthesis();
  const [ language, setLanguage ] = useState(4)

  useEffect(() => {
    const code = lang === 'en-GB' ? 4 : lang === 'fr-FR' ? 8 : lang === 'it-IT' ? 11 : 6
    setLanguage(code)
  },[lang])
 
  return (
    <div>
      <button
        className="text-xs px-1"
        onClick={() => speak({ text: word , voice: voices[language] })} >{word} 
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