import { useState, useEffect } from 'react';
import { userUpdate } from "../features/auth/authSlice.js";
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
//import Loader from '../components/Loader';

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
  
    const { user, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
      setName(user.name);
      setEmail(user.email);  
    }, [user.email, user.name]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
        toast.error("Password mismatch");
        } else {
          const userData = {
            _id: user._id,
            name,
            email,
            password,
            }
            dispatch(userUpdate(userData));
            toast.success('Profile updated successfully')
        }
    }
    
    if (isLoading) {
        return <h2>Loading...</h2>
    }
    

    return (
        <FormContainer>
          <h1>Update Profile</h1>
    
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
              Update
            </Button>
    
          </Form>
        </FormContainer>
      );
}

export default ProfileScreen