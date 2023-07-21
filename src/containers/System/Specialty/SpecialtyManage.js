import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './SpecialtyManage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import * as adminActions from '../../../store/actions';
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt
class SpecialtyManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameSpecialty: '',
            fileImgSpecialty: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            imgUrlHTML: '',
            fileImg64: ''
        }
    }
    componentDidMount() {
    }
    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleChangeNameSpecialty = (e) => {
        this.setState({
            nameSpecialty: e.target.value
        })
    }
    handleChangeFileImg = async (e) => {
        let file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        let fileBase64 = await CommonUtils.toBase64(file);
        console.log('check img change', objectUrl, fileBase64)
        this.setState({
            imgUrlHTML: objectUrl,
            fileImg64: fileBase64
        })
    }
    handleClickCreateSpecialty = () => {
        let isError = false;
        let arrInput = [this.state.fileImg64, this.state.descriptionHTML, this.state.descriptionMarkdown, this.state.nameSpecialty]
        let arrMessageError = ['file img', 'description html', 'description text', 'name specialty']
        for (let i = 0; i < arrInput.length; i++) {
            if (!arrInput[i]) {
                toast.error(`Missing ${arrMessageError[i]}`);
                isError = true;
                break;
            }
        }
        if (!isError) {
            this.props.createSpecialty({
                name: this.state.nameSpecialty,
                image: this.state.fileImg64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown
            })
        }
    }


    render() {
        let { nameSpecialty, fileImgSpecialty, descriptionHTML, descriptionMarkdown, imgUrlHTML } = this.state
        return (
            <div className='specialty-manage-container'>
                <div className='title-specialty-manage'>
                    SPECIALTY MANAGE
                </div>
                <div className='specialty-manage-content row mx-2'>
                    <div className="form-group col-6">
                        <label htmlFor="name-specialty">Specialty</label>
                        <input type="text" className="form-control" id="name-specialty" placeholder=""
                            value={nameSpecialty} onChange={(e) => this.handleChangeNameSpecialty(e)}
                        />
                    </div>
                    <div className="mb-3 col-3">
                        <label htmlFor="upload-img-specialty" className="form-label">Image specialty</label>
                        <input className="form-control" onChange={(e) => this.handleChangeFileImg(e)} type="file" id="upload-img-specialty" />

                    </div>
                    <div className='bg-upload-img-current col-3' style={{
                        backgroundImage: `url(${imgUrlHTML})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                    }}></div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                    </div>
                    <button className="btn btn-primary my-5 mx-3 px-3" onClick={() => this.handleClickCreateSpecialty()}>Create</button>
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createSpecialty: (data) => dispatch(adminActions.createSpecialtyStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
