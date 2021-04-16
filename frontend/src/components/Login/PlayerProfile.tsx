import React, { useCallback, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import useMaybeVideo from '../../hooks/useMaybeVideo';
import { SpriteSheetInfo } from '../../classes/Player';


const PlayerProfile: React.FunctionComponent = () => {

  const defaultSprite = { spriteName: 'Default Sprite', spritePNG: 'atals.png',spriteJSON: 'atlas.json'};
  const newMisa = { spriteName: 'Misa', spritePNG: 'new-atals.png',spriteJSON: 'new-atlas.json'};
  const {isOpen, onOpen, onClose} = useDisclosure()
  const video = useMaybeVideo()
  const {apiClient, userName, currentTownID, myPlayerID, currentSpriteName, currentSpritePNG} = useCoveyAppState();
  const [updateSprite, setUpdateSprite] = useState<string>('');

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
              spriteName: currentSpriteName,
              spritePNG: currentSpritePNG,         
          });
          toast({
              title: 'Avatar updated',
              description: 'To see updated avatar, please exit and re-join any town',
              status: 'success'
          })
      } catch (err) {
          toast({
              title: 'Unable to update the sprite sheet',
              description: err.toString(),
              status: 'error'
          });
      }
  }
  const allSprite: Array<SpriteSheetInfo> = [defaultSprite, newMisa];

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
          <h1>Hey</h1>
        </ModalBody>

        <ModalFooter>
          <FormControl isRequired>
              <FormLabel htmlFor="updateSprite">Update Your Avatar</FormLabel>
                <Input data-testid="updateSprite" id="updateSprite" placeholder="Sprite" name="sprite" type="sprite" value={updateSprite} onChange={(e) => setUpdateSprite(e.target.value)} />
          </FormControl>
          <Button data-testid='updatebutton' colorScheme="blue" mr={3} value="update" name='action2' onClick={()=>processUpdates()}>
          Update
          </Button>
          <Button onClick={closeSettings}>Cancel</Button>
         </ModalFooter>
      </form>
    </ModalContent>
  </Modal>
</>

}

export default PlayerProfile;