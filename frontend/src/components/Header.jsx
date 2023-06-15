import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { userLogout, reset } from '../features/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(userLogout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>Auth App</Navbar.Brand>
            </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {user ? (
                <>
                  <NavDropdown title={user.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                        <FaSignInAlt /> Sign In
                    </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                        <Nav.Link>
                        <FaSignOutAlt /> Sign Up
                        </Nav.Link>
                  </LinkContainer>
                </>
              )}
                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;