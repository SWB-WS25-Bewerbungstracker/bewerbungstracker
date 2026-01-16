/*
import '../App.css'
const Termine: React.FC = () => {
    return (
        <div className="calendarMainOut">
            <div className="calendarMainIn">
                <div className="calendar" >
               <h1 className ="heading">Kalender</h1>
                <div className="navigator-date">
                    <h2 className="month">May ,</h2>
                    <h2 className="year">2025</h2>
                    <div className="button-date">
                        <i className="bx bx-chevron-left"></i>
                        <i className="bx bx-chevron-right"></i>
                    </div>
                </div>
                <div className="weekdays">
                    <span>Mo</span>
                    <span>Di</span>
                    <span>Mi</span>
                    <span>Do</span>
                    <span>Fr</span>
                    <span>Sa</span>
                    <span>So</span>
                </div>
                <div className="days">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span className="currentDay">7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                    <span>13</span>
                    <span>14</span>
                    <span>15</span>
                    <span>16</span>
                    <span>17</span>
                    <span>18</span>
                    <span>19</span>
                    <span>20</span>
                    <span>21</span>
                    <span>22</span>
                    <span>23</span>
                    <span>24</span>
                    <span>25</span>
                    <span>26</span>
                    <span>27</span>
                    <span>28</span>
                    <span>29</span>
                    <span>30</span>
                    <span>31</span>

                </div>
            </div>
                <div className="calendarEvents">
                    <div className="calendarEventPopup">
                        <div className="time-input">
                            <div className="eventpopup">Zeit</div>
                            <input type="number" name="hours" min={0} max={24} className="hours"/>
                            <input type="number" name="minutes" min={0} max={60} className="minutes"/>

                        </div>
                        <textarea placeholder="Enter Event Text (Max 100 chars)" ></textarea>
                        <button className="event-popup-btn">Add Event</button>
                        <button className="close-event btn"><i className="bx bx-x">

                        </i>
                        </button>
                    </div>
                    <div className="calendarEvent">
                        <div className="eventDateWrapper">
                            <div className="event-date">07 November, 2025</div>
                            <div className="event-time">14:00</div>
                        </div>
                        <div className="event-text">
                            Meeting
                        </div>
                       <div className="eventbuttons">
                         <i className="bx bxs-edit-alt"></i>
                         <i className="bx bxs-message-alt-x"></i>
                       </div>
                    </div>
                </div>
            </div>
            <h2>Termine</h2>
            <p>Hier werden alle Termine angezeigt.</p>
        </div>
    );
};

export default Termine;
*/

import CalendarAllDates from '../components/Calendar'; // Importiere die Kalender-Komponente
import { useState } from "react";
import Rabbit from '../components/TerminList'; //die TerminListe
import { Stack } from "@mui/material";
import CustomButtonGroup from "../components/ButtonGroup";
import { Add } from "@mui/icons-material";

const Termine: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{ width: '100%', height:"85vh", display:"flex", flexDirection:"column", overflow:"hidden",minHeight:0,}}>

            {/* ----- Leiste oben mit Button ----- */}
            <Stack
                padding={2}
                direction="row"
                alignItems="center"
                width="100%"
                justifyContent="flex-end" // Button immer rechts
                spacing={2}               // optional: Abstand, falls mehrere Buttons
                sx={{flexShrink:0,}}
                marginBottom={3}
            >
                <CustomButtonGroup
                    buttons={[
                        {
                            label: "Hinzufügen",
                            icon: <Add />,
                            iconPosition: "start",
                            onClick: handleOpen,
                        },
                    ]}
                />
            </Stack>

        <div style={{
            display: 'flex',
            flex:"1",
            backgroundColor: '',
            minHeight:0,
            gap: "1vw",
            padding: "0 1vw",
        }}>
            <div style={{
                flex: '0 0 40%',        // flex-grow, flex-shrink
                minHeight: 0,
                overflow: "hidden",
                minWidth: "50px"
            }}>
                <CalendarAllDates/>
            </div>
            <div style={{
                minHeight:0,
                overflow:"hidden",
                display:"flex",
                flex: "0 0 59%",
            }}>
                <Rabbit open={open} handleClose={handleClose}/>
            </div>
        </div>
      </div>

    );
};


export default Termine;
