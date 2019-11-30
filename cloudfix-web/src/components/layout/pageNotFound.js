import Router from 'next/router';

const NotFound = (props) => {
    return (
        <div style={{ display: `flex`, alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}>
            <div style={{ width: 400, height: 250, backgroundColor: 'black', display: 'flex', position: 'relative' }}>
                <div style={{ backgroundColor: 'white', margin: '5px', flex: 1, display: 'flex' }} >
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexFlow: 'column' }}>
                        <div style={{textAlign: 'center'}}>
                            <h3 style={{fontSize: '1.5em'}}>{props.error}</h3>
                            <h3 style={{fontWeight: '1000'}}>{props.error === 404 ? 'Você chegou na página desconhecida' : 'Desculpe ocorreu algum erro inesperado'}</h3>
                            <h3 onClick={() => Router.back()}><a style={{cursor: 'pointer'}}    >Voltar</a></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;