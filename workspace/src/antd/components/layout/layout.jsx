import { Component } from 'react';
import { Row, Col } from 'antd';

const DemoBox = props => <p style={{height: props.value}}>{props.children}</p>;

export default class Layout extends Component {
	render() {
		return (
			<div className="layout-con">
				<div className="con">
					<Row className="demo-row">
			      <Col span={12}>.col-12</Col>
			      <Col span={12}>.col-12</Col>
			    </Row>
			    <Row className="demo-row">
			      <Col span={8}>.col-8</Col>
			      <Col span={8}>.col-8</Col>
			      <Col span={8}>.col-8</Col>
			    </Row>
			    <Row className="demo-row">
			      <Col span={6}>.col-6</Col>
			      <Col span={6}>.col-6</Col>
			      <Col span={6}>.col-6</Col>
			      <Col span={6}>.col-6</Col>
			    </Row>
				</div>
				<div className="con gutter-con">
			    <Row gutter={16}>
			      <Col className="gutter-row" span={6}>
			        <div className="gutter-box">.col-6</div>
			      </Col>
			      <Col className="gutter-row" span={6}>
			        <div className="gutter-box">.col-6</div>
			      </Col>
			      <Col className="gutter-row" span={6}>
			        <div className="gutter-box">.col-6</div>
			      </Col>
			      <Col className="gutter-row" span={6}>
			        <div className="gutter-box">.col-6</div>
			      </Col>
			    </Row>
			  </div>	
			  <div className="con">
			    <Row>
			      <Col span={8}>.col-8</Col>
			      <Col span={8} offset={8}>.col-8</Col>
			    </Row>
			    <Row>
			      <Col span={6} offset={6}>.col-6 .col-offset-6</Col>
			      <Col span={6} offset={6}>.col-6 .col-offset-6</Col>
			    </Row>
			    <Row>
			      <Col span={12} offset={6}>.col-12 .col-offset-6</Col>
			    </Row>
			  </div>
			  <div className="con">
			    <Row>
			      <Col span={18} push={5}>.col-18 .col-push-6</Col>
			      <Col span={6} pull={18}>.col-6 .col-pull-18</Col>
			    </Row>
			  </div>
			  <div className="con">
			    <p>子元素居左排列</p>
			    <Row type="flex" justify="start">
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			    </Row>

			    <p>子元素居中排列</p>
			    <Row type="flex" justify="center">
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			    </Row>

			    <p>子元素居右排列</p>
			    <Row type="flex" justify="end">
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			    </Row>

			    <p>子元素等宽排列</p>
			    <Row type="flex" justify="space-between">
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			    </Row>

			    <p>子元素分散对齐</p>
			    <Row type="flex" justify="space-around">
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			      <Col span={4}>.col-4</Col>
			    </Row>
			  </div>
			  <div className="con">
			    <p>顶部对齐</p>
			    <Row type="flex" justify="center" align="top">
			      <Col span={4}><DemoBox value={100}>.col-4</DemoBox></Col>
			      <Col span={4}><DemoBox value={50}>.col-4</DemoBox></Col>
			      <Col span={4}><DemoBox value={120}>.col-4</DemoBox></Col>
			      <Col span={4}><DemoBox value={80}>.col-4</DemoBox></Col>
			    </Row>

			    <p>居中对齐</p>
			    <Row type="flex" justify="space-around" align="middle">
			      <Col span={4}><DemoBox value={100}>.col-4</DemoBox></Col>
			      <Col span={4}><DemoBox value={50}>.col-4</DemoBox></Col>
			      <Col span={4}><DemoBox value={120}>.col-4</DemoBox></Col>
			      <Col span={4}><DemoBox value={80}>.col-4</DemoBox></Col>
			    </Row>

			    <p>底部对齐</p>
			    <Row type="flex" justify="space-between" align="bottom">
			      <Col span={4}><DemoBox value={100}>.col-4</DemoBox></Col>
			      <Col span={4}><DemoBox value={50}>.col-4</DemoBox></Col>
			      <Col span={4}><DemoBox value={120}>.col-4</DemoBox></Col>
			      <Col span={4}><DemoBox value={80}>.col-4</DemoBox></Col>
			    </Row>
			  </div>
			  <div className="con">
			    <Row type="flex">
			      <Col span={6} order={4}>1 col-order-4</Col>
			      <Col span={6} order={3}>2 col-order-3</Col>
			      <Col span={6} order={2}>3 col-order-2</Col>
			      <Col span={6} order={1}>4 col-order-1</Col>
			    </Row>
			  </div>
			</div>
		);
	}
}