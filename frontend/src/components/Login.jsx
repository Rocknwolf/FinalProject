import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Label, Input, Button} from 'reactstrap';

function Login(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div>
            <Dropdown direction="left" isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                  Login
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                          <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                          <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                          <Label for="examplePassword" className="mr-sm-2">Password</Label>
                          <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
                        </FormGroup>
                          <Button>Submit</Button>
                      </Form>
                  </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default Login
