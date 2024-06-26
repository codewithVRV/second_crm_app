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
import { useSelector } from "react-redux";


ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Home () {

    const [ticketsState] = useTicket()
    const authState = useSelector((state) => state.auth)
    // console.log(authState)
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
            {/* <h1 className="text-center text-4xl font-bold mt-10 mb-10">{authState.role} Dashboard <span className="text-3xl font-semibold text-indigo-400">{authState.role != "customer" ? `All the tickets are assigned to ${authState ? (authState.data.name) : ""}` : `All the tickets are raised by ${authState ? (authState.data.name) : ""}`}</span> </h1> */}
            <div className="flex flex-wrap justify-center items-center gap-5 mt-4">
  <Card 
    titleText="open" 
    quantity={ticketsState.ticketDistribution.open} 
    status={ticketsState.ticketDistribution.open / ticketsState.ticketList.length}
  >
    <BsFillPencilFill className='inline mr-2' />
  </Card>
  <Card 
    titleText="inProgress" 
    quantity={ticketsState.ticketDistribution.inProgress} 
    status={ticketsState.ticketDistribution.inProgress / ticketsState.ticketList.length}
    background='bg-yellow-300' 
    borderColor='border-black' 
    fontColor='text-black' 
    dividerColor='bg-black'
  >
    <GrInProgress className='inline mr-2' />
  </Card>
  <Card 
    titleText="resolved" 
    quantity={ticketsState.ticketDistribution.resolved} 
    status={ticketsState.ticketDistribution.resolved / ticketsState.ticketList.length}
  >
    <IoCheckmarkDoneCircle className='inline mr-2' />
  </Card>
  <Card 
    titleText="onHold" 
    quantity={ticketsState.ticketDistribution.onHold} 
    status={ticketsState.ticketDistribution.onHold / ticketsState.ticketList.length}
    background='bg-yellow-300' 
    borderColor='border-black' 
    fontColor='text-black' 
    dividerColor='bg-black'
  >
    <MdPending className='inline mr-2' />
  </Card>
  <Card 
    titleText="cancelled" 
    quantity={ticketsState.ticketDistribution.cancelled} 
    status={ticketsState.ticketDistribution.cancelled / ticketsState.ticketList.length}
  >
    <MdOutlineCancel className='inline mr-2' />
  </Card>
</div>
<div className="mt-10 flex justify-center items-center">
  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
    <Pie data={pieChartData}/>
  </div>
</div>


        </HomeLayout>
    )
}

export default Home;