import React, {useEffect, useState} from 'react'
import {addData, deleteData, getStoreData, initDB, Stores, updateData, User} from "./shared/indexdb";

const App = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        initDB(Stores.Users)
            .then(() => getUsersList())
    }, [])

    const getUsersList = () => {
        getStoreData<User>(Stores.Users).then((users) => setUsers(users ?? []))
    }

    const addUser = () => {
        addData(Stores.Users, {name: 'Nick'}).then(console.log)
        getUsersList()
    }

    const updateLastUserName = () => {
        updateData(Stores.Users, users[users.length - 1].id, {name: 'Zach'}).then(console.log)
        getUsersList()
    }

    const deleteLastUser = () => {
        deleteData(Stores.Users, users[users.length - 1].id).then(console.log)
        getUsersList()
    }

    return (
        <div>
            <h1>Hello, React with Webpack!</h1>

            <button style={{width: '200px', height: '50px'}} onClick={addUser}>Add user</button>
            <button style={{width: '200px', height: '50px'}} onClick={getUsersList}>Get users</button>
            <button style={{width: '200px', height: '50px'}} onClick={updateLastUserName}>Update last user name</button>
            <button style={{width: '200px', height: '50px'}} onClick={deleteLastUser}>Delete last user</button>

            {users.map((user) => <div key={user.id}>{user.id} {user.name}</div>)}
        </div>
    );
};

export default App;
