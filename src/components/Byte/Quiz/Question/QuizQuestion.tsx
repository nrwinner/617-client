import * as React from 'react';
import { QuestionType } from '../../../../types';

// Redux
import { connect } from 'react-redux';

type Props = {
    question: QuestionType;
    section: string;
    selectHandler: any;
}

const QuizQuestion = (props: Props) => { 
    return (
        <div className="quiz-question">
            <div className="quiz-title">{ props.question.text }</div>
            <div className="quiz-options">
                {  Array.from(props.question.options, ([key, value]) => [key, value]).map((v, i) => {
                    return (
                        <div className={'question-option ' + (props.question.activeOption === v[0] ? 'active' : '')} key={v[0].toString()} onClick={() => {
                            props.selectHandler(props.section, props.question.id, v[0]);
                        } } >{ v[1] }</div>
                    )})
                }
            </div>
        </div>
    )
}

export default QuizQuestion;