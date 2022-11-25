import * as React from 'react';
import { User, UserDemo } from './SignIn/User';

export type FlagContextType = {
    loginUser: User;
    setLoginUser: React.Dispatch<React.SetStateAction<User>>;
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const FlagContext = ({
    loginUser: UserDemo,
    setLoginUser: () => {},
    drawerOpen: false,
    setDrawerOpen: () => {}
  });
export const UserContext = React.createContext<FlagContextType>(FlagContext);

export const UserProvider = (props :any) => {
  const [loginUser, setLoginUser] = React.useState(UserDemo);
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const value = {
    loginUser,
    setLoginUser,
    drawerOpen,
    setDrawerOpen
  };
  return(
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}
