import { React, useState } from 'react';
import { Input, Stack, Container, Button, Heading} from '@chakra-ui/react'

export default function CreateDealComponent({handleCreateDeal}) {

    const [dealData, setDealData] = useState({
        sender: "",
        receiver: "",
        price: "",
        token: "",
        date: ""
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


    return (
        <Container>
            <Stack spacing={3}>
                <Heading>Create New Deal</Heading>
                <Input placeholder='sender address' size='sm' onChange={handleChange} name="sender" />
                <Input placeholder='receiver address' size='sm' onChange={handleChange} name="receiver" />
                <Input placeholder='price in USD' size='sm' onChange={handleChange} name="price" />
                <Input placeholder='Token symbol' size='sm' onChange={handleChange} name="token" />
                <Input placeholder='Due date' size='sm' onChange={handleChange} name="date" />
                <Button onClick={ () => handleCreateDeal(dealData)}>Submit</Button>
            </Stack>
        </Container>
    )
}

