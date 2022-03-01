import {useState, useEffect, React} from 'react'
import { Button, Heading, Flex, Spacer } from "@chakra-ui/react"
import Web3 from "web3"
import marketContract from "./MarketPlace"
import CreateDealComponent from './CreateDeal'
import Deal from './Deal'


function App() {
  const [web3, setWeb3] = useState()
  const [address, setAddress] = useState()
  const [mpContract, setMpContract] = useState()
  const [events, setEvents] = useState([])

  const connectWalletHandler = async () => {
    // the following connection code is explained here: https://youtu.be/8ElPDw0laIo?t=2556
    // to check whether we are in a browser environment and metamask is installed.
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        // request wallet connection (specific to metamask)
        await window.ethereum.request({ method: "eth_requestAccounts"})
        // create web3 instance and set it to state (since we use it later on to interact with contract)
        const web3 = new Web3(window.ethereum) // needs a wallet provider as argument
        setWeb3(web3)
        // get list of accounts and set acc 1 to react state
        const accounts = await web3.eth.getAccounts()
        setAddress(accounts[0])

        // create local contract copy
        const mp = marketContract(web3)
        setMpContract(mp)

      } catch(err) {
        console.log(err.message)
      }
    } else {
      console.log("Please install metamask")
    }
  }

  const handleCreateDeal = async (dealData) => {
    const priceInWei = web3.utils.toWei(dealData.price, 'ether') // user can enter price in 1$ units
    const unixtime = parseInt((new Date(dealData.date).getTime() / 1000).toFixed(0))
    try {
      await mpContract.methods.createNewDeal(
          dealData.sender, dealData.receiver, priceInWei, dealData.token, unixtime
      ).send({
          from: address,
          value: 0,
          gas: 300000,
          gasPrice: null
          })
      } catch (err) {
        console.log(err.message)}
  }

  const handleShowDeals = () => {
    mpContract.getPastEvents("NewDeal",{
      fromBlock: 0,
      toBlock: 'latest'
    },
    (err, eventdata)=>{
      //console.log(eventdata[0])
      setEvents(eventdata)
    })
    }
  

  

  return (
    <div>
      <Heading>Crypto Deals dApp</Heading>
        <Button onClick={connectWalletHandler}>Connect Wallet</Button>
        <Flex grow={3}>
        <CreateDealComponent handleCreateDeal={handleCreateDeal} />
        <Spacer />
        <div>
          <Button onClick={handleShowDeals}>Show Deals</Button>
          {events.length !== 0 && <Deal eventdata={events}/>}
        </div>
        
        </Flex>
    </div>
  );
}

export default App;
