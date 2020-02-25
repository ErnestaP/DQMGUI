import * as React from 'react'
import { Grid, Typography, Menu, MenuItem, MenuList, Icon, Button } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const ActiveTabsSwitching = ({ options }: any) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState()
  const [selected, setSelected] = React.useState(options[0])
  const [selectedIndex, setSelectedIndex] = React.useState(options.indexOf(selected))


  const recordButtonPosition = (event: any) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  }

  let closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <Grid container item>
      <Grid item style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ArrowBackIosIcon onClick={async() => {
         await setSelectedIndex(selectedIndex >= 1 && selectedIndex - 1)
          setSelected(options[selectedIndex]);
        }} />
      </Grid>
      <Grid item>
        <Button onClick={recordButtonPosition} style={{ color: 'white', fontSize: '1rem', background: 'green' }}>
          {options[selectedIndex]}
        </Button>
      </Grid>
      <Grid item style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ArrowForwardIosIcon onClick={async() => {
         await setSelectedIndex(selectedIndex < options.length && selectedIndex + 1)
          setSelected(options[selectedIndex]);
        }} />
      </Grid>
      <Menu
        open={menuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
      >        <MenuList>
          {
            options.map((option: any) =>
              <MenuItem style={{
                background: `${selected === option ? '#29b6f6' : 'white'}`,
                color: `${selected === option ? '#fff' : '000'}`
              }} onClick={(e) => {
                setSelected(option);
                setSelectedIndex(options.indexOf(option));
                closeMenu()
              }}>
                {option}
              </MenuItem>
            )
          }
        </MenuList>
      </Menu>
      <Grid item>
      </Grid>
    </Grid>
  )
}

export default ActiveTabsSwitching