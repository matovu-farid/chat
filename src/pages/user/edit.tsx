import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ProfilePic from "../../components/ProfilePic";
import TextField from "../../components/TextField";
import useUser from "../../hooks/useUser";
import { classNames } from 'primereact/utils';

import { useFormik } from "formik";
import { InputText } from 'primereact/inputtext';

import { Button } from 'primereact/button';

import IImage from "../../Interfaces/Image";
import { trpc } from "../../utils/trpc";

interface User {
  name: string;
  email: string;
}
enum Userprops {
  name="name",email="email"
}


const UserEditPage: NextPage = () => {

  const user = useUser();
  const [image, setImage] = useState('')

  const innitialValues = { name:'', email:'', image:'' };
  trpc.useQuery(["user.getUser", user.id], {
    onSuccess: (user) => {
      if (user) {
        const { name, email, image } = user;
        innitialValues.name = name ?? "";
        innitialValues.email = email ?? ""; 
        image && setImage(image)       
      }
    },
  });
  const utils = trpc.useContext();
  const { mutate: saveUser } = trpc.useMutation(["user.saveUser"], {
    onSuccess: () => {
      utils.invalidateQueries(["user.getUser"]);
    },
  });


  const formik = useFormik({
    initialValues: innitialValues,
    validate: (data: User) => {
      const errors: User = { name: "", email: "" };

      if (!data.name) {
        errors.name = "Name is required.";
      }

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      return errors;
    },
    onSubmit: (data: User) => {
      const {email,name} = data
      const updatedUser = { name, email, id: user.id };

      saveUser(updatedUser);

      formik.resetForm();
    },
  });

  formik.touched['name']

  const isFormFieldValid = (name:Userprops) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name:Userprops) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div>
      <div>
        {

        (image)&&<ProfilePic imageURL={image} />
        }
        <div className="flex flex-col gap-2">
         
          <form onSubmit={formik.handleSubmit} className="p-fluid flex flex-col gap-5">
            <div className="field">
              <span className="p-float-label">
                <InputText
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  autoFocus
                  className={classNames({
                    "p-invalid": isFormFieldValid(Userprops.name),
                  })}
                />
                <label
                  htmlFor="name"
                  className={classNames({
                    "p-error": isFormFieldValid(Userprops.name),
                  })}
                >
                  Name*
                </label>
              </span>
              {getFormErrorMessage(Userprops.name)}
            </div>
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid(Userprops.email),
                  })}
                />
                <label
                  htmlFor="email"
                  className={classNames({
                    "p-error": isFormFieldValid(Userprops.email),
                  })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage(Userprops.email)}
            </div>
            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
