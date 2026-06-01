import { useEffect, useState } from "react";


function App() {

  const [users, setUsers] = useState([]);

  // This code only runs at first Launch/ Refresh = []
  // This code only runs on the first mount
  useEffect(() => {
    const abortController = new AbortController();

    async function getUsers() {
      try {
        debugger;
        
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/users`, {
          signal: abortController.signal
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch users:', error);
          // כאן כדאי גם לעדכן סטייט של שגיאה, למשל setError(error.message)
        }
      }
    }
    
    getUsers();

    // פונקציית ניקוי לביטול הבקשה אם הרכיב יורד מהמסך
    return () => {
      abortController.abort();
    };
  }
  
  , []);

  return (
    <div className="bg-green-200">
      The users *******:
      {users.map(user => (
        <p key={user._id}>{user.name}</p>
      ))}
    </div>
  )
}

export default App

