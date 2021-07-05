import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../css/index.module.css";

function Home() {
  const [query, setQuery] = useState("");
  const [textSearch, setText] = useState([]);
  const [imgSearch, setImg] = useState([]);
  const [vidSearch, setVid] = useState([]);
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [prof, setProf] = useState('');
  const [gender, setGender] = useState('');
  const [searchStatus, setStatus] = useState("Enter Query to Search");
  const [showState, setShowState] = useState("Text");

  useEffect(() => {
    console.log("page loaded");
  }, []);

  const Loading = (
    <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  );
  const search = async (e) => {
    if(query === undefined || query === ''){
      alert('Enter Proper Search Query');
      return;
    }
    document.getElementById('searchResult').innerText=`Search Result for ${query+" "+age+" "+country+" "+prof+" "+gender}`;
    setText([]);
    setImg([]);
    setVid([]);
    
    setProf('');
    setGender('');
    setCountry('');
    setAge('');
    setStatus(Loading);
    e.preventDefault();
    console.log(query);
    await axios
      .all([
        await axios.get(
          `http://api.serpstack.com/search?access_key=91aea0af0ed39786e55e623b2a80c556&query=${query+" "+age+" "+country+" "+prof+" "+gender}`
        ), // For Text Search (Using Serpstack API)
        await axios.get(
          `https://pixabay.com/api/?key=22350545-339669c070f1aa267f2d1b7fb&q=${query+" "+age+" "+country+" "+prof+" "+gender}&per_page=30&page=1`
        ), // For Image Search (Using Pixabay API)
        await axios.get(
          `https://pixabay.com/api/videos?key=22350545-339669c070f1aa267f2d1b7fb&q=${query+" "+age+" "+country+" "+prof+" "+gender}&per_page=30&page=1`
        ), // For Video Search (Using Pixabay API)
      ])
      .then((data) => {
        setText(data[0].data);
        setImg(data[1].data);
        setVid(data[2].data);
      })
      .catch((err) => {
        console.log(err);
      });
    setQuery("");
  };
  const textData = ()=>{
    const data = textSearch.organic_results;
    console.log(textSearch);
    if(data.length === 0){
      return "No Data Found for this search Query"
    }
    return data.map((item,index)=>{
      return (
        <div key={index}>
          <h4>{item.title}</h4>
          <a  href={item.url}>{item.url}</a>
          <h6>{item.snippet}</h6>
        </div>
      )
    });
  }
  const imgData = ()=>{
    const data = imgSearch.hits;
    if(data.length === 0){
      return "No Data Found for this search Query"
    }
    return data.map((item,index)=>{
      return (
          <img src={item.webformatURL} alt={item.tags} key={index} className={styles.imgs}/>
      )
    });
  }
  const vidData = ()=>{
    const data = vidSearch.hits;
    if(data.length === 0){
      return "No Data Found for this search Query"
    }
    return data.map((item,index)=>{
      return (
        <div key={index} className={styles.video}>
          <h4>{item.tags}</h4>
          <video width="320" height="240" controls>
            <source src={item.videos.medium.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h6>User : {item.user}</h6>
          <h6>Views : {item.views}</h6>
          <h6>Likes : {item.likes}</h6>
          <h6>Comments : {item.comments}</h6>
        </div>
      )
    });
  }
  return (
    <div className={styles.search}>
      <h1 className="text-center p-3">Search Anything</h1>
      
      <div className="row">
        <div className="col-lg-10 col-md-9">
          <form className="row">
            <div className="col-10">
              <input
                type="search"
                className="form-control"
                id="search"
                placeholder="Enter Query to search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
            <div className="col-2">
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={search}
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className={`col-md-3 col-lg-2 ${styles.filter}`}>
          <div className={`dropdown ${styles.dropdown}`}>
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e)=>{
                    setCountry(e.target.value);
                    console.log(e.target.value);
                  }}
                  value={country}
                >
                  <option value="" hidden>
                    Country
                  </option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="China">China</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bhutan">Bhutan</option>
                </select>
              </li>
              <li className="input-group p-3">
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="age" className="form-label">Age</label>
                  </div>
                  <div className="col-6">
                    <input type="number" contentEditable="false" disabled value={age}/>
                  </div>
                </div>
                <input type="range" className="form-range" id="age" min="0" max="100" value={age} onChange={(e)=>{setAge(e.target.value)}}/>
              </li>
              <li>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e)=>{
                    setGender(e.target.value);
                    console.log(e.target.value);
                  }}
                  value={gender}
                >
                  <option defaultValue hidden>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </li>
              <li>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e)=>{
                    setProf(e.target.value);
                    console.log(e.target.value);
                  }}
                  value={prof}
                >
                  <option defaultValue hidden>
                    Profession
                  </option>
                  <option value="Engineer">Engineer</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Business">Business</option>
                  <option value="Lawyer">Lawyer</option>
                  <option value="Footballer">Footballer</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="searchResult" className={styles.searchResult}>

      </div>
      <div className={styles.content}>
        <div className="row">
          <div
            className={
              showState === "Text"
                ? `col-4 ${styles.activeTab} ${styles.tab}`
                : `col-4 ${styles.tab}`
            }
            onClick={() => {
              setShowState("Text");
            }}
          >
            Text
          </div>
          <div
            className={
              showState === "Image"
                ? `col-4 ${styles.activeTab} ${styles.tab}`
                : `col-4 ${styles.tab}`
            }
            onClick={() => {
              setShowState("Image");
            }}
          >
            Image
          </div>
          <div
            className={
              showState === "Video"
                ? `col-4 ${styles.activeTab} ${styles.tab}`
                : `col-4 ${styles.tab}`
            }
            onClick={() => {
              setShowState("Video");
            }}
          >
            Video
          </div>
        </div>
        <div className={styles.result}>
          <div
            className={
              showState === "Text"
                ? `${styles.active} ${styles.contentTab} ${styles.textTab}`
                : `${styles.contentTab} ${styles.textTab}`
            }
          >
            {textSearch.length !== 0 ? textData() : searchStatus}
          </div>
          <div
            className={
              showState === "Image"
                ? `${styles.active} ${styles.contentTab} ${styles.imagesTab}`
                : `${styles.contentTab} ${styles.imagesTab}`
            }
          >
            {imgSearch.length !== 0 ? imgData()
             : searchStatus}
          </div>
          <div
            className={
              showState === "Video"
                ? `${styles.active} ${styles.contentTab} ${styles.vidTab}`
                : `${styles.contentTab} ${styles.vidTab}`
            }
          >
            {vidSearch.length !== 0 ? vidData() : searchStatus}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
