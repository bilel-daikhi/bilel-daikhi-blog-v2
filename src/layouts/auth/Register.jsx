import React  from 'react';
import { ROOT_PATH } from '../../lib/routes';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/auths';
import { emailValidate, nameValidate, passwordValidate, usernameValidate } from '../../utils/form-validation';

const Register = () => {
    const {register: signup, isLoading} = useRegister();
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  async function handleRegister(data) {
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: ROOT_PATH,
    });
  }
  const ladelBtn = "Don' t be a stranger, sign up!";
  

    return (
        <div className="card nobottommargin">
        <div className="card-body" style={{ padding: "40px" }}>
          <h3>Register for an Account</h3>

          <form
            id="register-form"
            name="register-form"
            className="nobottommargin"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div className="form-group">
              <label htmlFor="register-form-name">Name:</label>
              <input
                type="text"
                id="register-form-name"
                {...register("name", nameValidate)}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="register-form-email">Email Address:</label>
              <input
                type="text"
                id="register-form-email"
                {...register("email", emailValidate)}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="register-form-username">
                Choose a Username:
              </label>
              <input
                type="text"
                id="register-form-username"
                {...register("username", usernameValidate)}
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="register-form-password">
                Choose Password:
              </label>
              <input
                type="password"
                id="register-form-password"
                {...register("password", passwordValidate)}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="register-form-repassword">
                Re-enter Password:
              </label>
              <input
                type="password"
                id="register-form-repassword"
                {...register("confirmPassword", {
                  validate: value =>
                    value === watch('password') || "Passwords do not match"
                })}
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
            </div>

            <div className="form-group nobottommargin">
              <button
                className="btn btn-primary"
                id="register-form-submit"
                name="register-form-submit"
                value="register"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Register;