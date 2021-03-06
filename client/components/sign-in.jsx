import React from 'react';

export default class SignInForm extends React.Component {
  render() {
    const { errMessage } = this.props;
    const { loginSuccess } = this.props;
    return (
      <section className="vh-100 sign-up">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>
                      <form className="mx-1 mx-md-4" onSubmit={this.props.handleSignIn}>
                        <div className="d-flex flex-row align-items-center mb-4">
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input required type="username" name="username" id="form3Example4c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example4c">Username</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input required type="password" name="password" id="form3Example4cd" className="form-control" />
                            <label className="form-label" htmlFor="form3Example4cd">Password</label>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 sign-in">
                          {errMessage && <p id='error'>Invalid Login, please try again.</p>}
                          {loginSuccess && <p id='success'>Successfully logged in!</p>}
                          <input type="submit" className="btn btn-primary btn-lg" value='Sign In' />
                          <p className="small fw-bold mt-2 pt-1 mb-0">Dont have an account?<a href="#sign-up"
                              className="link-danger"> Register</a></p>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src='/sign-in.png'
                        className="img-fluid welcome" alt="Sample image">
                        </img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
