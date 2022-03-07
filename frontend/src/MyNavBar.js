import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {Component} from "react";

class MyNavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {isOpen: false}
        this.toggle = this.toggle.bind(this);

    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        // return <Navbar color={"dark"} dark expand={"md"}>
        //     <NavbarBrand tag={Link} to={"/"}>Home</NavbarBrand>
        // </Navbar>;

        return (
            <Navbar bg="light" expand="lg" sticky="top">
                {/*<Container>*/}
                    <Navbar.Brand href="#home">ONI-lab</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                {/*</Container>*/}
            </Navbar>
        );
    }
}

export default MyNavBar;