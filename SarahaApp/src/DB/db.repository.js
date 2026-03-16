export const find = async ({
  model,
  filter = {},
  options = {},
  select = "",
}) => {
  const doc = model.find(filter).select(select);
  if (options?.populate) doc.populate(options.populate);
  if (options?.limit) doc.limit(options.limit);
  if (options?.skip) doc.skip(options.skip);
  if (options?.lean) doc.lean(options.lean);

  return await doc.exec();
};

export const findOne = async ({
  model,
  filter = {},
  options = {},
  select = "",
}) => {
  const doc = model.findOne(filter).select(select);
  if (options?.populate) doc.populate(options.populate);
  if (options?.lean) doc.lean(options.lean);

  return await doc.exec();
};

export const create = async ({ model, data, options = {} }) => {
  return await model.create([data], options);
};

export const insertMany = async ({ model, data, options = {} }) => {
  return await model.insertMany(data, options);
};

export const updateOne = async ({
  model,
  filter,
  update,
  options = { runValidators: true },
}) => {
  return await model.updateOne(
    filter,
    { ...update, $inc: { __v: 1 } },
    options,
  );
};

export const findById = async ({ id, model, select = "", options = {} }) => {
  const doc = model.findById(id).select(select);
  if (options?.populate) doc.populate(options.populate);
  if (options?.lean) doc.lean(options.lean);
  return await doc.exec();
};
