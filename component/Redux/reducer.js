
import SongDetails from '../Main/SongDetails'
import * as type from './type'

const  initialState={
    songList: [],
    songDetails:[]
}


export default(state =  initialState,action)=>{

    switch(action.type){

        case type.LOAD_SONGLIST:
            try {
                return{
                    ...state,
                    songList: action.payload
                }
                
            } catch (error) {
                
            }
            break
        case type.LOAD_SONGDETAILS:
        try {
            return{
                ...state,
                songDetails: action.payload
            }
            
        } catch (error) {
            
        }
            default:

                return state


    }


}