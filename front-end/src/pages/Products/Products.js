import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledPage, StyledProducts, StyledButton, StyledText } from './styles';
import ProductCard from './ProductCard/ProductCard';
import { api } from '../../service/api';
import Header from '../../components/Header/Header';
// import { cartTotal } from '../../helpers/saveCartLocalStorage';
import { useAppSelector } from '../../store';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalPrice = useAppSelector((state) => state.ProductCartTotal.product_cart_total);

  const goTo = useNavigate();
  const productsApi = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productsApi();
    setLoading(false);
  }, []);

  if (loading) return <div>Loading Page...</div>;

  return (
    <>
      <Header />
      <StyledPage>
        <StyledProducts>
          {
            products.slice(0, Number('11')).map((product) => (
              <ProductCard key={ product.id } product={ product } />
            ))
          }
        </StyledProducts>
        <StyledButton
          type="button"
          onClick={ () => goTo('/customer/checkout') }
          data-testid="customer_products__button-cart"
          disabled={ totalPrice === 0 }
        >
          <StyledText
            data-testid="customer_products__checkout-bottom-value"
          >
            {totalPrice ? totalPrice.toFixed(2).replace('.', ',') : ' 0,00'}
          </StyledText>
        </StyledButton>
      </StyledPage>
    </>
  );
};

export default Products;
