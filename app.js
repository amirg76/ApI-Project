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
  const titles = document.querySelectorAll(".title div");
  console.log(titles);
  const rows = document.querySelectorAll(".row");
  console.log("rows:" + rows);
  titles.forEach((title) => {
    title.addEventListener("click", function (e) {
      const specificTitleClass = e.target.className;
      for (let index = 0; index < mainArr.length; index++) {
        let row = rows.childNodes[index];
        console.log("row" + row);
        const relevantCell = row.getElementsByClassName(
          `${specificTitleClass}`
        );
        console.log("relevantCell" + relevantCell);
        if (specificTitleClass === relevantCell.className) {
          tempArr.push(relevantCell);
          console.log("relevantCell:" + relevantCell);
        }
      }
      tempArr.sort();
    });
  });
};

const search = (event) => {
  const optionValue = document.getElementsByTagName("select");
  optionValue.option.children[0].getAttribute("selected") == true;
  const typedValue = event.target.value;
};

const restart = () => {
  restartButton = document.querySelector(".restart");
  restartButton.setEventListener("click", () => {
    const table = document.querySelector(".table");
    const tableRows = table.children;
    for (let i = 1; i < tableRows.length; i++) {
      tableRows.removeChild(tableRows[i]);
    }
    paintPage();
  });
};
