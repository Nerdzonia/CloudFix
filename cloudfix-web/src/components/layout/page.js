import Link from 'next/link';
import { Grid, Image, Container } from 'semantic-ui-react';

import Footer from '../../components/footer/footer';

import logo from '../../../assets/images/cloudfix.png';

const Page = (props) => (
    <Container>
        <Grid centered>
            <Grid.Row >
                <Image src={logo} />
                <Link href="/admin"><a>Admin Page</a></Link>
            </Grid.Row>
            <Grid.Row>
                {props.children}
            </Grid.Row>
            <Grid.Row>
                <Footer anything={'Hello World'} />
            </Grid.Row>
        </Grid>
    </Container>
);

export default Page;
