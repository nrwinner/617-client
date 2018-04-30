
import * as React from 'react';
import QuizQuestion from './Question/QuizQuestion';
import { QuestionType } from '@/types';


// Redux
import { connect } from 'react-redux';
import { selectQuestionOption } from '@/redux-actions';

import './Quiz.scss';

type Props = {
    section: string;
    questions: Map<string, QuestionType>;
    selectHandler: any;
}

type State = {
    activeQuestion?: QuestionType;
    questionList?: Array<QuestionType>;
}

class Quiz extends React.Component<Props, State> {
    state: State;
    questionListIndex: number;

    constructor(props: Props) {
        super(props);

        this.state = {};

        // bindings
        this.advanceQuestion = this.advanceQuestion.bind(this);
        this.regressQuestion = this.regressQuestion.bind(this);
        this.jumpToQuestion = this.jumpToQuestion.bind(this);
    }

    componentWillMount() {
        // init the question values array
        this.setState({
            questionList: Array.from(this.props.questions.values())
        }, () => {
            this.advanceQuestion();
        });
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.section !== this.props.section) {
            // changing section, reset iterator
            this.setState({
                questionList: Array.from(nextProps.questions.values())
            }, () => {
                this.advanceQuestion(true);
            });
        } else {
            // anything else happening, just reset the activeQuestion
            if (this.state.activeQuestion) {
                let n = nextProps.questions.get(this.state.activeQuestion.id);
                this.setState({
                    questionList: Array.from(nextProps.questions.values()),
                    activeQuestion: n
                });
            }
        }

    }

    regressQuestion() {
        if ( this.state.questionList && this.questionListIndex > 0) {
            // we can go backwards
            this.setState({
                activeQuestion: this.state.questionList[--this.questionListIndex]
            });
        }
    }

    advanceQuestion(reset: boolean = false) {
        // sanity check
        if (this.state.questionList) {
            if (!this.state.activeQuestion || reset) {
                // first run through, set index to 0 by default
                this.questionListIndex = 0;

                for (let i = 0; i < this.state.questionList.length; i++) {
                    let q = this.state.questionList[i];
                    if (!q.activeOption) {
                        this.questionListIndex = i;
                        break;
                    }
                }

                this.setState({
                    activeQuestion: this.state.questionList[this.questionListIndex]
                });
            } else if (this.questionListIndex + 1 < this.state.questionList.length) {
                // somewhere between the first and last questions, simply move next to active and pull from iterator for next
                this.setState({
                    activeQuestion: this.state.questionList[++this.questionListIndex],
                })
            } else {
                // we're out of questions
                alert('you\'re done!');
            }
        }
    }

    jumpToQuestion(index: number = 0) {
        if (this.state.questionList) {
            this.questionListIndex = index;
            let n = this.state.questionList[this.questionListIndex];

            this.setState({
                activeQuestion: n
            });
        }
    }

    render() {
        let index = this.questionListIndex;
        return (this.state.activeQuestion && this.state.questionList) ? (
            <div className="quiz-wrapper">
                { (this.questionListIndex > 0) ? <div className='regress arrow' onClick={() => this.regressQuestion()}></div> : undefined  }
                <QuizQuestion question={ this.state.activeQuestion } section={ this.props.section } selectHandler={ this.props.selectHandler } />
                { (this.questionListIndex + 1 < this.state.questionList.length && typeof this.state.activeQuestion.activeOption !== 'undefined') ? <div className='advance arrow' onClick={ () => this.advanceQuestion() }></div> : undefined }
                <div className="good-progress-bar">
                {
                    this.state.questionList.map((m, i) => {
                        return <div className={'progress-tick ' + ((index === i) ? 'active ' : '') + ((typeof m.activeOption !== 'undefined') ? 'answered' : '') } onClick={() => this.jumpToQuestion(i)}> </div>
                    })
                }
                </div>
            </div>
        ) : <div>You done goofed</div>;
    }
}

const mapStateToProps = (state: any, props: any) => ({
    questions: state.consumingByte.sections.get(props.section).questions
});

const mapDispatchToProps = (dispatch: any) => ({
    selectHandler: (section: string, question: string, option: string) => dispatch(selectQuestionOption(section, question, option))
});

export default connect(mapStateToProps,  mapDispatchToProps)(Quiz);