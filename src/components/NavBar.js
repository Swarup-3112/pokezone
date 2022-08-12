import React from 'react';
import styled from 'styled-components';

const Nav = styled.div`
    padding: 20px;
    background: #FF4236;
    color: white;
    font-size: 24px;
`

function Navbar() {
    return (
        <Nav>
            Pokemon API
        </Nav>
    );
}

export default Navbar;
