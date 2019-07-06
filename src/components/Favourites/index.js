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

class Favourites extends Component {

    constructor() {
        super();

        this.state = {
          playerInfo : [],
          favouriteCount : []
        };
    }

    render() {
      
      const {playerInfo, favouriteCount} = this.state;
        return (  <div>
          <div className="full-page-content">
          <div className="pricing-page">
            <Container>
              <Row>
                <Col xs={12} md={6} className="ml-auto mr-auto text-center">
                  <h2 className="title"><a href="/">Favourites</a></h2>
                </Col>
              </Row>
                  <Row>
                    
              {playerInfo.map((person, index) => 
                    <Col xs={12} md={6} lg={2}>
                    <Card className="card-pricing">
                     <Row>
                            <Col xs={12} md={12} lg={12}>
                            <h6 className="card-category"> {'favourites : ' + favouriteCount[index]}</h6>
                            </Col>
                            </Row>
                        <CardBody>
                        <CardIcon
                            color="warning"
                            path={('http://localhost:3008/' + person.image)}
                        />
                        <ul>
                            <li> {person.name}</li>
                        </ul>
                        </CardBody>
                    </Card>
                    </Col>
                )}
              </Row>
            </Container>
          </div>
        </div>
      </div>
        );
    }

    async get_favourites(param)
    {
        const [response] = await Promise.all([
            axios.get('http://localhost:3008/favourites/'+param)
        ]);

        return response.data;
    }

    async get_player(param)
    {
        const [response] = await Promise.all([
            axios.get('http://localhost:3008/players/'+param)
        ]);

        return response.data;
    }

    async componentDidMount() {

      await axios
        .get('http://localhost:3008/favourites?_sort=count&_order=desc')
        .then(async (res) => {
          console.log(res.data);
          for (var i = 0;i < res.data.length;i ++){
            let cnt = res.data[i]["count"];
            if (cnt != undefined){
              this.setState({
                favouriteCount: [ ...this.state.favouriteCount, 
                    cnt
                ],
              });

              let result = await this.get_player(res.data[i]["id"]);
              this.setState({
                  playerInfo: [ ...this.state.playerInfo, 
                      result
                  ],
              });

            }  
          }
        });
        
        
    }

}


export default Favourites;
