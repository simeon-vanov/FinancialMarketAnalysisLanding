import { useAuth0 } from '@auth0/auth0-react'
import { Button, TextField } from '@mui/material'
import axiosInstance from 'configs/axios'
import { webApiConfig } from 'configs/urls'
import toast from 'react-hot-toast'
import { useState } from 'react'

const UpdateNameField: React.FC = () => {
  const { user } = useAuth0()
  const [isSaving, setIsSaving] = useState(false)
  const [newName, setNewName] = useState(user?.nickname || '')

  const updateName = async (): Promise<void> => {
    try {
      const url = webApiConfig.userUpdateName
      await axiosInstance.patch(url, { newName })
      toast.success('Nickname updated!')
    } catch (error) {
      console.error('Error updating name:', error)
      toast.error('Error when updating nickname...')
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdate = async () => {
    if (!user?.sub) return
    setIsSaving(true)
    await updateName()
  }

  return (
    <>
      <TextField
        defaultValue={user?.nickname}
        label='Nickname'
        size='small'
        sx={{
          flexGrow: 1,
          mr: 3
        }}
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Button onClick={handleUpdate} disabled={isSaving}>
        {' '}
        {isSaving ? 'Saving...' : 'Save'}
      </Button>
    </>
  )
}

export default UpdateNameField
