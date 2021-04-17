import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Link,
    Table,
    Tbody,
    Td,
    Text,
    Thead,
    Tr,
    useToast,
  } from '@chakra-ui/react';
  import React, { useState, useEffect, useCallback } from 'react';
  import { CoveyTownMapInfo } from '../../classes/Town';
  import useCoveyAppState from '../../hooks/useCoveyAppState';

  export default function TownMaps(): JSX.Element {

    const defaultMap = {
      mapName: 'Tuxedo Town',
      loadImg: 'tuxmon-sample-32px-extruded.png',
      mapJSON: 'tuxemon-town.json',
    };
    
    const toast = useToast();
    const [newMap, setNewMap] = useState(defaultMap);
    const [selectedFile, setSelectedFile] = useState<File>();
    const { apiClient, currentTownID } = useCoveyAppState();
    const [currentMaps, setCurrentTownMaps] = useState<CoveyTownMapInfo[]>();
    const [roomUpdatePassword, setRoomUpdatePassword] = useState<string>('');
    const mapUpload: FormData = new FormData();

    const updateTownMaps = useCallback(() => {
      apiClient.listTowns()
        .then((towns) => {
          setCurrentTownMaps(towns.maps);
        })
    }, [setCurrentTownMaps, apiClient]);

    useEffect(() => {
      updateTownMaps();
    }, [updateTownMaps]);
  
    const processUpdates = async (action: string) => {
      if (action === 'chooseMap') {
        try {
          await apiClient.updateTown({
            coveyTownID: currentTownID,
            coveyTownPassword: roomUpdatePassword,
            townMap: newMap,
          });
          toast({
            title: 'Town map sucessfully updated',
            description: `You are now using the ${newMap.mapName} map`,
            status: 'success',
            isClosable: true,
            duration: null,
          });
        } catch (err) {
          toast({
            title: 'Unable to update town',
            description: err.toString(),
            status: 'error',
          });
        }
      } else {
        try {
          await apiClient.uploadFile(mapUpload);
          toast({
            title: 'Your file has been uploaded.',
            description: 'To use your file, select it from the maps above.',
            status: 'success',
            isClosable: true,
            duration: null,
          });
        } catch (err) {
          toast({
            title: 'Unable to upload file',
            description: err.toString(),
            status: 'error',
          });
        }
      }
    };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setSelectedFile(event.target.files[0]);
        }
      };
    
      const handleSubmission = () => {
        if (selectedFile) {
          mapUpload.append('uploaded_file', selectedFile);
          processUpdates('uploadFile');
        }
      };

    return (
      <Box m={10}>
        <Text mb={10}>You are currently using a default map. Would you like to change your map?</Text>
        <Text mb={5}>You can choose one of our preloaded maps:</Text>
  
        <form
          onSubmit={ev => {
            ev.preventDefault();
            processUpdates('chooseMap');
          }}>
          <Table>
            <Thead>
              <Tr>Town Maps</Tr>
            </Thead>
            <Tbody>
              {currentMaps?.map((town: CoveyTownMapInfo) => (
                <Tr key={town.mapName}>
                  <Td>
                    <Text>{town.mapName}</Text>
                    <Button marginRight={10} marginTop={2} onClick={() => setNewMap(town)}>
                      View
                    </Button>
                    <Button onClick={() => processUpdates('chooseMap')} marginTop={2}>
                      Apply
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
  
          <FormControl isRequired>
            <FormLabel htmlFor='updatePassword'>Town Update Password</FormLabel>
            <Input
              data-testid='updatePassword'
              id='updatePassword'
              placeholder='Password'
              name='password'
              type='password'
              value={roomUpdatePassword}
              onChange={e => setRoomUpdatePassword(e.target.value)}
            />
          </FormControl>
        </form>

        <Box marginTop={20}>
          <Text>
            You can also upload your own map! First, download our Base Map below, make your edits, save and then upload the file.
          </Text>
          <Link isExternal href='/assets/tilemaps/base-town.json'>
            Download the base map.
          </Link>
          <Input type='file' name='uploaded_file' onChange={event => changeHandler(event)} />
          <Button onClick={handleSubmission} marginTop={2}>
            Upload
          </Button>
        </Box>
      </Box>
    );
  }
  