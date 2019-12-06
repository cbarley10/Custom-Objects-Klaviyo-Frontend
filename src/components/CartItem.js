import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

const CartItem = props => {
  const { customObject } = props;
  return (
    <Card
      style={{
        margin: "10px",
        display: "inline-block",
        width: "calc(50% - 20px)"
      }}
      key={customObject.klaviyo_internal_id}
    >
      <Card.Body>
        <Card.Title>{customObject.type}</Card.Title>
        <Card.Text>Date: {customObject.anniversary_date}</Card.Text>
        <Card.Text>
          Klaviyo Internal ID: {customObject.klaviyo_internal_id}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          Klaviyo Created: {customObject.klaviyo_created}
        </ListGroupItem>
        <ListGroupItem>
          Klaviyo Updated: {customObject.klaviyo_updated}
        </ListGroupItem>
        <ListGroupItem>
          Klaviyo Customer ID: {customObject.klaviyo_customer_id}
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href={`/object/edit/${customObject.klaviyo_internal_id}`}>
          <Button variant="warning">Edit</Button>
        </Card.Link>
        <Card.Link href="#">
          <Button variant="danger">Delete</Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
