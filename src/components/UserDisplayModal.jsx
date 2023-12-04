import { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";

function UserDisplayModal ({user, resetTable}) {
    const [userDisplay, setUserDisplay] = useState(user)

    async function handleUserType (e) {
        
        try{

            const ul = e.target.parentNode.parentNode;
            const name = ul.getAttribute("name")
            const dropDownStatus = document.getElementById(`${name}Dropdown`)
            dropDownStatus.open = !dropDownStatus.open;
            const response = await axiosInstance.patch("user/updateUser", {
                userId: userDisplay.id,
                updates: {...userDisplay, [name]: e.target.textContent.toLowerCase()}
            }, {
                headers: {
                    "x-access-token" : localStorage.getItem("token")
                }
            })
            if(response?.data?.result) {
                toast.success("Successfully Updated the user..")
                setUserDisplay({...userDisplay, userStatus: response?.data?.result.userStatus})
                resetTable()

            }

        }
        catch (error) {
            toast.error("Something went wrong..")
            console.log(error)
        }
    }

    
    return (
        <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mt-0 text-center">User Details</h3>
                        <p className="py-[2px]">Name :- <span className="text-indigo-600 text-xl mx-5 font-semibold">{userDisplay.name}</span></p>
                        <p className="py-[2px]">Email:- <span className="text-indigo-600 text-xl mx-5 font-semibold">{userDisplay.email}</span></p>
                        <p className="py-[2px]">Type:- 

                         {/* <span className="text-indigo-600 text-xl mx-5 font-semibold">{userDisplay.userType}</span> */}
                         <details className="dropdown" id="userTypeDropdown">
                            <summary className="m-1 btn bg-gray-700 text-white">{userDisplay.userType}</summary>
                            <ul name="userType" onClick={handleUserType} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                <li><a>Customer</a></li>
                                <li><a>Admin</a></li>
                                <li><a>Engineer</a></li>
                            </ul>
                        </details>
                        </p>
                        <p className="py-[2px]">Status:-
                          {/* <span className="text-indigo-600 text-xl mx-5 font-semibold">{userDisplay.userStatus}</span> */}
                          <details className="dropdown" id="userStatusDropdown">
                                <summary className="m-1 btn bg-gray-700 text-white">{userDisplay.userStatus}</summary>
                                <ul name="userStatus" onClick={handleUserType} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                    <li><a>Suspended</a></li>
                                    <li><a>Rejected</a></li>
                                    <li><a>Approved</a></li>
                                </ul>
                            </details>
                         </p>
                        <p className="py-[2px]">ClientName:- <span className="text-indigo-600 text-xl mx-5 font-semibold">{userDisplay.clientName}</span></p>
                        <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                        </div>
                    </div>
                </dialog>
    )
}
export default UserDisplayModal;