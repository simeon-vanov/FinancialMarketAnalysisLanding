import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import axiosInstance from 'configs/axios'
import { webApiConfig } from 'configs/urls'
import toast from 'react-hot-toast'
import { useState } from 'react'

const DeleteUserButton: React.FC = () => {
  const { user, logout } = useAuth0()
  const [isDeleting, setIsDeleting] = useState(false) // State variable to track delete status

  const deleteUser = async (): Promise<void> => {
    try {
      const url = webApiConfig.userDelete
      await axiosInstance.delete(url)
    } catch (error) {
      console.error('Error deleting user:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDelete = async () => {
    if (!user?.sub) return
    setIsDeleting(true)
    await deleteUser()
    toast.success('Account deleted!')
    await logout()
  }

  return (
    <div>
      <Button variant='outlined' fullWidth color='error' onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete Account'}
      </Button>
    </div>
  )
}

export default DeleteUserButton
