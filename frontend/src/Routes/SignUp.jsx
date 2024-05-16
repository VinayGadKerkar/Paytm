import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SignUp() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    return <div className="flex justify-center bg-neutral-500 h-screen">
        <div className="border-gray-200  m-5  w-65 h-[95%] border border-gray-200 border-2 bg-white rounded">
            <div className="grid place-items-center m-5 font-sans font-lg">

                <div className="p-2 font-bold text-3xl">Sign Up</div>
                <p className="p-2 text-base text-gray-500 text-sm">Enter your information to create an account</p>
                <div className=" w-full">
                    <div className="py-2">  First Name</div>
                    <input type="text" placeholder="jhon" className="border border-gray-200 border-2 w-full p-2 " onChange={(e) => {
                        setFirstName(e.target.value);
                    }} />
                </div>
                <div className=" w-full">
                    <div className="py-2">Last Name</div>
                    <input type="text" placeholder="doe" className="border border-gray-200 border-2 w-full p-2 " onChange={(e) => {
                        setLastName(e.target.value);
                    }} />
                </div>
                <div className=" w-full">
                    <div className="py-2">Email</div>
                    <input type="text" placeholder="jhondoe@gmail.com" className="border border-gray-200 border-2 w-full p-2 " onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                </div>
                <div className=" w-full">
                    <div className="py-2">Password</div>
                    <input type="password" placeholder="" className="border border-gray-200 border-2 w-full p-2 " onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>
                <div className=" w-full flex justify-center pt-6">
                    <button className="w-full p-2 text-white bg-black rounded" onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {

                            username: username,
                            firstName: firstName,
                            lastName: lastName,
                            password: password

                        })

                        if (response.data.message == 'this user already exists') {
                            alert(response.data.message);
                        }
                        if (response.data.message == 'Invalid inputs/Error while creating a User') {
                            alert(response.data.message);
                        }


                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");

                    }}>Sign Up</button>
                </div>
                <div className="flex justify-center p-2">
                    <div >already have an acoount?</div>
                    <div ><LoginButton></LoginButton></div>
                </div>

            </div>
        </div>
    </div>
}
function LoginButton() {
    const navigate = useNavigate();
    return <button onClick={() => {
        navigate("/signin")
    }} className="underline ">Login</button>
}