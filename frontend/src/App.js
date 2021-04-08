import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [listValue, setListValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [save, setSave] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/List`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response && response.length > 0) {
          setList(response);
        } else {
          setList([
            {
              name: "test",
              id: 1,
            },
          ]);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteItem = (itm) => {
    let templist = list;
    templist = templist.filter((obj) => obj.id !== itm.id);
    setList(templist);
  };

  const addItem = (e) => {
    let templist = list;
    templist.push({ name: listValue, id: templist.length + 1 });
    setList(templist);
    setListValue("");
  };

  const updateListValue = (e) => {
    setListValue(e.target.value);
  };

  const saveList = () => {
    setSave(!save);
  };

  useEffect(() => {
    if (save) {
      fetch("http://localhost:5000/List", {
        method: "POST",
        body: JSON.stringify(list),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          alert(response);
          setIsLoading(false);
          setSave(!save);
        })
        .catch((error) => console.log(error));
    }
  }, [save]);

  return (
    <div className="App">
      <div className="header">
        <h1>ToDo List</h1>
      </div>
      <div className="itm-list">
        {list &&
          list.map((itm) => (
            <div className="box" key={itm.id}>
              <div>{itm.name}</div>
              <button onClick={() => deleteItem(itm)}>Delete</button>
            </div>
          ))}
      </div>
      <div className="add-ctnr">
        <div className="box">
          <div>
            <input
              type="text"
              onChange={updateListValue}
              value={listValue}
            ></input>
          </div>
          <button onClick={addItem}>Add Item</button>
        </div>
      </div>
      <div className="btn-save">
        <button onClick={saveList}>Save</button>
      </div>
    </div>
  );
}

export default App;
