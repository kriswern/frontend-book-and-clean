
import './App.css';
import NewBooking from './components/booking/NewBooking';
import Layout from './components/Layout';
import Bookings from './components/booking/Bookings';

function App() {
  return (
   <Layout>

     <NewBooking/>
     <Bookings/>
     
   </Layout>
  );
}

export default App;
