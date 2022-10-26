import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
