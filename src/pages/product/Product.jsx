import { Link, useLocation } from "react-router-dom";
import "./product.css";
import {useState, useContext} from 'react';
import { Publish } from "@material-ui/icons";
import storage from '../../firebase'
import { MovieContext } from "../../context/movieContext/MovieContext";
import {updateMovie} from '../../context/movieContext/apiCalls';


export default function Product() {
    const location = useLocation()
    const movie = location.movie
    const [kino, setKino] = useState({});
    const [img, setImg] = useState(null)
    const [imgTitle, setImgTitle] = useState(null)
    const [imgSm, setImgSm] = useState(null)
    const [trailer, setTrailer] = useState(null)
    const [video, setVideo] = useState(null);

    const {dispatch} = useContext(MovieContext)
    const handleClick = (e) => {
        e.preventDefault();
        setKino((prev)=>(
            {...prev, 'husan': movie._id}
        ))
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
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={movie.img} alt="" className="productInfoImg" />
                  <span className="productName">{movie.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{movie._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{movie.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year:</span>
                      <span className="productInfoValue">{movie.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">limit:</span>
                      <span className="productInfoValue">{movie.limit}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie title</label>
                  <input type="text" placeholder={movie.title} name="title" onChange={handleChange} />
                  <label>Year</label>
                  <input type="text" placeholder={movie.year} name="year" onChange={handleChange} />
                  <label>Genre</label>
                  <input type="text" placeholder={movie.genre} name="genre" onChange={handleChange} />
                  <label>Limit</label>
                  <input type="text" placeholder={movie.limit} name="limit" onChange={handleChange} />
                  <label>Trailer</label>
                  <input type="file" placeholder={movie.trailer} name="trailer" onChange={e=>setTrailer(e.target.files[0])}/>
                  <label>Video</label>
                  <input type="file" placeholder={movie.video} name="video" onChange={e=>setVideo(e.target.files[0])}/>
                  <label>imgTitle</label>
                  <input type="file" placeholder={movie.imgTitle} name="imgTitle" onChange={e=>setImgTitle(e.target.files[0])}/>
                  <label>imgSm</label>
                  <input type="file" placeholder={movie.imgSm} name="imgSm" onChange={e=>setImgSm(e.target.files[0])}/>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={movie.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton" onClick={handleClick}>Update</button>
                  <button className="productButton" onClick={handleUpload}>upload</button>
              </div>
          </form>
      </div>
    </div>
  );
}
