import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const EditScreen = ({ match, history }) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState()
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const [qualifications, setQualifications] = useState('')
    const [skills, setSkills] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('india')


    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/user/list')
        }
        else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setMobile(user.mobile)
                setDob(user.dob)
                setGender(user.gender)
                setImage(user.image)
                setQualifications(user.qualifications)
                setSkills(user.skills)
                setAddress(user.address)
                setCity(user.city)
                setState(user.state)
                setCountry(user.country)
            }
        }
    }, [dispatch, history, successUpdate, user, userId])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            mobile,
            dob,
            gender,
            image,
            qualifications,
            skills,
            address,
            city,
            state,
            country
        }))

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
        <>

            <Link to='/user/list' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <h1>Update Details</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                <Row className='justify-content-md-center mt-5 frm'>
                    <Form onSubmit={submitHandler}>



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



                            </Col>
                            <hr />
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
                                >Update</Button>
                            </Col>

                        </>

                    </Form>

                </Row>
            </Container>
        </>
    )
}

export default EditScreen
