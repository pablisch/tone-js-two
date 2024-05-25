import * as Tone from 'tone';
import { useState } from 'react';

const synth = new Tone.Synth().toDestination();

const Tone1 = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);

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

  const handlePlayNote = () => {
    if (Tone.context.state === 'running') synth.triggerAttackRelease('C4', '8n');
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
      className='btn tone-btn'
      onMouseEnter={handlePlayNote}>{`Play C4`}</button>
    </div>
  );
};

export default Tone1;
