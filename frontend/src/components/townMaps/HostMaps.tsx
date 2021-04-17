import { Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useToast, Button, Box, IconButton, SimpleGrid } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import React, { useCallback, useEffect, useState } from 'react';
import { CoveyTownInfo } from '../../classes/TownsServiceClient';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import { CoveyTownMapInfo } from '../../classes/Town';


export default function HostMaps(): JSX.Element {
  const defaultMap = {
    mapName: 'Tuxedo Town',
    loadImg: 'tuxmon-sample-32px-extruded.png',
    mapJSON: 'tuxemon-town.json',
  };

  const { apiClient, userName } = useCoveyAppState();
  const [hostTowns, setHostTowns] = useState<CoveyTownInfo[]>();
  const [newMap, setNewMap] = useState(defaultMap);
  const initalSelectedTown: string[] = [];
  const [selectedTowns, setSelectedTowns] = useState(initalSelectedTown);
  const [currentMaps, setCurrentTownMaps] = useState<CoveyTownMapInfo[]>();

  const updateTownMaps = useCallback(() => {
    apiClient.listTowns().then(towns => {
      setCurrentTownMaps(towns.maps);
    });
  }, [setCurrentTownMaps, apiClient]);

  useEffect(() => {
    updateTownMaps();
  }, [updateTownMaps]);

  
  const updateHostTowns = useCallback(() => {
    apiClient.listTowns().then(towns => {
      setHostTowns(towns.towns.filter(town => town.coveyTownHost === userName));
    });
  }, [setHostTowns, apiClient, userName]);

  useEffect(() => {
    updateHostTowns();
  }, [updateHostTowns, selectedTowns]);

  const toast = useToast();

  const processUpdates = async (townID: string) => {
    try {
      await apiClient.updateTown({
        coveyTownID: townID,
        coveyTownPassword: userName,
        townMap: newMap,
      });
      toast({
        title: `Town map successfully updated to ${newMap.mapName}`,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Unable to update town',
        description: err.toString(),
        status: 'error',
      });
    }
  };

  const handleAdd = (townID: string) => {
      if (!selectedTowns.includes(townID)) {
        const tempList = selectedTowns.concat(townID);
        setSelectedTowns(tempList);
      }
    }

const handleRemove = (townID: string) => {
    const tempList = selectedTowns.filter((town: string) => town !== townID);
    setSelectedTowns(tempList);
}

  const updateTowns = () => {
    selectedTowns.map(town => processUpdates(town));
}

  return (
    <>
      {hostTowns?.length === 0 ? (
        <Text>You host 0 towns. To become a host, create a town.</Text>
      ) : (
          <Box>
              <Text>To update multiple town&apos;s maps, select the add button, select a new map below and hit Update Town Maps</Text>
        <Table>
          <TableCaption placement='top'>{userName}&apos;s towns</TableCaption>
          <Thead>
            <Tr>
              <Th>Room Name</Th>
              <Th>Room Map</Th>
            </Tr>
          </Thead>
          <Tbody>
            {hostTowns?.map(town => (
              <Tr key={town.coveyTownID}>
                <Td role='cell'>{town.friendlyName}</Td>
                <Td role='cell'>{town.coveyTownMap?.mapName}</Td>
                <Td role='cell'>
                <IconButton size="sm" icon={<AddIcon />} aria-label="Add map" colorScheme="green" onClick={() => handleAdd(town.coveyTownID)}>Add</IconButton>
                <IconButton size="sm" icon={<MinusIcon />} aria-label="Delete map" colorScheme="red" onClick={() => handleRemove(town.coveyTownID)}>Remove</IconButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Text>Selected towns: {selectedTowns.map(town => <span key={town}> {town}, </span>)}</Text>
        <Table mb={5} mt={10} size='sm'>
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
        <Button onClick={() => updateTowns()} m={5}>Update maps</Button>
        </Box>
      )}
    </>
  );
}
