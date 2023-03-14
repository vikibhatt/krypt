import {AiFillPlayCircle} from "react-icons/ai"
import {SiEthereum} from "react-icons/si"
import {BSInfoCircle} from "react-icons/bs"

import {Loader} from "./Loader"
const Welcome = () =>{
    const connectWallet = () => {

    }
    return (
        <div className = "flex w-full justify-center ">
            <div className = "flex md:flex-row flex-col items-start justify-between md: p-20 py-12 px-4">
                <div className = "flex fles-1 justify-start fles-col md:mr-10">
                    <h1 className = "text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br/> across the world
                    <p className = "text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                       Explore the Crypto world Buy ans sell cryptocurrencies easily on Krypt  
                    </p>
                    </h1>
                    <button 
                        type = "button" 
                        onClick = {connectWallet} 
                        className = "flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] hover:text-white"
                    >
                        Connect Wallet 
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Welcome;