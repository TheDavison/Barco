import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Bookings = () => {
    const [bookings, setBookings] = useState([])

    const getBookings = () => {
        axios.get("/bookings/list")
            .then(response=>{
              console.log(response.data.data);
                if(response.data.data){
                    for(let booking in response.data.data){
                        let { id, booker, date, turn } = response.data.data[booking];
                        let nextBooking = { id, booker, date, turn};
                        setBookings((prev)=>[...prev,nextBooking])
                    }
                }
            })
            .catch((error)=>console.log(error))
    }
    useEffect(() => {
      getBookings();
    
      console.log("entro")
    }, [])
    
  return (
    <div>
      <table >
        <thead>
          <tr>
            <th>Id</th>
            <th>Booker</th>
            <th>Date</th>
            <th>Turn</th>
          </tr>
        </thead>

        <tbody>
        {bookings.map((booking ,key)=>{
          <tr key={key}>
              <td>{booking.id}</td>
              <td>{booking.booker}</td>
              <td>{booking.date}</td>
              <td>{booking.turn}</td>
            </tr>
          })}
            
          
        </tbody>
      </table>
        
    </div>
  )
}

export default Bookings