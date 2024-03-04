import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    return <div className="flex justify-center bg-neutral-500 h-screen">
        <div className="border-gray-200  m-20 w-65 h-[75%] border border-gray-200 border-2 bg-white rounded">
            <div className="grid place-items-center m-5 font-sans">

                <div className="p-2 font-bold text-3xl">Sign In</div>
                <p className="p-2 text-base text-gray-500 text-sm">Enter your credentials to access your account</p>
                <div className=" w-full">
                    <div className="py-2">Email</div>
                    <input type="text" placeholder="mukeshambani@paisa.com" className="border border-gray-200 border-2 w-full p-2 " onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                </div>
                <div className=" w-full">
                    <div className="py-2">Password</div>
                    <input type="text" placeholder="" className="border border-gray-200 border-2 w-full p-2 " onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>
                <div className=" w-full flex justify-center pt-6">
                    <button className="w-full p-2 text-white bg-black rounded" onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {

                            username: username,
                            password: password

                        })
                        if (response.data.message == 'Error while logging in') {
                            alert(response.data.message);
                        }
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }}>Sign In</button>
                </div>
                <div className="flex justify-center p-2">
                    <div >Dont have an acoount?</div>
                    <div ><SigninButton></SigninButton></div>
                </div>

            </div>
        </div>
    </div>
}
function SigninButton() {
    const navigate = useNavigate();
    return <button onClick={() => {
        navigate("/signup")
    }} className="underline ">Signup</button>
}
