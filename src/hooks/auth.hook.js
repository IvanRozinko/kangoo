import { useState, useCallback, useEffect } from "react"

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isTrainer, setIsTrainer] = useState(false)

  const login = useCallback((jwtToken, id, isTrainerVal) => {
    setToken(jwtToken)
    setUserId(id)
    setIsTrainer(isTrainerVal)
    
    localStorage.setItem(storageName, JSON.stringify({
      userId: id,
      token: jwtToken,
      isTrainer: isTrainerVal
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setIsTrainer(false)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId, data.isTrainer)
    }
  }, [login])

  return { login, logout, token, userId, isTrainer }
}