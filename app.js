/////getFetchedData

const getFetchedData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    //   console.log(data)

    return data;
  } catch (error) {
    console.log(error);
  }
};

getFetchedData("https://capsules-asb6.herokuapp.com/api/teacher/mordi");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function arrOfTwoGroups() {
  try {
    let conjoinedGroups = [];

    const mordi = await getFetchedData(
      "https://capsules-asb6.herokuapp.com/api/teacher/mordi"
    );
    const toam = await getFetchedData(
      "https://capsules-asb6.herokuapp.com/api/teacher/toam"
    );
    conjoinedGroups = mordi.concat(toam);
    const details = await Promise.all(
      conjoinedGroups.map((e) =>
        getFetchedData(`https://capsules-asb6.herokuapp.com/api/user/${e.id}`)
      )
    );

    console.log(conjoinedGroups);
    console.log(details);
    return details;
  } catch (err) {
    console.log(err);
  }
}
arrOfTwoGroups();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const addTitleRow = (title) => {
//     const titleBox = document.createElement('div');
//     titleBox.classList.add('row');
//     titleBox.textContent = title;
//     container.appendChild(titleBox);
//   };
const addRow = (arrOfAttributes) => {
  const table = document.querySelector(".table");
  const row = document.createElement("div");
  row.classList.add("row");
  arrOfAttributes.forEach((e) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = e;

    row.appendChild(cell);
  });
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  editButton.classList.add("editButton");
  editButton.textContent = "Edit";
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click",deleteRow);
  row.appendChild(editButton);
  row.appendChild(deleteButton);

  table.appendChild(row);
};
const drawTable = (arrOfData) => {
  console.log(arrOfData);

  arrOfData.forEach((e) => {
    addRow([
      e.id,
      e.firstName,
      e.lastName,
      e.hobby,
      e.age,
      e.city,
      e.gender,
      e.capsule,
    ]);
  });
};

const paintPage = async () => {
  drawTable(await arrOfTwoGroups());
};
paintPage();

const deleteRow=(e)=>{
console.log(e.target);

};
