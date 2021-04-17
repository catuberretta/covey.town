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
import React from 'react';

const UploadGuide: React.FunctionComponent = () => (
  <Popover placement='right'>
    <PopoverTrigger>
      <Button mb={5} colorScheme='teal' size='xs'>
        Upload Guide
      </Button>
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
          </Link>{' '}
          You will also need to download the{' '}
          <Link color='teal.500' isExternal href='/assets/tilemaps/base-town.json'>
            tileset png
          </Link>
          You can make edits using
          <Link color='teal.500' isExternal href='https://www.mapeditor.org/'>
            Tiled
          </Link>
          , just hit save (make sure it&apos;s a JSON file) and then upload the file. No need to upload
          the PNG!
        </Text>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

export default UploadGuide;
