import { React, useState } from 'react';
import { Input, Stack, Container, Button, Heading} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CreateDealComponent({handleCreateDeal}) {

    const [dealData, setDealData] = useState({
        sender: "",
        receiver: "",
        price: "",
        token: "",
        date: null
    })


    function handleChange(event) {
        event.persist() // see https://stackoverflow.com/questions/61807662/reactjs-cannot-read-property-name-of-null
        setDealData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleDate(event) {
        // solidity expects unix timestamp: https://stackoverflow.com/questions/11893083/convert-normal-date-to-unix-timestamp
        const unixtime = parseInt((new Date(event).getTime() / 1000).toFixed(0))
        setDealData(prevData => {
            return {
                ...prevData,
                date: unixtime
            }
        })
    }

    return (
        <Container bg='gray.200'>
            <Stack spacing={3}>
                <Heading>Create New Deal</Heading>
                <Input placeholder='sender address' size='sm' onChange={handleChange} name="sender" />
                <Input placeholder='receiver address' size='sm' onChange={handleChange} name="receiver" />
                <Input placeholder='price in USD' size='sm' onChange={handleChange} name="price" />
                <Input placeholder='Token symbol' size='sm' onChange={handleChange} name="token" />
                {/* <Input placeholder='Due date' size='sm' onChange={handleChange} name="date" /> */}
                <DatePicker 
                    selected={dealData.date} 
                    onChange={handleDate} 
                    dateFormat='dd/MM/yyyy'
                />
                <Button onClick={ () => handleCreateDeal(dealData)}>Submit</Button>
            </Stack>
        </Container>
    )
}

