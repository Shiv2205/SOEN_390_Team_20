import React, { useState } from "react";
import Navigation from "./LandingPageComponents/navigation";
import { useLocation } from "react-router-dom";
import { Header } from "./UnitPageComponents/header";
import ExampleWithProviders from "./UnitPageComponents/Requests";
import PropertyOperationsWithProviders from "./UnitPageComponents/PropertyOperations";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);



function UnitPage({ userData, setUserData }) {

    console.log("Current User Data:", userData);

    const { state } = useLocation();
    const propertyData = state && state.propertyData;
    const [events, setEvents] = useState([]);
    const [eventForm, setEventForm] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        setEventForm({ ...eventForm, [e.target.name]: e.target.value });
    };

    const SERVER = import.meta.env.VITE_SERVER_BASE_URL;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, location, date, time } = eventForm;
        const dateTime = moment(`${date} ${time}`).toISOString();

        const host_id = userData.account_id;

        const newEvent = { host_id, title, description, location, date_and_time: dateTime };
        try {
            const response = await fetch(`${SERVER}/events/newEvent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent)
            });
            if (response.ok) {
                setEvents([...events, { ...newEvent, start: new Date(dateTime), end: new Date(dateTime) }]);
                setEventForm({ title: '', description: '', location: '', date: '', time: '' }); // Reset form
                alert('Event added successfully!');
            } else {
                throw new Error('Failed to add event');
            }
        } catch (error) {
            console.error('Failed to add event', error);
        }
    };

    return (
        <div>
            <Navigation/>
            <Header property={propertyData}></Header>

            <ExampleWithProviders id={'43cc3d25-5297-4a5e-8b23-7dc246042cb2'} isAdmin={false}/>
            <PropertyOperationsWithProviders propertyId={'25e44531-6e47-4c70-a488-8f0c08e48c50'} isAdmin={false}/>

            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={events.map(event => ({
                        ...event,
                        start: new Date(event.date_and_time),
                        end: new Date(event.date_and_time)
                    }))}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: 500}}
                />
            </div>
            <h3>Add Event</h3><img src="img/event.png" className="mediumProfile-image"/>

            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={eventForm.title} onChange={handleChange}
                       placeholder="Event Title" required/>
                <textarea name="description" value={eventForm.description} onChange={handleChange}
                          placeholder="Description"/>
                <input type="text" name="location" value={eventForm.location} onChange={handleChange}
                       placeholder="Location" required/>
                <input type="date" name="date" value={eventForm.date} onChange={handleChange} required/>
                <input type="time" name="time" value={eventForm.time} onChange={handleChange} required/>
                <button type="submit">Add Event</button>
            </form>
        </div>
    );
}
// employee/admin id: cb29c3c8-936d-4a67-9c0a-2902349c07f7
// tenant id: 43cc3d25-5297-4a5e-8b23-7dc246042cb2

export default UnitPage;
