import React ,{ useEffect,useState} from "react";
import {ethers} from "ethers";

import {contractABI,contractAddress} from "../utils/constants"

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer);

    return transactionContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("")
    const [formData, setFormData] = useState({addressTo:"",amount:"",keyword:"",message:""})
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"))
    const [Transaction, setTransaction] = useState([])

    const handleChange = (e,name) => {
        setFormData((prevState) => ({...prevState,[name]: e.target.value}));
    }

    const getAllTransactions = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const transacationContract = getEthereumContract();
            const availableTransactions = await transacationContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.reciever,
                addressFrom: transaction.sender,
                timestamp: new DataTransfer(transaction.timestamp.toNumber() * 1000).tolocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))

            setTransaction(structuredTransactions);
            console.log(availableTransactions);
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try{
        if(!ethereum) return alert("Please install metamask");
        const accounts = await ethereum.request({method: "eth_accounts"});

        if(accounts.length){
            setCurrentAccount(accounts[0]);

            getAllTransactions();
        }else{
            console.log("no account found")
        }
        }catch(error){
            console.log(error);
            throw new Error("No ethereum found");
        }
    }

    const checkIfTransactionExist = async () => {
        try{
            const transacationContract = getEthereumContract();
            const transactionCount = await transacationContract.getTransactionCount();      

            window.localStorage.setItem("transactionCount",transactionCount)
        }catch(error){
            console.log(error);
            throw new Error("No ethereum found");
        }
    }

    const connectWallet = async() => {
        try{
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            setCurrentAccount(accounts[0]); 
        }catch(error){
            console.log(error);
            throw new Error("No ethereum found");
        }
    }

    const sendTransaction = async() => {
        try{
            if(!ethereum) return alert("Please install metamask");

            const{addressTo,amount,keyword,message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: parsedAmount._hex, 
                }],
            })

        const transactionHash = await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        setIsLoading(false);
        console.log(`Success - ${transactionHash.hash}`);

        const transactionCount = await transactionContract.getTransactionCount();

        setTransactionCount(transactionCount.toNumber());

        window.reload();
        }catch(error){
            console.log(error);
            throw new Error("No ethereum found");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, []);
    return(
        <TransactionContext.Provider value = {{ connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction,Transaction,isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}