import HomeLayout from "../layouts/HomeLayout";
import useTicket from "../hooks/useTickets";
import { FaDownload } from "react-icons/fa";
// import { usePDF } from "react-to-pdf";
import DataTable from 'react-data-table-component';
import TicketDisplayModal from "../components/TicketDisplayModal";
import { useState } from "react";
// import { useMediaQuery } from 'react-responsive';
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

function Dashboard () {
    const [ticketState] = useTicket();
    const [selectedTickets, setSlectedTickets] = useState({});
    // const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

    const columns = [
        {
            name: 'Ticket Id',
            selector: row => row._id,
            reorder: true,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            reorder: true,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            reorder: true,
        },
        {
            name: 'Reporter',
            selector: row => row.assignedTo,
            reorder: true,
            sortable: true,
        },
        {
            name: 'Priority',
            selector: row => row.ticketPriority,
            reorder: true,
            sortable: true,
        },
        {
            name: 'Assignee',
            selector: row => row.assignee,
            reorder: true,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            reorder: true,
            sortable: true,
        }
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '48px', // override the row height
                fontSize: '14px',
                '@media(min-width: 640px)': {
                    minHeight: '64px',
                    fontSize: '16px',
                },
                '@media(min-width: 768px)': {
                    minHeight: '72px',
                    fontSize: '18px',
                },
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                '@media(min-width: 640px)': {
                    paddingLeft: '12px',
                    paddingRight: '12px',
                },
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                '@media(min-width: 640px)': {
                    paddingLeft: '12px',
                    paddingRight: '12px',
                },
            },
        },
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2 p-4 sm:p-6 md:p-8 lg:p-10">

                <div className="bg-yellow-500 w-full mt-4 text-black text-center text-2xl sm:text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
                    {/* Tickets Records <FaDownload onClick={() => toPDF()}  className="inline cursor-pointer"/> */}
                    Tickets Records
                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto mt-4">
                    {ticketState && 
                        <DataTable
                            className="cursor-pointer"
                            columns={columns}
                            data={ticketState.ticketList}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            customStyles={customStyles}
                            onRowClicked={(row) => {
                                setSlectedTickets(row);
                                document.getElementById('my_ticket_modal').showModal();
                            }}
                        />
                    }
                </div>
                <TicketDisplayModal ticket={selectedTickets} key={selectedTickets._id} />
            </div>  
        </HomeLayout>
    );
}

export default Dashboard;
