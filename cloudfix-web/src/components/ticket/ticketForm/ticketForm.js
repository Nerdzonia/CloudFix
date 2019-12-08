import React, { useState } from 'react';
import Router from 'next/router';
import {
  Grid,
  Header,
  Divider,
  Form,
  Breadcrumb,
  Button,
  Message,
} from "semantic-ui-react";

import { Alert } from '../../alert/alert';
import TicketRequestor from '../../../services/resources/ticket';
import SystemSelect from '../../utils/SystemSelect';

const TicketForm = props => {
  
  const ImageUpload = React.createRef();

  const [load, setLoad] = useState(false);

  const [input, setInput] = useState({
    email: '',
    name: '',
    title: '',
    system: '',
    image: [],
    message: ''
  });

  const [image, setImage] = useState(null);

  const [checkInput, setCheckInput] = useState({
    email: false,
    name: false,
    title: false,
    system: false,
    message: false
  });

  const [alert, setAlert] = useState(null);

  const handleFildsChange = (e, { name, value }) => {
    setInput({ ...input, [name]: value });
  }

  const handleImage = (e) => {
    if (e.target.files[0]) {
      let file = e.target.files[0];

      if (file.size >= 2097152)
        return setAlert(<Alert buttonColor="red" iconTitle="warning" iconButton="checkmark"
        message={'Porfavor insira um arquivo menor que 2MB'} open={true} title="Aviso" removeAlert={setAlert} />);

      if (input.image.length >= 5)
        return setAlert(<Alert buttonColor="red" iconTitle="warning" iconButton="checkmark"
        message={'So pode carregar em ate arquivos.'} open={true} title="Aviso" removeAlert={setAlert} />);

      setInput({ ...input, image: input.image ? [file, ...input.image] : [file] });

      let reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  const sendTicket = async () => {
    let check = {};

    Object.keys(input).forEach(element => {
      if (element !== 'image')
        if (input[element] == '')
          check[element] = true;
        else
          check[element] = false;
    });

    setCheckInput(check);

    let validateInputs = Object.keys(check).every(element => {
      return check[element] === false;
    });

    if (validateInputs) {
      setLoad(true);
      
      let data = await TicketRequestor.sendTicket(input);

      if (!data.error) {
        Router.push(`/ticket?id=${data.id}`, '/ticket');
      } else {
        setAlert(<Alert buttonColor="red" iconTitle="warning" iconButton="checkmark" message={data.error} open={true} title="Aviso" removeAlert={setAlert} />)
      }

      setLoad(false);
    }
  }

  const ArchiveBox = () => (
    <Message>
      <Message.Header>Itens adicionados (Maximo de arquivos 5, tamanho ate 2MB)</Message.Header>
      <Message.List items={input.image.map((image, i) => <div key={i}><strong>{i + 1} == </strong> {image.name}</div>)} />
    </Message>
  )

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
      backgroundImage: `url(${image || ''})`
    }
  }

  return (
    <Grid container centered columns={1}>
      {alert}
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
                          error={checkInput.name ? { content: 'Por favor, insira seu nome!' } : null}
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
                          error={checkInput.email ? { content: 'Por favor, insira seu email!' } : null}
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
                        error={checkInput.title ? { content: 'Por favor, insira um assunto!' } : null}
                        name='title'
                        value={input.title}
                        onChange={handleFildsChange}
                      />
                    </Form.Field>
                    <Form.Field required>
                      <label size="small">Sistema: </label>
                      <SystemSelect
                        fluid
                        placeholder="Ex: Selecione o sistema"
                        name='system'
                        label={{ icon: "asterisk" }}
                        error={checkInput.system}
                        errorMessage={'Por favor, selecione o sistema que ocorreu o erro!'}
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
                          error={checkInput.message ? { content: 'Relate o erro acima!' } : null}
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
                        <input type="file" ref={ImageUpload} accept="image/*, .pdf, .doc, video/*" onChange={(e) => handleImage(e)} style={{ display: 'none' }} />
                      </Form.Field>
                    </Form.Group>
                  </Grid.Column>
                  <Grid.Column>
                    {image ? <ArchiveBox /> : null}
                    <Button.Group floated="right">
                      <Button>Cancelar</Button>
                      <Button.Or text="ou" />
                      <Button
                        positive
                        content="Solicitar Ticket"
                        icon="check"
                        labelPosition="right"
                        onClick={sendTicket}
                        disabled={load}
                        loading={load}
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
