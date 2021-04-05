import React, { useEffect, useState } from 'react';
import TownMapInfo from '../../classes/TownMapInfo';


export default function TownMaps(): JSX.Element {

    const sampleTownMap = new TownMapInfo();
    const allTownMaps: Array<TownMapInfo> = [sampleTownMap, sampleTownMap, sampleTownMap];

    return (
        <div>
            <h3>You are currently using a default map. Would you like to change your map?</h3>
             <h3>You can choose one of our preloaded maps:</h3>
             { allTownMaps.map((town :TownMapInfo) => <div key={town.mapID}>
                hi
                 </div>)}
            </div>
    )

}