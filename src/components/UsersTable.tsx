import * as React from "react";
import ReactTable from "react-table";
import "../css/react-table.css";
import "react-table/react-table.css";
import {Link} from "react-router-dom";

interface UsersTableProps {
    users: any,
    deleteUser: any
}

interface UsersTableState {}

class UsersTable extends React.Component<UsersTableProps,UsersTableState> {
    constructor(props:UsersTableProps) {
        super(props);
    }

    onTableClick=(state:any, rowInfo:any, column:any, instance:any)=>{
        return {
            onClick: (e:any, handleOriginal:any) => {
                if(e.target.className === 'fa fa-trash'){
                    this.props.deleteUser(rowInfo.original.id);
                }
                if (handleOriginal) {
                    handleOriginal();
                }
            }
        };
    }

    render() {
        const columns = [{
            Header: "Users List",
            columns: [
                {
                    Header: "User ID",
                    accessor: "id",
                },
                {
                    Header: "User Name",
                    accessor: "UserName"
                },
                {
                    Header: "Age",
                    accessor: "age",
                },
                {
                    Header:"",
                    accessor:"",
                    Cell: () => {
                        return <i className="fa fa-trash" />
                    }
                },
                {
                    Header:"",
                    accessor:"",
                    Cell: (props:any) => {
                        return <Link to={{pathname:`/users/${props.original.id}/edit`, state:{user:props.original}}}><i className="fa fa-edit" /></Link>
                    }
                }
            ]
        }]
        const usersList = this.props.users || [];
        return (
            <div>
                <ReactTable getTdProps={this.onTableClick} data={usersList} columns={columns} defaultPageSize={10} className="-striped -highlight"/>
            </div>
        );
    }
}

export default UsersTable;