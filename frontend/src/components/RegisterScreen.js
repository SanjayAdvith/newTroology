import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = ({ history, location }) => {
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState()
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [gender, setGender] = useState('male')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const [qualifications, setQualifications] = useState('')
  const [skills, setSkills] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('india')

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister


  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])


  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== cpassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        register(
          name, email, mobile,
          dob, password, gender, image,
          qualifications, skills,
          address, city, state, country
        ))
    }
  }
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('images', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <Container>
      <h1>Registration</h1>

      <Row className='justify-content-md-center mt-5 frm'>
        <Form onSubmit={submitHandler}>
          <h2> Step {step}</h2>

          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}

          {step === 1 ?
            (
              <>
                <Col md={6} xs={12}>

                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='email'>
                    <Form.Label>Email Id</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='mobile'>
                    <Form.Label>Mobile no.</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter Mobile'
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='dob'>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type='date'
                      placeholder='Choose DOB'
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Confirm Password'
                      value={cpassword}
                      onChange={(e) => setCpassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='radio1'>
                    <Form.Label>Gender</Form.Label>
                    <br />
                    <Form.Check
                      inline
                      type="radio"
                      label="Male"
                      value={gender}
                      checked={gender === 'male'}
                      name="gender"
                      id="radio1"
                      onChange={(e) => setGender('male')}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Female"
                      value={gender}
                      checked={gender === 'female'}
                      name="gender"
                      id="radio1"
                      onChange={(e) => setGender('female')}
                    />
                  </Form.Group>


                  <Form.Group controlId='images'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter image url'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>

                    <Form.File
                      id='images-file'
                      label='Choose File'
                      custom
                      onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                  </Form.Group>


                  <Button
                    type="submit"
                    variant='primary'
                    className='mt-3 mb-2'
                    onClick={() => setStep(2)}
                  >Next Step</Button>

                </Col>
              </>
            )
            :
            (
              <>
                <Col md={6} xs={12}>


                  <Form.Group controlId='qualifiations'>
                    <Form.Label>Qualifications</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Your Qualifications'
                      value={qualifications}
                      onChange={(e) => setQualifications(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='skills'>
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Skillss'
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Address'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter City'
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                      </Form.Group></Col>

                    <Col>

                      <Form.Group controlId='state'>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter State'
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        ></Form.Control>
                      </Form.Group></Col>

                    <Col>

                      <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter Country'
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                      </Form.Group></Col>
                  </Row>

                  <Button
                    type="submit"
                    variant='primary'
                    className='mt-3 mb-2'
                  >Submit</Button>
                </Col>

              </>
            )
          }

        </Form>

        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}

export default RegisterScreen
