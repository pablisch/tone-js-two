import * as Tone from 'tone';
import { useState } from 'react';
import PropTypes from 'prop-types';

const sampler1 = new Tone.Sampler({
  urls: {
    A1: 'doublebass_marc_a1.mp3',
    C1: 'doublebass_marc_c1.mp3',
    D1: 'doublebass_marc_d1.mp3',
    E1: 'doublebass_marc_e1.mp3',
    G1: 'doublebass_marc_g1.mp3',
    A2: 'doublebass_marc_a2.mp3',
    C2: 'doublebass_marc_c2.mp3',
    D2: 'doublebass_marc_d2.mp3',
    E2: 'doublebass_marc_e2.mp3',
    G2: 'doublebass_marc_g2.mp3',
  },
  baseUrl: '/samples/doublebass_marc_samples/',
  onload: () => {
    sampler1.triggerAttackRelease(["C2"], 0.5);
  }
}).toDestination();

const notes = ['A1', 'C1', 'D1', 'E1', 'G1', 'A2', 'C2', 'D2', 'E2', 'G2'];


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
