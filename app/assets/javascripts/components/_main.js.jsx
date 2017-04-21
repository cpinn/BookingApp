var Main = React.createClass({
    render() {
        var style = {
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        };

        return (
            <div style={style}>
                <h1>Hello App!</h1>
            </div>
        )
    }
});