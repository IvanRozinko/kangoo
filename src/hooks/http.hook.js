import { useState, useCallback } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useHttp = () => {
  const auth = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback( async (url, method='GET', body=null, headers={}) => {
    setLoading(true);
    try {
      if(body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      
      headers['authorization'] = `Bearer ${auth.token}`

      const response = await fetch(url, { method, body, headers })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something wrong')
      }

      setLoading(false)
      return data

    } catch (e) {
      console.log(e)
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [auth.token])

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}