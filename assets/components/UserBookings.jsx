import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Reservas from './Reservas';

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [currentBooking, setCurrentBooking] = useState("");

    let getBookings = () => {
      axios.get("/bookings/listbyid").then((response) => {
        console.log(response.data.data)
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
    const handleBorrar = (id) => {
        // e.preventDefault();
        setCurrentBooking(id);
        axios.post('bookings/delete',{
          id:currentBooking,
        }).then((response) => console.log(response));
        
    }
    // console.log(currentBooking);
    useEffect(() => {
      getBookings();
    
      // console.log("entro")
    }, [])
  return (
    <div>
        <Reservas />
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
              <td><button  onClick={(e)=>handleBorrar(booking.id)}>Borrar</button></td>
              {/* onClick={(e)=>handleBorrar(booking.id)} */}
            </tr>
          ))}
            
          
        </tbody>
      </table>
    </div>
  )
}

export default UserBookings