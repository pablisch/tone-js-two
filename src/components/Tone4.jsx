import * as Tone from 'tone';
import { useState } from 'react';
import PropTypes from 'prop-types';

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

const sampler1 = new Tone.Sampler({
  urls: {

const synth1 = new Tone.Synth().toDestination();

const synth2 = new Tone.Synth();
// const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5)
const feedbackDelay = new Tone.FeedbackDelay({
  delayTime: 0.1,
  maxDelay: 2.5,
  feedback: 0.8,
  wet: 0.3,
});

synth2.connect(feedbackDelay);
feedbackDelay.toDestination();

const Tone3 = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [hasFeedbackDelay, setHasFeedbackDelay] = useState(false);

  console.log('State:', Tone.context.state);

  const checkState = () => {
    if (Tone.context.state !== 'running') {
      Tone.start();
    }
  };

  const handleSoundStart = () => {
    checkState();
    setIsSoundOn(true);
  };

  return (
    <div className='main'>
      <button
        onClick={handleSoundStart}
        className={`btn start-btn ${isSoundOn ? 'active-btn' : ''}`}
        disabled={isSoundOn}>
        {isSoundOn ? 'Sound is ON' : 'Start Sound'}
      </button>
      <button
        onClick={() => setHasFeedbackDelay(!hasFeedbackDelay)}
        className={`btn start-btn ${hasFeedbackDelay ? 'active-btn' : ''}`}>
        {hasFeedbackDelay ? 'Feedback Delay is ON' : 'Feedback Delay is OFF'}
      </button>
      {notes.map((note) => (
        <ToneButton3
          key={note}
          note={note}
          hasFeedbackDelay={hasFeedbackDelay}
        />
      ))}
    </div>
  );
};

const ToneButton3 = ({ note, hasFeedbackDelay }) => {
  const checkState = () => {
    return Tone.context.state === 'running';
  };

  const handlePlayNote = (note) => {
    const synth = hasFeedbackDelay ? synth2 : synth1;
    if (checkState()) synth.triggerAttackRelease(note, '8n');
  };

  return (
    <button
      className='btn tone-btn'
      onClick={() => handlePlayNote(note)}
      onMouseEnter={() => handlePlayNote(note)}>{`Play ${note}`}</button>
  );
};

ToneButton3.propTypes = {
  note: PropTypes.string.isRequired,
  hasFeedbackDelay: PropTypes.bool.isRequired,
};

export default Tone3;
