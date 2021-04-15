import {
    Box, Text, Link, Table, Tbody, Thead, Td, Tr, Button, useToast, FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import { CoveyTownMapInfo } from '../../classes/Town';

export default function TownMaps(): JSX.Element {

    const defaultMap = { mapName: 'Tuxedo Town', loadImg: 'tuxmon-sample-32px-extruded.png', mapJSON: 'tuxemon-town.json' };
    const roseTown = { mapName: 'Rose Town', loadImg: 'tuxmon-sample-32px-extruded.png', mapJSON: 'rose-town.json' };
    // const uploadedFile = {mapName: '', loadImg: '', mapJSON: '' };

    const [newMap, setNewMap] = useState(defaultMap);
    const { apiClient, currentTownID } = useCoveyAppState();
    const [roomUpdatePassword, setRoomUpdatePassword] = useState<string>('');


    const toast = useToast();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            toast({
                title: 'Unable to upload map',
                description: 'Make sure the file format is JSON',
                status: 'error'
            });
          }

    }

    const handleSubmission = () => {
        // if (fileUpload) {
            // console.log(fileUpload);
        // }
    }


    const processUpdates = async () => {
        try {
            await apiClient.updateTown({
                coveyTownID: currentTownID,
                coveyTownPassword: roomUpdatePassword,
                townMap: newMap,
                
            });
            toast({
                title: 'Town Map updated',
                description: 'To see the updated town, please exit and re-join this town',
                status: 'success'
            })
        } catch (err) {
            toast({
                title: 'Unable to update town',
                description: err.toString(),
                status: 'error'
            });
        }
    }

    const allTownMaps: Array<CoveyTownMapInfo> = [defaultMap, roseTown];

    return (
        <Box m={10}>
            <Text mb={10}>You are currently using a default map. Would you like to change your map?</Text>
            <Text mb={5}>You can choose one of our preloaded maps:</Text>


            <form onSubmit={(ev)=>{ev.preventDefault(); processUpdates()}}>
                <Table>
                    <Thead>
                        <Tr>Town Maps</Tr>
                    </Thead>
                    <Tbody>
                        {allTownMaps.map((town: CoveyTownMapInfo) => (
                            <Tr key={town.mapName}>
                                <Td>
                                    <Text>{town.mapName}</Text>
                                    <Button marginRight={10} marginTop={2} onClick={() => setNewMap(town)}>View</Button>
                                    <Button onClick={() => processUpdates()} marginTop={2}>Apply</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

                <FormControl isRequired>
                    <FormLabel htmlFor="updatePassword">Town Update Password</FormLabel>
                    <Input data-testid="updatePassword" id="updatePassword" placeholder="Password" name="password" type="password" value={roomUpdatePassword} onChange={(e) => setRoomUpdatePassword(e.target.value)} />
                </FormControl>
            </form>

            <Box marginTop={20}>
                <Text>You can also upload your own map, by creating a Tiled map using  <Link href="https://www.mapeditor.org/">Mapeditor.org</Link> </Text>
                <Link isExternal href='/assets/tilemaps/base-town.json'>Download the base map.</Link>
                 <input type="file" name="file" onChange={event => changeHandler(event)}/>
                <Button onClick={handleSubmission} marginTop={2}>Upload</Button>
            </Box>

        </Box>
    )

}