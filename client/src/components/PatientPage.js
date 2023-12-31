import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from './UserContext.js'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom'

import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material'


import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const PatientPage = () => {

  const [errors, setErrors] = useState('')
  const [viewAppFrom, setViewAppForm] = useState(false);
  const navigate = useNavigate();
  const { doctorsData, loggedInPatient, setLoggedInPatient, addAppointment } = useContext(UserContext);
  const { name, id } = loggedInPatient


  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState(dayjs());
  const [appointmentDoctor, setAppointmentDoctor] = useState('');
  const [appointmentRFV, setAppointmentRFV] = useState('');

  useEffect(() => {
    fetch('/authorized/patient')
      .then(res => {
        if (res.ok) {
          res.json().then(patient => {
            setLoggedInPatient(patient)
            navigate(`/patients/${patient.id}`)
          })
        }
        else {
          res.json().then(json => {
            console.log(json.errors);
            setErrors(json.errors)
          })
        }
      })

  }, [])

  const handleLogOut = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setLoggedInPatient([])
          navigate('/')
        }
      })
  }

  const handleViewAppointment = (id) => {


    navigate(`/appointments/${id}`)
  }



  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    fetch('/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: appointmentDate,
        time: appointmentTime,
        reason_for_visit: appointmentRFV,
        doctor_id: appointmentDoctor,
        patient_id: id
      })
    })
      .then(res => {
        if (res.ok) {
          res.json().then((appointment) => {
            console.log(appointment);
            addAppointment(appointment)
            setViewAppForm(false)
          })
        } else {
          res.json().then(json => {
     
            alert(json.errors.appointment)
          })
        }
      })
  }



  return (

    <>
      <Box sx={{ marginTop: 5, marginLeft: 5 }} display={viewAppFrom ? '' : 'none'}>
        <Typography sx={{ marginBottom: 2 }} variant='h3'>Book Your Appointment</Typography>

        <form onSubmit={handleSubmitAppointment}>

          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DateTimePicker
              label='Select A Date and Time'
              format="DD-MM-YYYY    H"
              views={["day", 'hours']}
              minDate={dayjs()}
              maxDate={dayjs().add(30, "day")}
              minTime={dayjs(`${appointmentDate} ${appointmentTime}`).isSame(dayjs(), "day") && dayjs().isAfter(dayjs().set("hour", 8))
                ? dayjs()
                : dayjs(`${appointmentDate} ${appointmentTime}`).set("hour", 8)}
              maxTime={dayjs().set("hour", 17)}
              ampm={false}
              value={dayjs(`${appointmentDate} ${appointmentTime}`)}
              onChange={(newValue) => {
                setAppointmentDate(dayjs(newValue).format('YYYY-MM-DD'));
                setAppointmentTime(dayjs(newValue).format('H'));
              }}
            />
          </LocalizationProvider>
          {errors.date && errors.date.map((err, index) => {
            return (
              <Box key={index}>
                <Typography variant='h9'>{err}</Typography>
              </Box>
            )

          })}

          <Box sx={{ width: 200, marginBottom: 3, marginTop: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Doctor</InputLabel>
              <Select

                value={appointmentDoctor}
                label="Doctor"
                onChange={(e) => {
                  // console.log(e.target);
                  setAppointmentDoctor(e.target.value)
                }}
              >
                {doctorsData.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}

              </Select>
            </FormControl>
            {errors.doctor && errors.doctor.map((err, index) => {
              return (
                <Box key={index}>
                  <Typography variant='h9'>{err}</Typography>
                </Box>
              )

            })}
          </Box>



          <TextField onChange={(e) => setAppointmentRFV(e.target.value)} label="Reason for visit" variant="outlined" />
          {errors.reason_for_visit && errors.reason_for_visit.map((err, index) => {
            return (
              <Box key={index}>
                <Typography variant='h9'>{err}</Typography>
              </Box>
            )

          })}
          <Button
            sx={{ marginLeft: 3 }}
            variant='contained'
            color="error"
            type='submit'
          >SUBMIT</Button>
        </form>
      </Box>


      <Box sx={{marginLeft: 5}}>
        <Typography sx={{ marginTop: 5 }} variant='h4'>Welcome {name}</Typography>

        <Button
          variant='contained'

          onClick={() => setViewAppForm(true)}
        >Book Appointment</Button>
        <Button
          sx={{ marginLeft: 3 }}
          variant='contained'
          color="error"
          onClick={handleLogOut}
        >LOGOUT</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reason</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>View Appointment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loggedInPatient.appointments && loggedInPatient.appointments.map(({ id, reason_for_visit, time, date }) => (
              <TableRow key={id}>
                <TableCell>{reason_for_visit}</TableCell>
                <TableCell>{time}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>
                  <Button variant="outlined"
                    onClick={() => handleViewAppointment(id)}
                  >View Appointment</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  )
}

export default PatientPage