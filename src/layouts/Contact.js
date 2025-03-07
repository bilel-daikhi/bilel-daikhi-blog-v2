import React from "react";
import { useForm } from "react-hook-form";
import { useAddContact } from "../hooks/contact";
import { v4 as uuidv4 } from "uuid";
export default function Contact() {
  const id = uuidv4();
  const { addContact, isLoading } = useAddContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleAddContact = (data) => {
    addContact({
      uid: id,
      title: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    reset();
  };

  return (
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div className="heading-block center nobottomborder">
            <h2>Let's Build Something Great Together</h2>
            <span>
              Reach out for collaborations, projects, or just a tech chat –
              Expertise in Java Ecosystem &amp; Modern JavaScript Frameworks
            </span>
          </div>
          <div class="postcontent nobottommargin">
            <h3>Send me a Message</h3>

            <div class="form-widget">
              <div class="form-result"></div>

              <form
                class="nobottommargin"
                id="template-contactform"
                onSubmit={handleSubmit(handleAddContact)}
              >
                <div class="form-process"></div>

                <div class="col_one_third">
                  <label for="template-contactform-name">
                    Name <small>*</small>
                  </label>
                  <input
                    type="text"
                    id="template-contactform-name"
                    {...register("name", { required: true, maxLength: 120 })}
                    className={`sm-form-control required ${
                      errors.name ? "is-invalid" : ""
                    }`}
                  />
                  {errors.name && (
                    <span className="error">
                      Name is required and should be less than 120 characters
                    </span>
                  )}
                </div>

                <div class="col_one_third">
                  <label for="template-contactform-email">
                    Email <small>*</small>
                  </label>
                  <input
                    type="email"
                    id="template-contactform-email"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    className={`sm-form-control email required ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  {errors.email && (
                    <span className="error">Email is not valide!</span>
                  )}
                </div>

                <div class="clear"></div>

                <div class="col_full">
                  <label for="template-contactform-subject">
                    Subject <small>*</small>
                  </label>
                  <input
                    type="text"
                    id="template-contactform-subject"
                    {...register("subject", { required: true, maxLength: 200 })}
                    className={`sm-form-control required ${
                      errors.subject ? "is-invalid" : ""
                    }`}
                  />
                  {errors.subject && (
                    <span className="error">Subject is not valide!</span>
                  )}
                </div>

                <div class="clear"></div>

                <div class="col_full">
                  <label for="template-contactform-message">
                    Message <small>*</small>
                  </label>
                  <textarea
                    className={`sm-form-control required ${
                      errors.subject ? "is-invalid" : ""
                    }`}
                    id="template-contactform-message"
                    {...register("message", {
                      required: true,
                      maxLength: 3000,
                    })}
                    rows="6"
                    cols="30"
                  ></textarea>
                  {errors.message && (
                    <span className="error">Message is not valide!</span>
                  )}
                </div>

                <div class="clear"></div>
                <div class="col_full">
                  <button
                    class="button button-3d nomargin"
                    type="submit"
                    id="template-contactform-submit"
                    name="template-contactform-submit"
                    value="submit"
                  >
                    Send Message
                  </button>
                </div>

                <input
                  type="hidden"
                  name="prefix"
                  value="template-contactform-"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
