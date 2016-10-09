const React = require('react');

const KeyCodes = {
  ENTER: 13
};

module.exports = class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onKeyDown = this._onKeyDown.bind(this);
    this.onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <div className="create-box">
        <input
          type="text"
          placeholder="press enter to save"
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          value={this.state.value}/>
      </div>
    );
  }

  _onKeyDown(event) {
    if (event.keyCode === KeyCodes.ENTER) this.save();
  }

  _onChange(event) {
    this.state.value = event.target.value;
    this.setState({
      value: event.target.value
    });
  }

  save() {
    if (!this.state.value) return;
    this.props.add(this.state.value);
    this.setState({
      value: ''
    });
  }
}
