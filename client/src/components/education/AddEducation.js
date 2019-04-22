import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../store/actions/profileActions";
class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      college: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const eduData = {
      college: this.state.college,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">
                Add Your Education {errors.length}
              </h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.college
                    })}
                    placeholder="* college Or Bootcamp"
                    name="college"
                    value={this.state.college}
                    onChange={this.onChange}
                  />
                  {errors.college && (
                    <div className="invalid-feedback">{errors.college}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.degree
                    })}
                    placeholder="* Degree Or Certificate"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                  />
                  {errors.degree && (
                    <div className="invalid-feedback">{errors.degree}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fieldofstudy
                    })}
                    placeholder="Field Of Study"
                    name="fieldofstudy"
                    value={this.state.fieldofstudy}
                    onChange={this.onChange}
                  />
                  {errors.fieldofstudy && (
                    <div className="invalid-feedback">
                      {errors.fieldofstudy}
                    </div>
                  )}
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.from
                    })}
                    name="from"
                    value={this.state.from}
                    onChange={this.onChange}
                  />
                  {errors.from && (
                    <div className="invalid-feedback">{errors.from}</div>
                  )}
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.to
                    })}
                    name="to"
                    value={this.state.to}
                    onChange={this.onChange}
                  />
                  {errors.to && (
                    <div className="invalid-feedback">{errors.to}</div>
                  )}
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label className="form-check-label" for="current">
                    Current Job
                  </label>
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description
                    })}
                    placeholder="Program Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                  <small className="form-text text-muted">
                    Tell us about your experience and what you learned
                  </small>
                </div>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
