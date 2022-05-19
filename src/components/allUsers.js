import React from 'react';

/* this will show users on front end but only Admin accounts 
should be able to see it*/

const UsersList = (props) => {
    const {users} = props
    return(
        <>
            <h1>USERS</h1>
            <div> {users.map(user =>
                <div className='userCard' key={user.id}>
                    <h3>Username: {`${user.username}`}</h3>
                    <p>Email: {`${user.email}`}</p>
                    <p>Admin: {`${user.isAdmin}`}</p>
                </div>
            )}
            </div>
        </>
    )
}


export default UsersList