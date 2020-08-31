const jsontoxml = require('jsontoxml');
const InvalidFormat = require('./errors/InvalidFormat');

class Serializer {
    serialize(data) {
        const newObj = this.filter(data);

        if(this.contentType === 'application/json') 
            return this.json(newObj);
        else if(this.contentType === 'application/xml')
            return this.xml(newObj);
        
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

    xml(data) {
        let tag = this.tagSingular;

        if(Array.isArray(data)) {
            tag = this.tagPlural;
            data = data.map((obj) => {
                return { [this.tagSingular]: obj }
            });
        }

        return jsontoxml({ [tag]: data });
    }
}

class SupplierSerializer extends Serializer {
    constructor(contentType, extraProps) {
        super();
        this.contentType = contentType;
        this.publicProps = ['id', 'company', 'category'].concat(extraProps || []); 
        this.tagSingular = 'supplier';
        this.tagPlural = 'suppliers';
    }
}

class ErrorSerializer extends Serializer {
    constructor(contentType, extraProps) {
        super();
        this.contentType = contentType;
        this.publicProps = ['id', 'message'].concat(extraProps || []);
        this.tagSingular = 'error';
        this.tagPlural = 'errors';
    }
}

module.exports = {
    Serializer: Serializer,
    SupplierSerializer: SupplierSerializer,
    ErrorSerializer: ErrorSerializer,
    acceptedFormats: ['application/json', 'application/xml']
}