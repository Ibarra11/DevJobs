import { useState, FormEvent } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
type FormFields = "email" | "password";
type FormErrors = {
  fields: {
    email?: { message: string };
    password?: { message: string };
  };
  mutations: {
    addUser?: { message: string };
  };
};

const ADD_NEW_USER = gql`
  mutation AddNewUser($input: CredentialsInputType!) {
    addNewUser(input: $input) {
      id
      email
      createdAt
    }
  }
`;

const GET_USER = gql`
  mutation GetUser($input: CredentialsInputType!) {
    getUser(input: $input) {
      id
      email
      createdAt
    }
  }
`;

export default function Signin() {
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<FormErrors>({
    fields: {},
    mutations: {},
  });
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const [formFields, setFormFields] = useState<Record<FormFields, string>>({
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState<"developer" | "employer">(
    "developer"
  );
  const [createUser, { data, loading }] = useMutation(ADD_NEW_USER, {
    onError: (err: Error) => {
      console.log(err.message);
      setFormErrors({
        ...formErrors,
        mutations: { addUser: { message: err.message } },
      });
    },
  });

  const [getUser] = useMutation(GET_USER, {
    onCompleted: (data) => {
      console.log(data);
      if (data) {
        router.push("/");
      } else {
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  async function handleForm(e: FormEvent<HTMLFormElement>) {
    let errors: {
      email?: { message: string };
      password?: { message: string };
    } = {};
    const { email, password } = formFields;
    if (email.length === 0) {
      errors.email = { message: "Email is  Required" };
    }
    if (password.length === 0) {
      errors.password = { message: "Password is Required" };
    }
    if (errors.email || errors.password) {
      setFormErrors({ ...formErrors, fields: errors });
    } else {
      if (formType === "login") {
        getUser({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
      } else {
        createUser({
          variables: { input: { email, password } },
        });
      }
    }
    e.preventDefault();
  }

  return (
    <div className="flex items-center justify-center h-screen bg-green-600">
      <div className="w-1/4  bg-white rounded-lg p-8 pb-0">
        <div className="relative text-center pb-12 border-2">
          <h1 className=" text-8xl">DevJobs</h1>
          <span className="absolute text-lg text-red-500 bottom-2 left-0 right-0 m-auto  ">
            {formErrors.mutations.addUser
              ? formErrors.mutations.addUser.message
              : null}
          </span>
        </div>

        <div className="flex text-center">
          <div
            className={`border-2 flex-1  text-2xl ${
              userType === "developer" ? "bg-teal-400" : null
            }`}
          >
            <button
              onClick={() => setUserType("developer")}
              className="py-3 w-full"
            >
              Developer
            </button>
          </div>
          <div
            className={`border-2 flex-1  text-2xl ${
              userType === "employer" ? "bg-teal-400" : null
            }`}
          >
            <button
              onClick={() => setUserType("employer")}
              className="py-3 w-full"
            >
              Employer
            </button>
          </div>
        </div>
        <form
          className="flex-1 flex flex-col gap-4  border-2 border-red-500 p-6 mb-3"
          onSubmit={handleForm}
        >
          <div className="flex flex-col gap-1">
            <label className=" text-xl font-bold" htmlFor="email">
              Email:
              <span className="text-base text-red-500 ml-3">
                {formErrors.fields.email
                  ? formErrors.fields.email.message
                  : null}
              </span>
            </label>
            <input
              className=" border-2 border-slate-300 text-lg rounded-md px-2 py-4 focus:outline-none  focus:ring-blue-500 focus:border-blue-500"
              type="email"
              name="email"
              id="email"
              value={formFields.email}
              onChange={(e) => {
                setFormFields({ ...formFields, email: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xl font-bold" htmlFor="password">
              Password:
              <span className=" ml-2 text-base text-red-500">
                {formErrors.fields.password
                  ? formErrors.fields.password.message
                  : null}
              </span>
            </label>
            <input
              className="border border-slate-300 text-lg rounded-md px-2 py-4 focus:outline-none  focus:ring-blue-500 focus:border-blue-500"
              type="password"
              name="password"
              id="password"
              value={formFields.password}
              onChange={(e) => {
                setFormFields({
                  ...formFields,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <button className="border-2 text-xl py-4 mt-3" type="submit">
            {formType === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-1 h-14  items-center justify-center">
          <p>
            {formType === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <button
            onClick={() =>
              setFormType(formType === "login" ? "signup" : "login")
            }
          >
            {formType === "login" ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}

Signin.auth = true;
