import React from 'react'
import axios from 'axios';

const Donations = () => {
    useEffect( async () => {
      await axios.get('donation/list')
        .then((response) => console.log(response))
    
    
    }, [])
    
    return (
        <div>Listado de donaciones</div>
    )
}

export default Donations