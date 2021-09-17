import React/*, { useState }*/ from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

function Navbar() {
    // const [dropdownOpen, setDropdownOpen] = useState(false);

    // const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <div>
            <Nav tabs>
                <NavItem className="navigation">
                    <NavLink href="/" active>Main</NavLink>
                </NavItem>
                
                <NavItem>
                    <NavLink href="/register">Registrieren</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/chat">Chat</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/forum">Forum / Tauschbörse</NavLink>
                </NavItem>

                {/* <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle nav caret>
                        Dropdown
                    </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
                </Dropdown> */}
            </Nav>
        </div>
    )
}

export default Navbar
