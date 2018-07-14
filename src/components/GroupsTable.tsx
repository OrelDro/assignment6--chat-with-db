import * as React from "react";
import ReactTable from "react-table";
import "../css/react-table.css";
import "react-table/react-table.css";

interface GroupsTableProps {
    groups: any,
    setIdGroupParent: any,
    deleteGroupWithChildrens: any,
    setGroupIdToGetUsers: any,
    setGroupIdToAddUser:any
}


class GroupsTable extends React.Component<GroupsTableProps,{}> {
    constructor(props:GroupsTableProps) {
        super(props);
    }

    onTableClick=(state:any, rowInfo:any, column:any, instance:any)=>{
        return {
            onClick: (e:any, handleOriginal:any) => {
                if(e.target.className === 'fa fa-plus'){
                    this.props.setIdGroupParent(rowInfo.original._id);
                }
                else if(e.target.className === 'fa fa-trash') {
                    this.props.deleteGroupWithChildrens(rowInfo.original._id);
                }
                else if(e.target.className === 'fa fa-user-times') {
                    this.props.setGroupIdToGetUsers(rowInfo.original._id);
                }
                else if(e.target.className === 'fa fa-user-plus') {
                    this.props.setGroupIdToAddUser(rowInfo.original._id);
                }
                if (handleOriginal) {
                    handleOriginal();
                }
            }
        };
    }

    render() {
        const columns = [{
            Header: "Groups List",
            columns: [
                {
                    Header: "Group ID",
                    accessor: "_id",
                },
                {
                    Header: "Group Name",
                    accessor: "name"
                },
                {
                    Header:"",
                    accessor:"",
                    Cell: () => {
                        return <i className="fa fa-plus" />
                    }
                },
                {
                    Header:"",
                    accessor:"",
                    Cell: () => {
                        return <i className="fa fa-trash" />
                    }
                },
                {
                    Header: "",
                    accessor: "",
                    Cell: () => {
                        return <i className="fa fa-user-plus" />
                    }
                },
                {
                    Header: "",
                    accessor: "",
                    Cell: () => {
                        return <i className="fa fa-user-times" />
                    }
                }
            ]
        }]
        const groupsList = this.props.groups || [];
        return (
            <div>
                <ReactTable getTdProps={this.onTableClick} data={groupsList}
                            columns={columns} defaultPageSize={10} className="-striped -highlight"/>
            </div>
        );
    }
}

export default GroupsTable;