import {
  Box,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography
} from '@mui/material'
import { SeverityPill } from 'components/common/severity-pill'
import { Indicator } from './models'
import InfoIcon from '@mui/icons-material/Info'
import { tagMap } from 'types/tags'

export interface IndicatorsSignalTableProps {
  signals: Indicator[]
  onSignalInfoClick: (id: string) => void
  onViewSignalHistoryClick: (id: string, signalId: string) => void
}

const IndicatorsSignalList = ({ signals, onSignalInfoClick, onViewSignalHistoryClick }: IndicatorsSignalTableProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      <Card>
        <List>
          {signals.map((signal, i) => {
            const tagDetails = signal.tag ? tagMap.get(signal.tag) : undefined
            return (
              <ListItem divider={i < signals.length - 1} key={`${signal.id}-${signal.tag}-${i}`}>
                <ListItemIcon>
                  <Tooltip title='Info'>
                    <IconButton edge='end' onClick={() => onSignalInfoClick(signal.signalId)}>
                      <InfoIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText>
                  <Box display='flex' alignItems='center'>
                    <Typography color='textPrimary' variant='subtitle2'>
                      {`${signal.signalName}`}
                    </Typography>
                    <Box marginLeft={1}>
                      <SeverityPill key={`${signal.tag}-${i}-pill`} color={tagDetails?.color ?? 'primary'}>
                        {tagDetails?.text ?? signal.tag}
                      </SeverityPill>
                    </Box>
                  </Box>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Button
                    variant='outlined'
                    size='small'
                    color='primary'
                    onClick={() => onViewSignalHistoryClick(signal.id, signal.signalId)}
                  >
                    View
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </Card>
    </Box>
  )
}

export default IndicatorsSignalList
