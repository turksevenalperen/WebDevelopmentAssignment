import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import UserList from './components/UserList'
import PostList from './components/PostList'
import UserForm from './components/UserForm'
import PostForm from './components/PostForm'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/users/create" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
          <Route path="/posts/create" element={<PostForm />} />
          <Route path="/posts/edit/:id" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App