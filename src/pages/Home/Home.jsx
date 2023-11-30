import { BsFillPencilFill } from "react-icons/bs";
import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTicketsForTheUser } from "../../redux/ticketSlice";

function Home () {

    const authState = useSelector((state) => state.auth)
    const ticketsState = useSelector((state) => state.tickets)
    // console.log("ticketstate is", ticketsState)
    const dispatcher = useDispatch()

    async function loadAllTickets () {
        const response = await dispatcher(getAllTicketsForTheUser())
        console.log("response of alltickets",response)
    }

    useEffect(() => {
        loadAllTickets()
    }, [ticketsState.token])
    return (
        <HomeLayout>
            <div className="flex justify-center items-center gap-5 mt-4">
                <Card>
                    <BsFillPencilFill className='inline mr-2' />
                </Card>
                <Card status={30} background='bg-yellow-300' borderColor='border-green-300' fontColor='text-black' dividerColor='bg-black'>
                    <BsFillPencilFill className='inline mr-2' />
                </Card>
                <Card>
                    <BsFillPencilFill className='inline mr-2' />
                </Card>
                <Card status={30} background='bg-yellow-300' borderColor='border-green-300' fontColor='text-black' dividerColor='bg-black'>
                    <BsFillPencilFill className='inline mr-2' />
                </Card>
            </div>
            
        </HomeLayout>
    )
}

export default Home;