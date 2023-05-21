import React, { SyntheticEvent } from 'react';
import { LoginRequest, useLoginMutation } from '../services/auth';

const LoginForm: React.FC = () => {
  const [formState, setFormState] = React.useState<LoginRequest>({
    email: '',
    password: '',
  });

  const [login] = useLoginMutation();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    login(formState)
      .unwrap()
      .catch((error) => {
        console.error('error response: ',error);
    });
  };

  const handleInputChange = (event: SyntheticEvent) => {
    const input = event.target as HTMLInputElement;
    setFormState({ ...formState, [input.name]: input.value });
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 md:space-y-6"
        action="#"
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required={true}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="********"
            required={true}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
