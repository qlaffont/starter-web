import { NextAuthProtectedLogout } from 'next-protected-auth';

import RestAPIService from '../../services/apis/RestAPIService';

export default NextAuthProtectedLogout({
  preCallback: async () => {
    await RestAPIService.logout();
  },
  callback: () => {
    window.location.replace('/');
  },
});
