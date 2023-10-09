import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaStar, FaAngleRight } from 'react-icons/fa';

interface RouteItemProps {
    title: string,
    shortDescription: string,
    distance: number,
    isFavorite: boolean,
    choseRoute: () => void
}

const RouteItem: React.FC<RouteItemProps> = ({title, shortDescription, distance, isFavorite, choseRoute}) => {
  return (
    <Card className='mt-2' bg='light' onClick={choseRoute}>
      <Card.Body>
        <Row>
            <Col md={8}>
                <Card.Title>
                    {isFavorite && <FaStar />} {title}
                </Card.Title>
                <Card.Text>
                    {shortDescription}
                </Card.Text>
            </Col>
            <Col md={4} className='d-flex justify-content-end align-items-center'>
                <Card.Text as='h4' className='mr-4'>
                    {distance} km
                </Card.Text>
                <FaAngleRight fontSize={'36px'} />
            </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default RouteItem;