import React from "react";
import {
    Form,
    CardBody,
    Input,
    Label
  } from "reactstrap";
import styles from "./styles";

class Search extends React.Component {

    constructor(props) {
        super(props);
      }

        render() {
            return <CardBody>
                  <Form>
                  <Input placeholder="Search..." value={this.props.searchText} onChange={evt => this.props.changeSearchText(evt)} />
                  </Form>
                </CardBody>
      }
      
};

export default Search;
