import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Jumbotron } from 'react-bootstrap'
import './rules.scss'
export default function rules() {
    return (
        <Jumbotron className='rules-page-container'>
            <div className='rules-page-inner'>
                <h3><strong>IMP:  Use laptop or Desktop and prefer latest version of Google CHROME.If you are using mobile device then start website in desktop mode for better experience.
                </strong> </h3>

                <h1>Rules:</h1>
                1. Story comprises of three parts. A participant can move from one part to another only after successful submission of answer of the corresponding part.
                <br /><br />
                2. The current score gets incremented by 10 after successful submission of answers for their respective question. However :
                <br /> <br />&nbsp;&nbsp; • Using hint for any part reduces the current score by 5
                <br /> <br />&nbsp;&nbsp; • If you are not able to find an answer, you can view the answer using Show Answer Button. which will be enable after 3 minutes for each question. but then the current score gets reduced by 10 and then you are not able to submit the following answer and you will be directed towards the next part.

                <br /> <br />
                3. So the max score for the round is 120 . i.e 10 marks for each question
                Conclusion part’s score will be hidden and will be allotted by judges.
                <br /> <br />
                4. The time for completing the entire round is 1 hour, which should be completed within the 9-11 PM slot in which extra 5 minutes have been given for reading the rules. Any answer submitted after 11 PM will not be taken into consideration as we will block our database for any request made post 11PM
                <br /> <br />
                5. Individual tracks of students are being maintained. Any suspicious activity like submitting two answers within a very short span will be taken into consideration and that candidate’s participation will be debarred.
                <br /> <br />
                6. Any scene of plagiarism will be checked and if one is found to do so, participant will be debarred.
                <br /> <br />
                <Button style={{ margin: '10px' }}> <Link to='manyokshi'>Start Now</Link></Button>
            </div>

        </Jumbotron>
    )
}
