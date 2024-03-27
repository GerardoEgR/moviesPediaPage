import { useEffect } from 'react'
import { useAppState } from '../../store/appStateStore' 

const PageWrapper = ({ state, children }) => {
  const setAppState = useAppState((state) => state.setAppState)

  useEffect(() => {
    window.scrollTo(0, 0)
    setAppState(state)
  }, [state])
  
  return (
    children
  )
}

export default PageWrapper