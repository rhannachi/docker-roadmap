import './App.css';

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL

function App() {

  const vote = async (candidate) => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ candidate })
      };
      await fetch(`${SERVER_API_URL}/api/vote`, requestOptions)
  }

  return (
    <div className="root">
      <h4 className="color"> What do you like ? </h4>
      <div className="vote-flex">
        <img onClick={() => vote('cat')} className="btn" src="/cat.jpg" alt="cat" />
        <img onClick={() => vote('dog')} className="btn" src="/dog.webp" alt="dog" />
        <img onClick={() => vote('rabbit')} className="btn" src="/rabbit.jpg" alt="rabbit" />
      </div>
    </div>
  );
}

export default App;
