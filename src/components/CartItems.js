import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import CartItem from "./CartItem";

const CartItems = props => {
  const { customObjects } = props;
  return (
    <Container className="p-4">
      <div className="text-center">
        <Button
          variant="primary"
          size="lg"
          href="/cart/add"
          style={{ marginBottom: "20px" }}
        >
          Create Cart
        </Button>
      </div>
      <Jumbotron>
        <h3 style={{ textAlign: "center" }}>
          Results For Custom Object: "Cart"
        </h3>
        {customObjects &&
          customObjects.map(obj => {
            return <CartItem customObject={obj} key={obj.cart_id}></CartItem>;
          })}
      </Jumbotron>
      <div className="text-center">
        <Button
          variant="primary"
          size="lg"
          href="/cart/add"
          style={{ marginBottom: "20px" }}
        >
          Create Cart
        </Button>
      </div>
    </Container>
  );
};

export default CartItems;
