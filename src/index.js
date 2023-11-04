import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/Store';
import { Provider } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <ToastContainer
    theme="dark"
position="top-right"
autoClose={3000}
closeOnClick
pauseOnHover={false}
/>
    <App />
    </Provider>
    
    </BrowserRouter>
    
  </React.StrictMode>
);


