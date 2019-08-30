import PageLayout from '../components/layout/page'
import { Input } from '../components/utils/input';
import TicketForm from "../components/ticket/ticketForm/ticketForm";

const style = {
    content: {
        textAlign: 'center',
        padding: 15
    }
}

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