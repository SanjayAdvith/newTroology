import React, { useState, useEffect } from 'react'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        } else {
            history.push('/login')
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, pwd))
    }

    return (
        <Container>
            <Row>
                <Col md={6} xs={12}>
                    <h1>LoginScreen</h1>

                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Password'
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant='primary'>Login</Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            New Customer?{' '}
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                Register
                            </Link>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    )
}

export default LoginScreen
