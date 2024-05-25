import * as Tone from 'tone';
import { useState } from 'react';
import PropTypes from 'prop-types';
// import ToneButton from './ToneButton1';

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

const synth = new Tone.Synth().toDestination();

const Tone2 = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);

  console.log('State:', Tone.context.state)

  const checkState = () => {
    if (Tone.context.state !== 'running') {
      Tone.start();
    }
  }

  const handleSoundStart = () => {
    checkState();
    setIsSoundOn(true)
  }

  return (
    <div className='main'>
      <button onClick={handleSoundStart} className={`btn start-btn ${isSoundOn ? "active-btn" : ""}`} disabled={isSoundOn} >{isSoundOn ? "Sound is ON" : "Start Sound"}</button>
      {notes.map(note => (
        <ToneButton2 key={note} note={note} />
      ))
        }
    </div>
  )
}

const ToneButton2 = ({ note }) => {
  const checkState = () => {
      return Tone.context.state === 'running';
  }

  const handlePlayNote = (note) => {
    if (checkState()) synth.triggerAttackRelease(note, "8n");
  }



  return (
    <button className='btn tone-btn' onClick={() => handlePlayNote(note)} onMouseEnter={ () => handlePlayNote(note)}>{`Play ${note}`}</button>
  )
}

ToneButton2.propTypes = {
  note: PropTypes.string.isRequired,
}

export default Tone2
