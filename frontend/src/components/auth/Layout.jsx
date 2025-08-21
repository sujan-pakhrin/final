import { Outlet, useLocation } from "react-router-dom";
import signin from '../../assets/auth/signin.svg';
import signup from '../../assets/auth/signup.svg';

function Layout() {
  const location = useLocation();

  const isLogin = location.pathname === "/auth/login"; //true or false
  const isSignup = location.pathname === "/auth/register";

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12">
        <div className="max-w-2xl w-full space-y-6 text-center text-priemary-foreground">
          {/* <h1 className="text-4xl font-extrabold tracking-tight text-[black]">
            Welcome to ECommerce Shopping
          </h1> */}
          {isLogin && <img src={signin} alt="signin" />}
          {isSignup && <img src={signup} alt="signup" />}
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
