var Persons = React.createClass({
    render: function() {
        return (
            <div>
                <NewForm />
                <PersonList data={this.props.data} />
            </div>
        )
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
            console.log("email: " + this.state.email);
            console.log("Name: " + this.state.name);
            var name = this.state.name;
            var email = this.state.email;
            var phone_number = this.state.phone_number;
            $.ajax({
                type: 'POST',
                url: '/persons',
                data: { person: { name: name, email: email, phone_number: phone_number } },
            }).success(function(data) {
                console.log('success');
            }).fail(function(jqXhr) {
                console.log('failed to register');
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label>
                    Email:
                    <input type="text" value={this.state.phone_number} onChange={this.handlePhoneNumberChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

var PersonList = React.createClass({
    render: function() {
        var persons = this.props.data.map((person, i) => {
            return (
                <div className="post" key={i}>
                    <h2>{person.name}</h2>
                    <p>{person.email}</p>
                    <p>{person.phone_number}</p>
                </div>
            )
        });
        return (<div className="PostList">
            {persons}
        </div>)
    }
});
