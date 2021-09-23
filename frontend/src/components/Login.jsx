import React, {useState} from 'react';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import fetchCors from '../lib/fetchCors';

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

      const handleSubmit = async (e) => {
          e.preventDefault();
          const response = await fetchCors( "/api/auth", "POST", 
              JSON.stringify({
                  username: username,
                  password: password,
              })   
          )    
          console.log(response);       
     }

    return (
          <div className="loginbox">
              <Form inline action="" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="Username" hidden>Username</Label>
                  <Input type="text" name="Username" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                  <Label for="password" hidden>Password</Label>
                  <Input type="password" name="Password" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </FormGroup>
                <Button className="button" type="submit" >Login</Button>
              </Form>
          </div>
    )
}

export default Login
