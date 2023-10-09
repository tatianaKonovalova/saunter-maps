import React, { useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import {FaRoute} from 'react-icons/fa';

import AddRouteModal from "./AddRouteModal";

const Header: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Navbar bg="light" data-bs-theme="light">
        <Container>
            <Navbar.Brand href="/">
              <h1><FaRoute /> Saunter</h1>
            </Navbar.Brand>

            <Button 
              className="primary"
              onClick={() => setModalShow(true)}
              size="lg"
            >
              Add New Route
            </Button>

            <AddRouteModal 
              show={modalShow}
              onHide={() => setModalShow(false)} 
            />
        </Container>
    </Navbar>
  )
}

export default Header;
