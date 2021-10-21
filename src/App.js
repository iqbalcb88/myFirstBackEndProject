import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch('http://localhost:5000/heroins')
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);
  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newHeroine = { name: name, email: email };
    //send data to the server;

    fetch('http://localhost:5000/heroins', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newHeroine),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const addedHeroine = result;
        const newHeroins = [...data, addedHeroine];
        setData(newHeroins);
      });

    nameRef.current.value = '';
    emailRef.current.value = '';
    e.preventDefault();
  };

  return (
    <div className='App'>
      <form onSubmit={handleAddUser}>
        <input type='text' ref={nameRef} placeholder='name' name='' id='' />
        <input type='text' ref={emailRef} placeholder='email' name='' id='' />
        <input type='submit' value='Submit' name='' id='' />
      </form>

      <ul>
        {data.map((heroine) => (
          <li key={heroine.id}>{heroine.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
