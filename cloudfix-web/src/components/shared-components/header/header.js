import Link from "next/link";
import { Grid, Image, Icon, Header, Dropdown } from "semantic-ui-react";

import logo from "../../../../assets/images/cloudfix.png";
import { removeToken, loadToken } from '../../../lib/token';
import adminIcon from "../../../../assets/images/admin-icon.png";



const HeaderC = props => {
  return (
    <Grid centered stackable columns={3} >
      <Grid.Column only="computer" width={4} />

      <Grid.Column width={8}>
        <Link href="/">
          <a><Image centered src={logo} width="200px" /></a>
        </Link>
      </Grid.Column>

      <Grid.Column width={4} verticalAlign="middle">
        <Grid.Row>
          <Header as="h5">
            <div style={{ marginRight: 5, display: 'inline-block' }}>
              <Image size='mini' src={adminIcon} />
            </div>
            <Dropdown item text='Admin' >
              <Dropdown.Menu>
                {loadToken('token')
                  ? <><Link href="/ticketList"><Dropdown.Item><a>Lista de chamados</a></Dropdown.Item></Link>
                    <Link href="/admin"><Dropdown.Item onClick={() => removeToken('token')}><a>Sair</a></Dropdown.Item></Link></>
                  : <Dropdown.Item><Link href="/admin" ><a>Login</a></Link></Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default HeaderC;
