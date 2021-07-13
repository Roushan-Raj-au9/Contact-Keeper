import React, { useContext, useEffect } from 'react';

import Contacts from './Contacts';
import ContactForm from '../components/ContactForm';
import ContactFilter from '../components/ContactFilter';

import AuthContext from '../context/auth/authContext';

const Home = () => {

    const authContext = useContext(AuthContext)
    const { LoadUserAction } = authContext

    useEffect( () => {
        LoadUserAction()

       // eslint-disable-next-line
    }, [])

    return (
        <div className="grid-2" >
            <div>
                <ContactForm />
            </div>

            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home;
