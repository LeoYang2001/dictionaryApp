import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-native-feather'


const DynamicVolumeIcon = ({ volumeLevel }) => {
  let VolumeIcon;

  switch (volumeLevel) {
    case 0:
      VolumeIcon = Icon.Volume;
      break;
    case 1:
      VolumeIcon = Icon.Volume1;
      break;
    case 2:
      VolumeIcon = Icon.Volume2;
      break;
    default:
      VolumeIcon = Icon.Volume;
  }

  return <VolumeIcon className="ml-1 my-1" color="white" fill="white" width={26} height={26} />;
};



export default function VolumePlay() {
    const [volumeLevel, setVolumeLevel] = useState(1);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setVolumeLevel((prevVolumeLevel) => {
          const newVolumeLevel = prevVolumeLevel >= 3 ? 1 : prevVolumeLevel + 1;
          return newVolumeLevel;
        });
      }, 300);
    
      // Clear the interval on component unmount to avoid memory leaks
      return () => clearInterval(intervalId);
    }, []);
    
    
  return (
    <>
        <DynamicVolumeIcon volumeLevel={volumeLevel}/>
    </>
  )
}