import React from 'react'
import {View,Text} from 'react-native'
import {useSelector} from 'react-redux'
import {Center,Image,Box ,AspectRatio ,Heading,HStack,ZStack,Stack    } from 'native-base'


export default function SongDetails(){

    const state = useSelector(states=>states.list)





    return(
        <View>
<Box alignItems="center" pt={5}>
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
            uri:  state.songDetails.artworkUrl100
          }} alt="image" />
          </AspectRatio>
          {/* <Center bg="violet.500" _dark={{
          bg: "violet.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
            PHOTOS
          </Center> */}
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2} textAlign="center">
            <Heading size="md" ml="-1">
            
        <Heading style={{fontSize:20}}>{state.songDetails.artistName}</Heading>
        {'\n'}  
        <Text  style={{fontSize:12,color:'gray',fontStyle:"italic"}}>{'Artist'}</Text>
     
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
          
     <Text  style={{fontSize:20}}>{state.songDetails.collectionName}</Text>
     <Text  style={{fontSize:12,color:'gray',fontStyle:"italic"}}>{'\n'}{'Album'}</Text>
            </Text>
          </Stack>
      
        </Stack>
      </Box>
    </Box>
            {/* <Center pt={10}>
                <Image 
                borderRadius={100}
                source={{
                    uri: state.songDetails.artworkUrl100
                  }} alt="Alternate Text" size="xl" 
                ></Image>
            </Center>

     <Center> 
        <Text style={{fontSize:20}}>{state.songDetails.artistName}</Text>
     <Text  style={{fontSize:12,color:'gray',fontStyle:"italic"}}>{'Artist'}</Text>
     </Center>  
     <Center> 
     <Text  style={{fontSize:20}}>{state.songDetails.collectionName}</Text>
     <Text  style={{fontSize:12,color:'gray',fontStyle:"italic"}}>{'\n'}{'Album'}</Text></Center>  
        </View> */}
         </View>
    )


}