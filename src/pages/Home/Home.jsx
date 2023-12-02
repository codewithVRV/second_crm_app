import { BsFillPencilFill } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import { MdPending  } from "react-icons/md";
import { MdOutlineCancel   } from "react-icons/md";
import { IoCheckmarkDoneCircle     } from "react-icons/io5";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from 'react-chartjs-2';

import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";
import useTicket from "../../hooks/useTickets";


ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Home () {

    const [ticketsState] = useTicket()
    const pieChartData = {
        labels: Object.keys(ticketsState.ticketDistribution),
        datasets: [
            {
                data: Object.values(ticketsState.ticketDistribution),
                backgroundColor: ["red", "yellow", "blue", "orange", "green"]
            }
        ]
    }

    return (
        <HomeLayout>
            <div className="flex justify-center items-center gap-5 mt-4">
                <Card titleText="open" quantity={ticketsState.ticketDistribution.open} status={ticketsState.ticketDistribution.open / ticketsState.ticketList.length}>
                    <BsFillPencilFill className='inline mr-2' />
                </Card>
                <Card  titleText="inProgress" quantity={ticketsState.ticketDistribution.inProgress} status={ticketsState.ticketDistribution.inProgress / ticketsState.ticketList.length}background='bg-yellow-300' borderColor='border-black' fontColor='text-black' dividerColor='bg-black'>
                    <GrInProgress className='inline mr-2' />
                </Card>
                <Card  titleText="resolved" quantity={ticketsState.ticketDistribution.resolved} status={ticketsState.ticketDistribution.resolved / ticketsState.ticketList.length}>
                    <IoCheckmarkDoneCircle   className='inline mr-2' />
                </Card>
                <Card  titleText="onHold" quantity={ticketsState.ticketDistribution.onHold} status={ticketsState.ticketDistribution.onHold / ticketsState.ticketList.length} background='bg-yellow-300' borderColor='border-black' fontColor='text-black' dividerColor='bg-black'>
                    <MdPending  className='inline mr-2' />
                </Card>
                <Card  titleText="cancelled" quantity={ticketsState.ticketDistribution.cancelled} status={ticketsState.ticketDistribution.cancelled / ticketsState.ticketList.length} >
                    <MdOutlineCancel  className='inline mr-2' />
                </Card>
            </div>
            <div className=" mt-10 flex justify-center items-center">
                <div className="w-[22rem] h-[22rem]">
                    <Pie data={pieChartData}/>
                </div>
            </div>

        </HomeLayout>
    )
}

export default Home;