import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { userLogin, reset } from "../features/auth/authSlice.js";
import { toast } from 'react-toastify'
import Loader from "../components/Loader.jsx";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
            navigate('/login')
        }
        if(isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isSuccess, isError, message, navigate, dispatch])

    const submitHandler = async (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        dispatch(userLogin(user))
    }

    if(isLoading) {
        return <Loader />
    }
    
  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email" placeholder="Enter email" value={email}
                    onChange={ (e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
                Sign In
            </Button>   
        </Form>

        <Row className="py-3">
            <Col>
                New Customer? <Link to='/register'>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen