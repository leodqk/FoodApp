const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Hello World!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { testUserController };
