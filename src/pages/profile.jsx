import React from "react";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import styles from '../styles/profile.module.css';

import { Header } from "../components/header";
import { Footer } from "../components/footer";

const Profile = () => {
    const { user } = useAuth0();

    return(
        <div className={styles.Profile}>
            <Header/>
                <img src={user.picture} alt={user.name}/>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
            <Footer/>
        </div>
    );
}

export default withAuthenticationRequired(Profile, { 
    onRedirecting: () => "Loading..." ,
    returnTo: () => window.location.pathname
});