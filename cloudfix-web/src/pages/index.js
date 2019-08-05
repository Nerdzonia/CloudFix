import React, { useState } from 'react';

import PageLayout from '../components/layout/page'
import { Input } from '../components/utils/input';

const style = {
    content: {
        textAlign: 'center',
        padding: 15
    }
}

const Index = () => {
    const [input, setInput] = useState('');
    const getInputText = (e) => {
        setInput(e.target.value);
    }

    return (
        <PageLayout>
            <div style={style.content}>
                <h1>Hello World!</h1>
                <a href='https://nextjs.org/' target='_blank'>Learn more Next</a>
                <Input 
                    type="text" 
                    placeholder="Hello World" 
                    value={input} 
                    onChange={getInputText}
                     />
            </div>
        </PageLayout>
    );

}

export default Index;