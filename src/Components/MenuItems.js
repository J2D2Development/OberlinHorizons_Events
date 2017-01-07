import React from 'react';

const MenuItems = (props) => {
    let title;
    function capitalize(word) {
        return word.split('')
            .map((letter, index) => {
                return index === 0 ? letter.toUpperCase() : letter;
            });
    }
    
    if(props && props.title) {
        title = capitalize(props.title);
    }
    return (
        <div>
            <h3>{title} Events</h3>
            { props.events }
        </div>
    )
}

export default MenuItems;