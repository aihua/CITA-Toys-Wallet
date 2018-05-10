import * as React from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import MenuIcon from 'material-ui-icons/Menu'
import { DialogContent } from 'material-ui/Dialog'
import FingerprintIcon from 'material-ui-icons/Fingerprint'
import SettingsIcon from 'material-ui-icons/Settings'
import ViewCarouselIcon from 'material-ui-icons/ViewCarousel'
import FormatShapesIcon from 'material-ui-icons/FormatShapes'
import GraphicIcon from 'material-ui-icons/GraphicEq'
import SearchIcon from 'material-ui-icons/Search'
import { Link } from 'react-router-dom'
import { containers } from '../../Routes'
import { IContainerProps } from '../../typings/index.d'
import Dialog from '../Dialog'
import SettingPanel from '../../components/SettingPanel'
import { withObservables } from '../../contexts/observables'

const styles = require('./styles')

const urlGen = keyword => {
  switch (keyword.length) {
    case 64:
    case 66: {
      return `/block/${keyword}`
    }
    case 40:
    case 42: {
      return `/account/${keyword}`
    }
    default: {
      return `/height/${keyword}`
    }
  }
}

const icons = {
  Possession: <FingerprintIcon />,
  Blocks: <ViewCarouselIcon />,
  ContractEditor: <FormatShapesIcon />,
  Config: <SettingsIcon />,
  Graphs: <GraphicIcon />,
}
export interface Metadata {
  chainId: string
  chainName: string
  operator: string
  website: string
  genesisTimestamp: string
  validators: string[]
  blockInterval: number
}
const initMetadata: Metadata = {
  chainId: '',
  chainName: '',
  operator: '',
  website: '',
  genesisTimestamp: '',
  validators: [],
  blockInterval: 0,
}
const initState = {
  keyword: '',
  settingsOn: false,
  metadata: initMetadata,
}
type HeaderState = typeof initState
interface HeaderProps extends IContainerProps {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = initState
  componentDidMount () {
    this.props.CITAObservables.metaData({
      blockNumber: '0x0',
    }).subscribe(
      (metadata: Metadata) => {
        this.setState(state => ({ ...state, metadata }))
      },
      error => {
        console.error(error)
      },
    )
  }
  private handleInput = name => e => {
    // const value = e.target.value
    const { value } = e.target
    this.setState(state => ({
      ...state,
      [name]: value,
    }))
  }
  private toggleSettings = (on = !this.state.settingsOn) => e => {
    this.setState(state => ({
      settingsOn: on,
    }))
  }
  render () {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" href="/" style={{ color: '#FFF' }}>
              <Typography variant="title" color="inherit">
                {(process.env.APP_NAME as string).toUpperCase()}
              </Typography>
            </Link>
            <div className={styles.navs}>
              {/* containers.filter(container => container.nav).map(container => (
              <Typography variant="subheading">
                <Link
                  to={container.path}
                  href={container.path}
                  className={styles.navItem}
                >
                  <IconButton color="inherit" aria-label={container.name}>
                    {icons[container.name]}
                  </IconButton>
                  <span>{container.name}</span>
                </Link>
              </Typography>
            )) */}
            </div>
            <div>
              <IconButton
                style={{ color: '#FFF' }}
                onClick={this.toggleSettings(true)}
              >
                <SettingsIcon />
              </IconButton>
              <TextField
                value={this.state.keyword}
                onChange={this.handleInput('keyword')}
              />
              <Link
                to={urlGen(this.state.keyword)}
                href={urlGen(this.state.keyword)}
              >
                <IconButton style={{ color: '#FFF' }}>
                  <SearchIcon />
                </IconButton>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <Dialog
          on={this.state.settingsOn}
          dialogTitle="Settings"
          onClose={this.toggleSettings(false)}
        >
          <DialogContent>
            <SettingPanel metadata={this.state.metadata} />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default withObservables(Header)
