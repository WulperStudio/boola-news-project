import React, { useRef, useState, FormEvent, ReactElement } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { FormHelperText } from "@material-ui/core"
// @ts-ignore
import Strapi from "../../../assets/Strapi.svg"
import useStyles from "./SignIn.styles"


type OnSubmitProps = {
  user: string,
  password: string,
  error: boolean
}
type Props = {
  onSubmit?: (prop: { password: any; error: boolean; email: any }) => void;
};

export default ({ onSubmit }: Props): ReactElement => {
  const classes = useStyles()
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const termRef = useRef()
  const [errors, setErrors] = useState({ email: false, password: false, term: false })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(termRef.current)
    if (emailRef.current && passwordRef.current && onSubmit !== undefined) {
      const email = emailRef.current?.value
      const password = passwordRef.current?.value
      onSubmit({ email, password, error: !(email && password) })
      setErrors({
        ...errors,
        email: !email,
        password: !password
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>
        <img src={Strapi} alt="Sign up for an account!" height={62} width={248}/>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Corporative email"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
            error={errors.email}
            helperText={errors.email && "Incorrect entry."}
            onChange={() => {
              setErrors({ ...errors, email: false })
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
            error={errors.password}
            helperText={errors.password && "Incorrect entry."}
            onChange={() => {
              setErrors({ ...errors, password: false })
            }}
          />

          <Typography align="center">
            <FormControlLabel
              control={<>
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={(e) => {
                    setErrors({ ...errors, term: e.target.checked })
                  }}
                />
              </>}
              label="Accept terms & conditions"
            />
            <FormHelperText error={true}>You can display an error</FormHelperText>
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Typography align="center">
            {`Are you an user? `}
            <Link href="/singup" variant="body2" className={classes.link}>
              Sing Up
            </Link>
          </Typography>

        </form>

      </div>
    </Container>
  )
}
