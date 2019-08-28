import { Grid, Image, Container } from "semantic-ui-react";

import Footer from "../../components/footer/footer";

import HeaderC from "../header/header";

const Page = props => (
  <Container>
    <HeaderC></HeaderC>
    {/* {props.children} */}
    <Footer anything={"Footer"} />
  </Container>
);

export default Page;
