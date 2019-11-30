import { checkToken, renewToken, loadToken } from '../lib/token';
import { redirect } from '../lib/auth';
import PageLayout from '../components/layout/page'
import AdminLogin from '../components/admin/adminLogin';

class Admin extends React.Component {

    static async getInitialProps(ctx){
        if (checkToken(ctx)){
            // renewToken('token', ctx || {}, 30);
            redirect(ctx, '/ticketList');
        }
    }   

    render(){
        return (
            <PageLayout>
                <AdminLogin />
            </PageLayout>
        )
    }
}

export default Admin;