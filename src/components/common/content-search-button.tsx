import { Tooltip, IconButton } from "@mui/material"
import { useState } from "react"
import { ContentSearchDialog } from "./content-search-dialog"
import { Search as SearchIcon } from 'icons/search'

const ContentSearchButton = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleOpenSearchDialog = (): void => {
    setOpenDialog(true)
  }

  const handleCloseSearchDialog = (): void => {
    setOpenDialog(false)
  }

  return (
    <>
      <Tooltip title='Search'>
        <IconButton onClick={handleOpenSearchDialog} sx={{ ml: 1 }}>
          <SearchIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <ContentSearchDialog onClose={handleCloseSearchDialog} open={openDialog} />
    </>
  )
}

export default ContentSearchButton