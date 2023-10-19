import { defineProvider } from '@neemata/server'
import authContext from '../contexts/auth.js'

export default defineProvider(
  async ({ injections: { auth } }) => {
    const onlyUser = () => auth?.user!.type === 'USER'
    const onlyAdmin = () => auth?.user!.type === 'ADMIN'
    const onlyAuthorized = () => !!auth
    const onlyUnauthorized = () => !auth

    return {
      onlyUnauthorized,
      onlyAdmin,
      onlyAuthorized,
      onlyUser,
    }
  },
  { auth: authContext }
)
