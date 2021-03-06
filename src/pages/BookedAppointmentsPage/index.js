import React, { useEffect } from 'react';
import SubBanner from '../../components/Banner/SubBanner/SubBanner';
import { useDispatch, useSelector } from 'react-redux';
import './BookedAppointmentsPage.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Appointment from '../../components/Appointment/Appointment';

const BookedAppointmentsPage = (props) => {
  const loading = useSelector((state) => state.appointment.loading);

  const user = useSelector((state) => state.user.user);
  const appointments = useSelector((state) => state.appointment.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    const onFetchUser = () => dispatch(actions.fetchUser());
    const onFetchAppointments = () => dispatch(actions.fetchAppointments());
    onFetchUser();
    onFetchAppointments();
  }, [dispatch]);

  const appointmentsHistory = (
    <div>
      <h2>All appointments</h2>
      <div>
        {user && user.isAdmin ? (
          <p><b>Note:</b> You are at admin mode! <br /> You would be able to see all the appointments booked by all registerd users including yourself.</p>
        ) : (
          <p>A history of what you have booked is shown below.</p>
        )}
        {!appointments.length && user ? (
          <p className="NoHistory">
            Sorry, you currently don't have any appointments.
          </p>
        ) : (
          appointments.map((appointment) => (
            <Appointment
              {...props}
              isAdmin={user && user.isAdmin}
              appointmentId={appointment._id}
              key={appointment._id}
              task={appointment.task}
              appointmentTime={appointment.appointmentTime}
              date={appointment.date}
              message={appointment.message}
              owner={appointment.owner}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div>
      <SubBanner title={'Appointments History'} />
      <section className="BookedAppointments">
        {loading && <Spinner />}
        {appointmentsHistory}
      </section>
    </div>
  );
};

export default BookedAppointmentsPage;
