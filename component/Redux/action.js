
import axios   from 'axios'
import * as type from './type'

export  const LoadSongList=(groupType)=> dispatch=>{


    axios.get(`https://itunes.apple.com/search?term=ARTIST+NAME`)
    .then(res => {
      const data = res.data;
      //this.setState({ persons });

      let finalObj = {}

      data.results
      
      .sort((a,b)=> b.collectionName - a.collectionName)
    
      .forEach((items) => {
          const album = items.collectionName
          if (finalObj[album]) {
              finalObj[album].push(items);
          } else {
              finalObj[album] = [items];
          }
      })

      
       const result = GroupByGenerator( data.results,groupType)
       console.log(result)
         dispatch({'type':type.LOAD_SONGLIST,'payload': result})
    })



}

export  const findArtist=(value,groupType)=> dispatch=>{


  axios.get('https://itunes.apple.com/search?term=' + value)
  .then(res => {
    const data = res.data;
    //this.setState({ persons });

    let finalObj = {}

    data.results
    
    .sort((a,b)=> b.collectionName - a.collectionName)
  
    .forEach((items) => {
        const album = items.collectionName
        if (finalObj[album]) {
            finalObj[album].push(items);
        } else {
            finalObj[album] = [items];
        }
    })

  //  setOrderedSale(finalObj)

   const result = GroupByGenerator( data.results,groupType)
       dispatch({'type':type.LOAD_SONGLIST,'payload': result})
  })



}


const GroupByGenerator=(songList,groupType)=>{

    let finalObj = {}

    songList
    .sort((a,b)=>     groupType === 'album' ? a.collectionName - b.collectionName :  a.releaseDate - b.releaseDate )
    .forEach((items) => {
        const album =  groupType == 'RD' ? items.releaseDate : items.collectionName;
        if (finalObj[album]) {
            finalObj[album].push(items);
        } else {
            finalObj[album] = [items];
        }
    })

    return  finalObj

}