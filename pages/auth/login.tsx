import { NextAuthProtectedLogin } from 'next-protected-auth';

import { env } from '../../services/env';

export default NextAuthProtectedLogin({
  authCallbackURL: '/auth',
  callback: () => {
    // Redirect to login auth portal
    window.location.replace(`${env.NEXT_PUBLIC_API_URL}/auth/login`);
  },
});
