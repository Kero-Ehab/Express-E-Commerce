
class ApiFeatures {
    constructor(mongooseQuery, queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter(){
        //copy query object
        const queryStringObj = { ...this.queryString };
        const excludesFields = ['page', 'sort', 'limit', 'fields'];
        for (let i = 0; i < excludesFields.length; i++) {
            delete queryStringObj[excludesFields[i]];
        }

        //filtering
        const mongoQuery = {};
        for (let key in queryStringObj) {

            if (key.includes('[')) {

                const field = key.split('[')[0];
                const operator = key.match(/\[(.*)\]/)[1];

                if (!mongoQuery[field]) mongoQuery[field] = {};

                mongoQuery[field]['$' + operator] = Number(queryStringObj[key]);

            } else {
                mongoQuery[key] = isNaN(queryStringObj[key])
                    ? queryStringObj[key]
                    : Number(queryStringObj[key]);
            }
        }
        this.mongooseQuery = this.mongooseQuery.find(mongoQuery);
        return this;
    }
    sort(){
        if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    }else{
        this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    }
    return this;
    }
    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        }else{
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
    }
    search(modelName){
        if(this.queryString.keyword){
            let query = {};
            if(modelName === 'Products'){
                query.$or = [
                    {
                        title: {$regex: this.queryString.keyword, $options: 'i'}
                    },
                    {
                    description: {$regex: this.queryString.keyword, $options: 'i'}
                }
            ]}else{
                query = {name: {$regex: this.queryString.keyword, $options: 'i'}}
            }
            this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;   
    }
    pagination(countDocuments){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;


        //Pagination result object
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.numberOfPages = Math.ceil(countDocuments / limit);
        if(endIndex < countDocuments){
            pagination.next = page+1;
        }
        if(skip > 0){
            pagination.prev = page-1;
        }

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginateResult = pagination;
        return this;
    }

}

module.exports = ApiFeatures;
