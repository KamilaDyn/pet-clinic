const PORT = process?.env?.PORT || 5000;
const app = require("./app");

export const startUp = async () => {
  // create appointments relevant to current date

  // eslint-disable-next-line no-console
  app.listen(PORT, () =>
    console.log(`Pet clinic server listening on port ${PORT}`)
  );
};
