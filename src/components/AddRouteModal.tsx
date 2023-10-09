import React, { FormEvent, useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaCheck, FaMap } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Map from './Map';

import { RouteMarkerType } from '../types';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { createRoute } from '../slices/routesSlice';

interface ModalProps {
    show: boolean,
    onHide: () => void,
}

const AddRouteModal: React.FC<ModalProps> = ({ show, onHide }) => {
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');

    const [markers, setMarkers] = useState<RouteMarkerType[]>([]);
    const [distance, setDistance] = useState(0);

    const [validated, setValidated] = useState(false);

    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.routes.error);

    const handleSetMarker = (e: google.maps.MapMouseEvent) => {
        const { lat, lng } = e.latLng;
        setMarkers([...markers, { lat: lat(), lng: lng() }]);
    }

    const handleAddNewRoute = (e: FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        if (markers.length < 1) {
            toast.error('Please add two or more waypoints.')
        } 
        if (form.checkValidity() && markers.length > 1) {
            e.preventDefault();
            dispatch(createRoute({ title, shortDescription, fullDescription, markers, distance, isFavorite: false }))
            resetModal();
        } else {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
    }

    const onModalClose = () => {
        resetModal();
    }

    const resetModal = () => {
        setTitle('');
        setShortDescription('');
        setFullDescription('');
        setDistance(0);
        setMarkers([]);
        setValidated(true);
        onHide();
    }

    useEffect(() => {
        toast.error(error);
    }, [error])

    return (
        <Modal
            show={show}
            onHide={onModalClose}
            size="xl"
            centered
            backdrop='static'
            style={{overflow: 'auto'}}
          >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add New Route
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={5} sm={12}>
                        <Form noValidate validated={validated} onSubmit={handleAddNewRoute}>
                            <Form.Group className='my-3'>
                                <Form.Label>Route title</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter route title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    This field is required.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='my-3'>
                                <Form.Label>Short description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter short description'
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    as='textarea'
                                    required
                                    maxLength={160}
                                    rows={4}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    This field is required.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='my-3'>
                                <Form.Label>Full description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter full description'
                                    value={fullDescription}
                                    onChange={(e) => setFullDescription(e.target.value)}
                                    as='textarea'
                                    rows={5}
                                ></Form.Control>
                            </Form.Group>

                            <div className='d-block d-md-none' style={{height: '400px'}}>
                                <Map
                                    markers={markers}
                                    handleSetMarker={handleSetMarker}
                                    setDistance={setDistance}
                                />
                            </div>

                            <div className='d-flex flex-column align-items-center mt-2'>
                                <p className='h4'><FaMap /> Length: {distance} km</p>
                                <Button type='submit' className='mt-5' size='lg'>
                                    <FaCheck /> Add new path
                                </Button>
                            </div>
                        </Form>
                        
                    </Col>
                    <Col md={7}>
                        <Map 
                            markers={markers}
                            handleSetMarker={handleSetMarker}
                            setDistance={setDistance}
                        />
                    </Col>
                </Row>
            </Modal.Body>
          </Modal>
        );
}

export default AddRouteModal