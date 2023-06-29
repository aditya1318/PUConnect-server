import catchAsync from './catchAsync.js';
import AppError from './appError.js';
import AdvancedAPI from './advancedApi.js';

export const createOne = Model =>
  catchAsync(async (req, res, next) => {
    console.log("reached handler factory");
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        [Model.collection.collectionName.slice(0, -1)]: doc
      }
    });
  });

  export const getAll = Model =>
  catchAsync(async (req, res, next) => {
    const features = new AdvancedAPI(Model.find(), req.query)
      .filter()
      .sort()
      .project()
      .paginate();

    // You need to actually execute the query and store the result in `docs`
    const docs = await features.execute();

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        [Model.collection.collectionName]: docs
      }
    });
  });




export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        [Model.collection.collectionName.slice(0, -1)]: doc
      }
    });
  });

export const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        [Model.collection.collectionName.slice(0, -1)]: doc
      }
    });
  });

export const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });
