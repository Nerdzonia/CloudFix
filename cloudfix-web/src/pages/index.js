import PageLayout from '../components/layout/page'
import TicketForm from "../components/ticket/ticketForm/ticketForm";

class Index extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            input : ''
        }

        this.getInputText = this.getInputText.bind(this);
    }

    getInputText(event){
        this.setState({
            input: event.target.value
        });
    }

    render(){
        return (
            <PageLayout>
                <TicketForm />
            </PageLayout>
        );
    }

}

export default Index;