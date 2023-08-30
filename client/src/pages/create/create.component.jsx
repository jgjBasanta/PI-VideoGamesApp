import "./create.styles.css";
import React, { isValidElement } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, postGame, getAllPlatforms } from "../../redux/actions";
import axios from "axios";
import FormInput from "../../components/form/input/input.component";
import FormSelect from "../../components/form/select/select.component";

function validate(values) {
  let errors = {};
  if (!/^[a-z A-Z 0-9: ]{3,30}$/.test(values.name)) {
    errors.name = "Please write the name of the game";
  } else if (!/^.{10,280}$/.test(values.description)) {
    errors.description = "Please write the description of the game";
  } else if (values.platforms === []) {
    errors.platforms = "Please select at least one platform for the game";
  } else if (
    /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\\d{4})$/.test(values.released)
  ) {
    errors.released =
      "Please write the date in the following format: MM-DD-YYYY";
  } else if (!/^[1-5]$/.test(values.rating)) {
    errors.rating = "Please use Numbers between 1 - 5 to rate the game";
  } else if (!values.genres === []) {
    errors.genres = "Please select at least one genre";
  } else if (
    /^(http:\/\/)?[a-zA-Z0-9\-\.]+\.[a-z]{2,6}(\/[a-zA-Z0-9\-\._~%?&//=]*)?<span class="math-inline">/.test(
      values.image
    )
  ) {
    errors.image = "Please write a valid URL ex. http://. Max 250 characters.";
  }
  return errors;
}

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    name: "",
    description: "",
    platforms: [],
    released: "",
    rating: "",
    image: "",
    genres: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    await dispatch(postGame(values));
    alert("Game added!");
    setValues({
      name: "",
      description: "",
      platforms: [],
      released: "",
      rating: "",
      image: "",
      genres: [],
    });
    history.push("/home");
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Max 30 characters",
      label: "VideoGame Name:",
      className: "form-input",
      errorMessage:
        "Name Should be between 3 and 30 characters and should not contain any special characters",
      required: true,
      pattern: "^[a-z A-Z 0-9:]{3,30}$",
    },
    {
      id: 2,
      name: "released",
      type: "text",
      placeholder: "MM-DD-YYYY",
      label: "Release Date:",
      className: "form-input",
      errorMessage: "Date should be in the following format: MM-DD-YYYY",
      required: true,
      pattern: "^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\\d{4})$",
    },
    {
      id: 3,
      name: "rating",
      type: "text",
      placeholder: "1-5",
      label: "VideoGame Rating:",
      className: "form-input",
      errorMessage: "Rating should be between 1 and 5",
      required: true,
      pattern: "^[1-5]$",
    },
    {
      id: 4,
      name: "image",
      type: "text",
      placeholder: "https://example.com",
      label: "Image URL:",
      className: "form-input",
      errorMessage: "Image should be a valid URL. Max 255 characters",
      required: true,
      pattern:
        '^(http://)?[a-zA-Z0-9-.]+.[a-z]{2,6}(/[a-zA-Z0-9-._~%?&//=]*)?<span class="math-inline">',
    },
    {
      id: 5,
      name: "description",
      type: "text",
      placeholder: "Max 280 characters",
      label: "Description:",
      className: "form-input-description",
      errorMessage: "Description should be between 3 and 280 characters",
      required: true,
      pattern: "^[a-z A-Z 0-9]{3,280}$",
    },
  ];

  const onChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors(
      validate({
        ...values,
        [e.target.name]: e.target.value,
      })
    );
    console.log(errors);
  };

  const handleSelectGenres = (e) => {
    if (!values.genres.includes(e.target.value)) {
      setValues({
        ...values,
        genres: [...values.genres, e.target.value],
      });
    }
  };

  const handleSelectPlatforms = (e) => {
    if (!values.platforms.includes(e.target.value)) {
      setValues({
        ...values,
        platforms: [...values.platforms, e.target.value],
      });
    }
  };

  const handleRemoveGenres = (genreToRemove) => {
    setValues({
      ...values,
      genres: values.genres.filter((genre) => genre !== genreToRemove),
    });
  };

  const handleRemovePlatforms = (platformToRemove) => {
    setValues({
      ...values,
      platforms: values.platforms.filter(
        (platform) => platform !== platformToRemove
      ),
    });
  };

  const spanTag = document.querySelector("span");

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAllPlatforms());
  }, []);

  const disableSubmit = () => {
    const hasErrors = Object.keys(errors).length > 0;
    const isFormEmpty = Object.values(values).some((value) => value === "");
    const isGenresEmpty = values.genres.length === 0;
    const isPlatformsEmpty = values.platforms.length === 0;
    const isNameEmpty = values.name.length === 0;
    const isDescriptionEmpty = values.description.length === 0;
    const isRatingEmpty = values.rating.length === 0;
    const isReleasedEmpty = values.name.length === 0;
    const isImageEmpty = values.image.length === 0;

    return (
      hasErrors ||
      isFormEmpty ||
      isGenresEmpty ||
      isPlatformsEmpty ||
      isNameEmpty ||
      isDescriptionEmpty ||
      isRatingEmpty ||
      isReleasedEmpty ||
      isImageEmpty
    );
  };

  return (
    <div className="create-page">
      <div className="navbar-container">
        <Link className="home-link" to="/home">
          <h1 className="page-name">IVGDB</h1>
        </Link>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              label={input.label}
              onChange={onChangeInput}
            />
          ))}
          <label className="select-label">Genres:</label>
          <FormSelect options={allGenres} onChange={handleSelectGenres} />
          <label className="select-label">Platforms:</label>
          <FormSelect
            options={allPlatforms}
            value={values.platforms}
            onChange={handleSelectPlatforms}
          />
          <span>{errors.platforms}</span>
          <button
            type="submit"
            className="create-button"
            onClick={handleSubmit}
            disabled={disableSubmit()}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="genres-display">
        <label className="selection-label">Select 1 or More Genres:</label>
        <div className="selection-container">
          {values.genres.map((genre) => (
            <div className="selection">
              <p className="selection-display" key={genre.id}>
                {genre}
              </p>
              <button
                className="delete-button"
                value={genre}
                onClick={() => handleRemoveGenres(genre)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="platforms-display">
        <label className="selection-label">Select 1 or more Platforms:</label>
        <div className="selection-container">
          {values.platforms.map((platform) => (
            <div className="selection">
              <p className="selection-display" key={platform.id}>
                {platform}
              </p>
              <button
                className="delete-button"
                onClick={() => handleRemovePlatforms(platform)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Create;
