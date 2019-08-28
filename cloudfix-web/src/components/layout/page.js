import { Container } from "semantic-ui-react";
import HeaderC from "../shared-components/header/header";
import Footer from "../shared-components/footer/footer";
import AdminLogin from "../admin/adminLogin";
import TicketForm from "../ticket/ticketForm/ticketForm";


const Page = props => (
  <Container>
    <HeaderC></HeaderC>
    {/* <AdminLogin></AdminLogin> */}
    <TicketForm></TicketForm>
    {/* {props.children} */}
    <Footer anything={"Footer"} />
  </Container>
);

export default Page;
