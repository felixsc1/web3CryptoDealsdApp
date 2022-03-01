import {
    Heading,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Badge,
    Link,
    useColorModeValue,
  } from '@chakra-ui/react';
import {useState, useEffect} from 'react'

  export default function Deal(props) {
    // Currently, this is just a proof of principle for one deal (thus hardcoded index 0)
    // goal is to render one such box for each Deal. Then needs also some filter option for active/paid/completed deals

    console.log(props.eventdata[0].returnValues)
    // extracting the relevant data from the event:
    const [senderText, setSenderText] = useState()
    const [receiverText, setReceiverText] = useState()
    const [dealId, setDealId] = useState()
    const [priceUSD, setpriceUSD] = useState()
    const [token, setToken] = useState()
    
    // if set function is used outside useEffect, it would cause infinite loop
    useEffect(() => {
        setSenderText(props.eventdata[0].returnValues.sender)
        setReceiverText(props.eventdata[0].returnValues.receiver)
        setDealId(props.eventdata[0].returnValues.dealId)
        setpriceUSD(props.eventdata[0].returnValues.priceUSD)
        setToken(props.eventdata[0].returnValues.symbol)
    }, [])


    return (
      <Center py={6}>
        <Box
          maxW={'400px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'left'}>
          <Heading fontSize={'xl'} align={'center'} fontFamily={'body'}>
            Deal ID: {dealId}
          </Heading>
          <Text>
          </Text>
  
          <Stack align={'left'} direction={'column'} mt={6}>
            <Text fontSize={'xs'}>sender: {senderText}</Text>
            <Text fontSize={'xs'}>receiver: {receiverText}</Text>
            <Text fontSize={'xs'}>price (USD): {priceUSD/10**18}</Text>
            <Text fontSize={'xs'}>token: {token}</Text>
          </Stack>
          <Badge margin={2} colorScheme='green'>Active</Badge>
  
          <Stack mt={2} direction={'row'} spacing={4}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              _focus={{
                bg: 'gray.200',
              }}>
              Cancel
            </Button>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}>
              Finalize
            </Button>
          </Stack>
        </Box>
      </Center>
    );
  }