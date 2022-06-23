import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../styles/AdminBookings.css";

const AdminBookings = () => {
    const [bookings, setBookings] = useState([])

    let getBookings = () => {
      axios.get("/bookings/list").then((response) => {
        if (response.data.data) {
          console.log('datos',response.data.data);
          for (let booking in response.data.data) {
            let { id, turn, date } = response.data.data[booking];
            let { booker } = response.data.data[booking];
            let nextBooking = { id, booker, turn, date };
  
            setBookings((prev) => [...prev, nextBooking]);
          }
        }
      });
    };
    useEffect(() => {
      getBookings();
    
      // console.log("entro")
    }, [])
    
  return (
    <div className="bookings__container">
      <table className="bookings__table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Booker</th>
            <th>Date</th>
            <th>Turn</th>
          </tr>
        </thead>

        <tbody>
        {bookings.map((booking ,key)=>(
          <tr key={key}>
              <td>{booking.id}</td>
              <td>{booking.booker}</td>
              <td>{booking.date}</td>
              <td>{booking.turn}</td>
            </tr>
          ))}
            
          
        </tbody>
      </table>
        
    </div>
  )
}

export default AdminBookings