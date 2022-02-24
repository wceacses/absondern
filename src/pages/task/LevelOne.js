import React, { Component } from 'react'
import { firestore } from '../../firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import { Link } from 'react-router-dom'
import { Button, Jumbotron, Row, Col } from 'react-bootstrap'
import { reactLocalStorage } from 'reactjs-localstorage'
import './styles/LevelOne.scss'
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
        auth.onAuthStateChanged(async userAuth => {

            if (userAuth) {
                const Ref = await createUserProfileDocument(userAuth);

                Ref.levelRef.doc('level1').onSnapshot(async snapShot => {
                    console.log(snapShot.data());
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
                const userRef = firestore.doc(`users/${id}`).collection("level").doc('level1');
                await userRef.update({ hint, score: score - 5 });
                const timeRef = await firestore.doc(`users/${id}`).get();
                const oldTime = timeRef.data().score;
                await firestore.doc(`users/${id}`).update({ score: oldTime - 5 });
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
                const userRef = firestore.doc(`users/${id}`).collection("level").doc('level1');
                await userRef.update({ showAnswer, score: score - 10 });
                const timeRef = await firestore.doc(`users/${id}`).get();
                const oldTime = timeRef.data().score;
                await firestore.doc(`users/${id}`).update({ score: oldTime - 10 });
            }
        }

    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value.toLowerCase() });
    };

    updateIndex = (event) => {
        console.log(this.state.index, this.props.qha.length)
        if (this.props.qha.length > this.state.index + 1) {
            var index1 = this.state.index + 1;
            this.setState({ index: index1 });
        } else {
            window.location.href = '/dejavu'
        }
    }

    handleUserAnswer = async () => {
        if (this.props.qha[this.state.index].correctAnswer === this.state.userAnswer) {

            const { id } = this.props;
            let { submitAnswer, score, showAnswer } = this.state.currentQuestionArray;
            const i = this.state.index;
            console.log(showAnswer)
            if (showAnswer) {

                if (!showAnswer[i] && !submitAnswer[i]) {
                    submitAnswer[i] = new Date();
                    console.log(showAnswer[i]);
                    const userRef = firestore.doc(`users/${id}`).collection("level").doc('level1');
                    const test = await userRef.update({ submitAnswer, score: score + 10 });
                    const timeRef = firestore.doc(`users/${id}`);
                    const tg = await timeRef.get();
                    const oldScore = tg.data().score;
                    await timeRef.update({ score: score + 10 });
                }
            }
            this.setState({ userAnswer: '' });
            alert("Congratulations your answer is correct, You can move to next level now");
        }
        else
            alert("Ohh No Your Answer Is wrong Try to take hint/show answer if you are stuck. It comes with penalty ");
    }

    render() {
        const { id } = this.props;
        const { showAnswer, submitAnswer, hint } = this.state.currentQuestionArray;
        var index = this.state.index
        const { story, qha } = this.props
        const { question, dataString, correctAnswer } = qha[index];
        return (
            <Jumbotron className='one-task-page'>
                <div className="inside-book">
                    <Row>
                        <Col className='hero-image-container'>
                            <div className="hero-image">
                                <div className="hero-text">
                                    <pre>{story}</pre>
                                    <audio controls>
                                        <source src="https://firebasestorage.googleapis.com/v0/b/crwn-db-e8117.appspot.com/o/Part%201-testing.mp3?alt=media&token=3c70a204-3363-4996-88b4-52e5dfde4741" type="audio/mpeg" />
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
                        hint ? (hint[index] ? <Row><h3>The Hint Is:{dataString}</h3></Row> : null) : null
                    }
                    {
                        showAnswer ? (showAnswer[index] ? <Row><h3>The Answer Is:{correctAnswer}</h3></Row> : null) : null
                    }
                    
                    <Button variant="danger" style={{ margin: '0px 5px' }} onClick={this.handleShowAnswer}>Show Answer</Button>
                    <Button variant="warning" style={{ margin: '0px 5px' }} onClick={this.handleHint}>Hint Please</Button>
                    <Button variant="success" style={{ margin: '0px 5px' }} onClick={this.handleUserAnswer}>Check Answer</Button>
                    {
                        showAnswer ?
                            (showAnswer[index]
                                ? <Button variant="success" onClick={this.updateIndex} style={{ margin: '0px 5px' }}>
                                    {/*<Link to='/dejavu'> Next Level</Link>*/}
                                    Next Level
                                </Button> :
                                (submitAnswer ?
                                    (submitAnswer[index] ?
                                        <Button variant="success" onClick={this.updateIndex} style={{ margin: '0px 5px' }}>
                                            {/* <Link to='/dejavu'> Next Level</Link> */}
                                            Next Level
                                        </Button>
                                        : null) : null)) : null
                    }
                </div>

            </Jumbotron>
        )
    }
}
