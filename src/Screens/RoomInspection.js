import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import BookInspectionScheduleModal from '../Modals/BookInspectionScheduleModal';

const RoomInspection = () => {
  const [inspectionSchedule, setInspectionSchedule] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);


  useEffect(() => {
    fetchInspectionSchedule();
  }, []);

  useEffect(() => {
   
    fetchRooms();
    
  }, []);

  const fetchInspectionSchedule = async () => {
    try {
      const response = await fetch('https://vercel-backend-gilt.vercel.app/inspection/get-inspections');
      if (response.ok) {
        const data = await response.json();
        setInspectionSchedule(data);
      } else {
        throw new Error('Failed to fetch cleaning schedule');
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const fetchRooms = async () => {
    try {
      
      
      const response = await fetch('https://vercel-backend-gilt.vercel.app/rooms/getAll');
      if (response.ok) {
        const data = await response.json();
        setRooms([]);
        data.forEach(element => {
          setRooms(prevArray => [...prevArray, element.roomNumber]);
         
        });

      } else {
        throw new Error('Failed to fetch cleaning schedule');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmBooking = async (roomNumber, date) => {
    try {
      const response = await fetch('https://vercel-backend-gilt.vercel.app/inspection/book-inspection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomNumber, date }),
      });

      if (response.ok) {
        alert('Room inspection schedule booked successfully');
        fetchInspectionSchedule();
      } else {
        throw new Error('Failed to book room inspection schedule');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
    }
  };

  const handleMarkComplete = async (roomId) => {
    try {
        const response = await fetch(`https://vercel-backend-gilt.vercel.app/inspection/mark-inspection-complete/${roomId}`, {
          method: 'GET',
        });
    
        if (response.ok) {
          alert('Room inspection marked as complete');
          fetchInspectionSchedule();
        } else {
          throw new Error('Failed to mark room inspection as complete');
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div>
      <h2 className="text-center">Room Inspection Schedule</h2>
      <div className="text-center">
      <br/><br/>
      <Button variant="primary" onClick={()=>{
                setShowModal(true);
             }}>
                Book Inspection
      </Button>
      <span> </span>
      <Button variant="primary" onClick={()=>{
                const today = new Date().toISOString().slice(0, 10);
                const todaySchedules = inspectionSchedule.filter((schedule) => schedule.date === today);
                setInspectionSchedule(todaySchedules)
             }}>
                Filter Today's Activity
      </Button>
      </div>
      {showModal && (
                <BookInspectionScheduleModal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirmBooking} roomNumbers={rooms} 
              />
            )}
       <br/><br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inspectionSchedule.map((schedule) => (

            
            <tr key={schedule._id}>
              <td>{schedule.roomNumber}</td>
              <td>{schedule.date.substring(0, 10)}</td>
              <td>{schedule.status}</td>
              <td>
                { (
                  <Button variant="success" onClick={() => handleMarkComplete(schedule._id)}>
                    Mark as Complete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RoomInspection;
