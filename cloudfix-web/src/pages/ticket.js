import { useRouter } from 'next/router';
import Link from 'next/link';

import PageLayout from '../components/layout/page';

const Ticket = () => {
    const { query: { id } } = useRouter();

    return (
        <PageLayout>
            <h3><Link href={`myTicket?id=${id}`}><a>Uma copia do link foi enviada para o seu email.</a></Link></h3>
        </PageLayout>
    )

}

export default Ticket;