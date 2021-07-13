import React, { useContext, useRef, useEffect } from 'react';

import ContactContext from '../context/contact/contactContext';

const ContactFilter = () => {

    const text = useRef('')

    const contactContext = useContext(ContactContext)

    const { FilterContactAction, ClearFilterAction, filtered } = contactContext

    useEffect( () => {
        if(filtered === null){
            text.current.value = ''
        }
    })

    const changeHandler = (e) => {
        if(text.current.value !== ''){
            FilterContactAction(e.target.value)
        }
        else{
            ClearFilterAction()
        }
    }

    return (
        <form>
            <input 
             ref={text}
             type='text'  
             placeholder="Filter Contacts..."
             onChange={ changeHandler }
            />            
        </form>
    )
}

export default ContactFilter;
