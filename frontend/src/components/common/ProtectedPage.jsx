import { useEffect } from 'react'
import { useAuthModal } from '../../store/authModalStore'
import { useUserStore } from '../../store/userStore'

const ProtectedPage = ({ children }) => {
  const user = useUserStore((state) => state.user)
  const setAuthModalOpen = useAuthModal((state) => state.setAuthModalOpen)

  useEffect(() => {
    if (!user) setAuthModalOpen(!user)
  }, [user])
  return (
    user ? children : null
  )
}

export default ProtectedPage