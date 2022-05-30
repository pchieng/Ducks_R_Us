import React from 'react';
import { deleteUser } from '../axios-services/user';

/* this will show users on front end but only Admin accounts 
should be able to see it*/

const UsersList = (props) => {
    const { users, setUsers } = props
    return (
        <>
            <h1>USERS</h1>
            <div> {users.map(user =>
                <div className='userCard' key={user.id}>
                    <button
                        onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this user and all its data?") === true) {
                                await deleteUser(user.id);
                                alert('User has been deleted')
                                setUsers(users.filter((filteredUser) => filteredUser.id !== user.id))
                            }
                        }}
                    >Delete</button>
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