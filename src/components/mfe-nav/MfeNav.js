import useUserStore from '@/store/userStore';
// import ModuleFederationImport from '@/utils/ModuleFederationImport';
import sessionSignIn from '@/utils/auth/sessionSignIn';
import sessionSignOut from '@/utils/auth/sessionSignOut';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { Suspense, lazy, useEffect } from 'react';
import dynamic from 'next/dynamic';
import useUserInfo from '@/hooks/swr/useUserInfo';
let RemoteNav = () => null;
if (process.browser) {
  //useCustomHook = require('shop/customHook').default;
  RemoteNav = lazy(() =>  import('careerToolsNavbarMFE/GlobalNavigation'));
}



const MfeNav = () => {
  const session = useSession();
  // const userInformation = useUserStore((state) => state.userData);
  const { userInfo: userInformation, isLoading: isLoadingUserInfo } = useUserInfo();
  const mfeProps = {
    addJumpLink: false,
    session: session,
    userInfo: {firstName: userInformation.firstName, lastName: userInformation.lastName},
    sessionSignIn: sessionSignIn,
    sessionSignOut: sessionSignOut,
  };
  

  return (
    <Box sx={{ position: 'sticky', top: '0px', zIndex: '10' }}>
      
        <RemoteNav
          {...mfeProps}
        />
      
    </Box>
  );
};

export default MfeNav;
