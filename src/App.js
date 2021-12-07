
import './App.css';
import NewBooking from './components/booking/NewBooking';
import Layout from './components/Layout';
import Bookings from './components/booking/Bookings';
import Login from './components/login/Login'

function App() {
  return (
   <Layout>

<Login></Login>
     <NewBooking/>
     <Bookings/>
     
   </Layout>
  );
}

export default App;
