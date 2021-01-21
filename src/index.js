finder = require("./finder.js");

const errorColor = "#FF8080";

function addSearchTableRow(table) {
  const row = document.createElement("div");
  row.className = "row row-input";

  const current = document.createElement("input");
  const correct = document.createElement("input");

  current.className = "current";
  correct.className = "correct";

  function addNewRowWhenEditingLastRow() {
    const rows = table.querySelectorAll(".row-input");

    if (row == rows[rows.length - 1]) {
      addSearchTableRow(table);
    }

    current.removeEventListener("input", addNewRowWhenEditingLastRow);
    correct.removeEventListener("input", addNewRowWhenEditingLastRow);
  }

  current.addEventListener("input", addNewRowWhenEditingLastRow);
  correct.addEventListener("input", addNewRowWhenEditingLastRow);

  row.appendChild(current);
  row.appendChild(correct);

  table.insertBefore(row, table.lastChild);
}

function addSearchTableButton(table, action) {
  const row = document.createElement("div");
  row.className = "row row-footer";

  const button = document.createElement("button");
  button.innerText = "Search";
  button.addEventListener("click", action);

  row.appendChild(button);
  table.appendChild(row);
}

function collectInputsAndRemoveEmptyRows(table) {
  const rows = table.querySelectorAll(".row-input");

  let ok = true;
  let inputs = [];

  for (const row of rows) {
    const currentInput = row.querySelector("input.current");
    const correctInput = row.querySelector("input.correct");

    const current = currentInput.value;
    const correct = correctInput.value;

    if ((current === "") != (correct === "")) {
      ok = false;

      const emptyInput = current === "" ? currentInput : correctInput;
      const filledInput = current !== "" ? currentInput : correctInput;

      emptyInput.style.backgroundColor = errorColor;
      filledInput.style.backgroundColor = "";
    } else {
      currentInput.style.backgroundColor = "";
      correctInput.style.backgroundColor = "";

      if (current === "" && correct === "") {
        if (row != rows[rows.length - 1]) {
          table.removeChild(row);
        }
      } else {
        inputs.push({ current, correct });
      }
    }
  }

  if (ok && inputs.length == 0) {
    ok = false

    const row = table.querySelector(".row-input");

    const currentInput = row.querySelector("input.current");
    const correctInput = row.querySelector("input.correct");

    currentInput.style.backgroundColor = errorColor;
    correctInput.style.backgroundColor = errorColor;
  }

  return ok ? inputs : null;
}

function main() {
  const searchTables = document.getElementsByClassName("search-table");
  const resultTables = document.getElementsByClassName("result-table");

  function getAction(table) {
    if (table.id === "text-to-text-table") {
      return function () {
        const stringPairs = collectInputsAndRemoveEmptyRows(table);

        if (stringPairs != null) {
          const encodingPairs = finder.identifyWrongEncoding(stringPairs);

          const list = document.getElementById("text-to-text-results");
          const rows = list.querySelectorAll(".row-output");

          for (const row of rows) {
            list.removeChild(row);
          }

          if (encodingPairs.length == 0) {
            const row = document.createElement("div");
            row.className = "row row-output row-no-data";

            const noEncodingsFound = document.createElement("span");
            noEncodingsFound.innerText = "No encodings found...";

            row.appendChild(noEncodingsFound);
            list.appendChild(row);
          } else {
            for (const encodingPair of encodingPairs) {
              const row = document.createElement("div");
              row.className = "row row-output";

              const current = document.createElement("span");
              const correct = document.createElement("span");

              current.innerText = encodingPair.current;
              correct.innerText = encodingPair.correct;

              row.appendChild(current);
              row.appendChild(correct);

              list.appendChild(row);
            }
          }

          list.style.display = null;
        }
      };
    } else {
      return () => null;
    }
  }

  for (const list of resultTables) {
    list.style.display = "none";
  }

  for (const table of searchTables) {
    addSearchTableButton(table, getAction(table));
    addSearchTableRow(table);
  }
}

window.addEventListener("load", main);

//console.log(finder.identifyWrongEncoding([{ current: "Ã¶", correct: "ö" }]));
