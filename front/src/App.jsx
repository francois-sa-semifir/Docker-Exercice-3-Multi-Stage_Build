import React from 'react';

function App() {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Bienvenue sur mon serveur React</h1>
      <p>Message depuis le back-end: {message}</p>
    </div>
  );
}

export default App;
