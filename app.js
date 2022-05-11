
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function arrOfTwoGroups(){

    try {
    
    let conjoinedGroups= [];
    
    const mordi= await getFetchedData("https://capsules-asb6.herokuapp.com/api/teacher/mordi");
    const toam= await getFetchedData("https://capsules-asb6.herokuapp.com/api/teacher/toam");
    conjoinedGroups = mordi.concat(toam);
    const details= await Promise.all(conjoinedGroups.map((e) =>
     getFetchedData(`https://capsules-asb6.herokuapp.com/api/user/${e.id}`)));
   
    console.log(conjoinedGroups);
    console.log(details);
    return details;

    } 
    catch (err) {
        console.log(err);
    }
   
 }
 arrOfTwoGroups();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const addTitleRow = (title) => {
    const titleBox = document.createElement('div');
    titleBox.classList.add('row');
    titleBox.textContent = title;
    container.appendChild(titleBox);
  };
  const addRow = (arrOfData) => {
    const row = document.createElement('div');
    row.classList.add('row');
    arrOfData.forEach((e) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = e;
      row.appendChild(cell);
    });
    container.appendChild(row);
  };
  const drawTable = (arrOfData) => {
    addTitleRow('Star Wars');
    addRow(['name', 'hair', 'height', 'planet name', 'population']);
    arrOfData.forEach((e) => {
      addRow([
        e.name,
        e.hair_color,
        e.height,
        e.planet.name,
        e.planet.population,
      ]);
    });
  };
  
  const paintPage = async () => {
    drawTable(await arrOfTwoGroups());
  };
  paintPage();

//   {"id":"018","gender":"male","firstName":"לוי","lastName":"אפרים","hobby":"לטייל","age":22,"city":"תל-אביב","capsule":5}