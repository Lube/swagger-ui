import React, { PropTypes } from "react"
import Select from "react-select"
import "react-select/dist/react-select.css"

export default class Switcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selectValue: null}
    this.updateValue = this.updateValue.bind(this)
  }

	updateValue (newValue) {
		this.setState({
			selectValue: newValue
		})
    this.props.onChange({target: {newValue}})
	}

	render () {
		return (
				<Select
          autofocus
          options={this.props.options}
          simpleValue
          clearable
          name="swagger-file"
          value={this.state.selectValue}
          onChange={this.updateValue}
          searchable
          className="switcher-input"
        />
		)
	}
}

Switcher.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
}
