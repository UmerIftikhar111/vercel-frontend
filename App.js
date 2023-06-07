
import Navbar from './Components/Navbar'
import LostFoundComponent  from './Screens/LostFound'
import RoomCleaning from './Screens/RoomCleaning'
import RoomInspection from './Screens/RoomInspection'
import InventoryDashboard from './Screens/InventoryDashboard'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import RoomList from './Components/Room/RoomList';
import UpdateRoomPage from './Components/Room/UpdateRoomPage';
import { HotelNRoomProvider } from './Components/Room/HotelNRoomProvider';
import { BookingCalendar } from './Components/Room/BookingCalendar'
import { ReservationForm } from './Components/Room/ReserveRoom';
import { AddRoomForm } from './Components/Room/AddRoom';
import { AddHotelForm } from './Components/Hotel/AddHotel';
import { AvailableRooms } from './Components/Hotel/TodayAvailableRooms';
// import {Navbar} from './components/Navbar'
import { useEffect, useState } from 'react';



function App() {

  const token = localStorage.getItem('token');
  const[isValid,setIsvalid] = useState( false)
  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        try {
          const response = await fetch('https://vercel-backend-gilt.vercel.app/verifytoken', {
            headers: {
              token: token
            }
          });
          
          if (response.ok) {
            setIsvalid(true)
          }
          else  {
            setIsvalid(false)
          }
        } catch (error) {
          setIsvalid(false)
        }
      } else {
        setIsvalid(false)
      }
    };
    console.log("response= "+isValid)
    
    checkTokenValidity();
  }, []);

  return (
    <>
    
    <BrowserRouter>
    {isValid && <Navbar isValid={isValid}/>}
     <Routes>
    
      <Route path="/Room-Cleaning" element={<RoomCleaning/>}/>
      <Route path="/Room-Inspection" element={<RoomInspection/>}/>
      <Route path="/Inventory" element={<InventoryDashboard/>}/>
      <Route path="/Lost&Found" element={<LostFoundComponent/>}/>
      {isValid && <Route exact path="/hotel/add" element={<AddHotelForm />} />}
        {isValid && <Route exact path="/hotel/today-available-rooms" element={<HotelNRoomProvider><AvailableRooms /></HotelNRoomProvider>} />}
        {isValid && <Route exact path="/hotel/rooms" element={<HotelNRoomProvider><RoomList /></HotelNRoomProvider>} />}
        {isValid && <Route exact path="/room/update" element={<HotelNRoomProvider><UpdateRoomPage /></HotelNRoomProvider>} />}
        {isValid && <Route exact path="/room/bookings" element={<HotelNRoomProvider><BookingCalendar /></HotelNRoomProvider>} />}
        {isValid && <Route exact path="/room/reserve" element={<HotelNRoomProvider><ReservationForm /></HotelNRoomProvider>} />}
        {isValid && <Route exact path="/room/add" element={<HotelNRoomProvider><AddRoomForm /></HotelNRoomProvider>} />}
        {!isValid &&<Route path="*" element={<h1>Page Not found Or You are not authorized.</h1>} />}

     
      </Routes>
     </BrowserRouter>
     </>
  );
}

export default App;
