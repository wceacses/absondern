import React, { Component } from 'react'
import {firestore} from '../../firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import {Link} from 'react-router-dom'
import {Button,Jumbotron, Row,Col} from 'react-bootstrap'
import {reactLocalStorage} from 'reactjs-localstorage'
import './styles/LevelOne.scss'

export default class LevelOne extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userAnswer: '',
          currentQuestion: {},
          index:0,
        };
      }
    
    
    handleHint=async ()=>{
            const {id}=this.props;
            let {hint,score,submitAnswer,showAnswer}=this.props;

            if(hint)
            {
                if((!submitAnswer[0])&&(!hint[0])&&(!showAnswer[0]))
                {
                    hint[0]=new Date();
                    const userRef=firestore.doc(`users/${id}`);       
                    await userRef.update({hint,score:score-5});
                }
            }
            
    }

    handleShowAnswer=async ()=>{
        const {id}=this.props;
        let {showAnswer,score,submitAnswer}=this.props;
        const tmpVal=reactLocalStorage.get('timer');

        if(showAnswer&&tmpVal)
        {
            if((!submitAnswer[0])&&(!showAnswer[0])&&(tmpVal<=5100))
            {
                showAnswer[0]=new Date();
                const userRef=firestore.doc(`users/${id}`);       
                await userRef.update({showAnswer,score:score-10});
            }
        }
       
    }

    handleChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value.toLowerCase() });
      };

    handleUserAnswer =async ()=>{
        if(this.props.qha[this.state.index].correctAnswer===this.state.userAnswer)
        {
           
                    const {id,showAnswer}=this.props;
                    let {submitAnswer,score}=this.props;
                   
                    if(showAnswer)
                    {
                        if(!showAnswer[0]&&!submitAnswer[0])
                        {
                            submitAnswer[0]=new Date();
                            console.log(showAnswer[0]);
                            const userRef=firestore.doc(`users/${id}`);       
                            await userRef.update({submitAnswer,score:score+10});
                        }  
                    }
                    
            alert("Congratulations your answer is correct, You can move to next level now");
        }
        else
            alert("Ohh No Your Answer Is wrong Try to take hint/show answer if you are stuck. It comes with penalty ");
    }  

    render() {
        // const {id}=this.props;
        const {showAnswer,submitAnswer,hint} =this.props;
        var index = this.state.index
        const {story,qha}=this.props
        const {question,dataString,correctAnswer} = qha[index];
        return (
            <Jumbotron className='one-task-page'>
                <div className="inside-book">
                    <Row>
                        <Col className='hero-image-container'>
                            <div className="hero-image">
                                <div className="hero-text">
                                    <pre>{story}</pre>                    
                                    <audio controls>
                                        <source src="" type="audio/mpeg"/>
                                    </audio>
                                </div>
                            </div>
                            
                        </Col>
                    </Row>
                    <FormInput
                        type='text'
                        name='userAnswer'
                        value={this.state.userAnswer}
                        onChange={this.handleChange}
                        label={`${question}`}
                    />
                </div>
               
              
               <div className="outside-book">
                    {
                        hint?(hint[index]?<Row><h3>The Hint Is:{dataString}</h3></Row>:null):null
                    }
                    {
                        showAnswer?(showAnswer[index]?<Row><h3>The Answer Is:{correctAnswer}</h3></Row>:null):null
                    }
                    <Button variant="success" style={{margin:'0px 5px'}} onClick={this.handleUserAnswer}>Check Answer</Button>
                    <Button variant="warning" style={{margin:'0px 5px'}} onClick={this.handleHint}>Hint Please</Button>
                    <Button variant="danger" style={{margin:'0px 5px'}} onClick={this.handleShowAnswer}>Show Answer</Button>
                    {
                     showAnswer?(showAnswer[index]?<Button variant="success" style={{margin:'0px 5px'}}>{/*<Link to='/dejavu'> Next Level</Link>*/} </Button>:(submitAnswer?(submitAnswer[index]?<Button variant="success" style={{margin:'0px 5px'}}><Link to='/dejavu'> Next Level</Link></Button>:null):null)):null
                    }
                </div>
               
            </Jumbotron>
        )
    }
}
