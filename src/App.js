import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/dashboard/:slug' component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;

const Dashboard = () => {
  return (
    <React.Fragment>
      {
        Object.keys(data).map((name, index) => {
          const datas = data[name];
          return (
            <div key={index}>
              <h1>Welcome {datas.name}</h1>
            </div>
          )
        })
      }
    </React.Fragment>
  )
}

function Home() {

  let { slug } = useParams();
  const datas = data[slug];
  // console.table(datas);

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const hardCodeData = {
      email: 'test@test.com',
      password: 'test123'
    };
    if(
      (email === data.info01.email || email === data.info02.email) 
      && 
      (password === data.info01.password || password === data.info02.password)) {
      const token = Math.floor((Math.random() * 1000) * 900);
      sessionStorage.setItem('auth-token', token);
      Object.keys(data).map(name => {
        const datas = data[name]
        return (
          history.push(`/dashboard/${datas.name}`)
        )
      })
    } else {
      alert('please enter valid email and password');
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <form 
        style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} 
        autoComplete='off' 
        onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input value={email} type='text' onChange={handleEmail}  />
        <input value={password} type='password' onChange={handlePassword} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

const data = {
    "info01": {
      email: "test@test.com",
      password: "1234",
      name: "Mike"
    },
    "info02": {
      email: "test2@test.com",
      password: "12345",
      name: "David"
    }
}