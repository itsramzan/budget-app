import React from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../features/theme/themeSlice";

const ThemeSelect = () => {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  const activeTheme = useSelector((state) => state.theme.theme);

  const dispatch = useDispatch();

  const handleChangeTheme = (value) => {
    dispatch(changeTheme(value));
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
      <label tabIndex={0}>
        <IoColorPaletteOutline className="text-2xl" />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content bg-red-100 h-[300px] w-52 p-2 rounded-md shadow overflow-y-auto space-y-2"
      >
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => handleChangeTheme(theme)}
            className={`capitalize w-full btn btn-sm ${
              activeTheme === theme && "bg-primary text-base-100"
            }`}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelect;
