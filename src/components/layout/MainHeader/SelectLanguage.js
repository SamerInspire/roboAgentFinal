import { IconButton, ListItemText, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material";

// images
import i18next from "i18next";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import AR_Flag from "src/assets/Images/ic_flag_ar.svg";
import EN_Flag from "src/assets/Images/ic_flag_en.svg";
import { themeContext } from "src/hooks/Context/ThemeContext";

const StyledMenu = styled(Menu)(({ theme }) => ({
  paper: {
    minWidth: 175,
    boxShadow: `0 2px 10px -5px ${theme.palette.green.darker}`,
  },
}));

// Usage
<StyledMenu
  elevation={0}
  getContentAnchorEl={null}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "left",
  }}
  transformOrigin={{
    vertical: "bottom",
    horizontal: "left",
  }}
/>;

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:active": {
    backgroundColor: theme.palette.green.light,
  },
  "& .MuiListItemText-primary": {
    marginLeft: theme.spacing(1),
    fontSize: theme.spacing(2),
  },
}));

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  padding: "12px 9px",
  "& img": {
    width: 28,
  },
}));

// Language list
const languages = [
  { src: <img src={AR_Flag} alt="Arabic" />, alt: "Arabic", lang: "ar" },
  { src: <img src={EN_Flag} alt="English" />, alt: "English", lang: "en" },
];

const LanguageSelector = (props) => {
  // console.log(i18next.language);
  const { setDirection } = useContext(themeContext);
  const { i18n } = useTranslation();

  return (
    <>
      <IconButtonStyle
        aria-controls="language-selector"
        aria-haspopup="true"
        onClick={props.onOpen}
      >
        {i18next.language == "en" ? languages[1].src : <>{languages[0].src}</>}
      </IconButtonStyle>

      <StyledMenu
        id="customized menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
      >
        {languages.map((el) => (
          <StyledMenuItem
            key={el.alt}
            value={el.alt}
            onClick={(e) => {
              i18n.changeLanguage(el.lang);
              // setDirection(el.lang == "ar" ? "rtl" : "ltr");
              props.onClose(e);
            }}
          >
            {el.src}
            <ListItemText primary={el.alt} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default LanguageSelector;
