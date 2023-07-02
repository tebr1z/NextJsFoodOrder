import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { loginSchema } from "../../schema/login";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";


const Login = () => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [currentUser, setCurrentUser] = useState();

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: false, email, password };
    actions.resetForm();
    try {
      const res = await signIn("credentials", options);
      actions.resetForm();
      if (res.error) {
        toast.error("Failed to login. The username or password is incorrect.");
      } else {
       
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setCurrentUser(
          res.data?.find((user) => user.email === session?.user?.email)
        );
        session && push("/profile/" + currentUser?._id);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [session, push, currentUser]);

 
  
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="container mx-auto">
      
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Login</Title>
        <div className="flex flex-col gap-y-3 w-9/12">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-9/12 gap-y-3 mt-6">
          <button className="btn-primary"><i className="fa fa-arrow-right-to-bracket mr-2 text-lg" type="submit"></i>LOGIN</button>
          <button className="btn-primary !bg-secondary" type="button" onClick={() => signIn("github")}>
            <i className="fa-brands fa-github mr-2 text-lg"></i>
            GITHUB
          </button>
          <button className="btn-primary !bg-red-500" type="button" onClick={() => signIn("google")}>
            <i className="fa-brands fa-google mr-2 text-lg"></i>
            GOOGLE
          </button>
          <button className="btn-primary !bg-blue-800">
            <i className="fa-brands fa-facebook-f mr-2 text-lg"></i>
            FACEBOOK
          </button>
          <Link href="/auth/register">
            <span className="text-sm underline cursor-pointer text-secondary">
              Do you no have a account?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });


  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user.email);
  if (session && user) 

  if (session) {
    return {
      redirect: {
        destination: "/profile/" + user._id,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}


export default Login;