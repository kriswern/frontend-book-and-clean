
import './App.css';

import Layout from './components/Layout';
import CustomerPage from './components/Pages/customerPage/CustomerPage';
import CleanerPage from './components/Pages/cleanerPage/CleanerPage';
import AdminPage from './components/Pages/adminPage/AdminPage'
import RegisterForm from './components/register/RegisterForm'

function App() {
  return (
   <Layout>
    <AdminPage/>
    <RegisterForm/>

   </Layout>
  );
}

export default App;
