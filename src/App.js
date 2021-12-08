
import './App.css';

import Layout from './components/Layout';
import CustomerPage from './components/Pages/customerPage/CustomerPage';
import CleanerPage from './components/Pages/cleanerPage/CleanerPage';
import AdminPage from './components/Pages/adminPage/AdminPage'

function App() {
  return (
   <Layout>
    <CustomerPage/>

   </Layout>
  );
}

export default App;
