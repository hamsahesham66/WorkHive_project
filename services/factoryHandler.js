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