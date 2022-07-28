import React from "react";

function Login() {
  return (
    <div className="my-6 grid justify-center">
      <div className="w-100 sm:w-96 border rounded-xl shadow-lg overflow-hidden">
        <div className="text-center py-3 font-bold text-xl mb-2 border-b bg-slate-200">
          Login Page
        </div>
        <form className="p-4">
          <input
            type="text"
            className="input placeholder:text-sm mb-2"
            placeholder="Email ..."
          />
          <input
            type="text"
            className="input placeholder:text-sm mb-4"
            placeholder="Password ..."
          />
          <div className="flex justify-center">
          <button type='button' className='btn'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
