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
import { fetchDetailADoctor } from '../../../services/userService';
import _ from 'lodash';



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
            contentMarkdown: '',
            isMarkdownDoctor: false,
            isOldData: false,
            selectedOptionPrice: '',
        }
    }

    componentDidMount() {
        this.props.fetchDoctorSelect();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.arrDoctor !== this.props.arrDoctor) {
            console.log(this.props.arrDoctor)
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
    handleChange = async (selectedOption) => {
        let doctorSelect = this.props.arrDoctor.find(item => item.id === selectedOption.value);
        if (doctorSelect.Markdown.id !== null) {
            this.setState({
                selectedOption,
                textareaValue: doctorSelect.Markdown.description,
                contentHTML: doctorSelect.Markdown.contentHTML,
                contentMarkdown: doctorSelect.Markdown.contentMarkdown,
                isOldData: true
            })
        }
        else {
            this.setState({
                selectedOption,
                textareaValue: '',
                contentHTML: '',
                contentMarkdown: '',
                isOldData: false
            }, () =>
                console.log(`Option selected:`, this.state.selectedOption)
            );
        }

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
                if (!arrCheck[i]) {
                    validateParameter = false
                    toast.error('Missing content');
                    break;
                }
            }
            if (validateParameter) {
                await this.props.createDoctorMarkdown({
                    contentHTML: this.state.contentHTML,
                    contentMarkdown: this.state.contentMarkdown,
                    doctorId: this.state.selectedOption.value,
                    description: this.state.textareaValue
                })

            }
        }

    }
    handleChangeOther = async (value) => {
        console.log(value)
    }
    render() {
        // console.log('check state', this.state)
        let { textareaValue, arrDoctorVi, isOldData } = this.state
        // console.log('check old data', isOldData)
        return (
            <div className='my-5 px-5'>
                <div className="text-center " >
                    <h2 className='my-5'>MANAGE USER REDUX WITH ME</h2>
                </div>
                <form>
                    <div className='information-doctor row mb-3'>
                        <div className='select-option-react col-6'>
                            <lable className="form-label">Chọn bác sĩ</lable>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={arrDoctorVi}
                            />
                        </div>
                        <div className='additional-information col-6'>
                            <lable className="form-label">Thông tin giới thiệu</lable>
                            <textarea value={textareaValue} onChange={(event) => this.handleChangeTextarea(event)} className='form-control'></textarea>
                        </div>

                        <div className='choose-price col-4 mt-3'>
                            <lable className="form-label">Chọn giá</lable>
                            <Select
                                value={this.state.selectedOptionPrice}
                                onChange={this.handleChangeOther}
                            // options={arrDoctorVi}
                            />
                        </div>
                        <div className='payment-methods col-4 mt-3'>
                            <lable className="form-label">Phương thức thanh toán</lable>
                            <Select
                                value={this.state.selectedOptionPaymentMethods}
                                onChange={this.handleChangeOther}
                            // options={arrDoctorVi}
                            />
                        </div>
                        <div className='choose-province col-4 mt-3'>
                            <lable className="form-label">Chọn tỉnh thành</lable>
                            <Select
                                value={this.state.selectedOptionChooseProvince}
                                onChange={this.handleChangeOther}
                            // options={arrDoctorVi}
                            />
                        </div>

                        <div className='name-clinic col-4 mt-3'>
                            <lable className="form-label">Tên phòng khám</lable>
                            <input type="" class="form-control" />
                        </div>
                        <div className='address-clinic col-4 mt-3'>
                            <lable className="form-label">Đỉa chỉ phòng khám</lable>
                            <input type="" class="form-control" />
                        </div>
                        <div className='note col-4 mt-3'>
                            <lable className="form-label">Ghi chú</lable>
                            <input type="" class="form-control" />
                        </div>


                    </div>
                </form>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.contentMarkdown} />
                <div className='button-submit'>
                    {isOldData ?
                        <button onClick={() => this.handleSubmitCreate()} className='btn-warning my-3'>Lưu thông tin</button>
                        :
                        <button onClick={() => this.handleSubmitCreate()} className='btn-primary my-3'>Tạo</button>

                    }
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
