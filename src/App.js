import React,{useEffect, useState} from 'react'
import './App.css';
import MaterialTable from 'material-table';
import axios from 'axios'

function App() {
	const [data,setData ] = useState([])
	const [selectedRow, setSelectedRow] = useState(null);
	let col=[
		{title:"Name",field:"name"},
		{title:"Username",field:"username"},
		{title:"E-mail",field:"email"},
		{title:"Phone",field:"phone"},
		{title:"website",field:"website"}
	]
	let reply		
	const getData = async () => {reply = await axios({method:"GET",
													url:"https://jsonplaceholder.typicode.com/users"}
													)
													setData(reply.data)}

	useEffect( () => {
			getData();
	}, [])

  return (
	<div className="App">
		<h1>NC LLP</h1>
		<h3> To demonstrate the usage of material-table and rest-api</h3>
		<MaterialTable

			title=".."
			columns={col}
			data={data}
			editable={{
				onRowAdd:newValue =>new Promise((resolve,reject)=>{
					const newData = [...data,newValue]
					setData(newData)
					resolve()
				}),
				onRowDelete:value=>new Promise((resolve,reject)=>{
					let i=value.tableData.id
					let dataDummy = [...data]
					dataDummy.splice(i,1)
					setData(dataDummy)
					resolve()
				}),
				onRowUpdate:(editedValue,oldValue)=>new Promise((resolve,reject)=>{
					let dataDummy = [...data]
					let i = oldValue.tableData.id
					dataDummy[i] = editedValue
					setData(dataDummy)
					resolve()
				})
				}
			}
			onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
			options={{
				actionsColumnIndex:-1,
				headerStyle: {
					backgroundColor: '#01579b',
					borderRadius:".4em",
					color: '#FFF'
				},
				rowStyle: rowData => ({
          			backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
				})
			}}
			style={{
					borderRadius:"2em",
					width:"75%"
			}}
		/>
	</div>
  );
}

export default App;
