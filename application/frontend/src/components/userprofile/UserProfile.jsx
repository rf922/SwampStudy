import React, { useState, useEffect } from "react";
import useAccountAPI from "./hooks/useAccountAPI";
import useFormValidation from "./hooks/useFormValidation";
import { useFileAPI } from "./hooks/useFileAPI";
import Stars from "../stars/Stars";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const { updateProfile } = useAccountAPI();
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const { formData, handleChange, setFormData, errors, setErrors, validate } =
    useFormValidation({
      first_name: "",
      last_name: "",
      profile_picture: "",
      biography: "No biography provided",
    });
  const {
    file,
    handleFileInputChange,
    uploadImage,
    imagePreviewUrl,
    setImagePreviewUrl,
  } = useFileAPI();

  useEffect(() => {
    //populate form data using local data
    const localData = localStorage.getItem("userDetails");
    setIsLoading(true);
    if (localData) {
      const savedDetails = JSON.parse(localData);
      setFormData(savedDetails); // set formData to the saved details
      setImagePreviewUrl(savedDetails.profile_picture);
      setRating(savedDetails.rating);
    }
    setIsLoading(false);
  }, [setFormData, setImagePreviewUrl, setRating]);

  const handleEditClick = () => {
    //switch btwn edit nd save modes
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    if (!validate()) {
      console.log({ errors });
      return;
    } else {
      try {
        setIsLoading(true);
        //updating the users data
        let updatedFormData = formData;
        if (file) {
          //profile picture was changed
          const imageUrl = await uploadImage(file);
          updatedFormData = { ...formData, profile_picture: imageUrl };
          console.log({ formData });
          setFormData(updatedFormData);
        }
        await updateProfile(updatedFormData);
        localStorage.setItem("userDetails", JSON.stringify(updatedFormData));
        setEditMode(false);
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        //setErrors to display optiona error message in comp
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: "Failed to submit changes, please Try again later.",
        }));
        toast.error("Error saving changes. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onFileInput = async (e) => {
    const _file = handleFileInputChange(e);
  };

  return (
    <div className="flex flex-col sm:flex-row max-w-full  min-h-[220px] mx-12 rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200 transition duration-200 ease-in-out hover:shadow-2xl hover:ring-4 hover:ring-yellow-300 hover:scale-105 focus:outline-none p-4">
      <div className="w-full sm:w-1/3 flex flex-col items-center p-4">
        {/* img section */}
        {isLoading ? (
          <div className=" mx-10 my-10 justify-center">
            <Loading />
          </div>
        ) : (
          <div>
            <img
              src={imagePreviewUrl}
              alt={`${formData.first_name} ${formData.last_name}`}
              className="object-cover object-center w-full max-h-auto"
            />
            {editMode && (
              <input
                type="file"
                id="profile_picture"
                name="profile_picture"
                onChange={onFileInput}
                className="text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-200 file:text-purple-700 hover:file:bg-purple-300 w-full"
              />
            )}
            {errors.profile_picture && (
              <p className="text-red-500 text-xs italic">
                {errors.profile_picture}
              </p>
            )}
          </div>
        )}
      </div>

      {/* details sectin  */}
      <div className="w-full sm:w-2/3 flex flex-col justify-between my-4 mx-2 p-4 bg-purple-100">
        {editMode && errors.form && (
          <div className="text-red-500 text-xs italic p-2">{errors.form}</div>
        )}
        {editMode ? (
          <>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="text-center text-xl font-semibold text-purple-800 block w-full"
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs italic">{errors.first_name}</p>
            )}
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="text-center text-xl font-semibold text-purple-800 block w-full mt-2"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs italic">{errors.last_name}</p>
            )}
            <textarea
              name="biography"
              id="biography"
              value={formData.biography}
              onChange={handleChange}
              className="text-gray-800 text-center mt-2 block w-full"
              rows="3"
            />
            {errors.biography && (
              <p className="text-red-500 text-xs italic">{errors.biography}</p>
            )}
          </>
        ) : (
          <>
            <>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-purple-800">{`${formData.first_name} ${formData.last_name}`}</h2>
                {!isLoading && <Stars rating={rating} />}
              </div>
              <div className="text-xl font-semibold text-purple-800 pl-4">
                <h3 className="font-semibold">Bio:</h3>
                <p>{formData.biography}</p>
              </div>
            </>
          </>
        )}
        {editMode ? ( //buton change appearance on edit/save mode
          <button
            onClick={handleSaveClick}
            disabled={errors.form}
            className="mt-4 self-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-full sm:w-auto"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="mt-4 self-center bg-purple-200 hover:bg-purple-300 text-purple-700 font-bold py-2 px-4 rounded-full w-full sm:w-auto"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
