import Link from 'next/link';
import { Divider } from 'semantic-ui-react';


const Admin = () => {

    return(
        <div>
            <Link href="/"><a>Ticket</a></Link>
            <Divider />
        </div>
    )
}

export default Admin;