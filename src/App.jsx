import './App.css'
import { useEffect, useRef } from 'react';

const App = () => {
  const consentRef = useRef(null);
  const useConsentCollection = () => {
    useEffect(() => {
      const receiveMessage = (event) => {
        if (event.origin !== 'http://localhost:5174') {
          return;
        }
        const consentString = event.data;
        consentRef.current.innerText = consentString;
      }
      window.addEventListener('message', receiveMessage, false);

      return () => {
        window.removeEventListener('message', receiveMessage);
      };
    }, []);
  }

  const requestConsentString = () => {
    if (window && window.parent) {
      window.parent.postMessage('requestConsentString', 'http://localhost:5174/');
    }
  }
  useConsentCollection();


  return (
    <div className="iframe">
      <button onClick={requestConsentString}>Request consent string</button>
      <p ref={consentRef}></p>
    </div>
  )
}

export default App
