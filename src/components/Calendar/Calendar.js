import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from '../EventModal/EventModal';
import { v4 as uuidv4 } from 'uuid';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const MyCalendar = () => {

    const [events, setEvents] = useState([
        {
            id: uuidv4(),
            start: moment().toDate(),
            end: moment().add(2, "hours").toDate(),
            title: "Some title",
            description: "Some description",
        }
    ]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const onEventChange = ({ event, start, end }) => {
        updateOrCreateEvent({...event, event, start, end});
    }

    const updateOrCreateEvent = ({id, start, end, title, description}) => {
        if(start == 'Invalid Date' || end == 'Invalid Date')
            return;

        let currentEventIndex = events.findIndex(event => id == event.id);
        if(currentEventIndex == -1) {
            events.push({});
            currentEventIndex = events.length - 1;
        }
        events[currentEventIndex] = { id, start, end, title, description };
        setEvents([...events]);
    }

    const onNewEvent = (payload) => {
        setSelectedEvent({id: uuidv4(), title: '', description: '', start: payload.start, end: payload.end})
        setModalOpen(true);
    }

    const onSelectEvent = (event) => {
        setSelectedEvent(event)
        setModalOpen(true);
    }

    return (
        <React.Fragment>
            {selectedEvent &&
                <EventModal
                    key={uuidv4()}
                    event={selectedEvent}
                    updateEvent={updateOrCreateEvent}
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                ></EventModal>}
            <div className="App">
                <DnDCalendar
                    selectable
                    resizable
                    defaultDate={moment().toDate()}
                    events={events}
                    localizer={localizer}
                    onEventDrop={onEventChange}
                    onEventResize={onEventChange}
                    onSelectSlot={onNewEvent}
                    onSelectEvent={onSelectEvent}
                    longPressThreshold={50}
                    style={{ height: "100vh" }}
                    defaultView="day"
                />
            </div>
        </React.Fragment>
    );
}

export default MyCalendar;
