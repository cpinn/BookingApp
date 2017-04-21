var btnStyle = {
    position: "fixed",
    left:"30%",
    border:"none",
    background: "#D8A1F7"
};


var Persons = React.createClass({
    getInitialState: function() {
        return { showResults: false };
    },
    onClick: function() {
        this.setState({ showResults: true });
    },
    render: function() {
        return (
            <div>
                { this.state.showResults ? <NewForm />: null }
                { this.state.showResults ? <a href={'/persons/'}>Back</a>: null }
                { !this.state.showResults ? <PersonList data={this.props.persons} /> : null }
                { !this.state.showResults ? <button onClick={this.onClick}>Add Person</button>: null }
            </div>
        )
    }
});

class PersonList extends React.Component{

    deleteUser(id) {
        let finalUrl = '/persons/' + id ;
        $.ajax({
            type: 'DELETE',
            url: finalUrl,
            dataType: "json",
        }).success(function(data) {
            console.log('deleted user');

        }).fail(function() {
            console.log('failed to delete user');
        });
    }

    render() {
        var persons = this.props.data.map((person, i) => {
            return (
                <div className="PersonList" key={i}>
                    <a href={'/persons/' + person.id}>{person.name}</a>
                    <button style={btnStyle} onClick={this.deleteUser.bind(this, person.id)}>Delete User</button>
                </div>
            )
        });
        return (<div className="PersonList">
            <h1>List Of Current Users</h1>
            {persons}
        </div>)
    }
}


var PersonInfo = React.createClass({
    render: function() {
        var person = this.props.person;
        return (<div className="PersonInfo">
            <h2>{person.name}</h2>
            <p>Email: {person.email}</p>
            <p>Phone Number: {person.phone_number}</p>
            <a href={'/persons/'}>Back</a>
        </div>)
    }
});

class NewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone_number: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    handlePhoneNumberChange(e) {
        this.setState({phone_number: e.target.value});
    }

    handleSubmit(e) {

        var name = this.state.name;
        var email = this.state.email;
        var phone_number = this.state.phone_number;
        $.ajax({
            type: 'POST',
            url: '/persons',
            data: { person: { name: name, email: email, phone_number: phone_number } },
        }).success(function(data) {
            console.log('successfully added new user');
        }).fail(function() {
            console.log('failed to add new user');
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Add new user</h1>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <br />
                <label>
                    Phone Number:
                    <input type="text" value={this.state.phone_number} onChange={this.handlePhoneNumberChange} />
                </label>
                <br />
                <input type="submit" value="Submit" disabled={!this.state.name || !this.state.email || !this.state.phone_number}/>
            </form>
        );
    }
}
