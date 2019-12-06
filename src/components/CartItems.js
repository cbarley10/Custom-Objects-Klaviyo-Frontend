import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import CartItem from "./CartItem";

const CartItems = props => {
  const { customObjects } = props;
  return (
    <Container className="p-4">
      <Jumbotron>
        <h3 style={{ textAlign: "center" }}>
          Custom Objects For Object: "Reminder Occasion"
        </h3>
        {customObjects &&
          customObjects.map(obj => {
            return (
              <CartItem
                customObject={obj}
                key={obj.klaviyo_internal_id}
              ></CartItem>
            );
          })}
      </Jumbotron>
    </Container>
  );
};

export default CartItems;
