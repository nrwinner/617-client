import * as React from 'react';
import { QuestionType } from '@/types';

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
                {  Array.from(props.question.options, ([key, value]) => value).map((v, i) => {
                    return (
                        <div className={'question-option ' + (props.question.activeOption == i ? 'active' : '')} key={i} onClick={() => {
                            props.selectHandler(props.section, props.question.id, i);
                        } } >{ v }</div>
                    )})
                }
            </div>
        </div>
    )
}

export default QuizQuestion;