import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import { getAllcodeService } from '../../../services/userService';


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllcodeService('gender');
            if (res) {
                this.setState({
                    gender: res.data
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }


    render() {
        let { gender } = this.state;
        return (
            <React.Fragment>
                <div className="text-center mt-4" >
                    <h2 className='title-user-redux'>MANAGE USER REDUX WITH ME</h2>
                </div>
                <div className='form-create-new-user-redux container mt-5'>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="inputEmail4"><FormattedMessage id='manage-user.email' /></label>
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputPassword4"><FormattedMessage id='manage-user.password' /></label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputFirstName"><FormattedMessage id='manage-user.first-name' /></label>
                                <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputLastName"><FormattedMessage id='manage-user.last-name' /></label>
                                <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="inputPhonenumber"><FormattedMessage id='manage-user.phone-number' /></label>
                                <input type="text" className="form-control" id="inputPhonenumber" placeholder="Phonenumber" />
                            </div>
                            <div className='form-group col-md-9'>
                                <label htmlFor="inputAddress"><FormattedMessage id='manage-user.address' /></label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="inputGender"><FormattedMessage id='manage-user.gender' /></label>
                                <select id="inputGender" className="form-control">
                                    {gender && gender.length !== 0 && gender.map((item, index) => {
                                        return (
                                            <option key={index}>{this.props.language === 'vi' ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputRole"><FormattedMessage id='manage-user.role' /></label>
                                <select id="inputRole" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputPosition"><FormattedMessage id='manage-user.position' /></label>
                                <select id="inputPosition" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputAvatar"><FormattedMessage id='manage-user.avatar' /></label>
                                <input type="text" className="form-control" id="inputAvatar" />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary"><FormattedMessage id='manage-user.save' /></button>
                    </form>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
