import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";


export default function Transfer() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    return <div className="flex justify-center bg-neutral-500 h-screen">
        <div className="border-gray-200  m-20 w-96 h-[65%] border border-gray-200 border-2 bg-white rounded">
            <div className="grid place-items-center m-5 font-sans">

                <div className="p-6 font-bold text-3xl">Send Money</div>

                <div className="flex items-center space-x-4 w-full pt-6">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className=" w-full">
                    <div className="pt-2 font-medium">Amount(in Rs)</div>
                    <input type="text" placeholder="amount" className="border border-gray-200 border-2 w-full p-2 " onChange={(e) => {
                        setAmount(parseFloat(e.target.value));
                    }} />
                </div>
                <div className=" w-full flex justify-center pt-6">
                    <button className="w-full p-2 text-white bg-green-500 rounded" onClick={async () => {
                        const transfer = await axios.post("http://localhost:3000/api/v1/account/transfer", {

                            to: id,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        }
                        )
                        if (!transfer) {
                            alert("transfer not successful")
                        }
                        alert("Tranfer Successful");
                        navigate("/dashboard");


                    }}>Transfer</button>
                </div>

            </div>
        </div>
    </div>
}
