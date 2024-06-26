import { Services } from "../Schema/ServicesSchema";

import { Button, Grid, TextField, Typography } from "@mui/material";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import TasksItem from "src/pages/Dashboard/TasksItem";
import { TopPaneStyle } from "src/styles/styles";
import { numbersOnly } from "src/utils/DefualtValidators";
import { handleGetResponse } from "src/utils/api/answer/service";
import { handleFetchCurrentUser } from "src/utils/users/users";

const ServicesGetAnswer = ({ }) => {
  let { servicename } = useParams();
  const [answer, setAnswer] = useState("");
  const [currentUserData, setCurrentUserData] = useState({});
  console.log("answer ===> Siminz ",answer)
  const currService = Services.filter(
    (service) => service.enName == servicename
  )[0];
  const [loading, setLoading] = useState();
  const setAlertInfo = useUpdateAlert();
  const lang = i18next.language;
  const navigate = useNavigate();
  const [options, setOptions] = useState(() => {
    const options = {};
    currService.options.map((o) => (options[o["id"]] = false));
    return options;
  });

  // form submit
  const handelCheckValue = (id, status) => {
    options[id] = status;
  };
  // hook form
  useEffect(() => {
    handleFetchCurrentUser({
      requestAction: "SET_CURRENT_USER",
      setCurrentUserData,
    });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      establishment_number: "",
      id_number: "",
      check_options: "",
    },
  });
  if (currentUserData.roboAuthorities) {
    let showService = false;
    currentUserData.roboAuthorities.map((auth) => {
      if (currService.allowedAuthorities.includes(auth.name)) {
        showService = true;
        return;
      }
    });
    if (servicename !== "General") {
      if (!showService && currentUserData?.role == "MEMBER") {
        <Navigate to="/dash/dashboard" replace={true} />;
        return null;
      }
    }
  }
  return (
    currentUserData.roboAuthorities && (
      <Grid container justifyContent={"center"} gap={4}>
        <Grid item xs={12} md={8} xl={6}>
          <TopPaneStyle
            item="true"
            textAlign="center"
            alignContent="center"
            width="100%"
            padding={1}
          >
            <Typography margin={2} variant="h3" style={{ fontWeight: "bold" }}>
              {lang === "en" ? currService.enName : currService.arName}
            </Typography>
          </TopPaneStyle>
        </Grid>

        <form
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          onSubmit={handleSubmit(async (data) => {
            setLoading(true)
            await handleGetResponse({
              requestAction: "SET_ANSWER",
              setAnswer,
              data,
              servicename,
              options,
              setAlertInfo,
            })
            setLoading(false)
          }
          )}
        >
          <Grid container item xs={12} md={8} xl={6} gap={4}>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Reason"
                fullWidth
                {...register("reason", {
                  onChange: (e) =>
                    numbersOnly(e, {
                      type: "IDNo",
                      maxNumber: 10,
                      replaceWith: "",
                    }),
                  onPaste: (e) =>
                    numbersOnly(e, {
                      type: "IDNo",
                      maxNumber: 10,
                      replaceWith: "",
                    }),
                })}
                disabled={loading}
              />
            </Grid>
            <Grid container item gap={4}>
              <Grid container item spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Establishment Number"
                    pattern="[0-9]*"
                    {...register("establishment_number", {
                      onChange: (e) => numbersOnly(e),
                      onPaste: (e) => numbersOnly(e),
                      require: true,
                    })}
                    disabled={loading}
                    error={errors.email ? true : false}
                    helperText={errors.email && "Enter a valid email address"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="ID or Iqameh"
                    {...register("id_number", {
                      onChange: (e) =>
                        numbersOnly(e, {
                          type: "IDNo",
                          maxNumber: 10,
                          replaceWith: "",
                        }),
                      onPaste: (e) =>
                        numbersOnly(e, {
                          type: "IDNo",
                          maxNumber: 10,
                          replaceWith: "",
                        }),
                    })}
                    disabled={loading}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={4}>
                {currService.options.map((el) => (
                  <Grid container item xs={12} md={6}>
                    <TasksItem
                      key={el.id}
                      id={el.id}
                      status={!el.active}
                      label={
                        lang === "en" ? el.label.enLabel : el.label.arLabel
                      }
                      mission={false}
                      checkOptions={handelCheckValue}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  readOnly
                  id="outlined-multiline-static"
                  label="Answer"
                  textAlign="right"
                  value={answer}
                  style={{ direction: "rtl" }}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled
                  // helperText="Answer"
                  multiline
                  rows={10}
                  fullWidth
                />
              </Grid>
              <Grid container item spacing={4}>
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    style={{
                      width: "100%",
                      color: "white",
                    }}
                    href="/dash/services"
                  >
                    back
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    isLoading={loading}
                    disableElevation
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    )
  );
};

export default ServicesGetAnswer;
