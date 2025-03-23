import asyncHandler from "express-async-handler";
import ApiFeatures from "../utils/apiFeatures.js";
export const getAll = (Model,modelName='') =>
    asyncHandler(async (req, res) => {
      let filter = {};
      if(req.filterObj){
        filter = req.filterObj;
      }
      //build query
      const totalDocuments = await Model.count({ where: filter });
      const apiFeatures = new ApiFeatures({ where: filter }, req.query)
      .filter()
      .sort()
      .selectFields()
      .search(modelName)
      .paginate(totalDocuments);
      const documents = await Model.findAll(apiFeatures.sequelizeQuery);

      res.status(200).json({
      results: documents.length,
      paginationResult: apiFeatures.paginationResult,
      data: documents,
    });
  });

  export const createOne = (Model) =>
    asyncHandler(async (req, res) => {
      const newDocument = await Model.create(req.body);
      res.status(201).json({ data: newDocument });
    })
  
   export const getOne = (Model) =>
      asyncHandler(async (req, res,next) => {
        const document = await Model.findById(req.params.id);
        if (!document) {
          return next(new ApiError(`no document for this id ${req.params.id}`,404))
        }
        res.status(200).json({ data: document });
      }); 
    