import { LogoutLink} from '../../components'
// import axios from 'axios';

export const Root = () => {
  // useEffect(() => {
  //   axios.get('/api/users/me', { withCredentials: true })
  // }, [])
  

  return (
    <div>
      <LogoutLink/>
    </div>
  );
}
