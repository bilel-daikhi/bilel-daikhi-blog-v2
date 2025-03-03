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
      title: data.title,
      desc: data.desc,
      imageUrl: data.imageUrl,
    });
    reset();
  };

  return (
    <section id="content">
      <div class="content-wrap">
        <div class="container clearfix">
          <div class="postcontent nobottommargin">
            <h3>Send me a Message</h3>

            <div class="form-widget">
              <div class="form-result"></div>

              <form
                class="nobottommargin"
                id="template-contactform"
                name="template-contactform"
              >
                <div class="form-process"></div>

                <div class="col_one_third">
                  <label for="template-contactform-name">
                    Name <small>*</small>
                  </label>
                  <input
                    type="text"
                    id="template-contactform-name"
                    name="template-contactform-name"
                    value=""
                    class="sm-form-control required"
                  />
                </div>

                <div class="col_one_third">
                  <label for="template-contactform-email">
                    Email <small>*</small>
                  </label>
                  <input
                    type="email"
                    id="template-contactform-email"
                    name="template-contactform-email"
                    value=""
                    class="required email sm-form-control"
                  />
                </div>

                <div class="clear"></div>

                <div class="col_full">
                  <label for="template-contactform-subject">
                    Subject <small>*</small>
                  </label>
                  <input
                    type="text"
                    id="template-contactform-subject"
                    name="subject"
                    value=""
                    class="required sm-form-control"
                  />
                </div>

                <div class="clear"></div>

                <div class="col_full">
                  <label for="template-contactform-message">
                    Message <small>*</small>
                  </label>
                  <textarea
                    class="required sm-form-control"
                    id="template-contactform-message"
                    name="template-contactform-message"
                    rows="6"
                    cols="30"
                  ></textarea>
                </div>

                <div class="col_full hidden">
                  <input
                    type="text"
                    id="template-contactform-botcheck"
                    name="template-contactform-botcheck"
                    value=""
                    class="sm-form-control"
                  />
                </div>

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
