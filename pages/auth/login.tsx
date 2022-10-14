import { NextAuthProtectedLogin } from 'next-protected-auth';

export default NextAuthProtectedLogin({
  authCallbackURL: '/auth',
  callback: () => {
    // Redirect to login auth portal
    window.location.replace(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
  },
});
