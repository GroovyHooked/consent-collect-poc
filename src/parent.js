import './App.css'

const App = () => {
  localStorage.setItem('consentString', 'BOQ7WlgOQ7WlgABABwAAABJOACgACAAQABA');
  window.addEventListener('message', receiveMessage, false);

  function receiveMessage(event) {
    if (event.origin !== 'http://localhost:5173') {
      return;
    }
    if (event.data == 'requestConsentString') {
      const consentString = localStorage.getItem('consentString');
      event.source.postMessage(consentString, event.origin);
    }
  }

  return (
    <div className="App">
      <iframe src="http://localhost:5173/"></iframe>
    </div>
  )
}

export default App
