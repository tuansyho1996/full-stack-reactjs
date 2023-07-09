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
import { fetchDetailADoctor, } from '../../../services/userService';
import _ from 'lodash';
import { languages } from '../../../utils/constant'



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
            selectedOptionPaymentMethods: '',
            selectedOptionChooseProvince: '',
            optionPriceVi: [],
            optionPriceEn: [],
            optionProvinceVi: [],
            optionProvinceEn: [],
            optionPaymentMethodVi: [],
            optionPaymentMethodEn: [],
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }
    componentDidMount() {
        this.props.fetchDoctorSelect();
        this.props.fetchKeyInfoDoctorAllcodeSelect('price');
        this.props.fetchKeyInfoDoctorAllcodeSelect('province');
        this.props.fetchKeyInfoDoctorAllcodeSelect('payment');
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
        if (prevProps.priceSelect !== this.props.priceSelect) {
            let optionsVi = [];
            let optionsEn = [];
            this.props.priceSelect.map((item, index) => {
                optionsVi.push({ value: item.keyMap, label: `${item.valueVi}đ` });
            })
            this.props.priceSelect.map((item, index) => {
                optionsEn.push({ value: item.keyMap, label: `${item.valueEn}$` });
            })
            this.setState({
                optionPriceEn: optionsEn,
                optionPriceVi: optionsVi
            })
        }
        if (prevProps.provinceSelect !== this.props.provinceSelect) {
            console.log('check props province', this.props.provinceSelect)
            let optionsVi = [];
            let optionsEn = [];
            this.props.provinceSelect.map((item, index) => {
                optionsVi.push({ value: item.keyMap, label: item.valueVi });
            })
            this.props.provinceSelect.map((item, index) => {
                optionsEn.push({ value: item.keyMap, label: item.valueEn });
            })
            this.setState({
                optionProvinceEn: optionsEn,
                optionProvinceVi: optionsVi
            })
        }
        if (prevProps.paymentMethodSelect !== this.props.paymentMethodSelect) {
            console.log('check props payment', this.props.paymentMethodSelect)
            let optionsVi = [];
            let optionsEn = [];
            this.props.paymentMethodSelect.map((item, index) => {
                optionsVi.push({ value: item.keyMap, label: item.valueVi });
            })
            this.props.paymentMethodSelect.map((item, index) => {
                optionsEn.push({ value: item.keyMap, label: item.valueEn });
            })
            this.setState({
                optionPaymentMethodEn: optionsEn,
                optionPaymentMethodVi: optionsVi
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

        if (doctorSelect.Markdown.id && doctorSelect.InfoDoctor.id) {
            let selectPriceId = this.props.priceSelect.find(item => item.keyMap === doctorSelect.InfoDoctor.priceId);
            let selectOptionPriceId = {
                value: selectPriceId.keyMap,
                label: this.props.language === languages.VI ? selectPriceId.valueVi : selectPriceId.valueEn
            }
            let selectProvinId = this.props.provinceSelect.find(item => item.keyMap === doctorSelect.InfoDoctor.provinceId);
            let selectOptionProvinId = {
                value: selectProvinId.keyMap,
                label: this.props.language === languages.VI ? selectProvinId.valueVi : selectPriceId.valueEn
            }
            let selectPaymentId = this.props.paymentMethodSelect.find(item => item.keyMap === doctorSelect.InfoDoctor.paymentId);
            let selectOptionPaymentId = {
                value: selectPaymentId.keyMap,
                label: this.props.language === languages.VI ? selectPaymentId.valueVi : selectPaymentId.valueEn
            }
            this.setState({
                selectedOption,
                textareaValue: doctorSelect.Markdown.description,
                contentHTML: doctorSelect.Markdown.contentHTML,
                contentMarkdown: doctorSelect.Markdown.contentMarkdown,
                selectedOptionPrice: selectOptionPriceId,
                selectedOptionPaymentMethods: selectOptionPaymentId,
                selectedOptionChooseProvince: selectOptionProvinId,
                nameClinic: doctorSelect.InfoDoctor.nameClinic,
                addressClinic: doctorSelect.InfoDoctor.addressClinic,
                note: doctorSelect.InfoDoctor.note,
                isOldData: true
            })
        }
        else {
            this.setState({
                selectedOption,
                textareaValue: '',
                contentHTML: '',
                contentMarkdown: '',
                selectedOptionPrice: '',
                selectedOptionPaymentMethods: '',
                selectedOptionChooseProvince: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
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
        let { contentHTML, contentMarkdown, selectedOption, selectedOptionPrice,
            selectedOptionChooseProvince, selectedOptionPaymentMethods, nameClinic, addressClinic, note } = this.state;
        let validateParameter = true;
        if (!selectedOption && !selectedOption.value) {
            toast.error('Missing doctor')
        }
        else {
            let arrCheck = [contentHTML, contentMarkdown, !_.isEmpty(selectedOptionPrice),
                !_.isEmpty(selectedOptionChooseProvince), !_.isEmpty(selectedOptionPaymentMethods),
                nameClinic, addressClinic, note];
            let arrMessage = ['Missing content', 'Missing content', 'Missing Price', 'Missing Province',
                'Missing Payment Method', 'Missing Name Clinic', 'Missing Address Clinic', 'Missing Note']
            for (let i = 0; i < arrCheck.length; i++) {
                if (!arrCheck[i]) {
                    validateParameter = false
                    toast.error(arrMessage[i]);
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
                await this.props.createInfoDoctor({
                    doctorId: this.state.selectedOption.value,
                    priceId: this.state.selectedOptionPrice.value,
                    provinceId: this.state.selectedOptionChooseProvince.value,
                    paymentId: this.state.selectedOptionPaymentMethods.value,
                    nameClinic: this.state.nameClinic,
                    addressClinic: this.state.addressClinic,
                    note: this.state.note
                })
            }
        }

    }
    handleChangeOther = async (selected) => {
        // console.log('check value select', selected)

        if (selected.value.includes('PRI')) {
            this.setState({
                selectedOptionPrice: selected
            })
        }
        if (selected.value.includes('PAY')) {
            this.setState({
                selectedOptionPaymentMethods: selected
            })
        }
        if (selected.value.includes('PRO')) {
            this.setState({
                selectedOptionChooseProvince: selected
            })
        }

    }
    handleChangeInputInfoDoctor = (e, key) => {
        let copyState = this.state;
        copyState[key] = e.target.value;
        this.setState({
            ...copyState
        })
    }
    render() {
        console.log('check props doctor select', this.props.arrDoctor)
        let { textareaValue, arrDoctorVi, isOldData, optionPriceVi, optionPriceEn, optionProvinceEn, optionProvinceVi,
            optionPaymentMethodEn, optionPaymentMethodVi, nameClinic, addressClinic, note
        } = this.state

        return (
            <div className='my-5 px-5'>
                <div className="text-center " >
                    <h2 className='my-5'>MANAGE USER REDUX WITH ME</h2>
                </div>
                <form>
                    <div className='information-doctor row mb-3'>
                        <div className='select-option-react col-6'>
                            <lable className="form-label"><FormattedMessage id={"manage-user.choose-doctor"} /></lable>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={arrDoctorVi}
                            />
                        </div>
                        <div className='additional-information col-6'>
                            <lable className="form-label"><FormattedMessage id={"manage-user.description"} /></lable>
                            <textarea value={textareaValue} onChange={(event) => this.handleChangeTextarea(event)} className='form-control'></textarea>
                        </div>

                        <div className='choose-price col-4 mt-3'>
                            <lable className="form-label"><FormattedMessage id={"manage-user.choose-price"} /></lable>
                            <Select
                                value={this.state.selectedOptionPrice}
                                onChange={this.handleChangeOther}
                                options={this.props.language === languages.VI ? optionPriceVi : optionPriceEn}
                            />
                        </div>
                        <div className='payment-methods col-4 mt-3'>
                            <lable className="form-label"><FormattedMessage id={"manage-user.payment-method"} /></lable>
                            <Select
                                value={this.state.selectedOptionPaymentMethods}
                                onChange={this.handleChangeOther}
                                options={this.props.language === languages.VI ? optionPaymentMethodVi : optionPaymentMethodEn}
                            />
                        </div>
                        <div className='choose-province col-4 mt-3'>
                            <lable className="form-label"><FormattedMessage id={"manage-user.choose-province"} /></lable>
                            <Select
                                value={this.state.selectedOptionChooseProvince}
                                onChange={this.handleChangeOther}
                                options={this.props.language === languages.VI ? optionProvinceVi : optionProvinceEn}
                            />
                        </div>

                        <div className='name-clinic col-4 mt-3'>
                            <lable className="form-label"><FormattedMessage id={"manage-user.name-clinic"} /></lable>
                            <input type="text" value={nameClinic} onChange={(e) => this.handleChangeInputInfoDoctor(e, 'nameClinic')} class="form-control" />
                        </div>
                        <div className='address-clinic col-4 mt-3'>
                            <lable className="form-label"><FormattedMessage id={"manage-user.address-clinic"} /></lable>
                            <input type="text" value={addressClinic} onChange={(e) => this.handleChangeInputInfoDoctor(e, 'addressClinic')} class="form-control" />
                        </div>
                        <div className='note col-4 mt-3'>
                            <lable className="form-label"><FormattedMessage id={"manage-user.note"} /></lable>
                            <input type="text" value={note} onChange={(e) => this.handleChangeInputInfoDoctor(e, 'note')} class="form-control" />
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
        arrDoctor: state.admin.doctorSelects,
        priceSelect: state.admin.priceSelect,
        provinceSelect: state.admin.provinceSelect,
        paymentMethodSelect: state.admin.paymentMethodSelect,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorSelect: () => dispatch(adminActions.fetchDoctorSelectStart()),
        fetchKeyInfoDoctorAllcodeSelect: (type) => dispatch(adminActions.fetchKeyInfoDoctorAllcodeSelectStart(type)),
        createDoctorMarkdown: (inputData) => dispatch(adminActions.createDoctorMarkdownStart(inputData)),
        createInfoDoctor: (inputData) => dispatch(adminActions.createInfoDoctorStart(inputData))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManageRedux);
