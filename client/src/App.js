
import './App.css';
import { useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Doctors from './components/Doctors';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import DoctorPortal from './components/DoctorPortal';
import PatientPortal from './components/PatientPortal';
import DoctorPage from './components/DoctorPage';
import PatientPage from './components/PatientPage';

import AppointmentsPage from './components/AppointmentsPage';

import { UserContext } from './components/UserContext';
import SignUpPatient from './components/SignUpPatient';


const App = () => {


const {setDoctorsData} = useContext(UserContext)
 




  useEffect(() => {
    fetch('/doctors')
      .then(res => res.json())
      .then(data => setDoctorsData(data))
  }, [])


  return (
    <>
      <NavigationBar />
      
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:id' element={<DoctorPage />} />
          <Route path='/doctors/login' element={<DoctorPortal />} />
          <Route path='/patients/:id' element={<PatientPage />} />
          <Route path='/patients/login' element={<PatientPortal />} />
          <Route path='/appointments/:id' element={<AppointmentsPage />} />
          <Route path='/patients/signUp' element={<SignUpPatient />} />

        </Routes>
    </>

  );
}

export default App;
