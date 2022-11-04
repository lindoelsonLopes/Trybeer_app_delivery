import React from 'react';
import CheckoutDetails from '../../components/CheckoutDetails';
import NavBar from '../../components/NavBar';
import TableProducts from '../../components/TableProducts';

function Checkout() {
  return (
    <main>
      <NavBar />
      <h1>Finalizar Pedido</h1>
      <TableProducts />
      <CheckoutDetails />
    </main>
  );
}

export default Checkout;
