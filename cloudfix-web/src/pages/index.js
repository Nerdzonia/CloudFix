import PageLayout from '../components/layout/page'
import TicketForm from "../components/ticket/ticketForm/ticketForm";
import TicketList from "../components/ticket/ticketList/ticketList";

const Index = () => {

    return (
        <PageLayout>
            <TicketForm />
        </PageLayout>
    );
}

export default Index;