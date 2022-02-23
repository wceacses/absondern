import React from 'react'
import {Link} from 'react-router-dom'
import {Button,Jumbotron} from 'react-bootstrap'
import './rules.scss'
export default function rules() {
    return (
        <Jumbotron className='rules-page-container'>
            <div className='rules-page-inner'>
                <h3><strong>IMP:  If you are using mobile device then start website in desktop mode for better experience.For laptop or Desktop,
                    users should prefer latest version of Google CHROME.
                    </strong> </h3>

            <h1>Rules:</h1>
            1.	Story comprises of six parts. A participant can move from one part to another only after successful submission of answer of the corresponding part.<br></br>
            2.	Out of six parts, the first five parts comprises of one word answer and the final part consist of conclusion box in which the participant has to provide the most appropriate conclusion to the story<br></br>
            3.	For the first five parts the current score gets incremented by 10 after successful submission of answer for their respective part. However :<br></br>
            •	Using hint for any part reduces the current score by 5 <br></br>
            •	If you are not able to find any answer, you can view the answer but then the current score then gets reduced by 10 and then you are not able to submit the following answer and you will be directed towards the next part.<br></br>
            •   Show Answer Button can be used only after 85 min of your timer for level 1, 80min for level 2,75min for level 3,70min for level 4,65 min for level 5.
                This is done to avoid malpractices.<br></br>
            4.	So the max score for the event is 80 . i.e 50 for the first five parts and 30 for the last part or conclusion box. Conclusion part’s score will be hidden and will be allotted by judges.<br></br>
            Contestant with the max score will be declared as winner.<br></br>
            5.	The time for completing the entire event is 1 hour 35 minutes, which should be completed within 9-11 PM slot in which extra 5 minutes have been given for reading the rules. Any answer submitted after 11 PM will not be taken into consideration as we will block our database for any request made post 11PM<br></br>
            6.	Individual track of students are being maintained .Any suspicious activity like submitting two answer within a very short span will be taken into consideration and that candidate’s participation will be debarred.<br></br>
            7.	Any scene of plagiarism(exact copy of other’s answer) will be checked and if one is found to do so, he will be debarred.<br></br>
            
            <Button style={{margin:'10px'}}> <Link to='theroyalmurder'>Start Now</Link></Button>
            </div>
            
        </Jumbotron>
    )
}
