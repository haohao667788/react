import { Component } from 'react';
import { Cascader } from 'antd';

const options = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖',
    }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'zhonghuamen',
      label: '中华门',
    }],
  }],
}];
const cityOptions = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
  }],
}];
const disableOptions = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖',
    }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  disabled: true,
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'zhonghuamen',
      label: '中华门',
    }],
  }],
}];
const codeOptions = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖',
      code: 752100,
    }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'zhonghuamen',
      label: '中华门',
      code: 453400,
    }],
  }],
}];

class CitySwitcher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '未选择'
		};
		this.onChange = function onChange(value, selectedOptions) {
			this.setState({
				text: selectedOptions.map(o => o.label).join('，')
			});
		}.bind(this);
	}

	render() {
		return (
			<span>
				{this.state.text}
				&nbsp;
				<Cascader options={cityOptions} onChange={this.onChange}>
					<a href="javascript:;">切换城市</a>
				</Cascader>		
			</span>
		);
	}
}

function displayRender(label) {
	return label[label.length - 1];
}
const displayRender2 = (labels, selectedOptions) => labels.map((label, i) => {
	const option = selectedOptions[i];
	console.log(option);
	if (i === labels.length - 1) {
		return (
			<span key={option.value}>
				{label} (<a>{option.code}</a>)
			</span>
		);
	}
	return <span key={option.value}>{label} / </span>
});

export default class CascaderBox extends Component {
	render() {
		return (
			<div className="cascader-con">
				<div className="con">
					<Cascader options={options} placeholder='请选择地区' />
				</div>
				<div className="con">
					<Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} />
				</div>
				<div className="con">
					<CitySwitcher />
				</div>
				<div className="con">
					<Cascader options={options} expandTrigger="hover" displayRender={displayRender} />
				</div>
				<div className="con">
					<Cascader options={disableOptions} placeholder='请选择地区' />
				</div>
				<div className="con">
					<Cascader options={options} changeOnSelect />
				</div>
				<div className="con">
					<Cascader options={codeOptions} defaultValue={['zhejiang', 'hangzhou', 'xihu']} displayRender={displayRender2} style={{ width: 200 }} />
    		</div>
			</div>
		);
	}
}