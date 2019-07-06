import React, { Component } from "react";

import axios from "axios";


import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Container,
    CardHeader,
    FormGroup,
    Input,
    Row,
    Label,
    Col,
    Button,
    Form
} from "reactstrap";
import Select from "react-select";
import CardIcon from "./CardElements/CardIcon"
import CustomButton from './CustomButton/CustomButton';
import Search from "./Search";
import styles from "./styles";

var selectOptions = [
];

class EditProfile extends Component {

    constructor() {
        super();

        this.state = {
          createdAt : '',
          editedAt : '',
          name : '',
          college : '',
          position : '',
          image : '',
          team : 0,
          id : 0
        };
    }

    changeName(evt){
      this.setState({
        name : evt.target.value
      });
    }
    
    changeCollege(evt){
      this.setState({
        college : evt.target.value
      });
    }
    
    changePosition(evt){
      this.setState({
        position : evt.target.value
      });
    }

    changeTeam(value){
      console.log(value["value"]);
      this.setState({
        team : value["value"]
      });
    }

    render() {
      if (this.state.id == 0){
        let playerId = this.props.match.params.playerId;
        console.log(playerId);
        this.setState({
          id : playerId,
        });
        this.getPlayerInfo(playerId);
      }
      
        return (
            <div>
        <div className="full-page-content">
          <div className="pricing-page">
            <Container>
              <Row>
                <Col xs={12} md={6} className="ml-auto mr-auto text-center">
                  <h2 className="title"><a href="/">Player Profile</a></h2>
                </Col>
              </Row>
              <Row>
              <Container>
              <Col lg={8} md={8} xs={12} className="mr-auto ml-auto">
                <Card className=" text-center">
                  <CardHeader>
                    <img src={('http://localhost:3008/' + this.state.image)} alt="avatar-img" />
                  </CardHeader>
                  <CardBody>
                    <CardTitle></CardTitle>
                    <Form className="form-horizontal">
                   <Row>
                      <Label md={3}>Player Name</Label>
                      <Col xs={12} md={9}>
                        <FormGroup>
                          <Input type="text" value={this.state.name} onChange={evt => this.changeName(evt)} />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md={3}>College</Label>
                      <Col xs={12} md={9}>
                        <FormGroup>
                          <Input type="text" value={this.state.college} onChange={evt => this.changeCollege(evt)} />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md={3}>Position</Label>
                      <Col xs={12} md={9}>
                        <FormGroup>
                          <Input type="text" value={this.state.position} onChange={evt => this.changePosition(evt)} />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                    <Label md={3}>Team name</Label>
                      <Col xs={12} md={9}>
                          <Select
                            className="primary"
                            placeholder="Single Select"
                            name="singleSelect"
                            value={this.state.team}
                            options={selectOptions}
                            onChange={value =>
                              this.changeTeam(value)
                            }
                          />
                        </Col>
                    </Row>

                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" size="lg" round onClick={e => this.submitHandler(e)}>
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Container>
              </Row>
            </Container>
          </div>
        </div>
      </div>
        );
    }

    submitHandler = e => {
      e.preventDefault();
      var date = Date();
      this.state.editedAt = date;
      fetch('http://localhost:3008/players?id=' + this.state.id,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
    }).then(response => {
          alert("Success saved!");
            console.log(response)
        })
        .catch(error =>{
          alert("Fail saved!");
            console.log(error)
        })
    }

    getPlayerInfo (id) {
      axios
      .get('http://localhost:3008/players?id=' + id)
      .then(res => {
          this.setState({ name: res.data[0]["name"],
          college : res.data[0]["college"],
          image : res.data[0]["image"],
          createdAt : res.data[0]["createdAt"],
          editedAt : res.data[0]["editedAt"],
          position : res.data[0]["position"],
          team : res.data[0]["team"]});
      });
    }

    componentDidMount() {
      axios
      .get('http://localhost:3008/teams')
      .then(res => {
        for (var i = 0;i < res.data.length;i ++){
          selectOptions.push({value : res.data[i]["id"], label : res.data[i]["name"]})
        }
        
      });

  }

}


export default EditProfile;
