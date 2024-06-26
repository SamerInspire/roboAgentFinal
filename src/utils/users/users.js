import AxiosHit from "src/utils/api/AxiosHit";
export async function handleSubmitUserAuths(utils) {
  const { roboAuthorities, userId } = utils;
  try {
    await AxiosHit(
      {
        method: "put",
        url: "/api/user-auth",
        data: {
          roboAuthorities: roboAuthorities,
          userId: userId,
        },
      },
      utils
    );
  } catch (error) {
    console.error(error);
  }
}
export const handleFetchAuthorities = async (utils) => {
  try {
    await AxiosHit(
      {
        method: "get",
        url: "/api/user-auth",
      },
      utils
    );
  } catch (error) {
    throw new Error(error);
  }
};
export async function hanldeSubmitUserNewRole(utils) {
  const { userId, newRole } = utils;
  try {
    await AxiosHit(
      {
        method: "put",
        url: `/api/user-roles/${userId}/roles/${newRole}`,
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function handleSubmitNewUser(userData, utils) {
  console.log(userData);
  try {
    const r = await AxiosHit(
      {
        url: "/api/users/signup",
        method: "post",
        data: { ...userData, roboAuthorities: undefined },
      },
      utils
    );
    handleSubmitUserAuths({
      roboAuthorities: userData.roboAuthorities,
      userId: r.data.roboAgentRs.body?.user?.userId,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleSubmitUserNewService(utils) {
  const { userId, userNewService } = utils;
  console.log();
  try {
    await AxiosHit(
      {
        method: "put",
        url: `service/${userId}/service/${userNewService}`,
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleFetchAllUsers(utils) {
  try {
    await AxiosHit(
      {
        url: "users/getallusers?size=40",
        method: "get",
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function handleFetchServiceList(utils) {
  try {
    await AxiosHit(
      {
        method: "get",
        url: "/api/service",
      },
      utils
    );
  } catch (error) {
    throw new Error(error);
  }
}
export async function handleFetchCurrentUser(utils) {
  try {
    await AxiosHit(
      {
        url: "api/users/currentuser",
        method: "get",
      },
      utils
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
