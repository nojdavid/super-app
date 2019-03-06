import React, { Component } from 'react';

class Form extends Component {

	constructor(props) {
    super(props);

    const { field1, field2 } = this.props;

    this.state = {
      [field1]: {
        value: ''
      },
      [field2]: {
      	value: ''
      }
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: {
        value: value
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { field1, field2 } = this.props;
    this.props.submit(this.state[field1].value, this.state[field2].value);
  };

  render() {
  	const { title, field1, field2 } = this.props;
  	return (
  		<div className='form-field'>
				<div>{title}</div>
				<form onSubmit={this.handleSubmit}>
	        <label>
	          {field1 + ':'}
	          <input type="text" name={field1} value={this.state.value} onChange={this.handleChange} />
	        </label>
          <label>
            {field2 + ':'}
            <input type="text" name={field2} value={this.state.value} onChange={this.handleChange} />
          </label>
	        <input type="submit" value={title}/>
	      </form>
	    </div>
		)
  }
	
};

export default Form;