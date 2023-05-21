import Card from './Card';
import Divider from './Divider';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import UsersList from './UsersList';

const LoginPage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <span
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          role="img"
          aria-label="hello hand emoji"
        >
          Hello 👋
        </span>
        <Card>
          <LoginForm />
        </Card>
        <Divider />
        <Card>
          <UserProfile />
          <Divider />
          <UsersList />
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
