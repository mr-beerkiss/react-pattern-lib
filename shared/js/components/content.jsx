const Create = require('./create.jsx');
const Item = require('./item.jsx');
const React = require('react');


module.exports = class Content extends React.Component {
  constructor(props) {
    super(props);

    let myList = props.list || [
      'hello koa',
      'hello react',
      'hello bluekit'
    ];

    this.state = {
      list: myList
    };

    this.add = this.add.bind(this);
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((content, index) => {
            return <Item content={content} key={index} remove={this.remove.bind(this, index)} />;
          })}
        </ul>
        <Create add={this.add} />
      </div>
    );
  }

  add(content) {
    this.setState({
      list: this.state.list.concat(content)
    });
  }

  remove(index) {
    console.log(index, this.state.list)
    this.state.list.splice(index, 1);
    this.setState({
      list: this.state.list
    });
  }
}
