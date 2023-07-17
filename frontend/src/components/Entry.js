import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';

const DataDisplayContainer = ({data,handleDelete}) => {

  const nvgt=useNavigate();

  const handleOpen = (e) => {
    e.preventDefault();
    window.localStorage.setItem("curr_subg",JSON.stringify(data));
    const nav = () => nvgt('/opensubg')
    nav();
  }

  return (
    
    <div className="container p-4 my-5 bg-light" style={styles.box}>
      <h3 className="text-center">{data.name}</h3>
      <ul className="list-group">
        <li className="list-group-item" >
            <span className="font-weight-bold">Number of People: </span>{data.people.length}
        </li>
        <li className="list-group-item" >
            <span className="font-weight-bold">Number of Posts: </span>{data.posts.length}
        </li>
        <li className="list-group-item" >
            <span className="font-weight-bold">Description: </span>{data.des}
        </li>
        <li className="list-group-item" >
            <span className="font-weight-bold">Tags: </span>{data.tags}
        </li>
        <li className="list-group-item" >
            <span className="font-weight-bold">Banned Keywords: </span>{data.bk}
        </li>
      </ul>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-danger"
          onClick={()=>handleDelete(data._id)}
          style={{marginTop:10}}
        >
          <DeleteIcon/>
        </button>
        <button type="button" className="btn btn-primary"  style={{marginTop:10}} onClick={handleOpen}>
          <LaunchIcon/>
        </button>
      </div>
    </div>
  );
};

const styles = {
  box: {
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
    width:'50%'
  }
};

export default DataDisplayContainer;
