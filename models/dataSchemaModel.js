class dataSchemaModel {

    constructor(data) {
        const objArray = data.split("|");
        this.email = objArray[0];
        this.firstname = objArray[1];
        this.lastname = objArray[2];
    }

    reducerSchema() {
        const dataSchema = [this.email, this.firstname, this.lastname]
        return dataSchema
    }
}


module.exports = dataSchemaModel;