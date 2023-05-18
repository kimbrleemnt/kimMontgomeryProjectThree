import app from '../firebase';
import { onValue, getDatabase, ref, get } from 'firebase/database'
import { useState, useEffect } from 'react';


const Select = () => {

  const database = getDatabase(app);
  const [ allSurfaces, setAllSurfaces ] = useState([]);
  const [ allSkaterPref, setAllSkaterPref ] = useState([]);
  const [ selectedSurface, setSelectedSurface ] = useState('');
  const [ selectedSkaterPref, setSelectedSkaterPref ] = useState('');
  const [ userSelection, setUserSelection ] = useState([]);

  useEffect( () => {
    const database = getDatabase(app);
    const surfaceRef = ref(database, '/surfaceType');
    
    onValue(surfaceRef, (dbResponse) => {
      const surfaceList = Object.keys(dbResponse.val());
      setAllSurfaces(surfaceList);

    });
  
  }, []);
  
  useEffect(() => {

    if (selectedSurface) {
      const database = getDatabase(app);
      const skaterPrefRef = ref(database, `surfaceType/${selectedSurface}/skaterPreference`);

      onValue(skaterPrefRef, (dbResponse) => {
        const skaterPrefList = Object.keys(dbResponse.val());

        setAllSkaterPref(skaterPrefList);      });
    } else {
      setAllSkaterPref([]);
  }}, [selectedSurface]);


  const handleSurfaceChange = (event) => {
    setSelectedSurface(event.target.value);
  };

  const handleSkaterPrefChange = (event) => {
    setSelectedSkaterPref(event.target.value);
  };


  const handleUserSubmit = (event) => {
    event.preventDefault();

  const userSelection = ref(database, `surfaceType/${selectedSurface}/skaterPreference/${selectedSkaterPref}`);

      get(userSelection).then (results => {
      setUserSelection(results.val())
    });
  };

  return (
  
  <section className="wrapper">
    <form value={userSelection} onSubmit={handleUserSubmit}>
      <div className="formMain">
        <label>Select:
          <select value={selectedSurface} onChange={handleSurfaceChange} required>
              <option value=""> Surface Type </option> {allSurfaces.map((surface) => ( 
                <option key={surface} value={surface}>{surface} </option>
              ))}
            </select>
        </label>

            <img src="./derbyWheel.png" className="rotate" alt="spinning wheel"/>

        <label>Select:
          <select value={selectedSkaterPref} disabled={!selectedSurface} onChange={handleSkaterPrefChange} required>
              <option value="">Skater Preference</option>{allSkaterPref.map((skaterPref) => (
              <option key={skaterPref} value={skaterPref}>{skaterPref} </option>
              ))}
          </select>
        </label>
      </div>

      { userSelection.map((range) => <button className="results">{range}</button>) }

      <div>
          <label htmlFor="wheelRange" className="sr-only">Click for wheel range</label>
          <button className="button">SPIN IT</button>
        </div>

    </form>
  </section>





  )

}

          

export default Select;
