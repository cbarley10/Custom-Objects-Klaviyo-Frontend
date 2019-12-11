import React from "react";

const CartInfoTable = props => {
  const { productIdsAndQ } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {productIdsAndQ.map((item, index) => {
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
  );
};

export default CartInfoTable;
