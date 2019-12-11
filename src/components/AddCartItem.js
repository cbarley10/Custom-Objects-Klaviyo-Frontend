import React, { Component } from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import PRODUCT_IDS from "../constants/constants";
import createObject from "../utils/createObject";

class AddCartItem extends Component {
  constructor() {
    super();
    this.state = {
      cartExpiration: "2020-03-30",
      cartURL: "https://www.hylete.com/cart",
      cartValue: "0",
      cartCustomer: "",
      productIdsAndQ: [],
      success: false,
      error: false
    };
  }

  componentDidMount() {
    console.log("loaded");
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

  handleSubmit = async () => {
    const {
      productIdsAndQ,
      cartValue,
      cartCustomer,
      cartURL,
      cartExpiration
    } = this.state;

    let newProductIdsAndQ = productIdsAndQ
      .map(item => {
        return `${item.ID}:${item.QTY}`;
      })
      .join();

    const payload = {
      $id: cartCustomer,
      $email: cartCustomer,
      cart_url: cartURL,
      cart_expiration: cartExpiration,
      product_ids_and_quantities: newProductIdsAndQ,
      cart_value: cartValue
    };

    try {
      const response = await createObject(payload);
      if (response.status === 200) {
        this.setState({ success: true });
        setTimeout(() => {
          this.setState({
            success: false,
            cartExpiration: "",
            cartURL: "",
            cartValue: "",
            cartCustomer: "",
            productIdsAndQ: []
          });
        }, 10000);
      }
    } catch (e) {
      console.log(e);
      this.setState({ success: false });
    }
  };

  render() {
    const {
      cartExpiration,
      cartURL,
      cartValue,
      cartCustomer,
      productIdsAndQ,
      success,
      error
    } = this.state;

    let alert;
    if (success) {
      alert = (
        <Alert variant="success">
          Success - cart created!
          <Alert.Link href="/"> View All</Alert.Link>
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
          <h1 style={{ textAlign: "center" }}>Add Cart</h1>
          <Card
            style={{
              margin: "10px",
              display: "inline-block",
              width: "calc(100% - 20px)",
              verticalAlign: "top"
            }}
          >
            <Card.Body>
              <Card.Title>
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
              <InputGroup size="md" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Cart URL:
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="cartURL"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={cartURL}
                  type="text"
                  name="cartURL"
                  onChange={this.onChange}
                />
              </InputGroup>
              <InputGroup size="md" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Customer:
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="cartCustomer"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={cartCustomer}
                  type="text"
                  name="cartCustomer"
                  onChange={this.onChange}
                />
              </InputGroup>
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
            <ListGroupItem>
              <Card.Link href={"#"}>
                <Button variant="primary" onClick={this.handleSubmit}>
                  Create
                </Button>
              </Card.Link>
            </ListGroupItem>
          </Card>
        </Jumbotron>
      </Container>
    );
  }
}

export default AddCartItem;
