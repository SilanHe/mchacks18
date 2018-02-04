import React, { Component } from 'react';
import "./Header.css";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className='footer'>
                <Navbar className='color' color="faded" light expand="md">
                    <NavbarBrand href="/">Sparks Stats</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/micklethepickle">Michel Ma</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/LiTigre/mchacks18">Li Zhang</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/SilanHe">Silan He</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/SilanHe/mchacks18">Project Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Footer;