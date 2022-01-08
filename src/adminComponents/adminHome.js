import React from "react";
import { Container, Table } from "react-bootstrap";
import axios from 'axios'
import {useEffect,useState} from 'react'
import './adminHome.css'
import {useNavigate} from 'react-router-dom'

function AdminHome() {
  const info = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const config = {
    headers : {
      "Content-Type" : "application/json"
    }
  }
  useEffect(async() => {
    let appData = await axios.get(`/api/users/adminHome`)
    console.log('appdata',appData.data);

        if(appData.data.status==false){

        }else{
          setData(appData.data)
        }
  }, [])
  console.log('lenght',data.length);
  return (
    <div style={{ marginTop: "2%", textAlign: "center" }}>
      
      <Container>
        <h1>New Applications</h1>
        {data.length<1 ? (
        <div>
          <h3 style={{color:"red"}}>Currently no new applications</h3>
        </div>): (
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Application ID</th>
              <th>Company Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((obj,index) => {
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{obj._id}</td>
                  <td>{obj.companyName}</td>
                  <td style={{ color: "green" }}>{obj.status}</td>
                  <td>
                    <p
                      className="view"
                      style={{ color: "turquoise", textAlign: "center" }}
                      onClick={() => {
                        navigate("/viewApplication");
                        localStorage.setItem(
                          "appId",
                          JSON.stringify([obj._id])
                        );
                      }}
                    >
                      View Application
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        ) }
  
      </Container>
    </div>
  );
}

export default AdminHome;
