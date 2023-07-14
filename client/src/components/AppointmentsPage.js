import React, { useContext, useState } from 'react'
import UserContext from './UserContext';
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Button } from '@mui/material';

import { Box, InputLabel, TextField, FormControl, Select, MenuItem } from '@mui/material'

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
const AppointmentsPage = () => {
  const { selectedAppointment, deleteAppointment } = useContext(UserContext);
  const { id, date, time, reason_for_visit, doctor } = selectedAppointment;
  console.log(doctor);


  const [appointmentDate, setAppointmentDate] = useState(dayjs(date));
  const [appointmentTime, setAppointmentTime] = useState(dayjs(time, 'h A'));
  const [appointmentRFV, setAppointmentRFV] = useState(reason_for_visit);


  const [errors, setErrors] = useState('')
  const [viewAppFrom, setViewAppForm] = useState(false);
  const params = useParams();
  const navigate = useNavigate();



  const handleDeleteAppointment = () => {
    fetch(`/appointments/${params.id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          deleteAppointment(id)
          navigate(-1)
        }
      })
  }

  const handleSubmitEditAppointment = () => {

  }

  return (
    <>

      <Box sx={{ marginTop: 5, marginLeft: 5 }} display={viewAppFrom ? '' : 'none'}>
        <Typography sx={{ marginBottom: 2 }} variant='h3'>Book Your Appointment</Typography>

        <form
          onSubmit={handleSubmitEditAppointment}
        >

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginRight: 2, marginBottom: 2 }}
              disablePast
              label='Select A Date'
              format="DD-MM-YYYY"
              value={appointmentDate}
              onChange={(newValue) => {
                console.log(dayjs(newValue).format('YYYY-MM-DD'));
                setAppointmentDate(dayjs(newValue).format('YYYY-MM-DD'))
              }}
            />
            <TimePicker
              label="Select Appointment Time"
              views={['hours']}
              minTime={dayjs().set('hour', 8)}
              maxTime={dayjs().set('hour', 17)}
              value={appointmentTime}
              onChange={(newValue) => {
                console.log(dayjs(newValue).format('h A'));
                setAppointmentTime(dayjs(newValue).format('h A'))
              }}
            />
          </LocalizationProvider>


          <TextField
            value={appointmentRFV}
            onChange={(e) => setAppointmentRFV(e.target.value)} label="Reason for visit" variant="outlined"
          />
          <Button
            sx={{ marginLeft: 3 }}
            variant='contained'
            color="error"
            type='submit'
          >SUBMIT</Button>
        </form>
      </Box>

      <Typography sx={{marginTop:5}} variant='h4'>Appointment Info</Typography>
      <Typography>Date: {date}</Typography>
      <Typography>Time: {time}</Typography>
      <Typography>Reason For Visit{reason_for_visit}</Typography>
      <Typography>Doctor: {doctor.name}</Typography>
      <Typography>Department: {doctor.department}</Typography>
      <Button
        variant='contained'
        color="error"
        onClick={handleDeleteAppointment}
      >Cancel Appointment</Button>
      <Button
        sx={{ marginLeft: 3 }}
        variant='contained'
        onClick={() => setViewAppForm(true)}
      >Edit Appointment</Button>
    </>

  )

}

export default AppointmentsPage