import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdCameraEnhance } from "react-icons/md";
const ForSell = () => {
  const [activeOption, setActiveOption] = useState("");
  const [bhk, setBhk] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [error, setError] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [listedBy, setListedBy] = useState("");
  const [superBuiltup, setSuperBuiltup] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [carParking, setCarParking] = useState("");
  const [state, setState] = useState("");
  const [activeTab, setActiveTab] = useState("current"); // 'list' or 'current'
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("PREM SHAKYA");
  const [phone, setPhone] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const getInitials = (name) => {
    return name?.charAt(0)?.toUpperCase() || "P";
  };
  const [touchedFields, setTouchedFields] = useState({
    superBuiltup: false,
    carpetArea: false,
  });

  let states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Daman and Diu",
    "Delhi",
  ];

  const [dropsown, setDropDown] = useState("");

  {
    /* Images */
  }

  const fileInputRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [coverIndex, setCoverIndex] = useState(null);
  const MAX_PHOTOS = 20;
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length <= MAX_PHOTOS) {
      const newPhotos = files.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    } else {
      alert(`You can only upload up to ${MAX_PHOTOS} photos.`);
    }
  };

  const handleAddPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => {
          if (prev.length < MAX_PHOTOS) {
            return [...prev, reader.result];
          } else {
            alert("You can upload up to 20 photos.");
            return prev;
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetCover = (index, e) => {
    e.preventDefault();
    setCoverIndex(index);
    if (photos.length < MAX_PHOTOS) {
      fileInputRef.current.click();
    }
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    if (coverIndex === index) setCoverIndex(null);
    else if (coverIndex > index) setCoverIndex((prev) => prev - 1);
  };

  const renderPhotoBox = (photo, index) => (
    <div
      key={index}
      className="relative border w-[100px] h-[100px] m-1 overflow-hidden group"
    >
      <img
        src={photo.url}
        alt={`uploaded-${index}`}
        className="w-full h-full object-cover"
      />
      <button
        onClick={() => handleRemovePhoto(index)}
        className="absolute top-1 right-1 bg-white p-1 rounded-full text-black text-xs font-bold hover:bg-gray-200"
      >
        ✕
      </button>
      {index !== 0 && coverIndex === 0 && (
        <div className="absolute bottom-0 w-full bg-blue-700 text-xs text-white font-bold py-1 text-center">
          COVER
        </div>
      )}

      {index == 0 && (
        <button
          type="button"
          onClick={(e) => handleSetCover(index, e)}
          className="absolute bottom-0 w-full text-xs py-1 font-bold text-white bg-blue-700 bg-opacity-50 hover:bg-opacity-80"
        >
          COVER
        </button>
      )}
      <>
        {/* Hidden input outside the button to avoid nesting issue */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleAddPhoto}
          style={{ display: "none" }}
        />
      </>

      <input />
    </div>
  );

  const renderAddPhotoBox = () => (
    <label className="border w-[100px] h-[100px] flex flex-col items-center justify-center m-1 cursor-pointer hover:border-blue-500">
      <FaCamera className="text-xl text-gray-600" />
      <span className="text-xs">Add Photo</span>
      <input
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handlePhotoUpload}
      />
    </label>
  );

  const validateField = (fieldName, value) => {
    return value.trim() === ""; // true means error
  };

  const options = [
    "Flats / Apartments",
    "Indepedent / Bulder Floors",
    "Farm House",
    "House & Villa",
  ];

  const BHKData = ["1", "2", "3", "4", "4+"];
  const BathroomData = ["1", "2", "3", "4", "4+"];
  const CraParkingData = ["0", "1", "2", "3+"];
  const FurnishingData = ["Furnished", "Semi-Furnished", "Unfurnished"];
  const [projectName, setProjectName] = useState("");

  {
    /* Add title */
  }
  const [titleError, setTitleError] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [titleTouch, setTitleTouch] = useState(false);
  {
    /* for description */
  }
  const [description, setDescription] = useState("");
  const [desError, setDesError] = useState("");
  const [touched, setTouched] = useState(false);

  const DesMaxLength = 4096;
  const maxLength = 70;
  const ProjectStatusData = [
    "New Launch",
    "Ready to Move",
    "Under Construction",
  ];
  const listedByData = ["Builder", "Dealer", "Owner"];

  const dropDownOptionData = [
    "East",
    "North",
    "North-East",
    "North-West",
    "South",
    "South-East",
    "South-West",
    "west",
  ];

  {
    /* Project Name */
  }

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setProjectName(e.target.value);
    } else {
      setError("Project name  max lengh 70 charactor");
    }
  };

  {
    /* Add  Title */
  }

  const validateTitle = (value) => {
    if (value.trim().length < 10) {
      return "A minimum length of 10 characters is required. Please edit the field.";
    } else {
      return "";
    }
  };

  const AddTitleChange = (e) => {
    const value = e.target.value;
    setAddTitle(value);

    if (titleTouch) {
      setTitleError(validateTitle(value));
    }
  };

  const handleBlurTitle = () => {
    setTitleTouch(true);
    setTitleError(validateTitle(addTitle));
  };

  /*  Desction */

  const validate = (value) => {
    if (value.trim().length < 10) {
      return "A minimum length of 10 characters is required. Please edit the field.";
    } else {
      return "";
    }
  };

  const DescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);

    if (touched) {
      setDesError(validate(value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setDesError(validate(description));
  };

  const isValidForm = activeOption && bhk;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if an option is selected
    if (!activeOption) {
      setError("Please select a property type.");
      return;
    }

    if (!isValidForm) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    console.log("Selected Option:", activeOption);
  };

  return (
    <div>
      <div>
        <div>
          <div className="bg-blue-50 p-4">
            <img
              src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-back-icon-png-image_4190818.jpg"
              alt=""
              className="size-10"
            />
          </div>
          <h1 className="text-center font-bold  text-lg mt-5">POST YOUR AD</h1>
          <div className="m-auto border sm:w-250 h-auto mt-5">
            <div className="p-5">
              <h1 className="font-bold">SELECTED CATEGORY</h1>
              <div className="mt-5 flex justify-between lg:justify-start lg:gap-5">
                <p className="text-sm text-gray-500">
                  Properties / For Sale: Houses & Apartments{" "}
                </p>
                <span className="underline text-blue-900 font-bold cursor-pointer">
                  Change
                </span>
              </div>
            </div>
            <hr />

            <form>
              <div className="p-5 w-100 lg:w-200">
                <h1 className="text-lg font-bold">INCLIDE SOME DETAILS</h1>
                <div className="mt-3">
                  {!activeOption ? (
                    <>
                      <p className="font-bold text-red-500">Type*</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold ">Type*</p>
                    </>
                  )}

                  <div className="flex flex-row gap-2 flex-wrap">
                    {options.map((option, index) => (
                      <p
                        key={index}
                        onClick={() => {
                          if (activeOption === option) {
                            setActiveOption("");
                            setError("Please select a property type.");
                          } else {
                            setActiveOption(option);
                            setError("");
                          }
                        }}
                        className={`border rounded p-2 text-center cursor-pointer transition-all duration-200 hover:bg-blue-200 ${
                          activeOption === option
                            ? "bg-blue-200 text-black border-gray-600"
                            : "bg-white text-black"
                        }`}
                      >
                        {option}
                      </p>
                    ))}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </div>
                </div>
                <div className="mt-10">
                  <p className="font-bold">BHK*</p>
                  <div className="flex flex-row gap-2 flex-wrap">
                    {BHKData.map((option, index) => (
                      <p
                        key={index}
                        onClick={() => {
                          if (bhk === option) {
                            setBhk("");
                            setError("Please select a property type.");
                          } else {
                            setBhk(option);
                            setError("");
                          }
                        }}
                        className={`border rounded p-2 w-15 text-center cursor-pointer transition-all duration-200 hover:bg-blue-200 ${
                          bhk === option
                            ? "bg-blue-200 text-black border-black"
                            : "bg-white text-black"
                        }`}
                      >
                        {option}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mt-10">
                    <p className="font-bold">Bathrooms</p>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {BathroomData.map((option, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            if (bathroom === option) {
                              setBathroom("");
                              setError("Please select a property type.");
                            } else {
                              setBathroom(option);
                              setError("");
                            }
                          }}
                          className={`border rounded p-2 w-15 text-center cursor-pointer transition-all duration-200 hover:bg-blue-200 ${
                            bathroom === option
                              ? "bg-blue-200 text-black border-black"
                              : "bg-white text-black"
                          }`}
                        >
                          {option}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10">
                    <p className="font-bold">Furnishing</p>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {FurnishingData.map((option, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            if (furnishing === option) {
                              setFurnishing("");
                              setError("Please select a property type.");
                            } else {
                              setFurnishing(option);
                              setError("");
                            }
                          }}
                          className={`border rounded p-2 text-center cursor-pointer transition-all duration-200 hover:bg-blue-200 ${
                            furnishing === option
                              ? "bg-blue-200 text-black border-black"
                              : "bg-white text-black"
                          }`}
                        >
                          {option}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-10">
                    <p className="font-bold">Project Status</p>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {ProjectStatusData.map((option, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            if (projectStatus === option) {
                              setProjectStatus("");
                              setError("Please select a property type.");
                            } else {
                              setProjectStatus(option);
                              setError("");
                            }
                          }}
                          className={`border rounded p-2 text-center cursor-pointer transition-all duration-200 hover:bg-blue-200 ${
                            projectStatus === option
                              ? "bg-blue-200 text-black border-black"
                              : "bg-white text-black"
                          }`}
                        >
                          {option}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10">
                    <p className="font-bold">Listed by</p>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {listedByData.map((option, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            if (listedBy === option) {
                              setListedBy("");
                              setError("Please select a property type.");
                            } else {
                              setListedBy(option);
                              setError("");
                            }
                          }}
                          className={`border rounded p-2 text-center cursor-pointer transition-all duration-200 hover:bg-blue-200 ${
                            listedBy === option
                              ? "bg-blue-200 text-black border-black"
                              : "bg-white text-black"
                          }`}
                        >
                          {option}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="lg:w-100 sm:full mt-5 mb-5">
                  <div>
                    <p
                      className={`mb-1 ${
                        touchedFields.superBuiltup &&
                        validateField("superBuiltup", superBuiltup)
                          ? "text-red-500  font-bold"
                          : ""
                      }`}
                    >
                      Super Builtup area sqft *
                    </p>
                    <input
                      type="number"
                      value={superBuiltup}
                      onChange={(e) => setSuperBuiltup(e.target.value)}
                      onBlur={() =>
                        setTouchedFields((prev) => ({
                          ...prev,
                          superBuiltup: true,
                        }))
                      }
                      className={`w-full sm:w-full md:w-full lg:w-full p-2 border rounded no-spinner${
                        touchedFields.superBuiltup &&
                        validateField("superBuiltup", superBuiltup)
                          ? "border-red-500 font-bold"
                          : "border-gray-300"
                      }`}
                    />
                    <p
                      className={`mb-1 ${
                        touchedFields.superBuiltup &&
                        validateField("superBuiltup", superBuiltup)
                          ? "text-red-500 font-sm"
                          : "hidden"
                      }`}
                    >
                      Super Builtup area sqft is mandatory. Please complete the
                      required field.
                    </p>
                  </div>
                </div>
                <div className="lg:w-100 mt-5 mb-5 ">
                  <div>
                    <p
                      className={`mb-1 ${
                        touchedFields.carpetArea &&
                        validateField("carpetArea", carpetArea)
                          ? "text-red-500 font-bold"
                          : ""
                      }`}
                    >
                      Carpet Area sqft *
                    </p>
                    <input
                      type="number"
                      value={carpetArea}
                      onChange={(e) => setCarpetArea(e.target.value)}
                      onBlur={() =>
                        setTouchedFields((prev) => ({
                          ...prev,
                          carpetArea: true,
                        }))
                      }
                      className={`w-full p-2 border rounded no-spinner ${
                        touchedFields.carpetArea &&
                        validateField("carpetArea", carpetArea)
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <span
                      className={`mb-1 ${
                        touchedFields.carpetArea &&
                        validateField("carpetArea", carpetArea)
                          ? "text-red-500 font-sm"
                          : "hidden"
                      }`}
                    >
                      Carpet Area sqft is mandatory. Please complete the
                      required field.
                    </span>
                  </div>
                </div>
                <div className="lg:w-100 mt-5 mb-5 ">
                  <div>
                    <p>Maintenance (Monthly)</p>
                    <input
                      type="number"
                      className="w-full p-2 border no-spinner rounded"
                    />
                  </div>
                </div>
                <div className="lg:w-100 mt-5 mb-5 ">
                  <div>
                    <p>Total Floors</p>
                    <input
                      type="number"
                      name=""
                      id=""
                      className="w-full p-2 border no-spinner rounded"
                    />
                  </div>
                </div>
                <div className="lg:w-100 mt-5 mb-5 ">
                  <div>
                    <p>Floor No.</p>
                    <input
                      type="number"
                      name=""
                      id=""
                      className="w-full p-2 border no-spinner rounded"
                    />
                  </div>
                </div>

                <div className="mt-10 mb-2">
                  <p className="font-bold">Car Parking</p>
                  <div className="flex flex-row gap-2 flex-wrap">
                    {CraParkingData.map((option, index) => (
                      <p
                        key={index}
                        onClick={() => {
                          if (carParking === option) {
                            setCarParking("");
                            setError("Please select a property type.");
                          } else {
                            setCarParking(option);
                            setError("");
                          }
                        }}
                        className={`border rounded p-2 w-15 text-center cursor-pointer transition-all duration-200 hover:bg-blue-200 ${
                          carParking === option
                            ? "bg-blue-200 text-black border-black"
                            : "bg-white text-black"
                        }`}
                      >
                        {option}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="lg:w-100 mt-5 mb-5 ">
                  <div>
                    <p>Facing</p>
                    <select
                      value={dropsown}
                      onChange={(e) => setDropDown(e.target.value)}
                      className="border p-2 rounded w-full"
                    >
                      <option value=""></option>
                      {dropDownOptionData.map((direction, index) => (
                        <option key={index} value={direction}>
                          {direction}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="lg:w-100 mt-5 mb-5 ">
                  <div>
                    <p>Project Name</p>
                    <input
                      type="text"
                      value={projectName}
                      maxLength={maxLength}
                      onChange={handleChange}
                      className="w-full p-2 border no-spinner rounded"
                    />
                    <div className="flex justify-end">
                      <p>
                        {projectName.length}/{maxLength}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-100 mt-5 mb-5 ">
                  <div>
                    <p
                      className={`font-bold ${
                        titleTouch && titleError ? "text-red-500" : ""
                      }`}
                    >
                      Add Title
                    </p>
                    <input
                      type="text"
                      value={addTitle}
                      maxLength={maxLength}
                      onBlur={handleBlurTitle}
                      onChange={AddTitleChange}
                      className={`w-full p-2 border rounded resize-none ${
                        titleTouch && titleError
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <div className="flex justify-between">
                      {titleTouch && titleError ? (
                        <p className="text-red-500 text-sm mt-1">
                          {titleError}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Mention the key features of your item (e.g. brand,
                          model, age, type)
                        </p>
                      )}
                      <p>
                        {addTitle.length}/{maxLength}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-100 mt-5 mb-5 ">
                  <div>
                    <p
                      className={`font-bold ${
                        touched && desError ? "text-red-500" : ""
                      }`}
                    >
                      Add Description
                    </p>
                    <textarea
                      type="text"
                      value={description}
                      maxLength={DesMaxLength}
                      onChange={DescriptionChange}
                      onBlur={handleBlur}
                      className={`w-full p-2 border rounded resize-none ${
                        touched && desError
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <div className="flex justify-between">
                      {touched && desError ? (
                        <p className="text-red-500 text-sm mt-1">{desError}</p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Include condition, features and reason for selling
                        </p>
                      )}

                      <p>
                        {description.length}/{DesMaxLength}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="text-gray-500" />

              <div className="p-5 mt-5 mb-5 ">
                <h1 className="font-bold">SET A PRICE</h1>
                <div>
                  <label htmlFor="" className="text-sm text-gray-500">
                    Price*
                  </label>
                  <div className="relative w-full">
                    {/* Rupee icon and vertical line */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 pr-2 border-r border-gray-300">
                        ₹
                      </span>
                    </div>

                    <input
                      type="number"
                      className="w-full p-2 pl-10 border rounded no-spinner lg:w-100"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>

              <hr className="text-gray-500" />

              <div className="p-5 sm:w-120">
                <h1 className="font-bold mb-3">UPLOAD UP TO 20 PHOTOS</h1>
                <div className="flex flex-wrap">
                  {photos.map((photo, index) => renderPhotoBox(photo, index))}
                  {photos.length < MAX_PHOTOS && renderAddPhotoBox()}
                  {[...Array(MAX_PHOTOS - photos.length - 1)].map((_, i) => (
                    <div
                      key={i}
                      className="border w-[100px] h-[100px] m-1 flex items-center justify-center text-gray-400"
                    >
                      <FaCamera className="text-xl" />
                    </div>
                  ))}
                </div>
              </div>
              <hr className="mb-5" />

              <div className="p-5 lg:w-120 ">
                <h1 className="font-bold">CONVERM YOUR LOCATION</h1>

                <div className="p-4">
                  {/* Tabs */}
                  <div className="flex justify-between  mb-4">
                    <div
                      onClick={() => setActiveTab("list")}
                      className={`mr-4 cursor-pointer pb-2 ${
                        activeTab === "list"
                          ? "border-b-5 w-40 text-center border-blue-600 text-black font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      LIST
                    </div>
                    <div
                      onClick={() => setActiveTab("current")}
                      className={`cursor-pointer pb-2 ${
                        activeTab === "current"
                          ? "border-b-5  text-center border-blue-600 text-black font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      CURRENT LOCATION
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex justify-between">
                    {activeTab === "list" ? (
                      <div>
                        <select
                          className="border p-3 rounded lg:w-100 sm:w-220"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        >
                          <option value="">Select State</option>
                          {states.map((value, i) => (
                            <option key={i} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-4 lg:w-100 sm:w-full">
                        {/* State */}
                        <div className="flex justify-between items-center w-full">
                          <p className="text-sm text-gray-500">State</p>
                          <p className="text-sm font-medium text-black">
                            Uttar Pradesh
                          </p>
                        </div>
                        <hr />

                        {/* City */}
                        <div className="flex justify-between items-center w-full">
                          <p className="text-sm text-gray-500">City</p>
                          <p className="text-sm font-medium text-black">
                            Bareilly
                          </p>
                        </div>
                        <hr />

                        {/* Neighbourhood */}
                        <div className="flex justify-between items-center w-full">
                          <p className="text-sm text-gray-500">Neighbourhood</p>
                          <p className="text-sm font-medium text-black">
                            Dashmesh Nagar
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <hr />

              <div className="max-w-md  p-6">
                <h2 className="text-xl font-bold mb-6">REVIEW YOUR DETAILS</h2>

                {/* Profile image + upload */}
                <div className="flex items-center gap-x-4 mb-6">
                  {/* Profile image with camera icon */}
                  <div className="relative w-24 h-24 mb-4">
                    <label
                      htmlFor="file-input"
                      className="cursor-pointer block w-full h-full relative"
                    >
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border border-gray-300"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center text-3xl font-semibold">
                          {getInitials(name)}
                        </div>
                      )}

                      {/* Camera icon inside image preview at bottom center */}
                      <div className="absolute bottom-0 left-1/2  transform -translate-x-1/2 bg-black/80 rounded-b-full w-full  p-1 border border-gray-300">
                        <MdCameraEnhance className="text-white w-5 h-5 m-auto" />
                      </div>
                    </label>

                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  {/* Name input field */}
                  <div className="flex-1">
                    <label className="text-sm text-gray-600 block mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      maxLength={30}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                      {name.length} / 30
                    </div>
                  </div>
                </div>

                {/* Phone verification section */}
                <div>
                  <h1 className="text-md  mb-5 font-bold">
                    Let's verify your account
                  </h1>
                  <h3 className="text-gray-600 mb-5 fs-4">
                    We will send you a confirmation code by SMS on the next
                    step.
                  </h3>
                  <label className="text-sm font-medium block mb-1">
                    Mobile Phone Number *
                  </label>
                  <div className="flex">
                    <span className="px-3 py-2 border border-r-0 border-gray-300 bg-gray-100 rounded-l text-gray-600">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded-r"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}

              <hr />
              <div className="p-5">
                {isValidForm ? (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded w-25 h-15"
                  >
                    Post Now
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="px-4 py-2 bg-gray-200 text-gray-500 font-bold rounded w-25 h-15 cursor-not-allowed"
                  >
                    Post
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForSell;
