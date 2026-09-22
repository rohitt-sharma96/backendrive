import FaceExpression from './features/expression/components/FaceExpression'
import './style/style.scss'

import { router } from './auth.route'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './features/auth/auth.context'
import { SongProvider } from './features/home/song.context'

function App() {

  return (
    <>
      <AuthProvider>
        <SongProvider>
          <RouterProvider router={router} />
        </SongProvider>
      </AuthProvider>
    </>
  )

}

export default App
