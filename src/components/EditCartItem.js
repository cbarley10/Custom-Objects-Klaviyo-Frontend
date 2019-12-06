import React, { Component } from "react";
import fetchObject from "../utils/fetchObject";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

class EditCartItem extends Component {
  constructor() {
    super();
    this.state = {
      customObject: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetchObject(id).then(res => {
      this.setState({ customObject: [...res] });
    });
  }

  render() {
    const { customObject } = this.state;
    return (
      <Container className="p-4">
        <Jumbotron>
          {customObject &&
            customObject.map(item => {
              return (
                <Card
                  style={{
                    margin: "10px",
                    display: "inline-block",
                    width: "calc(100% - 20px)"
                  }}
                  key={item.klaviyo_internal_id}
                >
                  <Card.Body>
                    <Card.Title>{item.type}</Card.Title>
                    <Card.Text>Date: {item.anniversary_date}</Card.Text>
                    <Card.Text>{item.klaviyo_internal_id}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Klaviyo Created: {item.klaviyo_created}
                    </ListGroupItem>
                    <ListGroupItem>
                      Klaviyo Updated: {item.klaviyo_updated}
                    </ListGroupItem>
                    <ListGroupItem>
                      Klaviyo Customer ID: {item.klaviyo_customer_id}
                    </ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">
                      <Button variant="primary">Update</Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              );
            })}
        </Jumbotron>
      </Container>
    );
  }
}

export default EditCartItem;
