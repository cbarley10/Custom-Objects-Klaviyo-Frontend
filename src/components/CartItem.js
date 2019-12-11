import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import deleteObject from "../utils/deleteObject";
import Modal from "react-bootstrap/Modal";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

const CartItem = props => {
  const { customObject } = props;
  const [lgShow, setLgShow] = React.useState(false);

  const handleDelete = id => {
    deleteObject(id).then(res => res);
  };

  return (
    <Card
      style={{
        margin: "10px",
        display: "inline-block",
        width: "calc(50% - 20px)",
        verticalAlign: "top"
      }}
      key={customObject.cart_id}
    >
      <Card.Body>
        <Card.Title>
          Cart ID: {customObject.cart_id}{" "}
          <span style={{ display: "inline-block", float: "right" }}>
            Value: ${customObject.cart_value}
          </span>
        </Card.Title>
        <Card.Text>Cart Expiration: {customObject.cart_expiration}</Card.Text>
        <Card.Text>
          Cart URL: <a href={customObject.cart_url}>Cart</a>
        </Card.Text>
        <Card.Text>Customer: {customObject["$email"]}</Card.Text>
        <hr />
        <h5>Cart Info</h5>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {customObject.product_ids_and_quantities.map((item, index) => {
              const id = item.split(":")[0];
              const quantity = item.split(":")[1];
              return (
                <tr key={index}>
                  <td>{id}</td>
                  <td>{quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <h5>Klaviyo Props</h5>
        </ListGroupItem>
        <ListGroupItem>
          Klaviyo Created: {customObject.klaviyo_created}
        </ListGroupItem>
        <ListGroupItem>
          Klaviyo Internal ID: {customObject.klaviyo_internal_id}
        </ListGroupItem>
        <ListGroupItem>
          Klaviyo Updated: {customObject.klaviyo_updated}
        </ListGroupItem>
        <ListGroupItem>
          Klaviyo Customer ID: {customObject.klaviyo_customer_id}
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href={`/cart/edit/${customObject.cart_id}`}>
          <Button variant="warning">Edit</Button>
        </Card.Link>
        <Button
          variant="danger"
          style={{ marginLeft: "10px" }}
          onClick={() => setLgShow(true)}
        >
          Delete
        </Button>
      </Card.Body>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Are you sure you want to delete item with cart ID{" "}
            <span style={{ fontWeight: "bold" }}>{customObject.cart_id}</span>?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Value: ${customObject.cart_value}</div>
          <div>Cart Expiration: ${customObject.cart_expiration}</div>
          <div>
            Cart URL: <a href={customObject.cart_url}>Cart</a>
          </div>
          <div>Customer: {customObject["$email"]}</div>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {customObject.product_ids_and_quantities.map((item, index) => {
                const id = item.split(":")[0];
                const quantity = item.split(":")[1];
                return (
                  <tr key={index}>
                    <td>{id}</td>
                    <td>{quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Card.Link href="/">
            <Button
              variant="success"
              onClick={() => handleDelete(customObject.cart_id)}
            >
              Yes
            </Button>
          </Card.Link>
          <Button variant="danger" onClick={() => setLgShow(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </Card>
  );
};

export default CartItem;
