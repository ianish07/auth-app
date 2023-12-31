import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { userRegister, reset } from "../features/auth/authSlice.js";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading } = useSelector(
        (state) => state.auth)
    
        useEffect(() => {
            if(user) {
                navigate('/')
            }

        }, [user, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        
        if(password !== confirmPassword) {
            toast.error('Passwords do not match')
        }
        
        const user = {
            name,
            email,
            password,
        }
        
        dispatch(userRegister(user))
    }
    
    if(isLoading) {
        return <Loader />
    }

    return (
        <FormContainer>
          <h1>Register</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group className='my-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Button type='submit' variant='primary' className='mt-3'>
              Register
            </Button>
    
          </Form>
    
          <Row className='py-3'>
            <Col>
              Already have an account? <Link to='/login'>Login</Link>
            </Col>
          </Row>
        </FormContainer>
      );
}

export default RegisterScreen