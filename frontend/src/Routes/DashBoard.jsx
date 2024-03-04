import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAmount } from "../Hooks/amount";



export default function DashBoard() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState([]);
    const [filterItem, setFilter] = useState("");
    const amount = useAmount()

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filterItem, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                const users = response.data;
                const finalResponse = users.filter((user) => {
                    return user._id != decoded.userId
                })
                setUserDetails(finalResponse);
            })
    }, [filterItem])
    

    return <div className="font-sans">

        <div className="flex justify-between items-center px-8 py-5 shadow-md font-bold">
            <div className="text-2xl">Payments App</div>
            <div className="flex items-center space-x-4 pt-6">
                <h3 className="text-xl font-semibold">Hello,User</h3>
                <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                    <span className="text-xl text-white">U</span>
                </div>
            </div>
        </div>
        <div className="m-3">
            <div className="p-5 font-bold text-lg">
                <div>Your Balance : ₹{amount}</div>
            </div>
            <div className="px-5 font-bold text-lg">Users</div>
            <div className="px-7">
                <input type="text" placeholder="search users..." className="border-gray-200 border-2 w-full p-1 rounded" onChange={async (e) => {
                    setFilter(e.target.value);
                }} />
                {userDetails.map((user) => {
                    return <div className="flex justify-between">
                        <div className="flex">
                            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                                <div className="flex flex-col justify-center h-full text-xl">
                                    {user.firstName[0]}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center h-ful">
                                <div>
                                    {user.firstName} {user.lastName}
                                </div>
                            </div>
                        </div>

                        <button onClick={() => {
                            navigate("/transfer/?id=" + user._id + "&name=" + user.firstName)
                        }} className="bg-slate-900 text-white rounded h-12 mt-2 p-2">Send Money</button>
                    </div>
                })}
            </div>

        </div>
    </div>
}