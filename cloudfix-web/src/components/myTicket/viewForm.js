import { Header, Container, Segment } from 'semantic-ui-react';

const MessageContainer = ({ message }) => (
    <p style={{ fontSize: '1.4em' }}>
        {message}
    </p>
);

const MyTicket = (props) => {
    const {
        name,
        system,
        title,
        message,
        images,
        chat
    } = props.ticket;
    return (
        <Container style={{ paddingBottom: "5em" }} textAlign='center'>
            <Header as='h1' block>
                Bem vindo ao seu ticket <span style={{ fontWeight: 'bold' }}>{name}</span><br />
                você escolheu o sistema <span style={{ textDecoration: 'underline' }}>{system}</span>
            </Header>

            <Container textAlign='justified'>
                <Segment>
                    <Header as='h3'>
                        Assunto:
                    </Header>
                    <MessageContainer message={title} />
                    { images.length !== 0
                    ? <Header as='h3'>
                        Imagens do erro
                    </Header>
                    : null}
                    {images ? images.map((img, i) => <a key={i} href={img} target="_blank"><MessageContainer message={`Imagem ${i+1}`} />  </a>) : null}
                    <Header as='h3'>
                        Mensagem:
                    </Header>
                    <MessageContainer message={message} />
                </Segment>
            </Container>
            {/* <br/>
            <Container textAlign='justified'>
                <Segment>
                <Header as='h2'>Chat com o suporte</Header>
            
                </Segment>
            </Container> */}
        </Container>
    );
}

export default MyTicket;