import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import productsReducer from './store/reducer/products';
import ProductsNavigator from './navigators/products';
//import { composeWithDevTools} from 'redux-devtools-extension'
import cartsReducer from './store/reducer/carts';
import ordersReducer from './store/reducer/orders';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  orders: ordersReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <ProductsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
