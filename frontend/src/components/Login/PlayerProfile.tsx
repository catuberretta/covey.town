import React, { useCallback, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import useMaybeVideo from '../../hooks/useMaybeVideo';
import { SpriteSheetInfo } from '../../classes/Player';

const PlayerProfile: React.FunctionComponent = () => {

  const defaultAvatar = {
    spriteName: 'Misa', 
    spritePNG: 'atlas.png'
  };
  const alternateAvatar = {
    spriteName: 'Misa - Dark hair', 
    spritePNG: 'atlas-alternate.png'
  };

  const allAvatars: Array<SpriteSheetInfo> = [defaultAvatar, alternateAvatar];

  const {isOpen, onOpen, onClose} = useDisclosure()
  const video = useMaybeVideo()
  const {apiClient, userName, currentTownID, myPlayerID, sessionToken } = useCoveyAppState();
  const [newAvatar, setNewAvatar] = useState(defaultAvatar);

  const openSettings = useCallback(()=>{
    onOpen();
    video?.pauseGame();
  }, [onOpen, video]);

  const closeSettings = useCallback(()=>{
    onClose();
    video?.unPauseGame();
  }, [onClose, video]);


  const toast = useToast();
  
  const processUpdates = async () => {
      try {
          await apiClient.updateSprite({
            coveyTownID: currentTownID,
            playerID: sessionToken,
            newSprite: newAvatar,
          });
          toast({
              title: 'Avatar updated',
              description: `Your avatar is now ${newAvatar.spriteName} map`,
              status: 'success',
              isClosable: true,
              duration: null,
          })
      } catch (err) {
          toast({
              title: 'Unable to update sprite',
              description: err.toString(),
              status: 'error'
          });
      }
  }

  return <>
  <MenuItem data-testid='openMenuButton' onClick={openSettings}>
    <Typography variant="body1">Player Profile</Typography>
  </MenuItem>
  <Modal isOpen={isOpen} onClose={closeSettings}>
    <ModalOverlay/>
    <ModalContent>
      <ModalHeader>Edit player profile: {userName}, ({myPlayerID}) </ModalHeader>
      <ModalCloseButton/>
      <form onSubmit={(ev)=>{ev.preventDefault(); processUpdates()}}>
        <ModalBody pb={6}>
        <Table>
            <Thead>
              <Tr>Town Maps</Tr>
            </Thead>
            <Tbody>
            {allAvatars.map((avatar: SpriteSheetInfo) => (
                <Tr key={avatar.spriteName}>
                  <Td>
                    <Text>{avatar.spriteName}</Text>
                    <Button marginRight={10} marginTop={2} onClick={() => setNewAvatar(avatar)}>
                      View
                    </Button>
                    <Button onClick={() => processUpdates()} marginTop={2}>
                      Apply
                    </Button>
                  </Td>
                </Tr>
              ))}
              </Tbody>
              </Table>
        </ModalBody>

        <ModalFooter>
          <Button onClick={closeSettings}>Cancel</Button>
         </ModalFooter>
      </form>
    </ModalContent>
  </Modal>
</>

}

export default PlayerProfile;