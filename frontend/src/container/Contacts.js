import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../context/contact/contactContext';

import DisplayContact from '../components/DisplayContact';
import Spinner from '../components/Spinner';


const Contacts = () => {

    const contactContext = useContext(ContactContext)

    const { contacts, filtered, GetContactsAction, loading } = contactContext

    useEffect(() => {
        GetContactsAction()

        // eslint-disable-next-line 
    }, [])


    if (contacts !== null && contacts.length === 0 && !loading) { 
        return <h4>Please Add a Contact</h4> 
    }

    return (
        <>
            {
                contacts !== null && !loading ?
                    (
                        <TransitionGroup>
                            {
                                filtered !== null ?
                                    filtered.map((item) => (
                                        <CSSTransition key={item._id} timeout={500} classNames='item' >
                                            <DisplayContact contactData={item} />
                                        </CSSTransition>
                                    ))
                                    :
                                    contacts && contacts.map((item) => (
                                        <CSSTransition key={item._id} timeout={500} classNames='item' >
                                            <DisplayContact contactData={item} />
                                        </CSSTransition>
                                    ))

                            } 
                        </TransitionGroup>
                    )
                    : <Spinner />
            }
        </>
    )
}

export default Contacts;
