import React, { useContext } from 'react';

import AlertContext from '../context/alert/alertContext';

const Alert = () => {

    const alertContext = useContext(AlertContext);

    const { alerts } = alertContext

    return (
        alerts.length > 0 && alerts.map( (item) => (
            <div className={`alert alert-${item.type}`} key={item.id} >
                <i className='fas fa-info-circle' ></i>
                { item.msg }
            </div>

        )) 

    )
}

export default Alert;

