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
  //const [ range, setRange ] = useState([""]);
  



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
  
          setAllSkaterPref(skaterPrefList);
  
        });
  
      } else {
        setAllSkaterPref([]);
      }
  
      }, [selectedSurface]);
  



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
     
    })

  }


  return (
  
<section class="selector">

  <form value={userSelection} onSubmit={handleUserSubmit}>
        <div className="formMain">
        <label>Select:
        <select value={selectedSurface} onChange={handleSurfaceChange}>
            <option value=""> pick one: </option>
            {allSurfaces.map((surface) => ( 
              <option key={surface} value={surface}>{surface} </option>
            ))}
          </select>
          </label>

          <img src="./derbyWheel.png" alt="" className="rotate"/>

        <label>Select:
        <select value={selectedSkaterPref} disabled={!selectedSurface} onChange={handleSkaterPrefChange}>
            <option value="">pick one:</option>{allSkaterPref.map((skaterPref) => (
            <option key={skaterPref} value={skaterPref}>{skaterPref} </option>
            ))}
        </select>
        </label>
        </div>

    

          {
            userSelection.map((range) => <button className="wheels">{range}</button>)
          }

<div>

        <label htmlFor="wheelRange" className="sr-only">Click for wheel range</label>
        <button className="button">SPIN IT</button>
        </div>



  </form>




  </section>





  )

}

          

export default Select;
