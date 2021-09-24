import React, { useState } from 'react';
import { ButtonGroup, DropdownToggle, ButtonDropdown, DropdownItem, DropdownMenu } from 'reactstrap';

function Footer(props) {
    const [dropdownOpenA, setOpenA] = useState(false);
    const [dropdownOpenB, setOpenB] = useState(false);
    const [dropdownOpenC, setOpenC] = useState(false);

    const toggleA = () => setOpenA(!dropdownOpenA);
    const toggleB = () => setOpenB(!dropdownOpenB);
    const toggleC = () => setOpenC(!dropdownOpenC);
    return (
        <div>
            <ButtonGroup className="dropDownGroup">
                    <ButtonDropdown isOpen={dropdownOpenA} toggle={toggleA} className="dropDownButton">
                        <DropdownToggle caret className="DropdownMenu">
                        About
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem><a href="http"> Login </a></DropdownItem>
                            <DropdownItem><a href="http"> FAQ </a></DropdownItem>
                            <DropdownItem><a href="http"> Regeln </a></DropdownItem>
                            <DropdownItem><a href="http"> Über uns </a></DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                    <ButtonDropdown isOpen={dropdownOpenB} toggle={toggleB} className="dropDownButton">
                        <DropdownToggle caret className="DropdownMenu">
                        Rechtliche Hinweise
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem><a href="http"> Datenschutz </a></DropdownItem>
                            <DropdownItem><a href="http"> Impressum </a></DropdownItem>
                            <DropdownItem><a href="http"> AGB </a></DropdownItem>
                            <DropdownItem><a href="http"> Home </a></DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                    <ButtonDropdown isOpen={dropdownOpenC} toggle={toggleC} className="dropDownButton">
                        <DropdownToggle caret className="DropdownMenu">
                        Kontakt
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem><a href="http"> E-Mail </a></DropdownItem>
                            <DropdownItem><a href="http"> WhatsApp </a></DropdownItem>
                            <DropdownItem><a href="http"> GitHub </a></DropdownItem>
                            <DropdownItem><a href="http"> LinkedIn </a></DropdownItem>
                            <DropdownItem><a href="http"> Facebook </a></DropdownItem>
                            <DropdownItem><a href="http"> Instagramm </a></DropdownItem>
                            <DropdownItem><a href="http"> Twitter </a></DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
            </ButtonGroup>
        </div>
    )
}

export default Footer
