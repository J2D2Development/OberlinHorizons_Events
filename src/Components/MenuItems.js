import React from 'react';

const MenuItems = (props) => {
    console.log('in menuitems comp:', props);
    return (
        <div>
            <h3>Upcoming Events</h3>
            { props.events }
        </div>
    )
}

export default MenuItems;