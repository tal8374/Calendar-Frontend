import React, { useState } from 'react'
import DateRangePicker from '../DateRangePicker/DateRangePicker'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import styles from './EventModal.module.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const EventModal = ({ event, updateEvent, isModalOpen, setModalOpen }) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState(event.title);
  const [description, setDescription] = React.useState(event.description);
  const [start, setStart] = useState(event.start);
  const [end, setEnd] = useState(event.end);

  const handledModalSaved = () => {
    setModalOpen(false);
    updateEvent({...event, start, end, title, description});
  }

  return (
    <React.Fragment>
      <Modal
        className="my-color"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <div className={classes.paper}>
            <TextField
              style={{ color: 'red' }}
              id="standard-basic"
              label="Title"
              margin="normal"
              fullWidth
              value={title}
              onChange={(onChangeEvent) => { setTitle(onChangeEvent.target.value) }}
            />
            <DateRangePicker
              start={start}
              end={end}
              setFrom={setStart}
              setTo={setEnd}
            ></DateRangePicker>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Add description..."
              className={styles.description}
              value={description}
              onChange={(onChangeEvent) => setDescription(onChangeEvent.target.value)}
            />

            <div className={styles.buttonsGroup}>
              <Button
                color="secondary"
                orientation="vertical"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                orientation="vertical"
                onClick={handledModalSaved}
              >
                Save
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>

    </React.Fragment >

  );
}

export default EventModal
