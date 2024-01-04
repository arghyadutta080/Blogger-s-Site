import React, { useEffect, useState } from 'react'
import { AuthState, userInfo } from '../firebase/Auth';
import { AuthContext } from './AuthContext';
import { getUser } from '../firebase/Profile';

interface AuthUserStateProps {
  children: React.ReactNode;
}

const AuthUserState: React.FC<AuthUserStateProps> = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<userInfo | null>(null);

    const checkAuth = async () => {
      const user: any = await AuthState();

      if (user.authState) {
        setIsAuthenticated(true);

        const userInfo: any = await getUser();
        setUser(userInfo) 

        console.log("AuthUserContext: user is authenticated");
      
    } else {  
        setIsAuthenticated(false);
        console.log("inside checkAuth", user.authState);
      }
    };


    useEffect(() => {
      
        checkAuth();
    
    }, []);
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthUserState;