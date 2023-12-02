import { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axiosInstance from "../../config/axiosInstance";
import DataTable from "react-data-table-component";
import UserDisplayModal from "../../components/UserDisplayModal";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

function ListAllUsers () {

    const [userList, setUserList] = useState([])
    const [userDisplay, setUserDisplay] = useState({
        name: "",
        email: "",
        clientName:"",
        userType:"",
        userStatus:"",
        id:"",
    })
    async function loadUsers() {
        const response = await axiosInstance.get("/users", {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        setUserList(response.data.result)
    }

    
    const columns = [
        {
            name: 'User Id',
            selector: row => row._id,
            reorder: true,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            reorder: true,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            reorder: true,
        },
        {
            name: 'Status',
            selector: row => row.userStatus,
            reorder: true,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.userType,
            reorder: true,
            sortable: true,
        },
        
    ];
    
        const customStyles = {
            rows: {
                style: {
                    minHeight: '72px', // override the row height
                    fontSize: '18px'
                },
            },
            headCells: {
                style: {
                    paddingLeft: '8px', // override the cell padding for head cells
                    paddingRight: '8px',
                },
            },
            cells: {
                style: {
                    paddingLeft: '8px', // override the cell padding for data cells
                    paddingRight: '8px',
                },
            },
        };

    useEffect(() => {
        loadUsers()
    }, [])
    return (
        
        <HomeLayout>
           <div className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-center font-bold text-5xl mb-4 text-gray-500">User List</h1>
            {userList && 
                <DataTable
                    className="cursor-pointer"
                    columns={columns}
                    onRowClicked={(row) => {
                        setUserDisplay({
                            name: row.name,
                            email: row.email,
                            clientName:row.clientName,
                            userType:row.userType,
                            userStatus:row.userStatus,
                            id: row._id,
                        })
                        document.getElementById('my_modal_1').showModal()
                    }}
                    data={userList}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    customStyles={customStyles}
                />
                }
                {/*  */}
                <UserDisplayModal key={userDisplay.email} user={userDisplay}/>
           </div>
        </HomeLayout>
    )
}

export default ListAllUsers;