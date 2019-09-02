import React, { useState } from 'react';
import {
  Grid,
  Header,
  Divider,
  Input,
  Form,
  TextArea,
  Breadcrumb,
  Button
} from "semantic-ui-react";

const TicketForm = props => {
  const ImageUpload = React.createRef();

  const [input, setInput] = useState({
    email: '',
    name: '',
    title: '',
    system: '',
    image: '',
    message: ''
  });

  const [image , setImage] = useState('');

  const sendTicket = () => {

  }

  const handleImage = (e) => {
    let data = new FormData();
    data.append('image', e.target.files[0]);
    setInput({...input, image: data});

    let reader = new FileReader();
    reader.onload = function (e) {
      setImage(e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const style = {
    imageContent: {
      width: 200,
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px dashed black',
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${image})`
    }
  }

  return (
    <Grid container centered columns={1}>
      {console.log(input.image)}
      <Grid.Column mobile={16} tablet={10} computer={12}>
        <Grid.Row>
          <Breadcrumb>
            <Breadcrumb.Section active>
              Home
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
          </Breadcrumb>
        </Grid.Row>
        <Grid.Row>
          <Header as="h1" textAlign="center">
            Solicitar Ticket
            <Header.Subheader>
              Para solicitar um ticket, é necessário que informe seus dados, e
              depois descrever o problema.
            </Header.Subheader>
          </Header>
          <Divider />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Form onSubmit={sendTicket}>
              <Grid stackable divided="vertically" columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Header size="medium">Dados Pessoais</Header>
                    <Divider />
                    <Grid.Row>
                      <Form.Field required>
                        <label size="small">Nome: </label>
                        <Input
                          icon="user outline"
                          iconPosition="left"
                          fluid
                          label={{ icon: "asterisk" }}
                          labelPosition="right corner"
                          placeholder="Ex: Exemplo dos exemplos..."
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label size="small">Email: </label>
                        <Input
                          icon="at"
                          iconPosition="left"
                          fluid
                          label={{ icon: "asterisk" }}
                          labelPosition="right corner"
                          placeholder="Ex: exemplo@exemplo.com..."
                        />
                      </Form.Field>
                    </Grid.Row>
                  </Grid.Column>
                </Grid.Row>
                <Header size="medium">Detalhes sobre a Solicitação</Header>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field required>
                      <label size="small">Assunto: </label>
                      <Input
                        icon="pencil alternate"
                        iconPosition="left"
                        fluid
                        label={{ icon: "asterisk" }}
                        labelPosition="right corner"
                        placeholder="Ex: Titulo..."
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label size="small">Sistema: </label>
                      <Input
                        icon="computer"
                        iconPosition="left"
                        fluid
                        label={{ icon: "asterisk" }}
                        labelPosition="right corner"
                        placeholder="Ex: handhead..."
                      />
                    </Form.Field>
                    <Form.Field>
                      <label size="small">Imagem do erro: </label>
                      <div style={style.imageContent}>
                        <Button icon="upload" color="blue" onClick={() => ImageUpload.current.click()} />
                      </div>
                      <input type="file" ref={ImageUpload} onChange={(e) => handleImage(e)} style={{ display: 'none' }} />
                    </Form.Field>
                    <Form.Field required>
                      <label size="small">Descrição: </label>
                      <TextArea
                        icon="comment alternate outline"
                        iconposition="left"
                        placeholder="Para que o atendimento seja eficiente, detalhe o máximo possível..."
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Button.Group floated="right">
                      <Button>Cancelar</Button>
                      <Button.Or text="ou" />
                      <Button
                        positive
                        content="Solicitar Ticket"
                        icon="check"
                        labelPosition="right"
                      ></Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};


export default TicketForm;
