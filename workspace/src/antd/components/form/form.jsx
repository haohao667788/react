import { Component } from 'react';
import { Form, Input, Select, Button, Checkboxm, Radio, Tooltip, Icon, Checkbox, Col, DatePicker } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;

function noop() {
	return false;
}

class Demo1 extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = function handleSubmit(e) {
			e.preventDefault();
			console.log('收到表单值：', this.props.form.getFieldsValue());
		}.bind(this);
	}
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<Form inline onSubmit={this.handleSubmit}>
				<FormItem
					label="账户：">
					<Input placeholder="请输入账户名" {...getFieldProps('userName')} />
				</FormItem>
				<FormItem
					label="密码：">
					<Input type="password" placeholder="请输入密码" {...getFieldProps('password')} />
				</FormItem>		
				<FormItem>
					<Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
				</FormItem>
				<Button type="primary" htmlType="submit">登录</Button>
			</Form>
		);
	}
}
Demo1 = Form.create()(Demo1);

class Demo2 extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = function handleSubmit(e) {
			e.preventDefault();
			console.log('收到表单值：', this.props.form.getFieldsValue());
		}.bind(this);
	}
	render() {
		const { getFieldProps } = this.props.form;
		const formItemLayout = {
			labelCol: {span: 6},
			wrapperCol: {span: 14}
		};
		return (
			<Form horizontal onSubmit={this.handleSubmit}>
				<FormItem {...formItemLayout} label="用户名：">
					<p className="ant-form-text" id="userName" name="userName">大眼萌 minion</p>
				</FormItem>
				<FormItem {...formItemLayout} label="密码：">
					<Input type="password" {...getFieldProps('pass')} placeholder="请输入密码" />
				</FormItem>
				<FormItem {...formItemLayout} label="您的性别：">
					<RadioGroup {...getFieldProps('gender', {initialValue: 'female'})}>
						<Radio value="male">男的</Radio>
						<Radio value="female">女的</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem {...formItemLayout} label="备注：" help="随便写点什么">
					<Input type="textarea" placeholder="随便写" {...getFieldProps('remark')} />
				</FormItem>
				<FormItem {...formItemLayout} label={<span>卖身华府 <Tooltip title="我为秋香"><Icon type="question-circle-o" /></Tooltip> ：</span>}>
					<Checkbox {...getFieldProps('agreement')}>同意</Checkbox>
				</FormItem>
				<FormItem wrapperCol={{span: 16, offset: 6}} style={{marginTop: 24}}>
					<Button type="primary" htmlType="submit">确定</Button>
				</FormItem>
			</Form>
		);
	}
}
Demo2 = Form.create()(Demo2);

class Demo3 extends Component {
	constructor(props) {
		super(props);
		this.handleReset = function handleReset(e) {
			e.preventDefault();
			this.props.form.resetFields();
		}.bind(this);
		this.handleSubmit = function handleSubmit(e) {
			e.preventDefault();
			this.props.form.validateFields((errors, values) => {
				if (!!errors) {
					console.log('Errors in form!!!');
					return;
				}
				console.log('Submit!!!');
				console.log(values);
			});
		}.bind(this);
		this.userExists = function userExists(rule, value, callback) {
			if (!value) {
				callback();
			} else {
				setTimeout(() => {
					if (value === 'JasonWood') {
						callback([new Error('抱歉，该用户名已被占用。')]);
					} else {
						callback();
					}
				}, 800);
			}
		}.bind(this);
		this.checkPass = function checkPass(rule, value, callback) {
			const { validateFields } = this.props.form;
			if (value) {
				validateFields(['rePasswd'], {force: true});
			}
			callback();
		}.bind(this);
		this.checkPass2 = function checkPass2(rule, value, callback) {
			const { getFieldValue } = this.props.form;
			if (value && value !== getFieldValue('passwd')) {
				callback('两次输入密码不一致！');
			} else {
				callback();
			}
		}.bind(this);
	}
	render() {
		const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
		const nameProps = getFieldProps('name', {
			rules: [
				{required: true, min: 5, message: '用户名至少为 5 个字符'},
				{validator: this.userExists}
			]
		});
		const emailProps = getFieldProps('email', {
			validate: [{
				rules: [
					{required: true}
				],
				trigger: 'onBlur'
			}, {
				rules: [
					{type: 'email', message: '请输入正确的邮箱地址'}
				],
				trigger: ['onBlur', 'onChange']
			}]
		});
		const passwdProps = getFieldProps('passwd', {
			rules: [
				{required: true, whitespace: true, message: '请填写密码'},
				{validator: this.checkPass}
			]
		});
		const rePasswdProps = getFieldProps('rePasswd', {
			rules: [{
				required: true,
				whitespace: true,
				message: '请再次输入密码'
			}, {
				validator: this.checkPass2
			}]
		});
		const textareaProps = getFieldProps('textarea', {
			rules: [
				{required: true, message: '真的不打算写点什么吗？'}
			]
		});
		const formItemLayout = {
			labelCol: {span: 7},
			wrapperCol: {span: 12}
		};
		return (
			<Form horizontal form={this.props.form}>
				<FormItem 
					{...formItemLayout}
					label="用户名："
					hasFeedback
					help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
					<Input {...nameProps} placeholder="实时校验，输入 JasonWood 看看" />
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="邮箱："
					hasFeedback>
					<Input {...emailProps} type="email" placeholder="onBlur 与 onChange 相结合" />
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="密码："
					hasFeedback>
					<Input {...passwdProps} type="password" autoComplete="off"
						onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
				</FormItem>
				<FormItem 
					{...formItemLayout}
					label="确认密码："
					hasFeedback>
					<Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
						onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="备注：">
					<Input {...textareaProps} type="textarea" placeholder="随便写" id="textarea" name="textarea" />
				</FormItem>		
				<FormItem wrapperCol={{span: 12, offset: 7}}>
					<Button type="primary" onClick={this.handleSubmit}>确定</Button>
					&nbsp;&nbsp;&nbsp;
					<Button type="ghost" onClick={this.handleReset}>重置</Button>
				</FormItem>				
			</Form>
		);
	}
}
Demo3 = Form.create()(Demo3);

