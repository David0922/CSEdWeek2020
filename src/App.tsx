import React, { useCallback, useEffect, useState } from 'react';

import d from './d.png';
import e from './e.png';

function App() {
  const [key, setKey] = useState(0);
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('hello');

  const n = 26;
  const degree = () => -360 / n * key;

  const charToInt = (c: string): number => c.charCodeAt(0);

  const encrypt = useCallback((c: string): number => {
    if (c === ' ') return charToInt(' ');
    const tmp = charToInt(c) + key;
    const z = charToInt(c === c.toLocaleLowerCase() ? 'z' : 'Z');
    return tmp <= z ? tmp : tmp - n;
  }, [key]);

  const decrypt = (c: string): number => {
    if (c === ' ') return charToInt(' ');
    const tmp = charToInt(c) - key;
    const a = charToInt(c === c.toLocaleLowerCase() ? 'a' : 'A');
    return tmp >= a ? tmp : tmp + n;
  };

  const encryptStr = useCallback((str: string): string => String.fromCharCode(...Array.from(str).map(encrypt)), [encrypt]);
  const decryptStr = (str: string): string => String.fromCharCode(...Array.from(str).map(decrypt));

  const changeEncrypt = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setEncrypted(val);
    setDecrypted(decryptStr(val));
  };

  const changeDecrypt = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setDecrypted(val);
    setEncrypted(encryptStr(val));
  };

  const buttonStyle: React.CSSProperties = {
    fontFamily: '\'Ubuntu Mono\', monospace',
    fontSize: '12pt',
    padding: '5px 10px'
  };

  const ctrlWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: '\'Ubuntu Mono\', monospace',
    fontSize: '15pt',
    justifyContent: 'space-between',
    margin: '25px auto',
    width: '600px'
  };

  const textStyle = (bg: string): React.CSSProperties => {
    return {
      background: bg,
      border: '0',
      fontFamily: '\'Ubuntu Mono\', monospace',
      fontSize: '15pt',
      letterSpacing: '15px',
      padding: '10px',
      width: '100%'
    }
  };

  const zoom = 0.7
  const dSize = 864 * zoom;
  const eSize = 686 * zoom;

  useEffect(() => setEncrypted(encryptStr(decrypted)), [key, encryptStr, decrypted]);

  return (
    <div style={{ width: 'min-content', margin: 'auto' }}>
      <div style={ctrlWrapperStyle}>
        <button onClick={() => setKey((key + n - 1) % n)} style={buttonStyle}>-</button>
        <span>key = {key}</span>
        <button onClick={() => setKey((key + 1) % n)} style={buttonStyle}>+</button>
      </div>
      <div style={ctrlWrapperStyle}>
        <input value={decrypted} onChange={changeDecrypt} style={textStyle('#e8f0fe')} type='text' />
        <input value={encrypted} onChange={changeEncrypt} style={textStyle('#fef7e0')} type='text' />
      </div>
      <div style={{
        background: `url(${d}) center no-repeat`,
        backgroundSize: `${dSize}px ${dSize}px`,
        display: 'flex',
        height: `${dSize}px`,
        placeContent: 'center',
        width: `${dSize}px`
      }}>
        <img src={e} alt='e' style={{
          alignSelf: 'center',
          height: `${eSize}px`,
          transform: `rotate(${degree()}deg)`,
          width: `${eSize}px`
        }} />
      </div>
    </div>
  );
}

export default App;
