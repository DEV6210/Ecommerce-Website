/* eslint-disable react/jsx-pascal-case */
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import About from './components/About'
import Catagories from './components/Catagories'
import Cart from './components/Cart'
import Account from './components/Account'
import Login from './components/Login';
import Signup from './components/Signup';
import SuccessfullyCreateAccount from './components/SuccessfullyCreateAccount';
import Admin_panel from './admin/Admin_panel';
import Dashboard from './Login_success/login_product/Dashboard';
import Wishlist from './Login_success/login_components/Wishlist';
import MyAccount from './Login_success/login_components/My_acount';
import Item_Catagory from './Login_success/login_components/Item_Catagory';
import Customer_Support from './Login_success/login_components/Customer_Support';
import ViewProduct from './Login_success/login_product/ViewProduct';
import Admin_login from './admin/Admin_Login';
import WrongParams from './components/WrongParams';
import BuyProduct from './Login_success/login_product/BuyProduct';
import OrderSuccess from './Login_success/login_product/OrderSuccess';
import OnlinePaymentCancel from './Login_success/login_product/OnlinePaymentCancel';
import OrderHostiry from './Login_success/login_components/OrdersHistory';
import ViewProductCatagoryWise from './Login_success/login_product/ViewProduct_CatagoryWise';
import ViewProductBeforeLogin from './components/Product/ViewProduct_beforelogin';
import CatagoryBeforelogin from './components/Product/CatagoryBeforelogin';
import UpdateDelete from './admin/EditUpdate';
import { Events } from './admin/components/Events';
import OrderReceived from './admin/components/OrderReceived';
import { RegisterUser } from './admin/components/RegisterUser';
import Notification from './admin/components/Notification';
import UserSupport from './admin/components/UserSupport';
import Feedback from './admin/components/Feedback';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>

          {/* Before Login  */}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/catagories' element={<Catagories />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/account' element={<Account />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/SuccessfullyCreatedAccount' element={<SuccessfullyCreateAccount />} />

          <Route path='/viewproduct/:id' element={<ViewProductBeforeLogin />} />
          <Route path='/viewcatagory/:catagory' element={<CatagoryBeforelogin />} />

          {/* WrongParams */}
          <Route path='/wrongparams/:id' element={<WrongParams />} />         

          {/* Admin Pannel */}
          <Route path='/adminlogin/' element={<Admin_login/>}/>
          <Route path='/adminpanel/:id' element={<Admin_panel/>}/>
          <Route path='/updateproduct/:id' element={<UpdateDelete/>}/>
          <Route path='/events/:id' element={<Events/>}/>
          <Route path='/received_order/:id' element={<OrderReceived/>}/>
          <Route path='/register_user/:id' element={<RegisterUser/>}/>
          <Route path='/notifications/:id' element={<Notification/>}/>
          <Route path='/usersupport/:id' element={<UserSupport/>}/>
          <Route path='/feedback/:id' element={<Feedback/>}/>
          



         
     




          {/* After Login  */}
          <Route path='/dashboard/:uid' element={<Dashboard/>}/>
          <Route path='/customersupport/:uid' element={<Customer_Support/>}/>
          <Route path='/itemcatagory/:uid' element={<Item_Catagory/>}/>
          <Route path='/wishlist/:uid' element={<Wishlist/>}/>
          <Route path='/myaccount/:uid' element={<MyAccount/>}/>
          <Route path='/orderhistory/:uid' element={<OrderHostiry/>}/>


          {/* display singleproduct */}
          <Route path='/viewproduct/:id/:uid' element={<ViewProduct/>}/>
          <Route path='/viewcatagory/:uid/:catagory' element={<ViewProductCatagoryWise/>}/>
          <Route path='/buyproduct/:id/:uid' element={<BuyProduct/>}/>
          
          <Route path='/ordercancel/:id/:uid' element={<OnlinePaymentCancel/>}/>
          <Route path='/ordersuccess/:id/:uid' element={<OrderSuccess/>}/>






          {/* if page not found  */}
          <Route path='*' element={<ErrorPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
