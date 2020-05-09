import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './DateRangePicker.module.css';
import moment from 'moment';

const DateAndTimePickers = ({start, end, setFrom, setTo}) => {

    const dateToString = (date) => {
        return moment(date).format().substring(0, 16);
    }

    return (
        <form noValidate style={{
            width: '100%',
            justifyContent: 'space-around',
            display: 'flex',
            listStyle: 'none',
        }}>
            <TextField
                id="datetime-local"
                label="From"
                type="datetime-local"
                defaultValue={dateToString(start)}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setFrom(new Date(event.target.value))}
                margin="normal"
                fullWidth
            />

            <span className={styles.spaceBetween} />

            <TextField
                id="datetime-local"
                label="To"
                type="datetime-local"
                defaultValue={dateToString(end)}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setTo(new Date(event.target.value))}
                margin="normal"
                fullWidth
            />
        </form>
    );
}

export default DateAndTimePickers;