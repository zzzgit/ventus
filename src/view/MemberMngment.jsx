import React, { Component } from 'react'
import { Tag, Form, Input, Select, Button, Table } from 'element-react'
import gql from "graphql-tag"
import { Query } from 'react-apollo'
// import { queryNumberList } from "$src/api.js"
class MemberMngment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchFormModel: {
				oid: null,
				field: null,
				status: null,
			},
			tableData_ds: [],
			columns: [
				{
					label: "號碼",
					prop: "number",
				},
				{
					label: "服務費",
					prop: "price"
				},
				{
					label: "話費",
					prop: "balance"
				},
				{
					label: "購買",
					prop: "owner",
					render(){
						return (
							<section>
								<span>買買買</span>
							</section>
						)
					}
				},
			],
		}
	}

	onSubmit(e) {
		e.preventDefault()
	}

	onChange(key, value) {
		this.setState({
			searchFormModel: Object.assign(this.state.searchFormModel, { [key]: value })
		})
	}
	render() {
		const GET_DOGS = gql`
			{
				number{
					id,
					number,
					price
				}
			}
		`
		return (
			<Query query={GET_DOGS}>
				{({ loading, error, data, refetch }) => {
					console.log(data)
					if (loading){
						return <p>Loading...</p>
					} 
					if (error){
						return <p>Error :(</p>
					} 
					//this.setState({ "tableData_ds": data.number})
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
											<Input size="small" value={this.state.searchFormModel.oid} onChange={this.onChange.bind(this, 'oid')}></Input>
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
											<Button type="primary" size="small" onClick={refetch.bind(this)}>搜索</Button>
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
				}}
			</Query>
		)
	}
	componentDidMount() {
		// client.query({
		// 	query: GET_DOGS
		// }).then(result => {
		// 	this.setState({ "tableData_ds": result.data.number })
		// }).catch(e => {
		// 	console.log(4, e)
		// })
	}
}

export default MemberMngment
