import React, { useState, useContext } from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { globalContext } from '../App.js';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const context = useContext(globalContext);

    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <div>
            <Nav tabs>
                <NavItem className="navigation">
                    <NavLink to="/" tag={ Link } className="navFont">Main</NavLink>
                </NavItem>
                
                {
                    !context.isLogin ? (
                        <NavItem>
                            <NavLink to="/register" tag={ Link } className="navFont">Registrieren</NavLink>
                        </NavItem>
                    ): null
                }
                <NavItem>
                    <NavLink to="/chat" tag={ Link } className="navFont">Chat</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/forum" tag={ Link } className="navFont">Forum / Tauschbörse</NavLink>
                </NavItem>

                <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
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
                </Dropdown>
            </Nav>
        </div>
    )
}

export default Navbar
