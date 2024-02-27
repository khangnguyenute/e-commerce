export const fakeRoleData = ["admin", "user"];

const getRoles = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: fakeRoleData,
        meta: {
          total: fakeRoleData.length,
        },
      });
    });
  });

export { getRoles };
