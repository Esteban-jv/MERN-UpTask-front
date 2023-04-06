import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import Login from './pages/Login'

import { AuthProvider } from './context/AuthProvider';
import { ProjectProvider } from './context/ProjectProvider'
import ProtectedRoute from './layouts/ProtectedRoute'
import Projects from './pages/projects/Projects'
import NewProject from './pages/projects/NewProject'
import Project from './pages/projects/Project'
import EditProject from './pages/projects/EditProject'
import NewColaborator from './pages/NewColaborator'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            /* All public routes */
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='forgot-password' element={<ForgotPassword/>}/>
              <Route path='forgot-password/:token' element={<NewPassword/>}/>
              <Route path='confirm/:token_id' element={<ConfirmAccount/>}/>
            </Route>

            /* All private routes */
            <Route path="/projects" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<NewProject />} />
              <Route path="new-colaborator/:id" element={<NewColaborator />} />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
