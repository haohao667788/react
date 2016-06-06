import { Component } from 'react';
import { DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;
const MonthPicker = DatePicker.MonthPicker;

const disabledDate = function disabledDate(current) {
	return current && current.getTime() > Date.now();
};

class DateRange extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startValue: null,
			endValue: null
		};
		this.disabledStartDate = function disabledStartDate(startValue) {
			if (!startValue || !this.state.endValue) {
				return false;
			}
			return startValue.getTime() >= this.state.endValue.getTime();
		}.bind(this);
		this.disabledEndDate = function disabledEndDate(endValue) {
			if (!endValue || !this.state.startValue) {
				return false;
			}
			return endValue.getTime() <= this.state.startValue.getTime();
		}.bind(this);
		this.onChange = function onChange(field, value) {
			this.setState({
				[field]: value
			});
		}.bind(this);
		this.onStartChange = function onStartChange(value) {
			this.onChange('startValue', value);
		}.bind(this);
		this.onEndChange = function onEndChange(value) {
			this.onChange('endValue', value);
		}.bind(this);
	}
	render() {
		return (
			<div>
				<DatePicker disabledDate={this.disabledStartDate}
					value={this.state.startValue}
					placeholder="开始日期"
					onChange={this.onStartChange} />
				<span>{' '}-{' '}</span>
				<DatePicker disabledDate={this.disabledEndDate}
					value={this.state.endValue}
					placeholder="结束日期"
					onChange={this.onEndChange} />	
			</div>
		);
	}
}

export default class DatePickerBox extends Component {
	render() {
		return (
			<div className="datepicker-con">
				<div className="con">
					<DatePicker />
				</div>
				<div className="con">
					<p>日期格式</p>
					<DatePicker defaultValue="2015/01/01" format="yyyy/MM/dd" />
				</div>
				<div className="con">
					<p>日期时间选择</p>
					<DatePicker showTime format="yyy-MM-dd HH:mm:ss" placeholder="请选择时间" />
				</div>
				<div className="con">
					<p>禁用</p>
					<DatePicker defaultValue="2015-06-06" disabled />
				</div>
				<div className="con">
					<p>指定不可选择日期</p>
					<DatePicker disabledDate={disabledDate} />
				</div>
				<div className="con">
					<p>时间范围一（diabledDate）</p>
					<DateRange />
				</div>
				<div className="con">
					<p>时间范围二（RangePicker）</p>
					<RangePicker style={{width: 184}} />
					<br />
					<RangePicker showTime format="yyyy/MM/dd HH:mm:ss" />
				</div>
				<div className="con">
					<p>月选择器</p>
					<MonthPicker defaultValue="2015-01" />
				</div>
			</div>
		);
	}
}