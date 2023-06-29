import { FC, useEffect, useState } from 'react';
import { User } from '../types';
import '../App.scss';
import { loadUserById } from '../api/userApi';

interface Props {
  userId: number | null;
}

export const UserInfo: FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUser(null);

    if (!userId) {
      return;
    }

    setIsLoading(true);

    loadUserById(userId)
      .then(setUser);
  }, [userId]);

  return (
    <div className="userInfo">
      {!userId && <h2>User not selected</h2>}

      {isLoading && <h2>Loading...</h2>}

      {!isLoading && !user && <h2>User not found</h2>}

      {user && (
        <article>
          <h4>{`#${user.id} ${user.name}`}</h4>
          <p>{user.email}</p>
        </article>
      )}
    </div>
  );
};
