import { useSelector } from 'react-redux';
import { RootState } from '../store';

const UserProfile: React.FC = () => {
  const token = useSelector((state: RootState) => state.token);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {token ? 'Welcome back!' : 'Please login to see your profile'}
      </h1>

      {token && (
        <div>
          <p className="text-gray-900 dark:text-white">
            Your email is: {token.email}
          </p>
          <p className="text-gray-900 dark:text-white">
            Your id is: {token.sub}
          </p>
          <p className="text-gray-900 dark:text-white">
            Your token exp is: {new Date(token.exp * 1000).toString()}
          </p>
          <p className="text-gray-900 dark:text-white">
            Your token iat is: {new Date(token.iat * 1000).toString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
