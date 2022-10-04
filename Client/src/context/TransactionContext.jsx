import React ,{useEffect,useState} from 'react';
import {ethers}from 'ethers';

import {contractABI,contractAddress}from '../utils/constants';

export const TransactionContext = React.createContext();

const {ethereum} =window;


const getEthereumContract =()=>{
    const provider=new ethers.providers.Web3Provider(ethereum);
    const signer =provider.getSigner();
    const transactionContract =new ethers.Contract(contractAddress,contractABI,signer);

    return transactionContract;
}

export const TransactionProvider =({children}) =>{
    
    const[currentAccount, setCurrentAccount] =useState('');

    const [formData,setFormData] =useState({addressto:'',amount:'', keyword:'',message:''});

    const [isLoading, setIsLoading] = useState(false);
    
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));


    const handleChange=(e,name)=>{
        setFormData((prevState)=>({ ...prevState,[name]: e.target.value}))
    }
 


    const checkIfWalletIsConnected =async()=>{
      try{ 
        if(!ethereum) return alert ("Please install Metamask");
        const  accounts =await ethereum.request({method:'eth_accounts'});
        
         if(accounts.length){
            setCurrentAccount(accounts[0]);
            //getAllTransactions();
         }else{
            console.log('No accounts found');
         }
       }catch (error){
        console.log(error);
        throw new Error("No Ethereum objects.")
      }
        

    }
    const connectWallet =async()=>{
        try{if(!ethereum) return alert("please install Metamask");
        const accounts =await ethereum.request({method:'eth_requestAccounts'});
        setCurrentAccount(accounts[0]);

        }catch(error){
          console.log(error);
          throw new Error("No ethereum object.");
        }
    }
 
    const sendTransaction =async()=>{
        try{
          if(!ethereum) return alert("please install Metamask");
          
          const {addressto,amount,keyword,message} = formData;
          const transactionContract =getEthereumContract();
          const parsedAmount =ethers.utils.parseEther(amount);

          await ethereum.request({
            method:'eth_sendTransaction',
            param:[{
                from:currentAccount,
                to:addressto,
                gas:'0x5208', //21000 GWEI
                value:parsedAmount._hex, //0.0001
            }]
        })

        const transactionHash= await transactionContract.addToBlockChain(addressto,parsedAmount,message,keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        setIsLoading(false);
        console.log(`Sucess -${transactionContract.hash}`);

        const transactionCount =await transactionContract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());

        }catch(error){
            console.log(error);
            throw new Error("no etheruem objects.")
        }          

        
    }
    useEffect(() => {
        checkIfWalletIsConnected();
        }, []);


    return (
        <TransactionContext.Provider value={{connectWallet ,currentAccount, setFormData, formData,handleChange,sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    );
};