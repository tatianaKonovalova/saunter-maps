import React, { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';

import { deleteRoute, getRoutes, toggleIsFavorite } from '../slices/routesSlice';

import RouteItem from './RouteItem';
import RouteDetails from './RouteDetails';

import { RouteInfoType } from '../types';
import { FaSearch } from 'react-icons/fa';

const HomePage: React.FC = () => {
    const [showRoute, setShowRoute] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState<RouteInfoType | null>(null);
    const [search, setSearch] = useState('');

    const routes = useAppSelector(( state ) => state.routes.routes);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRoutes());
    }, [dispatch]);

    const showRouteDetails = (pathId: string) => {
        setSelectedRoute(routes.filter(route => route.id === pathId)[0]);
        setShowRoute(true);
    }

    const searchRoutes = routes.filter(({ title, shortDescription }) =>
        title.toLowerCase().includes(search.toLowerCase()) ||
        shortDescription?.toLowerCase().includes(search.toLowerCase()),
    );

    const handleDeleteRoute = (id: string) => {
        dispatch(deleteRoute(id));
        setShowRoute(false);
        setSelectedRoute(null);
    }

    const handleToggleIsFavorite = (id: string) => {
        dispatch(toggleIsFavorite(id));
    }

  return (
    <Container className='mt-4'>
        <Row>
            <Col md={6} style={{cursor: 'pointer'}}>
                <InputGroup>     
                    <Form.Control
                        value={search}
                        //@ts-ignore
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search...'
                    />
                    <InputGroup.Text>
                        <FaSearch />
                    </InputGroup.Text>
                </InputGroup>
                {searchRoutes && 
                    searchRoutes.map((route) => (
                        <RouteItem 
                            key={route.id}
                            title={route.title}
                            shortDescription={route.shortDescription}
                            distance={route.distance}
                            isFavorite={route.isFavorite}
                            choseRoute={ () => showRouteDetails(route.id)}
                        />
                    ))}
            </Col>
            <Col md={6}>
                {showRoute && 
                    <RouteDetails 
                        id={selectedRoute.id}
                        title={selectedRoute.title}
                        fullDescription={selectedRoute.fullDescription}
                        distance={selectedRoute.distance}
                        markers={selectedRoute.markers}
                        deleteRoute={() => handleDeleteRoute(selectedRoute.id)}
                        toggleIsFavorite={() => handleToggleIsFavorite(selectedRoute.id)}
                    /> }
            </Col>
        </Row>
    </Container>
  )
}

export default HomePage;