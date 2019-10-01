import React, { Component } from 'react'
import { Tag, Form, Input, Select, Button, Table } from 'element-react'
import { queryStudentList } from '../api.js'
class MemberMngment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchFormModel: {
				oid: null,
				field: null,
				status: null,
			},
			tableData_ds: [
				{ oid: 33, owner: "老王2", type: 1, audit: 1, balance: 4544, member: 4543, website: "一個網站", app: "ok", status: 2, operation: "somethisng", admin: "張經理" },
				{ oid: 23, owner: "小李子", type: 2, audit: 1, balance: 213, member: 1445, website: "新浪網", app: "ok", status: 1, operation: "somethisng", admin: "王總監" },
				{ oid: 14, owner: "小桂子", type: 1, audit: 1, balance: 767, member: 47, website: "百度", app: "ok", status: 2, operation: "somethisng", admin: "李部長" },
				{ oid: 7, owner: "大柱子", type: 2, audit: 1, balance: 7697878, member: 78786, website: "google", app: "ok", status: 1, operation: "somethisng", admin: "蔣總統" },
			],
			columns: [
				{
					label: "ID",
					prop: "id",
				},
				{
					label: "name",
					prop: "name",
				},
				{
					label: "sex",
					prop: "sex"
				},
				{
					label: "nationality",
					prop: "nationality"
				},
				{
					label: "class",
					prop: "class"
				}
			],
		}
	}

	onSubmit(e) {
		e.preventDefault()
	}

	onChange(key, value) {
		this.setState({
			form: Object.assign(this.state.searchFormModel, { [key]: value })
		})
	}
	render() {
		return (
			<div className="page">
				<section className="statistics">
					<span>
						<span>禁用總數</span><Tag type="success" className="el-tag-round">17</Tag>
					</span>
					<span>
						<span>啟用總數</span><Tag type="warning" className="el-tag-round">45</Tag>
					</span>
					<span>
						<span>新增总数</span><Tag type="warning" className="el-tag-round">754</Tag>
					</span>
					<span>
						<span>會員總數</span><Tag type="danger" className="el-tag-round">69</Tag>
					</span>
				</section>
				<section className="content">
					<section className="search">
						<Form inline={true} model={this.state.searchFormModel} onSubmit={this.onSubmit}>
							<Form.Item>
								<Select value={this.state.searchFormModel.field} size="small">
									<Select.Option label="業主名稱" value="oner" />
									<Select.Option label="網站名稱" value="website" />
									<Select.Option label="業主OID" value="oid" />
								</Select>
							</Form.Item>
							<Form.Item>
								<Input size="small" value={this.state.searchFormModel.oid} onChange={this.onChange.bind(this, 'user')}></Input>
							</Form.Item>
							<Form.Item>
								<span>审核状态：</span>
								<Select value={this.state.searchFormModel.status} size="small">
									<Select.Option label="等待審核" value="0" />
									<Select.Option label="通過" value={true} />
									<Select.Option label="不通過" value={true} />
								</Select>
							</Form.Item>
							<Form.Item>
								<span>業主類型：</span>
								<Select value={this.state.searchFormModel.type} size="small">
									<Select.Option label="現金" value={true} />
									<Select.Option label="代理" value={true} />
								</Select>
							</Form.Item>
							<Form.Item>
								<Button type="primary" size="small">搜索</Button>
							</Form.Item>
							<Form.Item>
								<Button type="primary" size="small">重置</Button>
							</Form.Item>
						</Form>
					</section>
					<section className="table">
						<Table columns={this.state.columns} data={this.state.tableData_ds} showSummary={true} sumText="總計" />
					</section>
					<footer>
						dsd
					</footer>
				</section>
			</div>
		)
	}
	componentDidMount() {
		queryStudentList({}).then(data => {
			this.setState({ "tableData_ds": data })
		}).catch(e => {
			console.log(222, e)
		})
	}
}
export default MemberMngment
