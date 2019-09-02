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

  const [image, setImage] = useState('');

  const [checkInput, setCheckInput] = useState({
    email: false,
    name: false,
    title: false,
    system: false,
    message: false
  });

  const handleFildsChange = (e, { name, value }) => {
    setInput({ ...input, [name]: value });
  }

  const handleImage = (e) => {
    if (e.target.files[0]) {
      let data = new FormData();
      data.append('image', {
        type: 'image',
        uri: e.target.files[0]
      });
      setInput({ ...input, image: data });

      let reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const sendTicket = () => {
    let check = {};

    Object.keys(input).forEach(element => {
      if(element !== 'image')
        if(input[element] == '')
          check[element] = true;
        else
          check[element] = false;
    });

    setCheckInput(check);
    
    let validateInputs = Object.keys(check).every(element => {
      return check[element] === false;
    });
    
    if(validateInputs)
      console.log(input);
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
            <Form>
              <Grid stackable divided="vertically" columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Header size="medium">Dados Pessoais</Header>
                    <Divider />
                    <Grid.Row>
                      <Form.Field required>
                        <label size="small">Nome: </label>
                        <Form.Input
                          icon="user outline"
                          iconPosition="left"
                          fluid
                          placeholder="Ex: Exemplo dos exemplos..."
                          error={checkInput.name ? {content: 'Porfavor insira seu nome!'} : null}
                          name='name'
                          value={input.name}
                          onChange={handleFildsChange}
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label size="small">Email: </label>
                        <Form.Input
                          icon="at"
                          iconPosition="left"
                          fluid
                          placeholder="Ex: exemplo@exemplo.com..."
                          error={checkInput.email ? {content: 'Porfavor insira seu email!'} : null}
                          name='email'
                          value={input.email}
                          onChange={handleFildsChange}
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
                      <Form.Input
                        icon="pencil alternate"
                        iconPosition="left"
                        fluid
                        label={{ icon: "asterisk" }}
                        labelPosition="right corner"
                        placeholder="Ex: Titulo..."
                        error={checkInput.title ? {content: 'Porfavor insira um assunto!'} : null}
                        name='title'
                        value={input.title}
                        onChange={handleFildsChange}
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label size="small">Sistema: </label>
                      <Form.Input
                        icon="computer"
                        iconPosition="left"
                        fluid
                        label={{ icon: "asterisk" }}
                        labelPosition="right corner"
                        placeholder="Ex: handhead..."
                        error={checkInput.system ? {content: 'Porfavor insira um sistema para relatar o erro!'} : null}
                        name='system'
                        value={input.system}
                        onChange={handleFildsChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label size="small">Imagem do erro: </label>
                      <div style={style.imageContent}>
                        <Button icon="upload" color="blue" onClick={() => ImageUpload.current.click()} />
                      </div>
                      <input type="file" ref={ImageUpload} accept="image/*" onChange={(e) => handleImage(e)} style={{ display: 'none' }} />
                    </Form.Field>
                    <Form.Field required>
                      <label size="small">Descrição: </label>
                      <Form.TextArea
                        icon="comment alternate outline"
                        iconposition="left"
                        placeholder="Para que o atendimento seja eficiente, detalhe o máximo possível..."
                        error={checkInput.message ? {content: 'Relate o erro acima!'} : null}
                        name='message'
                        value={input.message}
                        onChange={handleFildsChange}
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
                        onClick={sendTicket}
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
