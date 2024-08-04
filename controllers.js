const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Customer = mongoose.model("Customer");

const addCustomer = function(request, response) {

    bcrypt.genSalt(2).then(salt => {
        bcrypt.hash(request.body.password, salt).then(hashPassword => {
            const newCustomer = {
                name: request.body.name,
                username: request.body.username,
                password: hashPassword,
                address: request.body.address,
                birthDate: request.body.birthDate,
                email: request.body.email,
                activeStatus: true
            }
        
            const responseCollection = _createResponseCollection();
        
            Customer.create(newCustomer).then(response => {
                if(!response) {
                    responseCollection.status = 401;
                    responseCollection.message = {message: "Not able to create a customer"}
                    return;
                }
                responseCollection.status = 200;
                responseCollection.message = {message: "Customer created successfully"}
            }).catch(error => {
                responseCollection.status = 500;
                responseCollection.message = error
            }).finally(()=> {
                _sendResponse(response, responseCollection);
            })
            
        })
    })
}
const allCustomers = function(request, response) {
    let count = 5, offset = 0;
    const maxCount = 10;

    if (request.query) {
        if(request.query.count) {
            count = parseInt(request.query.count, 10);
        }
        if(request.query.offset) {
            offset = parseInt(request.query.offset, 10);
        }
    }

    if (isNaN(count) || isNaN(offset)) {
        response.status(401).json({message: "Invalid count or offset"});
        return;
    }
    if (count > maxCount) {
        response.status(401).json({message: "Count should be equal to lest than 10"});
        return;
    }

    const responseCollection = _createResponseCollection();

    Customer.find().skip(offset).limit(count).exec().then(customers => {
        if(!customers) {
            responseCollection.status = 404;
            responseCollection.message = {message: "Customers not fount"}
            return;
        }
        responseCollection.status = 200;
        responseCollection.message = customers
    }).catch(error => {
        responseCollection.status = 500;
        responseCollection.message = error
    }).finally(()=> {
        _sendResponse(response, responseCollection);
    })
}
const oneCustomer = function(request, response) {
    const customerId = request.params.customerId;

    if (!mongoose.isValidObjectId(customerId)) {
        response.status(401).json({message: "Customer ID is Invalid"})
    }

    const responseCollection = _createResponseCollection();

    Customer.findById(customerId).exec().then(customer => {
        if(!customer) {
            responseCollection.status = 404;
            responseCollection.message = {message: "Customer ID not found"}
            return;
        }
        responseCollection.status = 200;
        responseCollection.message = customer
    }).catch(error => {
        responseCollection.status = 500;
        responseCollection.message = error
    }).finally(()=> {
        _sendResponse(response, responseCollection);
    })
}
const fullCustomerUpdate = function(request, response) {
    const customerId = request.params.customerId;

    if (!mongoose.isValidObjectId(customerId)) {
        response.status(401).json({message: "Customer ID invalid"});
        return;
    }
    const responseCollection = _createResponseCollection();    
    
    Customer.findById(customerId).exec().then(customer => {
        if(!customer) {
            responseCollection.status = 401;
            responseCollection.message = {message: "Customer Id not found"}
            return;
        }
        customer.name = request.body.name;
        customer.username = request.body.username;
        customer.password = request.body.password;
        customer.address = request.body.address;
        customer.birthDate = request.body.birthDate;
        customer.email = request.body.email;
        customer.activeStatus = request.body.activeStatus;

        return customer.save()
    }).then(customerSaved => {
        if (customerSaved) {
            responseCollection.status = 200;
            responseCollection.message = {message: "Customer updated successfully"}
        }
    }).catch(error => {
        responseCollection.status = 500;
        responseCollection.message = error
    }).finally(()=> {
        _sendResponse(response, responseCollection);
    })
}
const partialCustomerUpdate = function(request, response) {
    const customerId = request.params.customerId;

    if (!mongoose.isValidObjectId(customerId)) {
        response.status(401).json({message: "Customer ID invalid"});
        return;
    }
    const responseCollection = _createResponseCollection();    
    
    Customer.findById(customerId).exec().then(customer => {
        if(!customer) {
            responseCollection.status = 401;
            responseCollection.message = {message: "Customer Id not found"}
            return;
        }
        console.log(request.body);
        if (request.body && request.body.name) {customer.name = request.body.name;}
        if (request.body && request.body.username) {customer.username = request.body.username;}
        if (request.body && request.body.password) {customer.password = request.body.password;}
        if (request.body && request.body.address) {customer.address = request.body.address;}
        if (request.body && request.body.birthDate) {customer.birthDate = request.body.birthDate;}
        if (request.body && request.body.email) {customer.email = request.body.email;}
        if (request.body && request.body.activeStatus) {customer.activeStatus = request.body.activeStatus;}
        console.log(customer);
        
        return customer.save()
    }).then(customerSaved => {
        if (customerSaved) {
            responseCollection.status = 200;
            responseCollection.message = {message: "Customer partial updated successfully"}
        }
    }).catch(error => {
        responseCollection.status = 500;
        responseCollection.message = error
    }).finally(()=> {
        _sendResponse(response, responseCollection);
    })
}
const removeCustomer = function(request, response) {
    const customerId = request.params.customerId;
    
    if (!mongoose.isValidObjectId(customerId)) {
        response.status(401).json({message: "Customer ID invalid"});
        return;
    }

    const responseCollection = _createResponseCollection();

    Customer.findByIdAndDelete(customerId).exec().then(response => {
        if(!response) {
            responseCollection.status = 404;
            responseCollection.message = {message: "Customer Id not found"}
            return;
        }
        responseCollection.status = 200;
        responseCollection.message = {message: "Customer Deleted successfully"}
    }).catch(error => {
        responseCollection.status = 500;
        responseCollection.message = error
    }).finally(()=> {
        _sendResponse(response, responseCollection);
    })
}

const _sendResponse = (response, responseCollection) => {
    response.status(responseCollection.status).json(responseCollection.message);
}

const _createResponseCollection = () => {
    return {
        status: 201,
        message: ""
    }
}

module.exports = {
    addCustomer,
    allCustomers,
    oneCustomer,
    fullCustomerUpdate,
    partialCustomerUpdate,
    removeCustomer
}