const InvalidFormat = require('./errors/InvalidFormat');

class Serializer {
    serialize(data) {
        const newObj = this.filter(data);

        if(this.contentType === 'application/json') 
            return this.json(newObj);
        
        throw new InvalidFormat();
    }
    
    filter(data) {
        if(Array.isArray(data)) {
            data = data.map((obj) => this.filterObj(obj));
        } else {
            data = this.filterObj(data);
        }

        return data;
    }

    filterObj(obj) {
        const newObj = {};

        this.publicProps.forEach((property) => {
            if(obj.hasOwnProperty(property))
                newObj[property] = obj[property];
        });

        return newObj;
    }
    
    json(data) {
        return JSON.stringify(data);
    }
}

class SupplierSerializer extends Serializer {
    constructor(contentType) {
        super();
        this.contentType = contentType;
        this.publicProps = ['id', 'company', 'category']; 
    }
}

module.exports = {
    Serializer: Serializer,
    SupplierSerializer: SupplierSerializer,
    acceptedFormats: ['application/json', '*/*']
}