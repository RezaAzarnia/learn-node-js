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
