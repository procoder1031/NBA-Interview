import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Container,
    Row,
    Col,
    Button,
    Input,
} from "reactstrap";

import CardIcon from "./CardElements/CardIcon"
import CustomButton from './CustomButton/CustomButton';
import Search from "./Search";
import styles from "./styles";

var favouriteState = ['','','','','','','',''
];

class Main extends Component {

    constructor() {
        super();
        this.state = {
            playerInfo: [],
            teamInfo: [],
            searchText: '',
            favouriteCount : [],
            _page_limit:13,
            currentPage : 0
        };
    }

    changeSearchText = (evt) => {
        var cp = this.state.currentPage;
        this.limitPerPage(0, 8, 0, evt.target.value);
        this.setState({
            searchText: evt.target.value,
            currentPage : 0
          });
    }

    async limitPerPage (begin, end, increase, search) {
        await axios
        .get('http://localhost:3008/players?_start='+begin+'&_end=' + end + '&q=' + search)
        .then(async (res) => {
            this.setState({ playerInfo: res.data,
            currentPage : this.state.currentPage + increase});
            this.setState({teamInfo : []});
            this.setState({favouriteCount : []});
             
            for (var i = 0;i < res.data.length;i ++){          
                let result = await this.get_teaminfo(res.data[i]["team"]);
                this.setState({
                    teamInfo: [ ...this.state.teamInfo, 
                        result
                    ],
                });

                let cnt = await this.get_favourites(res.data[i]["id"]);
                if (cnt == undefined)
                    cnt = '';
                this.setState({
                    favouriteCount: [ ...this.state.favouriteCount, 
                        cnt
                    ],
                });
            
             }
             console.log(this.state.favouriteCount);
             
        });
    }

    changeFavouriteCnt(evt){

        var id = evt.target.id;
        var playerId = document.getElementById(id).getAttribute("data-id");
        var datanum = document.getElementById(id).getAttribute("data-num");

        var data = {id : playerId, count : evt.target.value};

        let values = this.state.favouriteCount;

        values[datanum] = evt.target.value;
        this.setState({
            favouriteCount : values
        });

        fetch('http://localhost:3008/favourites?id=' + playerId,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
     }).then(response => {
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })

    }

    changeFavouriteState(e){
        var id = e.target.id;
        if (favouriteState[id] == 0){
            favouriteState[id] = 1;
            document.getElementById("favCnt" + id).removeAttribute('readOnly');
            document.getElementById("favCnt" + id).removeAttribute('hidden');
        }
        else{
            favouriteState[id] = 0;
            document.getElementById("favCnt" + id).setAttribute('readOnly', 'readOnly');
            document.getElementById("favCnt" + id).setAttribute('hidden', 'hidden');
        }
    }

    _renderLinks() {
        var cp = this.state.currentPage;
        var search = this.state.searchText;
        if (cp == 0) {
          // show only "Page 1" and "Next"
          return (
            <Col xs={12} md={6} lg={6}>
            <CardBody>
            <Button leftLabel="now-ui-icons ui-1_check">
            Page 1
            </Button>
            <Button color="success" onClick={() => this.limitPerPage(8, 16, 1, search)} leftLabel="now-ui-icons ui-1_check">
            Next
            </Button>
            </CardBody>
            </Col>
          )
        } else if (cp < this.state._page_limit - 1) {
          // show "Back", "Page X" and "Next"
          return (
            
            <Col xs={12} md={6} lg={6}>
            <CardBody>
            <Button color="warning" onClick={() => this.limitPerPage((cp-1) * 8, (cp * 8), -1, search)} leftLabel="now-ui-icons ui-1_check">
            Back
            </Button>
            <Button leftLabel="now-ui-icons ui-1_check">
            Page {(cp + 1)}
            </Button>
            <Button color="success" onClick={() => this.limitPerPage((cp+1) * 8, (cp+2) * 8, 1, search)} leftLabel="now-ui-icons ui-1_check">
            Next
            </Button>
            </CardBody>
            </Col>
          )
        } else {
          // show "Back", "Page X" and "Next"
          return (
            <Col xs={12} md={6} lg={6}>
            <CardBody>
            <Button color="warning" onClick={() => this.limitPerPage((cp-1) * 8, (cp * 8), -1, search)} leftLabel="now-ui-icons ui-1_check">
            Back
            </Button>
            <Button leftLabel="now-ui-icons ui-1_check">
            Page {(cp + 1)}
            </Button>
            </CardBody>
            </Col>
          )
        }
      }

    render() {
        const {playerInfo, teamInfo, favouriteCount, _page_limit, currentPage} = this.state;
        return (
            <div>
        <div className="full-page-content">
          <div className="pricing-page">
            <Container>
              <Row>
                <Col xs={12} md={6} className="ml-auto mr-auto text-center">
                  <h2 className="title">NBA Interview</h2>
                </Col>
              </Row>
              <Row>
              {this._renderLinks()}
              
              <Col xs={12} md={6} lg={3}>
              </Col>
              <Col xs={12} md={6} lg={3}>
                <Search
                 searchText = {this.state.searchText}
                 changeSearchText={this.changeSearchText}/>
              </Col>
              </Row>
              <Row>
              
              {playerInfo.map((person, index) => 
                    <Col xs={12} md={6} lg={3}>
                    <Card className="card-pricing">
                        <Row>
                            
                        <Col xs={12} md={6} lg={4}></Col>
                        <Col xs={12} md={6} lg={4}>
                        <h6 className="card-category"> {person.position}</h6>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                            <Link to={('/favourite')} className="btn btn-warning btn-sm" round>{favouriteCount[index]}</Link>
                            <Input hidden id={('favCnt' + index)} data-num={index} data-id={person.id} type="text" value={favouriteCount[index]} readOnly onChange={evt => this.changeFavouriteCnt(evt)} />
                        </Col>
                        </Row>
                        <CardBody>
                        <CardIcon
                            color="warning"
                            path={('http://localhost:3008/' + person.image)}
                        />
                        <CardTitle tag="h3">{person.name}</CardTitle>
                        <ul>
                            <li>College : {person.college}</li>
                            <li>Team : {teamInfo[index]}</li>
                        </ul>
                        </CardBody>
                        <CardFooter>
                        <Link to={('/edit/' + person.id)} className="btn btn-primary" round>Edit</Link>
                        <Button id={index} onClick={(e) => this.changeFavouriteState(e)} className="btn btn-success">Favo</Button>
                        </CardFooter>
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

    async get_teaminfo(param)
    {
        const [response] = await Promise.all([
            axios.get('http://localhost:3008/teams/'+param)
        ]);

        return response.data["name"];
    }

    async get_favourites(param)
    {
        const [response] = await Promise.all([
            axios.get('http://localhost:3008/favourites/'+param)
        ]);

        return response.data["count"];
    }

    async componentDidMount() {
        await axios
        .get('http://localhost:3008/players?_start=0&_end=8')
        .then(async (res) => {
            this.setState({ playerInfo: res.data,
            currentPage : this.state.currentPage + 0});
            this.setState({teamInfo : []});
            this.setState({favouriteCount : []});
             
            for (var i = 0;i < res.data.length;i ++){          
                let result = await this.get_teaminfo(res.data[i]["team"]);
                this.setState({
                    teamInfo: [ ...this.state.teamInfo, 
                        result
                    ],
                });

                let cnt = await this.get_favourites(res.data[i]["id"]);
                if (cnt == undefined)
                    cnt = 0;
                this.setState({
                    favouriteCount: [ ...this.state.favouriteCount, 
                        cnt
                    ],
                });
            
             }
             
             
        });
        

    
    }
}


export default Main;
