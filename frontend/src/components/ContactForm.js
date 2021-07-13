import React, { useState, useContext, useEffect } from 'react';

import ContactContext from '../context/contact/contactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext)

    const { AddContactAction, current, ClearCurrentAction, UpdateContactAction } = contactContext

    useEffect( () => {
        if(current !== null) {
            setContact(current)
        }
        else{
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const { name, email, phone, type } = contact

    const changeHandler = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if(current === null){
            AddContactAction(contact)
        }
        else{
            UpdateContactAction(contact)
        }

        ClearCurrentAction()

    }

    const clearAllHandler = () => {
        ClearCurrentAction()
    }

    return (
        <form onSubmit={submitHandler}>
            <h2 className='text-primary'>
                {current ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={changeHandler}
            />
            <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={changeHandler}
            />
            <input
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={changeHandler}
            />
            <h5>Contact Type</h5>
            <input
                type='radio'
                name='type'
                value='personal'
                checked={type === 'personal'}
                onChange={changeHandler}
            />{' '}
            Personal{' '}
            <input
                type='radio'
                name='type'
                value='professional'
                checked={type === 'professional'}
                onChange={changeHandler}
            />{' '}
            Professional
            <div>
                <input
                    type='submit'
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className='btn btn-primary btn-block'
                />
            </div>
            {
                current && (
                    <div>
                        <button className='btn btn-light btn-block' onClick={clearAllHandler}>
                            Clear
                        </button>
                    </div>
                )
            }
        </form>
    )
}

export default ContactForm;
