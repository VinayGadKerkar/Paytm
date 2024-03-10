import axios from "axios";
import { useEffect, useState } from "react";


export function useAmount(){
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                setAmount(parseInt(response.data.balance));
            })
    }, [amount]);
    return amount ; 

}