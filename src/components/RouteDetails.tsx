import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

import { useAppSelector } from '../hooks/useRedux';
import { RouteMarkerType } from '../types';

import Map from './Map';

interface RouteDetailsProp {
    id: string,
    title: string, 
    distance: number, 
    fullDescription: string,
    markers: RouteMarkerType[],
    deleteRoute: () => void,
    toggleIsFavorite: () => void,
    
}

const RouteDetails: React.FC<RouteDetailsProp> = ({ id, title, distance, fullDescription, markers, deleteRoute, toggleIsFavorite }) => {

    const route = useAppSelector((state) => state.routes.routes.filter(route => route.id === id)[0]);

    return (
        <>
            <Card bg='light'>
                <Card.Body>
                    <Card.Title className='d-flex justify-content-between'>
                        <p>{title}</p>
                        <h4>{distance} km</h4>
                    </Card.Title>
                    <Card.Text>
                        {fullDescription}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card bg='light' className='mt-2' style={{height: '400px'}}>
                <Card.Body>
                    <Map markers={markers} />
                </Card.Body>
            </Card> 
            <Card bg='light' className='mt-2'>
                <Card.Body className='d-flex justify-content-between'>
                    <Button variant="outline-primary" size="lg" onClick={toggleIsFavorite}>
                        { route.isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
                    </Button>
                    <Button variant="outline-danger" size="lg" onClick={deleteRoute}>
                        Delete <FaTrash />
                    </Button>
                </Card.Body>
            </Card>
        </>
  )
}

export default RouteDetails;