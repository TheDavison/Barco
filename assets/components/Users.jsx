import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
    const [users, setUsers] = useState([])

    let getUsuarios = () => {
        axios.get('user/list')
            .then((response) => {                
                // for(let usuario in response.data.data){
                    // let { id, username, roles, donations } = response.data.data[usuario];
                    // let nextUser = { id, username, roles, donations };
                    // setUsers(prev => [...prev, nextUser] );
                    let { data } = response.data;
                    setUsers(data)
                    console.log(data);
                    console.log(users)
                // }
                console.log(users);
                
            })
    // console.log(users);
    }

    useEffect(() => {
        getUsuarios();
    }, [])
      
    return (
        <div>
            <h2>Listado de usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Roles</th>
                        <th>Donations</th>
                    </tr>
                </thead>

                <tbody>   
                    {/* {users.map((user, key) =>(
                        <tr key={key}>
                            <td>{user.id}</td>;
                            <td>{user.username}</td>;
                            <td>{user.roles}</td>;
                            <td>{user.donations}</td>;
                        </tr>
                    ))} */}

                </tbody>
            </table>
        </div>
        
    )
}

export default Users