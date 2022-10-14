import { NextAuthProtectedCallback } from 'next-protected-auth';

export default NextAuthProtectedCallback({
  callback: (redirectUrl) => {
    window.location.replace(redirectUrl || '/applications');
  },
  noTokenCallback: (redirectUrl) => {
    window.location.replace(redirectUrl || '/applications');
  },
});
