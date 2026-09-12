import FaceExpression from './features/expression/components/FaceExpression'
import './style/style.scss'

import { router } from './auth.route'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './features/auth/auth.context'

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )

}

export default App
