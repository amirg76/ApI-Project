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
const addRow = (arrOfAttributes, arrayOfKeys) => {
  const table = document.querySelector(".table");
  const row = document.createElement("div");
  row.classList.add("row");
  row.setAttribute("id", arrOfAttributes[0]);
  for (let index = 0; index < arrOfAttributes.length; index++) {
    const attribute = arrOfAttributes[index];
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add(arrayOfKeys[index]);
    cell.textContent = attribute;
    row.appendChild(cell);
  }

  //   arrOfAttributes.forEach((e) => {
  //     const cell = document.createElement("div");
  //     cell.classList.add("cell");
  // cell.setAttribute("id", arrayOfKeys[])
  //     // cell.classList.add(e);
  //     cell.textContent = e;

  //     row.appendChild(cell);
  //   });
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
    addRow(
      [
        e.id,
        e.firstName,
        e.lastName,
        e.hobby,
        e.age,
        e.city,
        e.gender,
        e.capsule,
      ],
      Object.keys(e)
    );
  });
};

const paintPage = async () => {
  const mainArr = await arrOfTwoGroups();
  drawTable(mainArr);
  sortColumn(mainArr);
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

const sortColumn = (mainArr) => {
  let tempArr = [];
  // const titles = [...document.querySelectorAll(".title div")];
  const titles = document.querySelectorAll(".title div");

  console.log(titles);

  // const rows = [...document.querySelectorAll(".row")];
  const rows = document.querySelectorAll(".row");

  console.log("rows:"+rows);
  titles.forEach((title) => {
    title.addEventListener("click", function (e) {
      const specificTitleClass = e.target.className;
      // console.log(specificTitleClass);
for (let index = 0; index < mainArr.length; index++) {
  let row=rows.childNodes[index];
  console.log("row"+row);
  const relevantCell=row.getElementsByClassName(`${specificTitleClass}`);
  console.log("relevantCell"+relevantCell);
  if( specificTitleClass === relevantCell.className){ tempArr.push(relevantCell);
    console.log("relevantCell:"+relevantCell);
    }
}
      
      // forEach((row) => {
      //   const relevantCell=row.getElementsByClassName(`${specificTitleClass}`);
      //   console.log("relevantCell"+relevantCell);
      //   children=[...row.children];
      //   children.forEach(
      //   ((column) => {
      //   // console.log(row);
      //   if( specificTitleClass === column.className){ tempArr.push(column);
      //   console.log("column:"+column);
      //   }
      //   // if(row.className===)
      //   // console.log("***"+specificTitleClass);

      //  }))
      // });
      tempArr.sort();
      // console.log(tempArr);
    });
  });
};