export default class FormBox extends Component {
	render() {
		return (
			<div className="formbox-con">
				<div className="con first-con">
					<Input size="large" placeholder="大尺寸" />
					<Input placeholder="默认尺寸" />
					<Input size="small" placeholder="小尺寸" />
				</div>
				<div className="con">
					<p>平行排列</p>
					<Demo1 />
				</div>
				<div className="con">
					<p>平行排列</p>
					<Demo2 />
				</div>
				<div className="con">
					<p>表单控件</p>
					<Form horizontal>
						<FormItem 
							id="control-input"
							label="输入框："
							labelCol={{span: 6}}
							wrapperCol={{span: 14}}>
							<Input id="control-input" placeholder="Please enter..." />
						</FormItem>	
						<FormItem
							id="control-textarea"
							label="文本域："
							labelCol={{span: 6}}
							wrapperCol={{span: 14}}>
							<Input id="control-textarea" type="textarea" rows="3" />
						</FormItem>
						<FormItem
							id="select"
							label="Select 选择器："
							labelCol={{span: 6}}
							wrapperCol={{span: 14}}>
							<Select id="select" size="large" defaultValue="lucy" style={{width: 200}}>
								<Option value="jack">jack</Option>
								<Option value="lucy">lucy</Option>
								<Option value="disabled" disabled>disabled</Option>
								<Option value="yiminghe">yiminghe</Option>
							</Select>
						</FormItem>	
						<FormItem
				      label="Checkbox 多选框："
				      labelCol={{ span: 6 }}
				      wrapperCol={{ span: 18 }} >
				      <Checkbox className="ant-checkbox-vertical">选项一</Checkbox>
				      <Checkbox className="ant-checkbox-vertical">选项二</Checkbox>
				      <Checkbox className="ant-checkbox-vertical" disabled>选项三（不可选）</Checkbox>
				    </FormItem>
				    <FormItem
				      label="Checkbox 多选框："
				      labelCol={{ span: 6 }}
				      wrapperCol={{ span: 18 }} >
				      <Checkbox className="ant-checkbox-inline">选项一</Checkbox>
				      <Checkbox className="ant-checkbox-inline">选项二</Checkbox>
				      <Checkbox className="ant-checkbox-inline">选项三</Checkbox>
				    </FormItem>
				    <FormItem
				      label="Radio 单选框："
				      labelCol={{ span: 6 }}
				      wrapperCol={{ span: 18 }} >
				      <RadioGroup defaultValue="b">
				        <Radio value="a">A</Radio>
				        <Radio value="b">B</Radio>
				        <Radio value="c">C</Radio>
				        <Radio value="d">D</Radio>
				      </RadioGroup>
				    </FormItem>
					</Form>
				</div>
				<div className="con">
					<Form horizontal>
						<FormItem
							label="标签输入框："
							labelCol={{span: 6}}
							wrapperCol={{span: 16}}>
							<Input addonBefore="Http://" defaultValue="mysite.com" id="site1" />
						</FormItem>	
						<FormItem
							label="标签输入框："
							labelCol={{span: 6}}
							validateStatus="success"
							wrapperCol={{span: 16}}>
							<Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" id="site2" />
						</FormItem>	
						<FormItem
							label="select 标签输入框："
							labelCol={{span: 6}}
							wrapperCol={{span: 16}}>
							<InputGroup>
								<Input id="site4" placeholder="www.mysite" />
								<div className="ant-input-group-wrap">
									<Select defaultValue=".com" style={{width: 70}}>
										<Option value=".com">.com</Option>
										<Option value=".jp">.jp</Option>
										<Option value=".cn">.cn</Option>
										<Option value=".org">.org</Option>
									</Select>
								</div>
							</InputGroup>
						</FormItem>		
						<FormItem
							label="输入身份证："
							labelCol={{span: 6}}
							wrapperCol={{span: 16}}>
							<InputGroup>
								<Col span="6">
									<Input id="certNo1" />
								</Col>
								<Col span="6">
									<Input id="certNo2" />
								</Col>		
								<Col span="6">
									<Input id="certNo3" />
								</Col>
								<Col span="6">
									<Input id="certNo4" />
								</Col>	
							</InputGroup>
						</FormItem>
						<FormItem
							label="电话号码："
							labelCol={{span: 6}}
							wrapperCol={{span: 16}}>
							<InputGroup>
								<Col span="4">
									<Input id="tel1" defaultValue="086" />
								</Col>
								<Col span="2">
				          <p className="ant-form-split">--</p>
				        </Col>
				        <Col span="6">
				          <Input id="tel1" />
				        </Col>
				        <Col span="6">
				          <Input id="tel2" />
				        </Col>
				        <Col span="6">
				          <Input id="tel3" />
				        </Col>
				      </InputGroup>
				    </FormItem>			
					</Form>
				</div>
				<div className="con">
					<Form horizontal>
						<FormItem
							label="失败校验："
							labelCol={{span: 5}}
							wrapperCol={{span: 12}}
							validateStatus="error"
							help="请输入数字和字母组合">
							<Input defaultValue="无效选择" id="error" />
						</FormItem>	
						<FormItem
							label="警告校验："
							labelCol={{span: 5}}
							wrapperCol={{span: 12}}
							validateStatus="warning">
							<Input defaultValue="前方高能预警" id="warning" />
						</FormItem>	
						<FormItem
				      label="校验中："
				      labelCol={{ span: 5 }}
				      wrapperCol={{ span: 12 }}
				      hasFeedback
				      validateStatus="validating"
				      help="信息审核中...">
				      <Input defaultValue="我是被校验的内容" id="validating" />
				    </FormItem>
				    <FormItem
				      label="成功校验："
				      labelCol={{ span: 5 }}
				      wrapperCol={{ span: 12 }}
				      hasFeedback
				      validateStatus="success">
				      <Input defaultValue="我是正文" id="success" />
				    </FormItem>
				    <FormItem
				      label="警告校验："
				      labelCol={{ span: 5 }}
				      wrapperCol={{ span: 12 }}
				      hasFeedback
				      validateStatus="warning">
				      <Input defaultValue="前方高能预警" id="warning" />
				    </FormItem>
				    <FormItem
				      label="失败校验："
				      labelCol={{ span: 5 }}
				      wrapperCol={{ span: 12 }}
				      hasFeedback
				      validateStatus="error"
				      help="请输入数字和字母组合">
				      <Input defaultValue="无效选择" id="error" />
				    </FormItem>
				    <FormItem
				      label="行内校验："
				      labelCol={{ span: 5 }}
				      help>
				      <Col span="6">
				        <FormItem validateStatus="error" help="请选择正确日期">
				          <DatePicker />
				        </FormItem>
				      </Col>
				      <Col span="1">
				        <p className="ant-form-split">-</p>
				      </Col>
				      <Col span="6">
				        <FormItem>
				          <DatePicker />
				        </FormItem>
				      </Col>
				    </FormItem>
					</Form>
				</div>
				<div className="con">
					<Demo3 />
				</div>
			</div>
		);
	}
}















