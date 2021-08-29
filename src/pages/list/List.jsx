import { Link, useLocation } from "react-router-dom";
import "./list.css";
import {useState, useContext} from 'react';
import { Publish } from "@material-ui/icons";
import storage from '../../firebase'
import { MovieContext } from "../../context/movieContext/MovieContext";
import {updateMovie} from '../../context/movieContext/apiCalls';


export default function List() {
    const location = useLocation()
    const list = location.list
    const [kino, setKino] = useState({});
    const [img, setImg] = useState(null)
    const [imgTitle, setImgTitle] = useState(null)
    const [imgSm, setImgSm] = useState(null)
    const [trailer, setTrailer] = useState(null)
    const [video, setVideo] = useState(null);

    const {dispatch} = useContext(MovieContext)
    const handleClick = (e) => {
        e.preventDefault();
        updateMovie( kino, dispatch)
    }

    const upload = (items) => {
        items.forEach((item) => {
          const fileName = new Date().getTime() + item.label + item.file.name;
          const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                setKino((prev) => {
                  return { ...prev, [item.label]: url };
                });
              });
            }
          );
        });
      };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            {file: img, label: "img"},
            {file: imgTitle, label: "imgTitle"},
            {file: video, label: "video"},
            {file: imgSm, label: "imgSm"},
            {file: trailer, label: "trailer"},
        ])
    }
    const handleChange = (e) =>{
        const value =  e.target.value
        setKino((prev)=>(
            {...prev, [e.target.name]: value}
        ))

    }
    console.log(kino)  
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <span className="productName">{list.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{list._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{list.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">type:</span>
                      <span className="productInfoValue">{list.type}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>List title</label>
                  <input type="text" placeholder={list.title} name="title" onChange={handleChange} />
                  <label>type</label>
                  <input type="text" placeholder={list.type} name="type" onChange={handleChange} />
                  <label>Genre</label>
                  <input type="text" placeholder={list.genre} name="genre" onChange={handleChange} />
              </div>
              <div className="productFormRight">
                  <button className="productButton" onClick={handleClick}>Update</button>
                  <button className="productButton" onClick={handleUpload}>upload</button>
              </div>
          </form>
      </div>
    </div>
  );
}
