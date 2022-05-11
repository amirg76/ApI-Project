
/////getFetchedData

const getFetchedData = async (url) => {
    try {
     
      const response = await fetch(url);
      const data= await response.json();
    //   console.log(data)

      return data   
    

    } catch (error) {
      console.log(error);
    }
  };

  getFetchedData( "https://capsules-asb6.herokuapp.com/api/teacher/mordi");

  async function arrOfTwoGroups(){

    try {
      let conjoindGroups= [];
    
    const mordi= await getFetchedData("https://capsules-asb6.herokuapp.com/api/teacher/mordi")
    const toam= await getFetchedData("https://capsules-asb6.herokuapp.com/api/teacher/toam")
    conjoindGroups = mordi.concat(toam);
    console.log(conjoindGroups);
    } 
    catch (err) {
        console.log(err);
    }
   
 }
 arrOfTwoGroups();


//  function extractingInfo{
//     const twoGroups =[] 


//  }

//   {"id":"018","gender":"male","firstName":"לוי","lastName":"אפרים","hobby":"לטייל","age":22,"city":"תל-אביב","capsule":5}