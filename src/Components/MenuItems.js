import React from 'react';

const MenuItems = (props) => {
    // function capitalize(word) {
    //     return word.split('')
    //         .map((letter, index) => {
    //             return index === 0 ? letter.toUpperCase() : letter;
    //         });
    // }
    
    return (
        <div>
            { props.events }
        </div>
    )
}

export default MenuItems;