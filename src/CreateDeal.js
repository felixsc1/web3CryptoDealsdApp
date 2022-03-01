import { React, useState } from 'react';
import { Input, Stack, Button, Box, Center, Heading, FormControl, FormLabel} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import "./css/style.css"

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
        // but to display date on timepicker we have to store javascript time object for now...
        setDealData(prevData => {
            return {
                ...prevData,
                date: event
            }
        })
    }

    return (
        <Center py={6}>
        <Box
        padding={'50px'}
        maxW={'700px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'lg'}>
                <Stack spacing={3}>
                    <Heading>Create New Deal</Heading>
                    <FormControl>
                        <FormLabel htmlFor='sender'>sender address</FormLabel>
                        <Input type="text" variant='filled' placeholder='sender address (0x....)' size='sm' onChange={handleChange} name="sender" />
                        <FormLabel htmlFor='receiver'>receiver address</FormLabel>
                        <Input type="text" variant='filled' placeholder='receiver address (0x....)' size='sm' onChange={handleChange} name="receiver" />
                        <FormLabel htmlFor='price'>price in USD</FormLabel>
                        <Input type="text" variant='filled' placeholder='price in USD' size='sm' onChange={handleChange} name="price" />
                        <FormLabel htmlFor='token'>token symbol</FormLabel>
                        <Input type="text" variant='filled' placeholder='e.g. "ETH"' size='sm' onChange={handleChange} name="token" />
                        <FormLabel htmlFor='date'>Date for Payment</FormLabel>
                        <DatePicker
                            name='date' 
                            selected={dealData.date} 
                            onChange={handleDate} 
                            dateFormat='dd/MM/yyyy'
                            placeholderText='pick a date'
                        />
                    </FormControl>
                    <Button onClick={ () => handleCreateDeal(dealData)}>Submit</Button>
                </Stack>
                </Box>
                </Center>
    )
}

