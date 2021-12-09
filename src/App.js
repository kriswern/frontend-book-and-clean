
import './App.css';

import Layout from './components/Layout';

import CustomerPage from './components/Pages/customerPage/CustomerPage'
import CleanerPage from './components/Pages/cleanerPage/CleanerPage';
import Login from './components/login/Login';
import { useEffect, useState } from 'react/cjs/react.development';
import AdminPage from './components/Pages/adminPage/AdminPage';
import HandlePages from './components/HandlePages';

// should proberly be activeuser


export default function App() {
 
  return (
   <Layout>
     <HandlePages/>    

   </Layout>
  );
}


