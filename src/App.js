import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/theme';
import { useRoutes } from './router/rootRouter';
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import ukLocale from "date-fns/locale/uk";


function App() {
  const { token, login, logout, userId, isTrainer } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ukLocale}>
      <AuthContext.Provider
        value={{
          token, login, logout, userId, isAuthenticated, isTrainer
        }}
      >
        <ThemeProvider theme={theme}>
          {routes}
        </ThemeProvider>
      </AuthContext.Provider>
    </MuiPickersUtilsProvider>
  )
}

export default App;
