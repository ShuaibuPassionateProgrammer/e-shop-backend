import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/admin/UserList';

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-xl">Admin Dashboard</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/" element={<h2>Welcome to the Dashboard</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}