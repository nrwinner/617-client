
import * as React from 'react';
import QuizQuestion from './Question/QuizQuestion';
import { QuestionType, SectionType } from '@/types';
import { ApolloConsumer } from 'react-apollo';


// Redux
import { connect } from 'react-redux';
import { selectQuestionOption } from '@/redux-actions';

import './Quiz.scss';
import ApolloClient from 'apollo-client/ApolloClient';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { completeSection } from '../../../redux-actions';

import history from '@/history';

type Props = {
    userID: string;
    byteID: string;
    section: string;
    allSections: Map<string, SectionType>;
    questions: Map<string, QuestionType>;
    selectHandler: any;
    completeSection: any;
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
        this.checkSession = this.checkSession.bind(this);
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

    async checkSession(section: string, client: ApolloClient<InMemoryCache>) {
        const answers: (string | undefined)[] = Array.from(this.props.questions.values()).map(q => q.activeOption);

        let q = gql`mutation validateSection($byteId: String!, $sectionId: String!, $answers: [String]) {
            validateSection(byteId: $byteId, sectionId: $sectionId, answers: $answers)
        }`;

        const { data } = await client.mutate({mutation: q, variables: {
            byteId: this.props.byteID,
            sectionId: this.props.section,
            answers: answers
        }});

        if (data && data.validateSection.includes(false)) {
            alert('Whoops, your answers aren\'t correct! Please try again!');
        } else {
            this.props.completeSection(this.props.section);

            // check should complete byte
            let test = Array.from(this.props.allSections, ([key, value]) => value).filter((s: SectionType) => !s.complete).length;
            alert(test);
            if (test === 0) {
                // all sections are complete
                let q = gql`mutation completeByte($byteId: String!, $userId: String!) {
                    completeByte(byteId: $byteId, userId: $userId)
                }`;

                const { data } = await client.mutate({mutation: q, variables: {
                    byteId: this.props.byteID,
                    userId: this.props.userID
                }});

                if (data && data.completeByte) {
                    history.goBack();
                }
            }
        }
    }

    async completeByte() {
        let q = gql`mutation validateSection($byteId: String!, $sectionId: String!, $answers: [String]) {
            validateSection(byteId: $byteId, sectionId: $sectionId, answers: $answers)
          }`;
    }

    render() {
        let done = Array.from(this.props.questions.values()).filter((q: QuestionType) => (typeof q.activeOption === 'undefined')).length === 0;
        let index = this.questionListIndex;
        return (
            <ApolloConsumer> 
                {client => (
                (this.state.activeQuestion && this.state.questionList) ? (
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
                    { done && <div className="btn-group"><div className="button" onClick={() => this.checkSession(this.props.section, client)}>Check Session</div></div> }
                </div>
            ): <div>You done goofed</div>)}
            </ApolloConsumer> 
        )
    }
}

const mapStateToProps = (state: any, props: any) => ({
    userID: state.currentUser.id,
    byteID: state.consumingByte.id,
    questions: state.consumingByte.sections.get(props.section).questions,
    allSections: state.consumingByte.sections
});

const mapDispatchToProps = (dispatch: any) => ({
    selectHandler: (section: string, question: string, option: string) => dispatch(selectQuestionOption(section, question, option)),
    completeSection: (section: string) => dispatch(completeSection(section)),
});

export default connect(mapStateToProps,  mapDispatchToProps)(Quiz);