import { useEffect, useState } from "react";


function App() {

  const [users, setUsers] = useState([]);

  // This code only runs at first Lunch/ Refresh = []
  useEffect(() => {
    async function getUsers() {
      const res = await fetch('https://setup-back-production.up.railway.app/users');

      // Converts to JSON (res format is Binary)
      const data = await res.json();

      console.log(data);
      setUsers(data);
    }
    
    getUsers();
  }, [])

  return (
    <div>
      {users.map(user => (
        <p key={user._id}>{user.name}</p>
      ))}
    </div>
  )
}

export default App

