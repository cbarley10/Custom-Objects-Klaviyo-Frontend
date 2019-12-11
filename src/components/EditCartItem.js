import React, { Component } from "react";
import fetchObject from "../utils/fetchObject";
import updateObject from "../utils/updateObject";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PRODUCT_IDS from "../constants/constants";

class EditCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customObject: {},
      productIdsAndQ: [],
      cartValue: "",
      cartExpiration: "",
      success: false,
      error: false,
      profileLink: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetchObject(id).then(res => {
      const {
        product_ids_and_quantities,
        cart_value,
        cart_expiration,
        klaviyo_customer_id,
        $email
      } = res;
      const newItems = product_ids_and_quantities.map((item, index) => {
        var split = item.split(":");
        return {
          ID: split[0],
          QTY: split[1]
        };
      });

      const strippedEmail = $email.replace(/[^\w\s!?]/g, "");

      this.setState({
        customObject: { ...res },
        cartValue: cart_value,
        cartExpiration: cart_expiration,
        productIdsAndQ: [...newItems],
        profileLink: `https://www.klaviyo.com/profile/${klaviyo_customer_id}/${strippedEmail}`
      });
    });
  }

  onChange = e => {
    let new_productIds_and_Q = [...this.state.productIdsAndQ];
    if (e.target.name === "productIdsAndQ") {
      let id = e.target.attributes["data-index"].value;
      let id_or_quantity = e.target.attributes["data-name"].value;
      new_productIds_and_Q[id][id_or_quantity] = e.target.value;
      this.setState({ [e.target.name]: new_productIds_and_Q });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleRowManipulation = (action, e) => {
    const { productIdsAndQ } = this.state;
    let new_productIds_and_Q = [...productIdsAndQ];
    if (action === "add") {
      const rowsToAdd = {
        ID: "",
        QTY: ""
      };
      let additionalRows = new_productIds_and_Q.concat(rowsToAdd);
      this.setState({ productIdsAndQ: additionalRows });
    } else {
      let id = e.target.attributes["data-index"].value;
      new_productIds_and_Q.splice(id, 1);
      this.setState({ productIdsAndQ: new_productIds_and_Q });
    }
  };

  handleOptionSelect = e => {
    const { productIdsAndQ } = this.state;
    let new_productIds_and_Q = [...productIdsAndQ];
    let id = e.target.attributes["data-index"].value;
    let id_or_quantity = e.target.attributes["data-name"].value;
    new_productIds_and_Q[id][id_or_quantity] = e.target.attributes.value.value;
    this.setState({ [e.target.name]: new_productIds_and_Q });
  };

  onClick = async () => {
    const { id } = this.props.match.params;
    const { cartValue, cartExpiration, productIdsAndQ } = this.state;

    let newProductIdsAndQ = productIdsAndQ
      .map(item => {
        return `${item.ID}:${item.QTY}`;
      })
      .join();

    const payload = {
      update_fields: {
        cart_value: cartValue,
        cart_expiration: cartExpiration,
        product_ids_and_quantities: newProductIdsAndQ
      }
    };

    const response = await updateObject(id, payload).then(res => {
      return res;
    });

    if (response.status === 200) {
      this.setState({
        success: true
      });
      setTimeout(() => {
        this.setState({
          success: false
        });
      }, 10000);
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    const {
      customObject,
      productIdsAndQ,
      cartValue,
      cartExpiration,
      success,
      error,
      profileLink
    } = this.state;

    var alert;

    if (success) {
      alert = (
        <Alert variant="success">
          Success! Cart with ID {customObject.cart_id} updated! Link here:{" "}
          <Alert.Link href={profileLink} target="_blank">
            here
          </Alert.Link>
        </Alert>
      );
    } else if (error) {
      alert = <Alert variant="danger">{error}</Alert>;
    } else {
      alert = "";
    }

    return (
      <Container className="p-4">
        <div>{alert}</div>
        <Jumbotron>
          <h1 style={{ textAlign: "center" }}>Edit Cart</h1>
          <Card>
            <Card.Body>
              <Card.Title>
                Cart ID: {customObject.cart_id}{" "}
                <span style={{ display: "inline-block", float: "right" }}>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        Value $
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Value"
                      aria-describedby="inputGroup-sizing-sm"
                      defaultValue={cartValue}
                      type="number"
                      name="cartValue"
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </span>
              </Card.Title>
              <InputGroup size="md" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Cart Expiration:
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="cartExpiration"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={cartExpiration}
                  type="text"
                  name="cartExpiration"
                  onChange={this.onChange}
                />
              </InputGroup>
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
                  {productIdsAndQ &&
                    productIdsAndQ.map((item, index) => {
                      let myIndex = index;
                      return (
                        <tr key={index}>
                          <td className="id">
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                {item.ID}
                              </Dropdown.Toggle>
                              <Dropdown.Menu
                                onClick={this.handleOptionSelect}
                                key={index}
                              >
                                {PRODUCT_IDS &&
                                  PRODUCT_IDS.map((option, index) => {
                                    return (
                                      <Dropdown.Item
                                        data-name="ID"
                                        data-index={myIndex}
                                        aria-label="ID"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={option}
                                        name="productIdsAndQ"
                                        onChange={this.onChange}
                                        key={index}
                                      >
                                        {option}
                                      </Dropdown.Item>
                                    );
                                  })}
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td className="qty">
                            <InputGroup size="sm" className="mb-3">
                              <FormControl
                                data-name="QTY"
                                data-index={index}
                                aria-label="Quantity"
                                aria-describedby="inputGroup-sizing-sm"
                                defaultValue={item.QTY}
                                type="number"
                                name="productIdsAndQ"
                                onChange={this.onChange}
                              />
                              <Button
                                variant="danger"
                                data-index={index}
                                onClick={e =>
                                  this.handleRowManipulation("delete", e)
                                }
                              >
                                X
                              </Button>
                            </InputGroup>
                          </td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td></td>
                    <td>
                      <Button
                        variant="primary"
                        className="pull-right"
                        onClick={e => this.handleRowManipulation("add", e)}
                      >
                        Add Row
                      </Button>
                    </td>
                  </tr>
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
            <ListGroupItem>
              <Card.Link href={"/cart/edit/" + customObject.cart_id + "#"}>
                <Button variant="primary" onClick={this.onClick}>
                  Update
                </Button>
              </Card.Link>
            </ListGroupItem>
          </Card>
        </Jumbotron>
      </Container>
    );
  }
}

export default EditCartItem;
