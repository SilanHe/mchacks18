import React, { Component } from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { Container, Row, Col } from 'reactstrap';
import 'rc-slider/assets/index.css';
import "./Graph.css";


class FrequencyGraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            slicedWordCount: props.sortedWordCount.slice(0,10),
            sortedWordCount: props.sortedWordCount
        };
    }

    listWords(value){
        this.setState({ slicedWordCount: this.props.sortedWordCount.slice(0,value) });
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Slider defaultValue={10} min={0} max={50}
                                    onChange={this.listWords.bind(this)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ul className='ul'>
                                {(this.state.slicedWordCount).map(item =>
                                    <li className='ul li' key={item[0]}> {item[1]} | {item[0]}</li> )}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default FrequencyGraph;