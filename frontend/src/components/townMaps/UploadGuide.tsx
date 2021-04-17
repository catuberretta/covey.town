import {
  Button,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import React, {  } from 'react';

const UploadGuide: React.FunctionComponent = () => (
  <Popover placement='right'>
        <PopoverTrigger>
        <Button mb={5} colorScheme="teal" size="xs">Upload Guide</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {' '}
            <Text>
              First,{' '}
              <Link color='teal.500' isExternal href='/assets/tilemaps/base-town.json'>
                download the base map.
              </Link>
              , make your edits using{' '}
              <Link color='teal.500' isExternal href='https://www.mapeditor.org/'>
                Tiled
              </Link>
              , save and then upload the file.
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
);

export default UploadGuide;
