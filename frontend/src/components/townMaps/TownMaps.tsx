import { Box, Text, Link, Table, Tbody, Thead, Td, Tr, Button } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react';
import TownMapInfo from '../../classes/TownMapInfo';



export default function TownMaps(): JSX.Element {
    
    const tuxedoTown = new TownMapInfo('Tuxedo Town', '/assets/tilesets/tuxmon-sample-32px-extruded.png', '/assets/tilemaps/tuxemon-town.json');
    const desertTown = new TownMapInfo('Desert Town', '/assets/desert-town', '/assets/tilemaps/desert-town.json');

    const [c, setCurrentMap] = useState(tuxedoTown);

    const allTownMaps: Array<TownMapInfo> = [tuxedoTown, desertTown];

    return (
        <Box m={10}>
            <Text mb={10}>You are currently using a default map. Would you like to change your map?</Text>
            <Text mb={5}>You can choose one of our preloaded maps:</Text>
            <Table>
                <Thead>
                    <Tr>Town Maps</Tr>
                </Thead>
                <Tbody>

                    {allTownMaps.map((town: TownMapInfo) => (

                        <Tr key={town.mapName}>
                            <Td>
                                <Text>{town.mapName}</Text>
                                <Button marginRight={10} marginTop={2}>View</Button>
                                <Button onClick={() => setCurrentMap(town)} marginTop={2}>Apply</Button>
                            </Td>
                        </Tr>

                    ))}
                </Tbody>
            </Table>
            
            <Box marginTop={20}>
                <Text>You can also upload your own map, by creating a Tiled map using  <Link href="https://www.mapeditor.org/">Mapeditor.org</Link> </Text> 
                <Button marginTop={2}>Upload</Button>
            </Box>
            
        </Box>
    )

}