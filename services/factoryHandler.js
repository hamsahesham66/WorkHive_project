import asyncHandler from "express-async-handler";
export const getAll = (Model,modelName='') =>
    asyncHandler(async (req, res) => {
      let filter = {};
      if(req.filterObj){
        filter = req.filterObj;
      }
      //build query
      const totalDocuments = await Model.count({ where: filter });
      const apiFeatures = new ApiFeatures(Model.findAll({ where: filter }), req.query)
      .filter()
      .sort()
      .selectFields()
      .search(modelName)
      .paginate(totalDocuments);
  
      const { sequelizeQuery, paginationResult } = apiFeatures;
      const documents = await sequelizeQuery;
      res.status(200).json({
      results: documents.length,
      paginationResult,
      data: documents,
    });
  });