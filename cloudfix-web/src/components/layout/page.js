import { Grid, Image, Container } from "semantic-ui-react";

import Footer from "../../components/footer/footer";

import HeaderC from "../header/header";
import TicketForm from "../ticket/ticketForm/ticketForm";

const Page = props => (
  <Container>
    <HeaderC></HeaderC>
    <TicketForm></TicketForm>
    {/* {props.children} */}
    {/* <Footer anything={"Footer"} /> */}
  </Container>
);

export default Page;
