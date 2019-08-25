import PageLayout from '../components/layout/page'
import { Input } from '../components/utils/input';

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
                <div style={style.content}>
                    <h1>{this.state.input}</h1>
                    <a href='https://nextjs.org/' target='_blank'>Learn more Next</a>
                    <Input 
                        type="text" 
                        placeholder="Hello World" 
                        value={this.state.input} 
                        onChange={this.getInputText}
                    />
                </div>
            </PageLayout>
        );
    }

}

export default Index;