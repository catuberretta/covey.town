import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { CoveyTownMapInfo } from '../../classes/Town';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import UploadGuide from './UploadGuide';


export default function TownMaps(): JSX.Element {
  const defaultMap = {
    mapName: 'Tuxedo Town',
    loadImg: 'tuxmon-sample-32px-extruded.png',
    mapJSON: 'tuxemon-town.json',
  };

  const toast = useToast();
  const [newMap, setNewMap] = useState(defaultMap);
  const [selectedFile, setSelectedFile] = useState<File>();
  const { apiClient, currentTownID, currentTownMap } = useCoveyAppState();
  const [currentMaps, setCurrentTownMaps] = useState<CoveyTownMapInfo[]>();
  const [roomUpdatePassword, setRoomUpdatePassword] = useState<string>('');
  const mapUpload: FormData = new FormData();

  const updateTownMaps = useCallback(() => {
    apiClient.listTowns().then(towns => {
      setCurrentTownMaps(towns.maps);
    });
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
          title: 'Town map successfully updated',
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
          description:
            'To use your file, disconnect and join the town again. Then, select it from the maps above.',
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
    <Box ml={10} mr={10} mt={2}>
      <Heading as='h4' size='md'>
        Update your town map
      </Heading>
      <Text mb={5}>
        You are currently using the {currentTownMap.mapName}. You can choose one of our preloaded
        maps
      </Text>
      <form
        onSubmit={ev => {
          ev.preventDefault();
          processUpdates('chooseMap');
        }}>
        <Table mb={5} size='sm'>
          <Tbody>
            {currentMaps?.map((town: CoveyTownMapInfo) => (
              <Tr key={town.mapName}>
                <Td>
                  <SimpleGrid columns={2}>
                    <Text>{town.mapName}</Text>
                    <Button marginRight={2} onClick={() => setNewMap(town)}>
                      View
                    </Button>
                  </SimpleGrid>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <FormControl isRequired>
          <FormLabel htmlFor='updatePassword'>Town Update Password</FormLabel>
          <Input mt={8} mb={2}
            data-testid='updatePassword'
            id='updatePassword'
            placeholder='Password'
            name='password'
            type='password'
            value={roomUpdatePassword}
            onChange={e => setRoomUpdatePassword(e.target.value)}
          />
          <Button onClick={() => processUpdates('chooseMap')} marginTop={2}>
            Update map
          </Button>
        </FormControl>
      </form>

      <Box marginTop={5}>
      <Heading as="h5" size="sm">
          You can also upload your own map! 
          </Heading>
        <UploadGuide/>

        <Input type='file' name='uploaded_file' onChange={event => changeHandler(event)} />
        <Button onClick={handleSubmission} marginTop={2}>
          Upload
        </Button>
      </Box>
    </Box>
  );
}
