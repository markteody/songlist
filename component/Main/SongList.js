import React ,{useState,useEffect,useRef} from 'react'
import { VStack, Box, Divider ,Text, Center, Heading,Spinner ,Input,Button,HStack,View,Container } from 'native-base';
import {ScrollView,TouchableOpacity,AsyncStorage} from 'react-native'
import {useSelector,useDispatch}  from 'react-redux'
import  * as action from '../Redux/action'
import { useNavigation } from '@react-navigation/native';
import  * as type from '../Redux/type'
export default function Main(){
    const navigation = useNavigation();
    const state = useSelector(states=>states.list)
    const [groupType,setGroupType] = useState('album')
    const [input,setInput] = useState("")
    const inputRef = useRef(null);
const dispatch  = useDispatch()
    useEffect(async ()=>{

   

        _retrieveData()

  //dispatch(action.LoadSongList(groupType))


    },[])


    const   _storeData = async (value) => {
        try {
          await AsyncStorage.setItem(
            'group',
            value
          );
        } catch (error) {
          // Error saving data
        }
      };


   const   _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('group');
          if (value !== null) {
            // We have data!!
            dispatch(action.LoadSongList(value))
            setGroupType(value)
          }
        } catch (error) {
          // Error retrieving data
        }
      };


    const setDafultGroup= async()=>{


       alert("Done")
        _storeData(groupType)
    }


    console.log('groupType',groupType)


    const handleShowSongDetails=(items)=>{
        dispatch({'type':type.LOAD_SONGDETAILS,'payload':items})
        navigation.navigate("SongDetails")

    }

    const handleFindArtist =()=>{
        dispatch({'type':type.LOAD_SONGLIST,'payload': []})
        inputRef.current.blur();
        dispatch(action.findArtist(input))

    }
    const handleChange=(value)=>{
        //console.log(name,value)
        setInput(value)
    }

    const toggleGrouBy=(_type)=>{
        dispatch({'type':type.LOAD_SONGLIST,'payload': []})
        setGroupType(_type)
        dispatch(action.findArtist(input,_type))

    }


    return(
        <View>
       
      
            
            <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}} >
          <View>
          <Heading>SONG LIST </Heading>
          </View>
            <View>
            <Button variant={"ghost"} onPress={setDafultGroup}  size="xs">set as default</Button> 
            </View>
             </View>
            <Divider></Divider>
            <HStack space={1} pb={4} pt={4} alignContent="center" > 
            <View style={{paddingTop:5}}>
            <Text>GROUP BY</Text>
            </View>
             <Button variant={groupType == 'album'? 'solid':"outline"}  onPress={()=>toggleGrouBy('album')} size="xs" >ALBUM</Button> 
             <Button variant={groupType !== 'album'? 'solid':"outline"}   onPress={()=>toggleGrouBy('RD')}  size="xs">Release Date</Button> 
             
            </HStack>
            
         <Center pb={1}>
         <Box alignItems="center">
      <Input type={'text'} w="100%"   ref={inputRef}  onChangeText={(value)=>handleChange(value)}  InputRightElement={<Button onPress={handleFindArtist} rounded={"md"} w="1/6" h="full" >
            
          FIND</Button>} placeholder="Search Artist" />
    </Box>
         </Center>
     
         <View style={{ paddingHorizontal: 15 }} >
       <ScrollView>
                        {
                            //  Object.entries(orderedSale).map((t,k) => <View key={k} ><Text>{t[0]}</Text></View>)            
                            Object.entries(state.songList).length > 0
                            ?    
                            Object.entries(state.songList).map((t, k) =>

                                <View key={t[0]}>
                                   
                                     <Text style={{fontWeight:"bold",fontSize:20,paddingVertical:12}}>{t[0]}</Text>
                                     {
                                           t[1].map((item,index)=>
                                            <VStack key={index}>
                                                <TouchableOpacity onPress={()=> handleShowSongDetails(item)}>
                                                <Box px="4" pt="4">
                                                <Text><Text size={12}>{index+1}. </Text>{ item.trackCensoredName}
                                                {'\n'}
                                                <Text   style={{fontSize:12,color:'gray',fontStyle:"italic"}}>   Artist Name: {item.artistName}</Text>
                                                </Text>
                                                    </Box>
                                                    <Box px="4" >
                                                    
                                                <Divider></Divider>
                                                    </Box>
                                                </TouchableOpacity>
                                                
                                            </VStack>
                                            // <Button>{item.trackName}</Button>
                                            )
                                     }
                                  
                                   
                                    

                                    <Divider></Divider>
                                </View>

                            )
                            :
                            <View style={{paddingTop:180}}>
                               
                                <Center>
                                    <Text  fontSize={20}  paddingTop="16" color={"#0e7490"} textAlign={"center"}><Spinner ></Spinner> Loading...</Text>
                                </Center>
                            </View>
                        }
                        
             
                    </ScrollView>
                        </View>
    
        </View>
    )


}