import Wheel from "./Wheel";
// 1. import our configured firebase app
import app from "../firebase";

// 1A. import the Firebase RealTimeDatabase modules that we need
import { getDatabase, ref, onValue } from 'firebase/database';
// 1B. import the useState Hook, useEffect Hook
import { useState, useEffect } from "react";

const WheelList = () => {

  // 2. initialize a state to represent an array of wheels which will be derived from the db
  const [ wheelList, setWheelList ] = useState([])

  //3.	Define event handler which will run ONCE on component mount (any subsequent updates to the db will be ‘listened’ to via the onValue module)
  useEffect( () => {

    const database = getDatabase(app);
    const dbRef =ref(database, 'surfaceType');
    //const skaterRef =ref(database, '/skaterPreference')

    const surfaceArray = [];

    onValue(dbRef, (dbResponse) => {

      //console.log( dbResponse.val() );
      //use the val method to parse dbResponse into a comprehensible object and save that within a variable that we can loop through

      const dbObject = dbResponse.val();

      //use for...in to loop through the properties of the db object
      for (let surfaceType in dbObject) {

          const surfaceObj = {
            type: surfaceType
          }

          console.log(surfaceObj);
         
          surfaceArray.push(surfaceObj);

      }

          setWheelList(surfaceArray)

    });

    // onValue(skaterRef, (skaterResponse) => {

    //   console.log( skaterResponse.val() );

    // });

  }, [] );



  return (
    <section>
      <h3>HERE IS YOUR WHEEL RANGE</h3>
          {// <Wheel />
            //map through the array of wheels within state and return a wheel component for each wheel in the state array
          }
    </section>
  )
}

export default WheelList;