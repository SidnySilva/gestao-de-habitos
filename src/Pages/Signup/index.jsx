import * as yup from "yup";
import api from "../../Services/api";
import LeafAnimation from "../../Components/leafsAnimation";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { Container, Error, Div } from "./style";

function Signup() {
  const history = useHistory();
  const schema = yup.object().shape({
    username: yup.string().required("Nome: Campo obrigatório"),

    email: yup
      .string()
      .email("E-mail invalido")
      .required("E-mail: Campo obrigatório"),
    password: yup.string().required("senha: campo obrigatorio"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Senhas não coincidem")
      .required("Confirme sua senha"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitFunction = (data) => {
    delete data.confirmPassword;
    api
      .post("users/", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        ("Algo de errado não está certo");
      });
  };
  return (
    <Container>
      <LeafAnimation />
      <Div>
        <Header />
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <TextField
            {...register("username")}
            margin="normal"
            fullWidth
            label="Name"
            variant="outlined"
            error={errors.username?.message}
          />

          <TextField
            {...register("email")}
            margin="normal"
            fullWidth
            label="E-mail"
            variant="outlined"
            error={errors.email?.message}
          />
          <TextField
            {...register("password")}
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            error={errors.password?.message}
          />
          <TextField
            {...register("confirmPassword")}
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            error={errors.confirmPassword?.message}
          />
          <Button color="#fff" text="Registrar" type="submit"></Button>
          <Link to="/">ir para o login</Link>
        </form>
      </Div>
    </Container>
  );
}

export default Signup;
