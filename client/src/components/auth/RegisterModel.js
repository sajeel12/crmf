import React, { Component } from "react";
import {
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from "react-redux";
import {
    Typography, Box, Modal, Button,
    TextField, Divider

} from '@mui/material';
import { v1 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

class RegisterModel extends Component {
    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 640,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    state = {
        agent:'Agent',
        open: false,
        isadmin: false,
        username: '',
        fullname: '',
        email: '',
        phoneno: '',
        password: '',


    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }


    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //check for  regiser error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }

        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }
    toggleAdmin = () => {
        this.setState({
            isadmin: !this.state.isadmin
        });
        
    }

    toggle = () => {
        // clear errors
        this.props.clearErrors();

        this.setState({
            open: !this.state.open
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { isadmin, username, fullname, email, phoneno, password } = this.state;

        // create user object 
      
        const newUser = {
            isadmin,
            username,
            fullname,
            email,
            phoneno,
            password
        };

        // attemp to register
        this.props.register(newUser);


        this.toggle();
    }


    render() {
        return (
            <div>
                <Button onClick={this.toggle} variant='contained'
                    sx={{ marginBottom: 5, marginLeft: 20, backgroundColor: 'black', borderRadius: 50 }}
                >
                    Add Agent

                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.toggle}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ overflowX: 'scroll' }}
                >
                    <Box sx={this.style}>

                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography variant="h5" component="h2">
                                Add Lead
                            </Typography>

                            <hr />
                            <form  >
                                <TextField
                                    onChange={this.onChange}
                                    name='fullname'
                                    id="standard-required"
                                    label="Full Name"
                                    type="text"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    name='username'
                                    id="standard-required"
                                    label="Username "
                                    type="text"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    name='email'
                                    id="standard-required"
                                    label="Email"
                                    type="email"
                                    variant="standard"
                                />
                                <TextField
                                    onChange={this.onChange}
                                    name='phoneno'
                                    id="standard-required"
                                    label="Phone No"
                                    type="text"
                                    variant="standard"
                                />
                                <div style={{ display: 'flex' }} >
                                    <TextField
                                        onChange={this.onChange}
                                        name='password'
                                        id="standard-required"
                                        label="Password"
                                        type="password"
                                        variant="standard"
                                    />


                                    <Button variant='contained'
                                        sx={{ marginBottom: 5 }}
                                        onClick={this.toggleAdmin}
                                    >
                                        {this.state.isadmin? 'Admin' : 'Agent'}
                                    </Button>
                                </div>
                            </form>

                            <Button variant='contained'
                                sx={{ marginBottom: 5 }}
                                onClick={this.onSubmit}
                            >
                                Add Agent
                            </Button>


                        </Box>



                    </Box>
                </Modal>
            </div>

        )
    };
}

RegisterModel.propTypes = {
    register: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModel);
