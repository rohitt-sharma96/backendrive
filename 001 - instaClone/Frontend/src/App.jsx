import { RouterProvider } from 'react-router'
import { router } from './auth.routes'
import './features/shared/global.scss'

import { AuthProvider } from './features/auth/auth.context'
import { PostProvider } from './features/posts/post.context'

function App() {

  return (
    <PostProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PostProvider>

  )
}






export default App
