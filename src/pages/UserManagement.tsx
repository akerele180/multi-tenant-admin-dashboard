import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { delay } from '../utils/functions';
import { getTenantUsers } from '../api/user';
import { Skeleton } from '../components/ui/skeleton';
import { User } from '../utils/models';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { state, dispatch } = useAuth();

  const fetchUsers = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await delay(1500);
      const user = await getTenantUsers(state.tenant?.id as number);
      setUsers(user);

    } catch (error) {
      return error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <span className="">User Management</span>
      {state.loading ?
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        : users.length > 0 ? users.map((user) => (
          <div key={user.id} className="flex items-center gap-2">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
        )) : <span>No users found</span>
      }
    </div>
  )
}

export default UserManagement