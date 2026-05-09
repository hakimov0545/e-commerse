import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/useProfile";
import style from "./Account.module.css";
import { useEffect } from "react";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

function Account() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data, isLoading, error } = useUser();
  const { mutate, isPending } = useUpdateProfile();

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        address: data.address,
      });
    }
  }, [data, reset]);

  const onSubmit = (data) => {
    mutate(data);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user</p>;

  return (
    <form className={style.profile_container} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={style.title}>Edit Your Profile</h2>

      <div className={style.form_grid}>
        <div className={style.form_group}>
          <label>First Name</label>
          <input
            type="text"
            {...register("name", { required: true, minLength: 2 })}
          />
          {errors.name && (
            <span className={styles.error}>Name is required</span>
          )}
        </div>

        <div className={style.form_group}>
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastname", { required: true, minLength: 2 })}
          />
          {errors.lastName && (
            <span className={styles.error}>Last name is required</span>
          )}
        </div>

        <div className={style.form_group}>
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && (
            <span className={style.error}>Email is required</span>
          )}
        </div>

        <div className={style.form_group}>
          <label>Address</label>
          <input type="text" {...register("address", { required: false })} />
        </div>
      </div>

      <div className={style.password_section}>
        <label>Password Changes</label>

        <input type="password" placeholder="Current Password" />
        <input type="password" placeholder="New Password" />
        <input type="password" placeholder="Confirm New Password" />
      </div>

      <div className={style.actions}>
        <button
          className={style.cancel_btn}
          type="button"
          onClick={() => reset()}
        >
          Cancel
        </button>
        <button className={style.save_btn} type="submit">
          {isPending ? "Saving" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default Account;
