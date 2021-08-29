import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieAction";
import axios from 'axios';
export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
      const res = await axios.get("https://husanadmin.herokuapp.com/api/movies", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(getMoviesSuccess(res.data));
    } catch (err) {
      dispatch(getMoviesFailure());
    }
  };
// POST
export const createMovie = async (movie,dispatch) => {

    dispatch(createMovieStart());
    try {
      const res = await axios.post("https://husanadmin.herokuapp.com/api/movies/", movie, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(createMovieSuccess(res.data));
    } catch (err) {
      dispatch(createMovieFailure());
    }
  };
export const updateMovie = async (h,dispatch) => {
  const { husan, ...info } = h;
    dispatch(updateMovieStart());
    try {
      const res = await axios.put(`https://husanadmin.herokuapp.com/api/movies/${husan}`,info , {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(updateMovieSuccess(res.data));
    } catch (err) {
      dispatch(updateMovieFailure());
    }
  };
// DELETE

export const deleteMovie = async (id,dispatch)=>{
    dispatch(deleteMovieStart())
    try{
        await axios.delete("https://husanadmin.herokuapp.com/api/movies/"+id, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
        });
        dispatch(deleteMovieSuccess(id))
    }catch(err){
       dispatch(deleteMovieFailure())
    }
}