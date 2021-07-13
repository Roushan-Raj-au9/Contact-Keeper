import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ContactContext from '../context/contact/contactContext';

const DisplayContact = ({ contactData: { _id, name, email, phone, type } }) => {

    const contactContext = useContext(ContactContext);

    const { DeleteContactAction, SetCurrentAction, ClearCurrentAction } = contactContext 

    const deleteHandler = () => {
        DeleteContactAction(_id)
        ClearCurrentAction()
    }

    return (
        <div className="card bg-light" >
            <h3 className="text-primary text-left" >
                { name }{' '} 
                <span 
                 style={{ float: 'right' }}
                 className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}
                >
                    { type.charAt(0).toUpperCase() + type.slice(1) }
                </span>
            </h3>

            <ul className="list" >
                {
                    email && (
                        <li>
                            <i className='fas fa-envelope-open' ></i>{' '}
                            { email }
                        </li>
                    )
                }

                {
                    phone && (
                        <li>
                            <i className='fas fa-phone' ></i>{' '}
                            { phone }
                        </li>
                    )
                }
            </ul>

            <p>
                <button onClick={ () => SetCurrentAction({_id,name,email,phone,type}) } className="btn btn-dark btn-sm" >Edit</button>
                <button onClick={ deleteHandler } className="btn btn-danger btn-sm" >Delete</button>
            </p>
            
        </div>
    )
}

DisplayContact.propTypes = {
    contactData: PropTypes.object.isRequired
}

export default DisplayContact;
