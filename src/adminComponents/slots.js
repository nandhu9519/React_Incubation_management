import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from 'react'
import { ErrorMessage, SuccessMessage } from "../component/header/errorMessage";
import './slots.css'
import { useNavigate } from "react-router-dom";



function Slots() {
  const  appData = JSON.parse(localStorage.getItem("appId"));
  const [allSlots, setAllSlots] = useState([])
  const [newSlot, setNewSlot] = useState('')
  const [sloteCode, setSloteCode] = useState('')
  const [error, setError] = useState('')
  const [confirmation, setConfimration] = useState('')
  const [booked, setBooked] = useState()
  const [bookedData, setBookedData] = useState()
  const navigate = useNavigate();

  
  console.log('appdata',appData);
  const getAllSlot = async () =>{
      let allSlotData = await axios.get(`/api/users/allSlots`)
      if(allSlotData.data.status===false){

      }else{
        setAllSlots(allSlotData.data.allSlots)
      }
  }
  const submitHandler =async (e)=>{
    console.log('codeeee',sloteCode);
    const data = {
      sloteCode
    }
    e.preventDefault()
    try{
      const resp=await axios.post('/api/users/addSlot',data) 
      setConfimration('New Slot Added') 
      setNewSlot(resp)
    }
    catch{
      setError('SlotCode is Required')
      console.log('error');
    }
  }
  useEffect(() => {
  getAllSlot()
  }, [bookedData,newSlot])
  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <div className="d-flex justify-content-around">
          <Container>
            <div className="col-md-4">
            <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Slot Code</Form.Label>
            <Form.Control type="text" placeholder="Enter slot code here" name="text" value={sloteCode} onChange={(e) => setSloteCode(e.target.value)} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Slot
          </Button>
        </Form>
        <br></br>
        { error? <ErrorMessage variant="danger">{error}</ErrorMessage>:" "  }
        {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "}
        {booked ? <SuccessMessage variant="success">{booked}</SuccessMessage> : " "}
        </div>
            <Card style={{ width: "100%", backgroundColor: "#f7f7f7" }}>
              <Card.Body>
                { <div className="row">
                  {
                    allSlots.map((obj)=>{
                      return(
                        <div className="seat" key={obj._id}>
                        {obj.status===true ? (
                        <div>
                          <h3 style={{textAlign:"center"}}>{obj.slotId}</h3>
                          <div className="bookedIcon">
                          <img src="https://img.icons8.com/ios-filled/100/000000/booking.png" onClick={() => {
                              navigate("/viewApplication");
                              localStorage.setItem(
                                "appId",
                                JSON.stringify(appData)
                              );
                            }} />
                          <span className="bookedIconSpan">SLOT BOOKED</span>
                          </div>
                        </div>) : 
                       (<div className="">
                         <h3 style={{textAlign:"center"}}>{obj.slotId}</h3>
                         <div className="notBookedIcon">
                         <img src="https://img.icons8.com/ios/100/000000/booking.png"  onClick={async() => {
                          const data =await axios.get(`/api/users/slotBooking/${appData[0]}/${appData[1]}/${obj._id}`)
                          console.log(data.data.data.matchedCount,'datatatata'); 
                          if(data.data.data.matchedCount == 1){
                            setBooked('Slot Alotted succesfully')
                            setBookedData(data)
                          }
                          console.log('datavane',data.data.data);
                          }}/>
                      <span className="notBookedIconSpan">CLICK TO ALLOT</span>
                          </div>
                         </div>)}
                        
                      </div>
                        
                      )
                    })
                  }
                </div> }
              </Card.Body>
            </Card>
            <br></br>
            {/* {confirmation ? <SuccessMessage variant="success">{confirmation}</SuccessMessage> : " "} */}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Slots;
