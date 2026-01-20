import React from "react";


function Header() {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>Shop</h1>
        </header>
    )
}

const styles = {
    header: {
        backgroundColor: '#a4c991',
        padding: '10px 20px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title:{
        fontSize: '20px',
        fontWeight: 600,
    }
};
export default Header;

