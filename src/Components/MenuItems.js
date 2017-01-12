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
            { props.events }
        </div>
    )
}

export default MenuItems;