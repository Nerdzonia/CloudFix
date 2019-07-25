import React from 'react';

import image from '../../../assets/images/background.jpg';

import '../../../assets/scss/themes.scss';

const Page = (props) => (
    <>
        <header> 
            <nav className="page-layout">
                <img src={image} />
            </nav>
        </header>
        <main>
            {props.children}
        </main>
    </>
)
export default Page;
