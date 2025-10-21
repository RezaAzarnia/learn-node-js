exports.validateFields = (body) => {
  const { bookName, price, bookCount } = body;
  const errors = {};

  if (!bookName.trim()) errors.bookName = "please enter bookName";

  if (!price || isNaN(price) || price <= 0)
    errors.price = "please enter price correctly and positive Number";

  if (!bookCount || isNaN(bookCount) || bookCount <= 0)
    errors.bookCount = "please enter bookCount correctly and positive number";

  return Object.keys(errors).length ? errors : null;
};

exports.validateID = (id) => {
  if (!id) {
    return { valid: false, status: 400, message: "id must be exist" };
  }
  if (isNaN(id)) {
    return {
      valid: false,
      status: 422,
      message: "product id must be valid number",
    };
  }
  return { valid: true };
};
