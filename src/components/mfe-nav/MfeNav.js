import sessionSignIn from '@/utils/auth/sessionSignIn';
import sessionSignOut from '@/utils/auth/sessionSignOut';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { lazy } from 'react';
import useUserInfo from '@/hooks/rq/useUserInfo';
let RemoteNav = () => null;
if (process.browser) {
  RemoteNav = lazy(() => import('careerToolsNavbarMFE/GlobalNavigation'));
}

const MfeNav = () => {
  const session = useSession();
  const { data: userInformation, isLoading: isLoadingUserInfo } = useUserInfo();

  const mfeProps = {
    addJumpLink: false,
    session: session,
    userInfo: {
      firstName: userInformation?.firstName,
      lastName: userInformation?.lastName,
    },
    sessionSignIn: sessionSignIn,
    sessionSignOut: sessionSignOut,
  };

  return (
    <Box sx={{ position: 'sticky', top: '0px', zIndex: '10' }}>
      <RemoteNav {...mfeProps} />
    </Box>
  );
};

export default MfeNav;
