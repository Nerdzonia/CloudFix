import React from 'react'

import NotFound from '../components/layout/pageNotFound';

function Error({ statusCode }) {
    return (
        <NotFound error={statusCode} />
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error