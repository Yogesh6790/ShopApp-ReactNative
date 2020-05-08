import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import productsReducer from './store/reducer/products';
import ProductsNavigator from './navigators/products';
import { composeWithDevTools} from 'redux-devtools-extension'
import cartsReducer from './store/reducer/carts';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer
})

const store = createStore(rootReducer);

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
