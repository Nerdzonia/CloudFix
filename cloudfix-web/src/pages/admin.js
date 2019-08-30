import Link from 'next/link';
import { Divider, Grid } from 'semantic-ui-react';

import PageLayout from '../components/layout/page'


const Admin = () => {

    return (
        <PageLayout>
            <Grid>
                <Grid.Row>
                    <Link href="/"><a>Ticket</a></Link>
                    <Divider />
                </Grid.Row>
            </Grid>
        </PageLayout>
    )
}

export default Admin;