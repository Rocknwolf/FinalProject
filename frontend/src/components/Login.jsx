import React from 'react';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';

function Login(props) {

    return (
        <div>
          <div className="loginbox">
              <Form inline>
                <FormGroup>
                  <Label for="exampleEmail" hidden>Username</Label>
                  <Input type="text" name="email" id="exampleEmail" placeholder="Username" required/>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword" hidden>Password</Label>
                  <Input type="password" name="password" id="examplePassword" placeholder="Password" required/>
                </FormGroup>
                <Button className="button" >Login</Button>
              </Form>
            </div>
        </div>
    )
}

export default Login
