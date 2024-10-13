import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthProvider'

const UpdateProfile = () => {

    const {updateUserProfile, user} = useContext(AuthContext)
    console.log(user)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;

        updateUserProfile(name, photoURL).then(() => {
            // Profile updated!
            alert("Profile updated successfully!");
            window.location.href = "/"; // Redirect to home page
          }).catch((error) => {
            // An error occurred
            // ...
          });
          
      }

  return (
    <div className=' h-screen flex items-center justify-center'>
        <form className="card-body card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
            <h3 className=' font-bold'>Update Your Profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Your Name" className="input input-bordered" required {...register("name")}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input type="text" placeholder="Photo URL" className="input input-bordered" required {...register("photoURL")}/>

          {/* Photo uploading */}
         
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-darkGrey text-white">Update</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile