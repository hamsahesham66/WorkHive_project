import { Sequelize } from "sequelize";
class ApiFeatures {
    constructor(sequelizeQuery, queryString) {
      this.sequelizeQuery = sequelizeQuery;
      this.queryString = queryString;
    }
  
    // 🔹 Filtering
    filter() {
      const queryObject = { ...this.queryString };
      const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
      excludedFields.forEach((field) => delete queryObject[field]);
  
      let whereClause = {};
  
      // Convert gte, gt, lte, lt into Sequelize operators
      Object.keys(queryObject).forEach((key) => {
        if (typeof queryObject[key] === "object") {
          Object.keys(queryObject[key]).forEach((operator) => {
            if (["gte", "gt", "lte", "lt"].includes(operator)) {
              if (!whereClause[key]) whereClause[key] = {};
              whereClause[key][Sequelize.Op[operator]] = queryObject[key][operator];
            }
          });
        } else {
          whereClause[key] = queryObject[key];
        }
      });
  
      this.sequelizeQuery.where = whereClause;
      return this;
    }
  
    // 🔹 Sorting
   // 🔹 Sorting
sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').map((field) => {
        return field.startsWith('-') ? [field.substring(1), 'DESC'] : [field, 'ASC'];
      });
      this.sequelizeQuery.order = sortBy; // Apply sorting to the order clause
    } else {
      this.sequelizeQuery.order = [['createdAt', 'DESC']]; // Default sorting
    }
    return this;
  }
  
    // 🔹 Field Selection
    selectFields() {
        if (this.queryString.fields) {
          const fields = this.queryString.fields.split(',');
          this.sequelizeQuery.attributes = fields;
        }
        return this;
      }
  
    // 🔹 Search Functionality
    search(modelName) {
      if (this.queryString.keyword) {
        const search = this.queryString.keyword;
        let whereClause = {};
  
        if (modelName === 'Products') {
          whereClause = {
            [Sequelize.Op.or]: [
                { title: { [Sequelize.Op.like]: `%${search}%` } }, 
                { description: { [Sequelize.Op.like]: `%${search}%` } }
            ]
          };
        } else {
          whereClause = { fullname: { [Sequelize.Op.like]: `%${search}%` } };
        }
  
        this.sequelizeQuery.where = { ...this.sequelizeQuery.where, ...whereClause };
      }
      return this;
    }
  
    // 🔹 Pagination
    paginate(countDocuments) {
      const page = parseInt(this.queryString.page) || 1;
      const limit = parseInt(this.queryString.limit) || 10;
      const offset = (page - 1) * limit;
  
      this.sequelizeQuery.limit = limit;
      this.sequelizeQuery.offset = offset;
  
      const totalPages = Math.ceil(countDocuments / limit);
      this.paginationResult = {
        limit: limit,
        currentPage: page,
        totalPages: totalPages,
        totalResults: countDocuments,
       
      };
  
      return this;
    }
  }
  
  export default ApiFeatures;
  