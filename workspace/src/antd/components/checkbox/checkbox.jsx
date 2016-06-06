import { Component } from 'react';
import { Checkbox, Button } from 'antd';
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: '苹果', value: 'Apple' },
  { label: '梨', value: 'Pear' },
  { label: '橘', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: '苹果', value: 'Apple' },
  { label: '梨', value: 'Pear' },
  { label: '橘', value: 'Orange', disabled: false },
];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: true,
			disabled: false
		};
		this.toggleChecked = function toggleChecked() {
	    this.setState({ checked: !this.state.checked });
	  }.bind(this);
	  this.toggleDisable = function toggleDisable() {
	    this.setState({ disabled: !this.state.disabled });
	  }.bind(this);
	  this.onChange = function onChange(e) {
	    this.setState({
	      checked: e.target.checked,
	    });
	  }.bind(this);

	}
	render() {
		const label = `${this.state.checked ? '选中' : '取消'}-${this.state.disabled ? '不可用' : '可用'}`;
		return (
      <div>
        <p style={{ marginBottom: '20px' }}>
          <Checkbox checked={this.state.checked}
            disabled={this.state.disabled}
            onChange={this.onChange}>
            {label}
          </Checkbox>
        </p>
        <p>
          <Button type="primary" size="small"
            onClick={this.toggleChecked}>
            {!this.state.checked ? '选中' : '取消'}
          </Button>
          <Button style={{ marginLeft: '10px' }}
            type="primary" size="small"
            onClick={this.toggleDisable}>
            {!this.state.disabled ? '不可用' : '可用'}
          </Button>
        </p>
      </div>
    );
	}
}

export default class CheckboxBox extends Component {
	render() {
		return (
			<div className="checkbox-con">
				<div className="con">
					<Checkbox defaultChecked={false}>Checkbox</Checkbox>
				</div>
				<div className="con">
					<Checkbox defaultChecked={false} disabled />
					<br />
					<Checkbox defaultChecked disabled />
				</div>
				<div className="con">
					<CheckboxGroup options={plainOptions} defaultValue={['Apple']} />
			    <br />
			    <CheckboxGroup options={options} defaultValue={['Pear']} />
			    <br />
			    <CheckboxGroup options={optionsWithDisabled} disabled defaultValue={['Apple']} />
				</div>
				<div className="con">
					<App />
				</div>
			</div>
		);
	}
}