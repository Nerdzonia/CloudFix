import React, { useState } from 'react';
import {
  Grid,
  Header,
  Divider,
  Form,
  Breadcrumb,
  Button
} from "semantic-ui-react";

import ClientRequestor from '../../../services/resources/client';

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
      setInput({ ...input, image: e.target.files[0] });

      let reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const sendTicket = async () => {
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
    
    if(validateInputs){
      const form = new FormData();
      Object.keys(input).forEach(element => {
        form.append(element, input[element]);
      });
  
      let { data } = await ClientRequestor.sendTicket(form);
      //redirect to ticket link
      console.log(data);
    }
  }

  const style = {
    imageContent: {
      width: 245,
      height: 198,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px dashed grey',
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
                          error={checkInput.name ? {content: 'Por favor, insira seu nome!'} : null}
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
                          error={checkInput.email ? {content: 'Por favor, insira seu email!'} : null}
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
                        error={checkInput.title ? {content: 'Por favor, insira um assunto!'} : null}
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
                        error={checkInput.system ? {content: 'Por favor, insira um sistema para relatar o erro!'} : null}
                        name='system'
                        value={input.system}
                        onChange={handleFildsChange}
                      />
                    </Form.Field>
                    <Form.Group>
                      <Form.Field required width={11} >
                        <label size="small">Descrição: </label>
                        <Form.TextArea
                          style={{ minHeight: 200 }} 
                          icon="comment alternate outline"
                          iconposition="left"
                          placeholder="Para que o atendimento seja eficiente, detalhe o máximo possível..."
                          error={checkInput.message ? {content: 'Relate o erro acima!'} : null}
                          name='message'
                          value={input.message}
                          onChange={handleFildsChange}
                        />
                      </Form.Field>
                      <Form.Field width={5}>
                        <label size="small">Imagem do erro: </label>
                        <div style={style.imageContent}>
                          <Button basic icon="upload" color="blue" onClick={() => ImageUpload.current.click()} />
                        </div>
                        <input type="file" ref={ImageUpload} accept="image/*" onChange={(e) => handleImage(e)} style={{ display: 'none' }} />
                      </Form.Field>
                    </Form.Group>
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
