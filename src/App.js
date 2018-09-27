import React, {Component} from 'react';
import './components/css/formStyle.css'
import 'jquery'
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import TodoTable from './components/TodoTable'
import connect from "react-redux/es/connect/connect";

var data = [
    {id: 1, name: 'Gob', value: '2'},
    {id: 2, name: 'Buster', value: '5'},
    {id: 3, name: 'George Michael', value: '4'}
];

class App extends Component {

    toggleVisibility = (source, e) => {
        console.log('Clicked from : ' + source);
        this.setState({
            showRegistration : source === 'registerLink',
            showLogin : source === 'loginLink'
        });
    };

    componentDidMount = () => {
        setInterval(() => {
                this.setState({date: new Date()});
            }, 1000
        );
    };

    constructor(props) {
        super(props);
        this.state = ({
            email: '',
            password: '',
            doRegister: false,
            // loginVisibility: {display: 'block'},
            // registerVisibility: {display: 'block'},
            date: new Date(),
            showRegistration: false,
            showLogin : true
        });

        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    render() {
        return (
            <div className="container">
                <div className="row main">
                    <div className="panel-heading">
                        <div className="panel-title text-center">
                            <h1 className="title">My TODOs </h1>
                            <h3>It is {this.state.date.toLocaleTimeString()}.</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="main-login main-center">
                        {
                            (this.props.isLoggedIn === false && this.state.showLogin) ? <LoginForm
                                                                         execute={this.toggleVisibility}/> : null

                        }

                        {
                            this.state.showRegistration === true ?
                                <RegistrationForm  execute={this.toggleVisibility}/> : null
                        }

                        {
                            this.props.isLoggedIn ? <TodoTable data={data}/> : null
                        }
                    </div>
                </div>
            </div>

        );
    }


}


function mapStateToProps(state) {
    return {
        isLoggedIn: state.isLoggedIn,
        todoData: state.todoData

    }
}


export default connect(mapStateToProps)(App);
