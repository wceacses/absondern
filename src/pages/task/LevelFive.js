import React, { Component } from 'react'
import {firestore} from '../../firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import {Link} from 'react-router-dom'
import {Button,Jumbotron, Row,Col} from 'react-bootstrap'
import {reactLocalStorage} from 'reactjs-localstorage'
import './styles/LevelFive.scss'

export default class LevelOne extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userAnswer: ''
        };
      }
    
    
    handleHint=async ()=>{
            const {id}=this.props;
            let {hint,score,submitAnswer,showAnswer}=this.props;

            if(hint)
            {
                if((!submitAnswer[4])&&(!hint[4])&&(!showAnswer[4]))
                {
                    hint[4]=new Date();
                    const userRef=firestore.doc(`users/${id}`);       
                    await userRef.update({hint,score:score-5});
                }
            }
            
    }

    handleShowAnswer=async ()=>{
        const {id}=this.props;
        let {score,submitAnswer,showAnswer}=this.props;
        const tmpVal=reactLocalStorage.get('timer');

        if(showAnswer&&tmpVal)
        {
            if((!submitAnswer[4])&&(!showAnswer[4])&&(tmpVal<=3900))
            {
                showAnswer[4]=new Date();
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
        // const userRef=firestore.doc(`answers/4`);       
        // const {level1}=await (await userRef.get()).data();
        // //console.log(level1);
        if(this.props.correctAnswer===this.state.userAnswer)
        {
           
                    const {id,showAnswer}=this.props;
                    let {submitAnswer,score}=this.props;
                   
                    if(showAnswer)
                    {
                        if(!showAnswer[4]&&!submitAnswer[4])
                        {
                            submitAnswer[4]=new Date();
                            //console.log(showAnswer[4]);
                            const userRef=firestore.doc(`users/${id}`);       
                            await userRef.update({submitAnswer,score:score+10});
                        }  
                    }
                    
            alert("Congratulations your answer is correct, You can move to Next Question now");
        }
        else
            alert("Ohh No Your Answer Is wrong Try to take hint/show answer if you are stuck. It comes with penalty ");
    }  

    render() {
        // const {id}=this.props;
        const {showAnswer,submitAnswer,hint} =this.props;
        const {story,question,dataString,correctAnswer}=this.props
        
        return (
            <Jumbotron className='five-task-page'>
                <div className="inside-book">
                   <Row>
                    <Col className='hero-image-container'>
                        <div className="hero-image">
                            <div className="hero-text">
                                <pre>{story}</pre>                    
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
               
               {/* {//console.log(this.props)} */}
              
               {/* <Row><h3>{question}</h3></Row> */}
               <div className="outside-book">
                    {
                        hint?(hint[4]?<Row><h3>The Hint Is:{dataString}</h3></Row>:null):null
                    }
                    {
                        showAnswer?(showAnswer[4]?<Row><h3>The Answer Is:{correctAnswer}</h3></Row>:null):null
                    }
                    <Button variant="success" style={{margin:'0px 5px'}} onClick={this.handleUserAnswer}>Check Answer</Button>
                    <Button variant="warning" style={{margin:'0px 5px'}} onClick={this.handleHint}>Hint Please</Button>
                    <Button variant="danger" style={{margin:'0px 5px'}} onClick={this.handleShowAnswer}>Show Answer</Button>
                    {
                        showAnswer?(<Button variant="outline-primary" style={{margin:'0px 5px'}}><Link to='/nightofdarkness'> Previous Question</Link></Button>):null
                    }
                    {
                     showAnswer?(showAnswer[4]?<Button variant="success" style={{margin:'0px 5px'}}><Link to='/endgame'> Next Question</Link></Button>:(submitAnswer?(submitAnswer[4]?<Button variant="success" style={{margin:'0px 5px'}}><Link to='/endgame'> Next Question</Link></Button>:null):null)):null
                    }
                </div>
               
            </Jumbotron>
        )
    }
}
