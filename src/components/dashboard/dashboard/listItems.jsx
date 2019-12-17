import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import LaptopMacSharpIcon from '@material-ui/icons/LaptopMacSharp';
import WifiTetheringSharpIcon from '@material-ui/icons/WifiTetheringSharp';
import WifiSharpIcon from '@material-ui/icons/WifiSharp';
import DeviceUnknownSharpIcon from '@material-ui/icons/DeviceUnknownSharp';
import MusicNoteSharpIcon from '@material-ui/icons/MusicNoteSharp';

export const listOfItems = (
  <div>
    <ListSubheader inset>Device List</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <LaptopMacSharpIcon />
      </ListItemIcon>
      <ListItemText primary="MacBook" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <WifiTetheringSharpIcon />
      </ListItemIcon>
      <ListItemText primary="Amazon Alexa" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeviceUnknownSharpIcon />
      </ListItemIcon>
      <ListItemText primary="Google Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <WifiSharpIcon />
      </ListItemIcon>
      <ListItemText primary="Wifi Scale" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MusicNoteSharpIcon />
      </ListItemIcon>
      <ListItemText primary="Sonos Bar" />
    </ListItem>
  </div>
);
