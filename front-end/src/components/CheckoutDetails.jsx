import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createSaleProductRequest from '../utils/createSaleProductRequest';
import createSaleRequest from '../utils/createSaleRequest';
import getTotalPrice from '../utils/getTotalPrice';
import InputWithLabel from './InputWithLabel';

function CheckoutDetails() {
  const navigateTo = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(null);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const getSellers = async () => {
      const response = await fetch('http://localhost:3001/users/sellers');
      const data = await response.json();
      setSellers(data);
      setSellerId(data[0].id);
    };
    getSellers();

    return () => {
      setSellers([]);
      setSellerId(null);
    };
  }, []);

  const createSale = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const totalPrice = getTotalPrice();

    const body = await createSaleRequest({
      userData, totalPrice, address, number, sellerId,
    });
    if (body.error) {
      setErrorMessage(true);
    } else {
      await createSaleProductRequest(body.id);
      navigateTo(`/customer/orders/${body.id}`);
    }
  };

  return (
    <div>
      <h1>Detalhes e Endereço para a Entrega</h1>
      <div>
        <label htmlFor="sellers">
          Pessoa Vendedora Responsável
          <select
            id="sellers"
            data-testid="customer_checkout__select-seller"
            onChange={ (e) => setSellerId(e.target.value) }
          >
            {sellers.map((seller) => (
              <option
                key={ seller.id }
                value={ seller.id }
              >
                {seller.name}
              </option>
            ))}
          </select>
        </label>

        <InputWithLabel
          labelText="Endereço"
          type="text"
          testId="customer_checkout__input-address"
          onChange={ setAddress }
        />

        <InputWithLabel
          labelText="Número"
          type="number"
          testId="customer_checkout__input-address-number"
          onChange={ setNumber }
        />

        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ createSale }
        >
          Finalizar Pedido
        </button>
        {errorMessage && (
          <div data-testid="customer_checkout__error-message">
            <p>Dados inválidos.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutDetails;