import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DoctorManageRedux.scss'
import 'react-image-lightbox/style.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import * as adminActions from '../../../store/actions';
import { toast } from 'react-toastify';




// import style manually
import 'react-markdown-editor-lite/lib/index.css';
// function handleEditorChange({ html, text }) {
//     console.log('handleEditorChange', html, text);
// }
const mdParser = new MarkdownIt(/* Markdown-it options */);



class DoctorManageRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            textareaValue: '',
            arrDoctorVi: [],
            contentHTML: '',
            contentMarkdown: ''
        }
    }

    componentDidMount() {
        this.props.fetchDoctorSelect();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.arrDoctor !== this.props.arrDoctor) {
            let options = [];
            this.props.arrDoctor.map((item, index) => {
                options.push({ value: item.id, label: `${item.firstName} ${item.lastName}` });
            })
            this.setState({
                arrDoctorVi: options
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
        console.log('handleEditorChange', html, text);
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };
    handleChangeTextarea = (event) => {
        this.setState({
            textareaValue: event.target.value
        })
    }
    handleSubmitCreate = async () => {
        let { contentHTML, contentMarkdown, selectedOption } = this.state;
        let validateParameter = true;
        if (!selectedOption && !selectedOption.value) {
            toast.error('Missing doctor')
        }
        else {
            let arrCheck = [contentHTML, contentMarkdown];
            for (let i = 0; i < arrCheck.length; i++) {
                console.log('check element check', arrCheck[i])
                if (!arrCheck[i]) {
                    validateParameter = false
                    toast.error('Missing content');
                    break;
                }
            }
            if (validateParameter) {
                console.log('checl id doctor', selectedOption.value)
                this.props.createDoctorMarkdown({
                    contentHTML: this.state.contentHTML,
                    contentMarkdown: this.state.contentMarkdown,
                    doctorId: this.state.selectedOption.value,
                    description: this.state.textareaValue
                })
            }
        }

    }
    render() {
        console.log('check arr doctor redux props', this.state.arrDoctorVi)

        let { textareaValue, arrDoctorVi } = this.state
        return (
            <div className='my-5 px-5'>
                <div className="text-center " >
                    <h2 className='my-5'>MANAGE USER REDUX WITH ME</h2>
                </div>
                <div className='information-doctor row mb-3'>
                    <div className='select-option-react col-6'>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={arrDoctorVi}
                        />
                    </div>

                    <div className='additional-information col-6'>
                        <textarea value={textareaValue} onChange={(event) => this.handleChangeTextarea(event)} className='form-control'></textarea>
                    </div>

                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                <div className='button-submit'>
                    <button onClick={() => this.handleSubmitCreate()} className='btn-primary my-3'>Sumit</button>
                </div>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        arrDoctor: state.admin.doctorSelects
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorSelect: () => dispatch(adminActions.fetchDoctorSelectStart()),
        createDoctorMarkdown: (inputData) => dispatch(adminActions.createDoctorMarkdownStart(inputData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManageRedux);
