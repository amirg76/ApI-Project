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
  row.setAttribute("id", arrOfAttributes[0]);
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
  editButton.setAttribute("id", arrOfAttributes[0]);

  deleteButton.textContent = "Delete";
  deleteButton.classList.add("deleteButton");
  deleteButton.setAttribute("id", arrOfAttributes[0]);

  deleteButton.addEventListener("click", deleteRow);
  editCell();

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

// const deleteRow = (e) => {
//   const clickedButton=e.target;
//   console.log(e.target);
//   const id=clickedButton.getAttribute('id');
//   console.log("parent:"+e.target.parentElement.getAttribute("e"));
//   const rows = document.querySelector(".row");
//   relevantRow=row.getElementById(id);
//   console.log(row);
// const table = document.querySelector(".table");
// table.removeChild(row);
//   // if(row)
// };
const deleteRow = () => {
  const rows = document.querySelectorAll(".row");
  rows.forEach((e) => {
    e.addEventListener("click", (e) => {
      if (e.target.classList.contains("deleteButton"))
        e.currentTarget.style.display = "none";
      console.log(e.target.classList.contains("deleteButton"));
    });
  });
};

const editCell = () => {
  const rows = document.querySelectorAll(".row");
  rows.forEach((e) => {
    e.addEventListener("click", (e) => {
      if (e.target.classList.contains("editButton"))
        e.currentTarget.addEventListener("click", (e) => {
          e.target.innerHTML = `<input type=text/>`;
        });
    });
  });
};
