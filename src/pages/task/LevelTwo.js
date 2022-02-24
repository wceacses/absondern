import React, { Component } from 'react'
import { firestore } from '../../firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import { Link } from 'react-router-dom'
import { Button, Jumbotron, Row, Col } from 'react-bootstrap'
import { reactLocalStorage } from 'reactjs-localstorage'
import './styles/LevelTwo.scss'
import { auth, createUserProfileDocument } from './../../firebase/firebase.utils';

export default class LevelOne extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userAnswer: '',
            currentQuestionArray: {},
            index: 0,
        };
    }

    componentDidMount() {
        setTimeout(() =>{
            document.getElementById('showbutton').removeAttribute('style');
        },180000)
        auth.onAuthStateChanged(async userAuth => {

            if (userAuth) {
                const Ref = await createUserProfileDocument(userAuth);

                Ref.levelRef.doc('level2').onSnapshot(async snapShot => {
                    //console.log(snapShot.data());
                    await this.setState({
                        currentQuestionArray: {
                            ...snapShot.data()
                        }
                    });
                });
            } else {
                // this.setState({ currentUser: userAuth });
            }


        });
    }



    handleHint = async () => {
        const { id } = this.props;
        const i = this.state.index;
        let { hint, score, submitAnswer, showAnswer } = this.state.currentQuestionArray;

        if (hint) {
            if ((!submitAnswer[i]) && (!hint[i]) && (!showAnswer[i])) {
                hint[i] = new Date();
                const userRef = firestore.doc(`users/${id}`).collection("level").doc('level2');
                await userRef.update({ hint, score: score - 5 });
                const timeRef =  firestore.doc(`users/${id}`);
                const tg = await timeRef.get();
                const oldScore = tg.data().score;
                await timeRef.update({ score: oldScore - 5 });
            }
        }

    }

    handleShowAnswer = async () => {
        const { id } = this.props;
        const i = this.state.index;
        let { showAnswer, score, submitAnswer } = this.state.currentQuestionArray;
        const tmpVal = reactLocalStorage.get('timer');

        if (showAnswer && tmpVal) {
            if ((!submitAnswer[i]) && (!showAnswer[i]) && (tmpVal <= 5100)) {
                showAnswer[i] = new Date();
                const userRef = firestore.doc(`users/${id}`).collection("level").doc('level2');
                await userRef.update({ showAnswer, score: score - 10 });
                const timeRef =  firestore.doc(`users/${id}`);
                const tg = await timeRef.get();
                const oldScore = tg.data().score;
                await timeRef.update({ score: oldScore - 10 });
            }
        }

    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value.toLowerCase() });
    };

    updateIndex = (event) => {
        //console.log(this.state.index, this.props.qha.length)
        if (this.props.qha.length > this.state.index + 1) {
            var index1 = this.state.index + 1;
            this.setState({ index: index1 });
        } else {
            window.location.href = '/manyokshi'
        }
    }

    DecIndex = (event) => {
        if (0  < this.state.index ) {
            var index1 = this.state.index - 1;
            this.setState({ index: index1 });
        } else {
            window.location.href = '/manyokshi'
        }
    }

    handleUserAnswer = async () => {
        if (this.props.qha[this.state.index].correctAnswer === this.state.userAnswer || this.props.qha[this.state.index].correctAnswer === this.state.optionalAnswer) {

            const { id  } = this.props;
            let { submitAnswer, score ,showAnswer } = this.state.currentQuestionArray;
            const i = this.state.index;
            //console.log(showAnswer)
            if (showAnswer) {

                if (!showAnswer[i] && !submitAnswer[i]) {
                    submitAnswer[i] = new Date();
                    //console.log(showAnswer[i]);
                    const userRef = firestore.doc(`users/${id}`).collection("level").doc('level2');
                    const test = await userRef.update({ submitAnswer, score: score + 10 });
                    const timeRef =  firestore.doc(`users/${id}`);
                    const tg = await timeRef.get();
                    const oldScore = tg.data().score;
                    await timeRef.update({ score: oldScore + 10 });
                }
            }
            this.setState({ userAnswer: '' });
            alert("Congratulations your answer is correct, You can move to next question now");
            if (this.props.qha.length > this.state.index + 1) {
                var index1 = this.state.index + 1;
                this.setState({ index: index1 });
            } else {
                window.location.href = '/kinyokshi'
            }
        }
        else
            alert("Ohh No Your Answer Is wrong Try to take hint/show answer if you are stuck. It comes with penalty ");
    }

    render() {
        const { id } = this.props;
        const { showAnswer, submitAnswer, hint } = this.state.currentQuestionArray;
        var index = this.state.index
        console.log(index);
        const { story, qha } = this.props
        const { question, dataString, correctAnswer } = qha[index];
        return (
            <Jumbotron className='two-task-page'>
                <div className="inside-book">
                    <Row>
                        <Col className='hero-image-container'>
                            <div className="hero-image">
                                <div className="hero-text" style={{textAlign: 'center'}}>
                                    <pre>{story}</pre>
                                    <audio controls>
                                        <source src="https://firebasestorage.googleapis.com/v0/b/test-50de2.appspot.com/o/Part%202.mp3?alt=media&token=1c2252ed-a6b4-4dc8-b389-c6cc384e4632" type="audio/mpeg" />
                                    </audio>
                                    {index === 3?<div>
                                        <img style={{width: '100%', height: ''}} src="https://firebasestorage.googleapis.com/v0/b/test-50de2.appspot.com/o/11.jpeg?alt=media&token=02886fde-f73f-42a2-b1ee-a4c748c2468f" alt="question"/>
                                        <h2>Or you can see it <a href="https://firebasestorage.googleapis.com/v0/b/test-50de2.appspot.com/o/11.jpeg?alt=media&token=02886fde-f73f-42a2-b1ee-a4c748c2468f">Here</a> </h2>
                                    </div>:null}
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
                        hint ? (hint[index] ? <Row><h3>The Hint Is:{dataString}</h3></Row> : null) : null
                    }
                    {
                        showAnswer ? (showAnswer[index] ? <Row><h3>The Answer Is:{correctAnswer}</h3></Row> : null) : null
                    }
                    {
                        showAnswer?(<Button variant="outline-primary" onClick={this.DecIndex} style={{margin:'0px 5px'}}>Previous Part</Button>):null
                    }
                    <Button variant="danger" id="showbutton" style={{ margin: '0px 5px',display:'none' }} onClick={this.handleShowAnswer}>Show Answer</Button>
                    <Button variant="warning" style={{ margin: '0px 5px' }} onClick={this.handleHint}>Hint Please</Button>
                    <Button variant="success" style={{ margin: '0px 5px' }} onClick={this.handleUserAnswer}>Check Answer</Button>
                    {
                        showAnswer ?
                            (showAnswer[index]
                                ? <Button variant="secondary" onClick={this.updateIndex} style={{ margin: '0px 5px' }}>
                                    {/*<Link to='/sciyokshi'> Next Question</Link>*/}
                                    Next question
                                </Button> :
                                (submitAnswer ?
                                    (submitAnswer[index] ?
                                        <Button variant="secondary" onClick={this.updateIndex} style={{ margin: '0px 5px' }}>
                                            {/* <Link to='/sciyokshi'> Next Question</Link> */}
                                            Next question
                                        </Button>
                                        : null) : null)) : null
                    }
                </div>

            </Jumbotron>
        )
    }
}
