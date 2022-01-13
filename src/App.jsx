import React, { useState, useEffect } from "react";
import axios from "./Axios";

const App = () => {
  let [post, setPost] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [asc, setAsc] = useState([]);
  let [des, setDes] = useState([]);

  useEffect(() => {
    let fetchItems = async () => {
      let values = await axios.get("/posts");
      let { data } = values;
      setPost(data);
    };
    fetchItems();
  }, []);

  let sortAsc = e => {
    e.preventDefault();
    let asc = post.sort((a, b) => {
      return a.id - b.id;
    });
    let newarr = [...asc];
    setAsc(newarr);
    console.log(asc);
  };
  let sortDes = e => {
    e.preventDefault();
    let des = post.sort((a, b) => {
      return b.id - a.id;
    });
    let nearr = [...des];
    setDes(nearr);
    console.log(des);
  };
  let mapData = post
    .filter(val => {
      if (searchTerm === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
        console.log(val.title);
      }
    })
    .map(data => (
      <div
        key={data.id}
        style={{ display: "flex", justifyContent: "start", padding: "10px" }}
      >
        <h1 style={{ paddingRight: "30px" }}>Sl No:{data.id}</h1>
        <h1>{data.title}</h1>
      </div>
    ));

  // let AscData = asc
  //   .filter(val => {
  //     if (searchTerm === "") {
  //       return val;
  //     } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
  //       return val;
  //       console.log(val.title);
  //     }
  //   })
  //   .map(data => (
  //     <div
  //       key={data.id}
  //       style={{ display: "flex", justifyContent: "start", padding: "10px" }}
  //     >
  //       <h1 style={{ paddingRight: "30px" }}>Sl No:{data.id}</h1>
  //       <h1>{data.title}</h1>
  //     </div>
  //   ));

  // let DesData = des
  //   .filter(val => {
  //     if (searchTerm === "") {
  //       return val;
  //     } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
  //       return val;
  //       console.log(val.title);
  //     }
  //   })
  //   .map(data => (
  //     <div
  //       key={data.id}
  //       style={{ display: "flex", justifyContent: "start", padding: "10px" }}
  //     >
  //       <h1 style={{ paddingRight: "30px" }}>Sl No:{data.id}</h1>
  //       <h1>{data.title}</h1>
  //     </div>
  //   ));

  return (
    <section id="sectionHeader">
      <article>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            name="search"
            placeholder="Search name"
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
            className="inputField"
          />
          <button onClick={sortAsc} className="ascButton">
            Ascending
          </button>
          <button onClick={sortDes} className="desButton">
            Descending
          </button>
        </div>
        <div>{mapData}</div>
        {/* <div>{AscData}</div>
        <div>{DesData}</div> */}
      </article>
    </section>
  );
};

export default App;
